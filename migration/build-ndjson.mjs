/**
 * Builds migration/production.ndjson from migration/content/*.md.
 *
 * Import with:
 *   npx sanity dataset import migration/production.ndjson production --replace
 *
 * Deterministic _ids mean the import is idempotent (--replace overwrites).
 * Hero images use the _sanityAsset directive — the importer downloads them
 * from the Substack CDN and uploads them as Sanity assets.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const contentDir = join(here, "content");

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36).padStart(4, "0")}`;

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) throw new Error("No frontmatter");
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*"(.*)"\s*$/);
    if (kv) meta[kv[1]] = kv[2];
  }
  return { meta, body: raw.slice(m[0].length).trim() };
}

/** Parse inline markdown (bold, italic, links) into portable text spans. */
function parseInline(text) {
  const spans = [];
  const markDefs = [];
  // Tokenise on links first, then bold/italic within each piece.
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  const pieces = [];
  let lm;
  while ((lm = linkRe.exec(text))) {
    if (lm.index > last) pieces.push({ text: text.slice(last, lm.index) });
    pieces.push({ text: lm[1], href: lm[2] });
    last = lm.index + lm[0].length;
  }
  if (last < text.length) pieces.push({ text: text.slice(last) });

  for (const piece of pieces) {
    let linkKey = null;
    if (piece.href) {
      linkKey = key();
      markDefs.push({ _key: linkKey, _type: "link", href: piece.href });
    }
    // bold / italic tokenisation
    const emRe = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
    let l2 = 0;
    let m2;
    const emit = (t, marks) => {
      if (!t) return;
      spans.push({ _key: key(), _type: "span", text: t, marks: linkKey ? [...marks, linkKey] : marks });
    };
    while ((m2 = emRe.exec(piece.text))) {
      if (m2.index > l2) emit(piece.text.slice(l2, m2.index), []);
      if (m2[2] !== undefined) emit(m2[2], ["strong"]);
      else emit(m2[3], ["em"]);
      l2 = m2.index + m2[0].length;
    }
    if (l2 < piece.text.length) emit(piece.text.slice(l2), []);
  }
  return { spans, markDefs };
}

function block(style, text) {
  const { spans, markDefs } = parseInline(text);
  return { _key: key(), _type: "block", style, markDefs, children: spans };
}

function toPortableText(md) {
  const blocks = [];
  for (const chunk of md.split(/\n\s*\n/)) {
    const t = chunk.trim();
    if (!t) continue;
    if (t.startsWith("### ")) blocks.push(block("h3", t.slice(4)));
    else if (t.startsWith("## ")) blocks.push(block("h2", t.slice(3)));
    else if (t.startsWith("> ")) blocks.push(block("blockquote", t.replace(/^> ?/gm, "")));
    else if (t === "---") blocks.push({ _key: key(), _type: "divider", style: "line" });
    else blocks.push(block("normal", t.replace(/\n/g, " ")));
  }
  return blocks;
}

const CATEGORIES = {
  Russia: "category-russia",
  "European Security": "category-european-security",
  "Middle East": "category-middle-east",
  "Global Economy": "category-global-economy",
  Analysis: "category-analysis",
};

const docs = [];

for (const [title, id] of Object.entries(CATEGORIES)) {
  docs.push({
    _id: id,
    _type: "category",
    title,
    slug: { _type: "slug", current: id.replace("category-", "") },
  });
}

docs.push({
  _id: "author-ines",
  _type: "author",
  name: "Ines Burrell",
  shortBio:
    "Geopolitical analyst and advisor — Russia, Eastern Europe, Eurasia. Former journalist; published in Persuasion; live broadcast commentator.",
  sameAs: ["https://inesburrell.substack.com"],
});

docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  siteTitle: "Ines Burrell — Geopolitical Advisory",
  description:
    "Bespoke geopolitical advisory and political risk consulting. Russia, Eastern Europe and Eurasia expertise for businesses and organisations navigating global uncertainty.",
  contactEmail: "info@inesburrell.com",
  bookingUrl: "https://app.cal.eu/inesburrell/15min",
  substackUrl: "https://inesburrell.substack.com",
});

for (const file of readdirSync(contentDir).filter((f) => f.endsWith(".md")).sort()) {
  const { meta, body } = parseFrontmatter(readFileSync(join(contentDir, file), "utf8"));
  const categoryId = CATEGORIES[meta.category];
  if (!categoryId) throw new Error(`Unknown category "${meta.category}" in ${file}`);
  if (meta.excerpt.length > 200) throw new Error(`Excerpt over 200 chars in ${file}`);

  docs.push({
    _id: `post-${meta.slug}`,
    _type: "post",
    title: meta.title,
    slug: { _type: "slug", current: meta.slug },
    excerpt: meta.excerpt,
    publishedAt: `${meta.date}T09:00:00.000Z`,
    originalSubstackUrl: meta.substackUrl,
    categories: [{ _key: key(), _type: "reference", _ref: categoryId }],
    heroImage: {
      _type: "image",
      _sanityAsset: `image@${meta.hero}`,
      alt: meta.title,
    },
    body: toPortableText(body),
  });
}

const out = join(here, "production.ndjson");
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Wrote ${docs.length} documents to ${out}`);
console.log(`Posts: ${docs.filter((d) => d._type === "post").length}`);
