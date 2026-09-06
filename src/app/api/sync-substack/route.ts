import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { createClient } from "next-sanity";
import { XMLParser } from "fast-xml-parser";
import { JSDOM } from "jsdom";
import { Schema } from "@sanity/schema";
import { htmlToBlocks, randomKey } from "@sanity/block-tools";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const runtime = "nodejs";
export const maxDuration = 60;

const FEED_URL = "https://inesburrell.substack.com/feed";

/**
 * Pulls new essays from the Substack RSS feed into Sanity.
 *
 * - Idempotent: posts already in Sanity (matched by Substack URL or slug) are skipped.
 * - Converts the post HTML to Portable Text, uploads hero + inline images to Sanity.
 * - Triggered every 3 hours by .github/workflows/sync-substack.yml, or manually:
 *     curl -X POST https://<site>/api/sync-substack -H "Authorization: Bearer $SYNC_SECRET"
 *
 * Env: SANITY_WRITE_TOKEN (Sanity token with Editor rights), SYNC_SECRET.
 */

// Minimal schema so block-tools knows which HTML maps to which blocks.
const blockContentType = Schema.compile({
  name: "sync",
  types: [
    {
      type: "object",
      name: "post",
      fields: [
        {
          name: "body",
          type: "array",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "Quote", value: "blockquote" },
              ],
              marks: {
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Emphasis", value: "em" },
                ],
                annotations: [
                  { type: "object", name: "link", fields: [{ name: "href", type: "url" }] },
                ],
              },
            },
            { type: "image" },
          ],
        },
      ],
    },
  ],
})
  .get("post")
  .fields.find((f: { name: string }) => f.name === "body").type;

const CATEGORY_RULES: [string, RegExp][] = [
  ["category-russia", /\b(russia|putin|kremlin|moscow|ukrain|mobilisation|rouble|donbas|crimea)\b/i],
  ["category-middle-east", /\b(iran|gulf|hormuz|israel|uae|saudi|arab|tehran)\b/i],
  ["category-global-economy", /\b(oil price|markets|opec|inflation|banking|economy)\b/i],
  ["category-european-security", /\b(nato|european union|brussels|baltic|poland|europe)\b/i],
];

function pickCategory(title: string, text: string): string {
  const haystack = `${title} ${title} ${text.slice(0, 1500)}`;
  for (const [id, re] of CATEGORY_RULES) if (re.test(haystack)) return id;
  return "category-analysis";
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[’'"“”]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function normaliseUrl(url: string): string {
  try {
    const u = new URL(url);
    return `${u.origin}${u.pathname}`.replace(/\/$/, "");
  } catch {
    return url;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").replace(/&#8211;/g, "–").replace(/&amp;/g, "&").trim();
}

/** Remove Substack chrome and turn figures into plain <img> tags block-tools can read. */
function cleanHtml(html: string, heroUrl: string | null): string {
  const dom = new JSDOM(`<body>${html}</body>`);
  const doc = dom.window.document;

  const junk = [
    ".button-wrapper",
    ".subscription-widget-wrap",
    ".subscription-widget-wrap-editor",
    ".subscribe-widget",
    ".embedded-post-wrap",
    ".image-link-expand",
    ".pencraft",
    "button",
    "svg",
    "hr.subscription-widget",
    ".poll-embed",
  ];
  doc.querySelectorAll(junk.join(",")).forEach((el) => el.remove());

  // Figures → <img data-caption>. Drop the top image if it duplicates the hero.
  doc.querySelectorAll("figure, .captioned-image-container").forEach((fig) => {
    const img = fig.querySelector("img");
    if (!img) {
      fig.remove();
      return;
    }
    const src = img.getAttribute("src") ?? "";
    const attrs = img.getAttribute("data-attrs") ?? "";
    const isTop = attrs.includes('"topImage":true') || (heroUrl && normaliseUrl(src) === normaliseUrl(heroUrl));
    if (isTop) {
      fig.remove();
      return;
    }
    const caption = fig.querySelector("figcaption")?.textContent?.trim() ?? "";
    const replacement = doc.createElement("img");
    replacement.setAttribute("src", src);
    replacement.setAttribute("alt", img.getAttribute("alt") || caption || "");
    if (caption) replacement.setAttribute("data-caption", caption);
    fig.replaceWith(replacement);
  });

  // Unwrap image links so <img> sits directly in the flow.
  doc.querySelectorAll("a.image-link").forEach((a) => a.replaceWith(...Array.from(a.childNodes)));

  // Drop trailing "Thanks for reading" style paragraphs.
  doc.querySelectorAll("p").forEach((p) => {
    const t = p.textContent?.trim() ?? "";
    if (/^(thanks for reading|thank you for reading|subscribe|share)/i.test(t) && t.length < 160) p.remove();
  });

  return doc.body.innerHTML;
}

type TempImageBlock = { _type: "image"; _key?: string; _tempSrc: string; alt?: string; caption?: string };

async function uploadImage(
  client: ReturnType<typeof createClient>,
  url: string,
  filename: string,
): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, { filename });
    return asset._id;
  } catch (err) {
    console.error("Image upload failed", url, err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.SYNC_SECRET;
  const provided = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? req.nextUrl.searchParams.get("secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.SANITY_WRITE_TOKEN) {
    return NextResponse.json({ error: "SANITY_WRITE_TOKEN is not set" }, { status: 500 });
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
  });

  const feedRes = await fetch(FEED_URL, { headers: { "user-agent": "inesburrell.com sync" }, cache: "no-store" });
  if (!feedRes.ok) {
    return NextResponse.json({ error: `Feed fetch failed: ${feedRes.status}` }, { status: 502 });
  }
  const xml = await feedRes.text();
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  const feed = parser.parse(xml);
  const rawItems = feed?.rss?.channel?.item ?? [];
  const items: Array<Record<string, unknown>> = Array.isArray(rawItems) ? rawItems : [rawItems];

  const existing = await client.fetch<{ url: string | null; slug: string }[]>(
    `*[_type == "post"]{ "url": originalSubstackUrl, "slug": slug.current }`,
  );
  const knownUrls = new Set(existing.map((e) => e.url && normaliseUrl(e.url)).filter(Boolean));
  const knownSlugs = new Set(existing.map((e) => e.slug));

  const created: string[] = [];
  const skipped: string[] = [];
  const errors: string[] = [];

  for (const item of items) {
    const title = String(item.title ?? "").trim();
    const link = normaliseUrl(String(item.link ?? ""));
    const slug = slugify(title);
    if (!title || !link) continue;
    if (knownUrls.has(link) || knownSlugs.has(slug)) {
      skipped.push(title);
      continue;
    }

    try {
      const html = String(item["content:encoded"] ?? "");
      const enclosure = item.enclosure as { "@_url"?: string } | undefined;
      const heroUrl = enclosure?.["@_url"] ?? null;
      const description = stripHtml(String(item.description ?? ""));
      const pubDate = new Date(String(item.pubDate ?? Date.now())).toISOString();

      const cleaned = cleanHtml(html, heroUrl);

      const blocks = htmlToBlocks(cleaned, blockContentType, {
        parseHtml: (h: string) => new JSDOM(h).window.document,
        rules: [
          {
            deserialize(el, _next, block) {
              const node = el as unknown as { tagName?: string; getAttribute: (n: string) => string | null };
              if (node.tagName?.toLowerCase() !== "img") return undefined;
              const src = node.getAttribute("src");
              if (!src) return undefined;
              const temp: TempImageBlock = {
                _type: "image",
                _tempSrc: src,
                alt: node.getAttribute("alt") ?? "",
                caption: node.getAttribute("data-caption") ?? undefined,
              };
              return block(temp);
            },
          },
        ],
      }) as unknown as Array<Record<string, unknown>>;

      // Upload inline images and swap temp markers for asset references.
      const body: Array<Record<string, unknown>> = [];
      for (const b of blocks) {
        if (b._type === "image" && typeof b._tempSrc === "string") {
          const assetId = await uploadImage(client, b._tempSrc, `${slug}-inline.jpg`);
          if (!assetId) continue;
          body.push({
            _type: "image",
            _key: (b._key as string) ?? randomKey(12),
            asset: { _type: "reference", _ref: assetId },
            alt: b.alt || title,
            ...(b.caption ? { caption: b.caption } : {}),
          });
        } else {
          body.push({ ...b, _key: (b._key as string) ?? randomKey(12) });
        }
      }

      const plainText = body
        .filter((b) => b._type === "block")
        .flatMap((b) => (b.children as { text?: string }[] | undefined) ?? [])
        .map((c) => c.text ?? "")
        .join(" ");

      const excerptSource = description || plainText;
      const excerpt = excerptSource.length > 200 ? excerptSource.slice(0, 197).replace(/\s+\S*$/, "") + "…" : excerptSource;

      let heroImage: Record<string, unknown> | undefined;
      if (heroUrl) {
        const assetId = await uploadImage(client, heroUrl, `${slug}-hero.jpg`);
        if (assetId) heroImage = { _type: "image", asset: { _type: "reference", _ref: assetId }, alt: title };
      }

      await client.createIfNotExists({
        _id: `post-${slug}`,
        _type: "post",
        title,
        slug: { _type: "slug", current: slug },
        excerpt,
        publishedAt: pubDate,
        originalSubstackUrl: link,
        categories: [{ _key: randomKey(12), _type: "reference", _ref: pickCategory(title, plainText) }],
        ...(heroImage ? { heroImage } : {}),
        body,
      });

      created.push(title);
      knownSlugs.add(slug);
    } catch (err) {
      console.error("Sync failed for", title, err);
      errors.push(`${title}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  if (created.length) revalidateTag("sanity", "max");

  return NextResponse.json({ created, skipped: skipped.length, errors });
}
