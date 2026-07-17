import { sanityFetch } from "@/sanity/client";
import { recentPostsQuery, allPostsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/client";
import { fallbackEssays, type EssayCard } from "./fallbackEssays";

type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  heroImage?: { asset?: { _ref?: string }; alt?: string };
  publishedAt: string;
  categories?: { title: string; slug: string }[];
  readingTime?: number;
};

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function toCard(p: SanityPost, i: number): EssayCard {
  return {
    title: p.title,
    slug: p.slug,
    category: p.categories?.[0]?.title ?? "Analysis",
    date: formatDate(p.publishedAt),
    readingTime: `${Math.max(1, p.readingTime ?? 5)} min`,
    image: p.heroImage?.asset
      ? urlFor(p.heroImage).width(720).height(400).fit("crop").url()
      : `/images/ph-essay-${(i % 6) + 1}.jpg`,
    excerpt: p.excerpt,
  };
}

/** Recent essays for the homepage carousel; falls back to design placeholders. */
export async function getRecentEssays(): Promise<EssayCard[]> {
  try {
    const posts = await sanityFetch<SanityPost[]>({ query: recentPostsQuery });
    if (posts?.length) return posts.map(toCard);
  } catch {
    // Sanity unreachable (e.g. local build without network) — use fallbacks
  }
  return fallbackEssays;
}

/** All essays for the archive; falls back to design placeholders. */
export async function getAllEssays(): Promise<EssayCard[]> {
  try {
    const posts = await sanityFetch<SanityPost[]>({ query: allPostsQuery });
    if (posts?.length) return posts.map(toCard);
  } catch {
    // fall through
  }
  return fallbackEssays;
}
