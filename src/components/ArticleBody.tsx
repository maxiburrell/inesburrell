import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/sanity/client";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="article-figure">
        <div style={{ maxHeight: "min(400px,55vw)", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlFor(value).width(1400).fit("max").url()}
            alt={value.alt ?? ""}
            style={{ width: "100%", display: "block", objectFit: "cover" }}
          />
        </div>
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
    pullQuote: ({ value }) => (
      <div className="article-pullquote">
        <div>{value.text}</div>
      </div>
    ),
    divider: () => <div className="article-divider">· · ·</div>,
  },
};

export default function ArticleBody({ body }: { body: PortableTextBlock[] }) {
  return (
    <div className="article-body">
      <PortableText value={body} components={components} />
    </div>
  );
}
