import Link from "next/link";
import type { ReactNode } from "react";

const serif = "var(--font-serif),serif";
const SUBSTACK = "https://inesburrell.substack.com";

/**
 * The article chrome from the v3c design: masthead, hero, body slot,
 * author bio, Substack CTA, further reading, services cross-link.
 */
export default function ArticleShell({
  category,
  dateLabel,
  readingTime,
  title,
  standfirst,
  heroImage,
  heroCaption,
  children,
  related,
}: {
  category: string;
  dateLabel: string;
  readingTime: string;
  title: ReactNode;
  standfirst?: string;
  heroImage?: string;
  heroCaption?: string;
  children: ReactNode;
  related: { title: string; slug?: string | null; category: string; readingTime: string }[];
}) {
  return (
    <>
      {/* masthead */}
      <div style={{ maxWidth: 840, margin: "0 auto", padding: "clamp(52px,10vw,90px) 24px 0" }}>
        <Link
          href="/writing"
          className="hover-full"
          style={{
            fontSize: 11,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            fontWeight: 600,
            opacity: 0.55,
            textDecoration: "none",
          }}
        >
          ← All writing
        </Link>
        <div
          style={{
            display: "flex",
            gap: 18,
            alignItems: "baseline",
            fontSize: 12,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginTop: 28,
          }}
        >
          <span style={{ color: "#6e222d" }}>{category}</span>
          <span style={{ opacity: 0.5 }}>
            {dateLabel} · {readingTime} read
          </span>
        </div>
        <h1
          style={{
            fontFamily: serif,
            fontSize: "min(62px,5.5vw)",
            lineHeight: 1.08,
            fontWeight: 400,
            margin: "22px 0 0",
            letterSpacing: "-.01em",
          }}
        >
          {title}
        </h1>
        {standfirst && (
          <div style={{ fontFamily: serif, fontSize: 23, lineHeight: 1.5, fontStyle: "italic", opacity: 0.7, marginTop: 22 }}>
            {standfirst}
          </div>
        )}
        <div style={{ borderBottom: "1px solid rgba(34,29,24,.2)", marginTop: 44 }} />
      </div>

      {/* hero image */}
      {heroImage && (
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "56px 24px 0" }}>
          <div style={{ height: "min(480px,62vw)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          {heroCaption && (
            <div style={{ fontFamily: "var(--font-sans),sans-serif", fontSize: 13, opacity: 0.55, marginTop: 12 }}>
              {heroCaption}
            </div>
          )}
        </div>
      )}

      {/* body */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px clamp(24px,5vw,60px)" }}>{children}</div>

      {/* end matter */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px 90px" }}>
        <div style={{ borderTop: "1px solid rgba(34,29,24,.2)", paddingTop: 36, display: "flex", gap: 24, alignItems: "center" }}>
          <div style={{ width: 84, height: 84, flex: "none", borderRadius: "50%", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portrait-ines.jpg"
              alt="Ines Burrell"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div>
            <div style={{ fontFamily: serif, fontSize: 22 }}>Ines Burrell</div>
            <div style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.7, marginTop: 5 }}>
              Geopolitical analyst and advisor — Russia, Eastern Europe, Eurasia. Former journalist; published in
              Persuasion; live broadcast commentator.{" "}
              <Link href="/about" style={{ color: "#6e222d" }}>
                About the practice →
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{
            border: "1px solid rgba(34,29,24,.2)",
            padding: "36px 40px",
            marginTop: 44,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontFamily: serif, fontSize: 26, fontStyle: "italic" }}>Liminal Lines</div>
            <div style={{ fontSize: 15, opacity: 0.68, marginTop: 5 }}>
              A weekly essay on the politics behind the headlines.
            </div>
          </div>
          <a
            href={SUBSTACK}
            target="_blank"
            rel="noopener"
            className="btn-primary"
            style={{
              flex: "none",
              display: "inline-block",
              padding: "14px 24px",
              fontSize: 11,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Subscribe on Substack
          </a>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: ".26em",
                textTransform: "uppercase",
                color: "#6e222d",
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              Further reading
            </div>
            {related.map((r) => (
              <Link
                key={r.title}
                href={r.slug ? `/writing/${r.slug}` : "/writing"}
                className="hover-dim"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 24,
                  borderBottom: "1px solid rgba(34,29,24,.16)",
                  padding: "20px 0",
                  textDecoration: "none",
                  color: "#221d18",
                }}
              >
                <span style={{ fontFamily: serif, fontSize: 23 }}>{r.title}</span>
                <span style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", opacity: 0.5, flex: "none", fontWeight: 600 }}>
                  {r.category} · {r.readingTime}
                </span>
              </Link>
            ))}
            <div style={{ fontSize: 15, opacity: 0.65, marginTop: 26 }}>
              If this analysis is relevant to a decision you&rsquo;re facing —{" "}
              <Link href="/contact" style={{ color: "#6e222d" }}>
                get in touch
              </Link>
              .
            </div>
          </div>
        )}
      </div>
    </>
  );
}
