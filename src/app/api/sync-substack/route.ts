import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { normaliseUrl, parsePublicationFeed, PUBLICATION_FEEDS } from "@/lib/substack-feed";

export const runtime = "nodejs";
export const maxDuration = 60;

// This importer stores link cards only. Existing full essays remain untouched.
export async function GET() {
  return NextResponse.json({
    route: "sync-substack", mode: "link-cards",
    configured: { writeToken: Boolean(process.env.SANITY_WRITE_TOKEN), syncSecret: Boolean(process.env.SYNC_SECRET) },
    publications: PUBLICATION_FEEDS.map((source) => source.publication),
  });
}

export async function POST(req: NextRequest) {
  const secret = process.env.SYNC_SECRET;
  const provided = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!secret || !timingSafeEqual(createHash("sha256").update(provided).digest(), createHash("sha256").update(secret).digest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = process.env.SANITY_WRITE_TOKEN || req.headers.get("x-sanity-token");
  if (!token) return NextResponse.json({ error: "Sanity write token is not configured" }, { status: 503 });

  const created: string[] = [];
  const errors: string[] = [];
  let skipped = 0;
  try {
    const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, timeout: 10_000 });
    const existing = await client.fetch<{ url?: string; slug?: string }[]>(
      `*[_type == "post"]{ "url": originalSubstackUrl, "slug": slug.current }`,
    );
    const knownUrls = new Set(existing.map((post) => normaliseUrl(post.url ?? "")).filter(Boolean));
    const knownSlugs = new Set(existing.map((post) => post.slug).filter(Boolean));
    const transaction = client.transaction();
    const pending: string[] = [];
    for (const source of PUBLICATION_FEEDS) {
      try {
        const response = await fetch(source.url, {
          headers: { "user-agent": "inesburrell.com writing sync" },
          cache: "no-store", signal: AbortSignal.timeout(10_000),
        });
        if (!response.ok) throw new Error(`Feed returned HTTP ${response.status}`);
        const posts = parsePublicationFeed(await response.text(), source);
        for (const post of posts) {
          if (knownUrls.has(post.url) || knownSlugs.has(post.slug)) { skipped++; continue; }
          {
            transaction.createIfNotExists({
              _id: `feed-${createHash("sha256").update(post.url).digest("hex").slice(0, 32)}`,
              _type: "post", title: post.title,
              slug: { _type: "slug", current: post.slug },
              excerpt: post.excerpt, publishedAt: post.publishedAt,
              originalSubstackUrl: post.url, contentMode: "link",
              sourcePublication: post.publication,
              ...(post.image ? { externalImageUrl: post.image } : {}),
            });
            pending.push(post.title);
            knownUrls.add(post.url);
            knownSlugs.add(post.slug);
          }
        }
      } catch (error) {
        console.error("Publication feed failed", source.url, error);
        errors.push(`${source.publication}: feed unavailable or invalid`);
      }
    }
    if (pending.length) {
      await transaction.commit();
      created.push(...pending);
    }
    if (created.length) revalidateTag("sanity", "max");
    // Partial failures must fail the scheduled job, so they are visible and retried.
    return NextResponse.json({ created, skipped, errors }, { status: errors.length ? 502 : 200 });
  } catch (error) {
    console.error("Writing sync failed", error);
    return NextResponse.json({ error: "Writing sync failed" }, { status: 500 });
  }
}
