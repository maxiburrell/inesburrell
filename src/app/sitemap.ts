import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inesburrell.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/writing`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.1 },
  ];

  try {
    const posts = await client.fetch<{ slug: string; publishedAt: string }[]>(
      groq`*[_type == "post" && defined(slug.current)]{ "slug": slug.current, publishedAt }`,
    );
    return [
      ...staticPages,
      ...posts.map((p) => ({
        url: `${SITE_URL}/writing/${p.slug}`,
        lastModified: new Date(p.publishedAt),
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    return staticPages;
  }
}
