import { XMLParser, XMLValidator } from "fast-xml-parser";

export const PUBLICATION_FEEDS = [
  { url: "https://inesburrell.substack.com/feed", publication: "Liminal Lines", host: "inesburrell.substack.com" },
  { url: "https://www.persuasion.community/feed", publication: "Persuasion", host: "www.persuasion.community" },
] as const;

export type FeedPost = {
  title: string;
  url: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  publication: string;
  image?: string;
};

export function normaliseUrl(value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return "";
    return `${url.origin}${url.pathname}`.replace(/\/$/, "");
  } catch { return ""; }
}

function plainText(value: unknown): string {
  const stripped = String(value ?? "").replace(/<[^>]*>/g, " ");
  // Decode entities as XML text only, then render through React's text escaping.
  const escaped = stripped.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const numericDecoded = escaped.replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (entity, code: string) => {
    const value = code[0].toLowerCase() === "x" ? parseInt(code.slice(1), 16) : parseInt(code, 10);
    return value > 0 && value <= 0x10ffff && !(value >= 0xd800 && value <= 0xdfff) ? String.fromCodePoint(value) : entity;
  });
  const decoded = new XMLParser({ processEntities: true }).parse(`<text>${numericDecoded.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</text>`).text;
  return String(decoded ?? "").replace(/\s+/g, " ").trim();
}

export function parsePublicationFeed(xml: string, source: typeof PUBLICATION_FEEDS[number]): FeedPost[] {
  if (XMLValidator.validate(xml) !== true) throw new Error("Invalid RSS XML");
  const feed = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" }).parse(xml);
  if (!feed?.rss?.channel) throw new Error("Missing RSS channel");
  const raw = feed.rss.channel.item ?? [];
  const items: Record<string, unknown>[] = Array.isArray(raw) ? raw : [raw];
  return items.flatMap((item) => {
    // Persuasion is a multi-author publication: never import other writers.
    const authors = plainText(item["dc:creator"]).split(/,|\band\b/i).map((name) => name.trim().toLowerCase());
    if (!authors.includes("ines burrell")) return [];
    const title = plainText(item.title);
    const url = normaliseUrl(String(item.link ?? ""));
    const date = new Date(String(item.pubDate ?? ""));
    if (!title || !url || new URL(url).host !== source.host || !Number.isFinite(date.getTime())) return [];
    const excerpt = plainText(item.description);
    const enclosure = item.enclosure as { "@_url"?: string } | undefined;
    let image: string | undefined;
    try {
      const candidate = new URL(enclosure?.["@_url"] ?? "");
      if (candidate.protocol === "https:") image = candidate.href;
    } catch { /* An image is optional. */ }
    return [{
      title, url,
      slug: new URL(url).pathname.split("/").filter(Boolean).pop()!,
      excerpt: excerpt.length > 200 ? excerpt.slice(0, 197).replace(/\s+\S*$/, "") + "…" : excerpt,
      publishedAt: date.toISOString(), publication: source.publication, image,
    }];
  });
}
