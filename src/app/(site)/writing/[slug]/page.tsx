import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";
import ArticleShell from "@/components/ArticleShell";
import ArticleBody from "@/components/ArticleBody";
import { sanityFetch, urlFor, client } from "@/sanity/client";
import { postBySlugQuery, postSlugsQuery, relatedPostsQuery, recentPostsQuery } from "@/sanity/queries";
import { formatDate } from "@/lib/posts";
import { sampleArticle } from "@/lib/sampleArticle";

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
    return [...slugs.map((slug) => ({ slug })), { slug: "sample-essay" }];
  } catch {
    return [{ slug: "sample-essay" }];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "sample-essay") {
    return { title: sampleArticle.title, robots: { index: false } };
  }
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

function SampleEssay() {
  const a = sampleArticle;
  return (
    <ArticleShell
      category={a.category}
      dateLabel={a.date}
      readingTime={a.readingTime}
      title={
        <>
          Has Reality Stopped Obeying <em>Putin?</em>
        </>
      }
      standfirst={a.standfirst}
      heroImage={a.heroImage}
      heroCaption={a.heroCaption}
      related={a.related.map((r) => ({ ...r, slug: null }))}
    >
      <div className="article-body">
        {a.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        <div className="article-pullquote">
          <div>{a.pullQuote}</div>
        </div>
        {a.paragraphsAfterQuote.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        <figure className="article-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.midImage} alt="" style={{ width: "100%", display: "block" }} />
          <figcaption>{a.midImageCaption}</figcaption>
        </figure>
        {a.closingParagraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
    </ArticleShell>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === "sample-essay") return <SampleEssay />;

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
