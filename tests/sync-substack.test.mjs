import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import * as feeds from '../src/lib/substack-feed.ts';

const require = createRequire(import.meta.url);
const code = ts.transpileModule(readFileSync('src/app/api/sync-substack/route.ts', 'utf8'), {
 compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;
function fixture({ existing = [], failFeed = false, failWrite = false } = {}) {
 const writes = [], invalidations = [], network = [];
 const compiledModule = { exports: {} };
 const transaction = { createIfNotExists: (doc) => { writes.push(doc); return transaction; }, commit: async () => { if (failWrite) throw new Error('fixture write error'); } };
 const client = { fetch: async () => existing, transaction: () => transaction };
 const mocked = {
  'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status ?? 200 }) } },
  'next/cache': { revalidateTag: (...args) => invalidations.push(args) },
  'next-sanity': { createClient: () => client },
  '@/sanity/env': { projectId: 'fixture', dataset: 'fixture', apiVersion: '2026-07-01' },
  '@/lib/substack-feed': feeds,
 };
 const xml = `<rss xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><item><title>Example</title><dc:creator>Ines Burrell</dc:creator><description>Summary</description><link>https://inesburrell.substack.com/p/example</link><pubDate>Fri, 16 Oct 2026 20:30:50 GMT</pubDate></item></channel></rss>`;
 vm.runInNewContext(code, {
  module: compiledModule, exports: compiledModule.exports, require: (name) => mocked[name] ?? require(name),
  process: { env: { SYNC_SECRET: 'fixture-secret', SANITY_WRITE_TOKEN: 'fixture-token' } },
  console: { error() {} }, AbortSignal,
  fetch: async (url) => { network.push(url); if (failFeed) throw new Error('fixture unavailable'); return { ok: true, text: async () => url.includes('persuasion') ? '<rss><channel><title>Empty</title></channel></rss>' : xml }; },
 });
 return { route: compiledModule.exports, writes, invalidations, network };
}
const request = (authorization) => ({ headers: new Headers(authorization ? { authorization } : {}) });
test('unauthenticated calls cannot fetch or write; health check is read-only', async () => {
 const f = fixture();
 assert.equal((await f.route.POST(request())).status, 401);
 assert.equal((await f.route.GET()).body.mode, 'link-cards');
 assert.equal(f.network.length, 0);
 assert.equal(f.writes.length, 0);
});
test('imports link cards without copying bodies and revalidates the site', async () => {
 const f = fixture(); const result = await f.route.POST(request('Bearer fixture-secret'));
 assert.equal(result.status, 200);
 assert.equal(f.writes.length, 1);
 assert.equal(f.writes[0].contentMode, 'link');
 assert.equal(f.writes[0].body, undefined);
 assert.equal(f.writes[0].originalSubstackUrl, 'https://inesburrell.substack.com/p/example');
 assert.equal(f.invalidations.length, 1);
});
test('an already imported URL is skipped without overwriting the full essay', async () => {
 const f = fixture({ existing: [{url:'https://inesburrell.substack.com/p/example?source=old',slug:'different-legacy-slug'}] });
 assert.equal((await f.route.POST(request('Bearer fixture-secret'))).status, 200);
 assert.equal(f.writes.length, 0);
});
test('feed or storage failures fail the scheduled job', async () => {
 for (const option of [{failFeed:true}, {failWrite:true}]) {
  const f = fixture(option);
  assert.ok((await f.route.POST(request('Bearer fixture-secret'))).status >= 500);
 }
});
