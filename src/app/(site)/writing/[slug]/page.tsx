import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";
import ArticleShell from "@/components/ArticleShell";
import ArticleBody from "@/components/ArticleBody";
import { sanityFetch, urlFor, client } from "@/sanity/client";
import { postBySlugQuery, postSlugsQuery, relatedPostsQuery, recentPostsQuery } from "@/sanity/queries";
import { formatDate } from "@/lib/posts";

type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  heroImage?: { asset?: object; alt?: string; caption?: string };
  publishedAt: string;
  originalSubstackUrl?: string;
  categories?: { title: string; slug: string }[];
  readingTime?: number;
  body: PortableTextBlock[];
  seo?: { metaTitle?: string; metaDescription?: string };
};

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(postSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<SanityPost | null>({ query: postBySlugQuery, params: { slug } });
  if (!post) return {};
  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: ["Ines Burrell"],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await sanityFetch<SanityPost | null>({ query: postBySlugQuery, params: { slug } });
  if (!post) notFound();

  const categoryIds =
    (post.categories ?? []).length > 0
      ? await client
          .fetch<{ categories: { _ref: string }[] } | null>(
            `*[_type == "post" && slug.current == $slug][0]{ categories }`,
            { slug },
          )
          .then((r) => r?.categories?.map((c) => c._ref) ?? [])
      : [];

  let related: SanityPost[] = [];
  try {
    related = categoryIds.length
      ? await sanityFetch<SanityPost[]>({ query: relatedPostsQuery, params: { slug, categoryIds } })
      : [];
    if (!related.length) {
      related = (await sanityFetch<SanityPost[]>({ query: recentPostsQuery })).filter((p) => p.slug !== slug).slice(0, 3);
    }
  } catch {
    related = [];
  }

  const readingTime = `${Math.max(1, post.readingTime ?? 5)} min`;

  return (
    <>
      <ArticleShell
        category={post.categories?.[0]?.title ?? "Analysis"}
        dateLabel={formatDate(post.publishedAt)}
        readingTime={readingTime}
        title={post.title}
        standfirst={post.excerpt}
        heroImage={post.heroImage?.asset ? urlFor(post.heroImage).width(1600).height(900).fit("crop").url() : undefined}
        heroCaption={post.heroImage?.caption}
        related={related.map((r) => ({
          title: r.title,
          slug: r.slug,
          category: r.categories?.[0]?.title ?? "Analysis",
          readingTime: `${Math.max(1, r.readingTime ?? 5)} min`,
        }))}
      >
        <ArticleBody body={post.body} />
      </ArticleShell>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            author: {
              "@type": "Person",
              name: "Ines Burrell",
              url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://inesburrell.com") + "/about",
            },
            mainEntityOfPage: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://inesburrell.com") + `/writing/${post.slug}`,
          }),
        }}
      />
    </>
  );
}
