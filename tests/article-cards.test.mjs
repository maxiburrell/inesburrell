import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const require = createRequire(import.meta.url);
const essays = [
 { title: 'The Art of Defection', slug: 'the-art-of-defection', href: 'https://www.persuasion.community/p/the-art-of-defection', sourcePublication: 'Persuasion', category: 'Analysis', date: '16 October 2026', readingTime: '1 min', image: '/images/ph-essay-1.jpg', excerpt: 'It’s time for Europe to play dirty.' },
 { title: 'Latest newsletter', slug: 'latest-newsletter', href: 'https://inesburrell.substack.com/p/latest-newsletter', sourcePublication: 'Liminal Lines', category: 'Analysis', date: '15 October 2026', readingTime: '1 min', image: '/images/ph-essay-1.jpg', excerpt: 'The latest analysis.' },
];
function loadComponent(path, extra = {}) {
 const compiledModule = {exports:{}};
 const mock = { 'next/link': {default: ({children, ...props}) => React.createElement('a',props,children)}, ...extra };
 const code = ts.transpileModule(readFileSync(path,'utf8'), {compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(code,{module:compiledModule,exports:compiledModule.exports,require:(name)=>mock[name]??require(name)});
 return compiledModule.exports.default;
}
const ArchiveGrid = loadComponent('src/components/ArchiveGrid.tsx');
test('archive cards link to their publication, show excerpts and retain local essay links', () => {
 const html = renderToStaticMarkup(React.createElement(ArchiveGrid,{essays:[...essays,{...essays[0],title:'Local essay',slug:'local-essay',href:undefined}]}));
 assert.ok(html.includes('href="https://www.persuasion.community/p/the-art-of-defection"'));
 assert.ok(html.includes('href="https://inesburrell.substack.com/p/latest-newsletter"'));
 assert.ok(html.includes('href="/writing/local-essay"'));
 assert.ok(html.includes('Read in Persuasion'));
 assert.ok(html.includes('Read in Liminal Lines'));
 assert.ok(html.includes('It’s time for Europe to play dirty.'));
});
test('featured card opens the original, and is not duplicated in the archive', async () => {
 const Page = loadComponent('src/app/(site)/writing/page.tsx', {
  '@/components/ArchiveGrid': {default:ArchiveGrid}, '@/lib/posts':{getAllEssays:async()=>essays},
 });
 const html=renderToStaticMarkup(await Page());
 assert.equal((html.match(/The Art of Defection/g)??[]).length,1);
 assert.ok(html.includes('href="https://www.persuasion.community/p/the-art-of-defection"'));
 assert.ok(html.includes('Read in Persuasion'));
 assert.ok(!html.includes('1 min read'));
});
