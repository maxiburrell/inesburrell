import type { Metadata } from "next";
import Link from "next/link";
import ArchiveGrid from "@/components/ArchiveGrid";
import { getAllEssays } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing on European Security Strategy, Russia & Geopolitics",
  description:
    "Essays on Russia, Eastern Europe, European security strategy and the politics behind the headlines. By geopolitical analyst Ines Burrell — published in Persuasion and Liminal Lines.",
};

const serif = "var(--font-serif),serif";
const SUBSTACK = "https://inesburrell.substack.com";

export default async function WritingPage() {
  const essays = await getAllEssays();
  const [featured, ...rest] = essays;

  return (
    <>
      {/* header */}
      <div
        className="m-grid1"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "clamp(56px,11vw,96px) clamp(24px,5vw,72px) 64px",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 300px",
          gap: "clamp(24px,5vw,72px)",
          alignItems: "end",
        }}
      >
        <div>
          <div style={{ fontSize: 11, letterSpacing: ".26em", textTransform: "uppercase", color: "#6e222d", fontWeight: 600 }}>
            Writing &amp; commentary
          </div>
          <h1
            style={{
              fontFamily: serif,
              fontSize: "min(72px,6vw)",
              lineHeight: 1.06,
              fontWeight: 400,
              margin: "26px 0 0",
              letterSpacing: "-.01em",
            }}
          >
            The politics behind the <em>headlines</em>.
          </h1>
        </div>
        <div style={{ borderLeft: "1px solid rgba(34,29,24,.2)", padding: "0 0 8px 28px" }}>
          <div style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.75 }}>
            Essays on Russia, Eastern Europe and European security. Published in{" "}
            <em style={{ fontFamily: serif }}>Persuasion</em>; weekly in{" "}
            <em style={{ fontFamily: serif }}>Liminal Lines</em>.
          </div>
          <a
            href={SUBSTACK}
            target="_blank"
            rel="noopener"
            className="hover-dim"
            style={{
              display: "inline-block",
              color: "#6e222d",
              fontSize: 11,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
              borderBottom: "1px solid #6e222d",
              paddingBottom: 3,
              marginTop: 20,
            }}
          >
            Subscribe on Substack →
          </a>
        </div>
      </div>

      {/* featured essay */}
      {featured && (
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(24px,5vw,72px)" }}>
          <Link
            href={`/writing/${featured.slug}`}
            className="m-grid1 card-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)",
              textDecoration: "none",
              color: "#221d18",
              border: "1px solid rgba(34,29,24,.16)",
              background: "#fff",
            }}
          >
            <div style={{ minHeight: 420 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.image}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div style={{ padding: "52px 56px", display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "baseline",
                  fontSize: 11,
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                <span style={{ color: "#6e222d" }}>Latest — {featured.category}</span>
                <span style={{ opacity: 0.5 }}>{featured.date}</span>
              </div>
              <div style={{ fontFamily: serif, fontSize: "clamp(22px,3.67vw,44px)", lineHeight: 1.12, fontWeight: 400 }}>
                {featured.title}
              </div>
              {featured.excerpt && (
                <div style={{ fontFamily: serif, fontSize: 20, lineHeight: 1.5, fontStyle: "italic", opacity: 0.7 }}>
                  {featured.excerpt}
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 16,
                  borderTop: "1px solid rgba(34,29,24,.14)",
                  paddingTop: 18,
                  marginTop: "auto",
                }}
              >
                <span style={{ color: "#6e222d", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600 }}>
                  Read the essay →
                </span>
                <span style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", opacity: 0.55, fontWeight: 600 }}>
                  {featured.readingTime} read
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* filters + grid */}
      <ArchiveGrid essays={rest.length ? rest : essays} />

      {/* substack band */}
      <div style={{ background: "#40161d", color: "#f8f4ec" }}>
        <div
          className="m-grid1"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "clamp(56px,11vw,100px) clamp(24px,5vw,72px)",
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) auto",
            gap: "clamp(24px,5vw,72px)",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontFamily: serif, fontSize: "clamp(20px,3.33vw,40px)", fontStyle: "italic" }}>Liminal Lines</div>
            <div style={{ fontSize: 17.5, opacity: 0.7, marginTop: 14, maxWidth: 560, lineHeight: 1.7 }}>
              A weekly essay on the politics behind the headlines. Written for people who make decisions, not for
              people who collect takes.
            </div>
          </div>
          <a
            href={SUBSTACK}
            target="_blank"
            rel="noopener"
            className="btn-cream"
            style={{
              flex: "none",
              display: "inline-block",
              padding: "18px 36px",
              fontSize: 11.5,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Subscribe on Substack
          </a>
        </div>
      </div>
    </>
  );
}
