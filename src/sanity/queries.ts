import { groq } from "next-sanity";

export const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  heroImage,
  publishedAt,
  originalSubstackUrl,
  "categories": categories[]->{title, "slug": slug.current},
  "readingTime": round(length(pt::text(body)) / 5 / 200)
`;

export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${postFields}
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...6] {
    ${postFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body,
    seo
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug && count(categories[@._ref in $categoryIds]) > 0]
    | order(publishedAt desc)[0...3] {
    ${postFields}
  }
`;
