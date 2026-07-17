import Link from "next/link";

const serif = "var(--font-serif),serif";

export default function NotFound() {
  return (
    <div style={{ maxWidth: 840, margin: "0 auto", padding: "clamp(80px,16vw,160px) 24px", textAlign: "center" }}>
      <div style={{ fontSize: 11, letterSpacing: ".26em", textTransform: "uppercase", color: "#6e222d", fontWeight: 600 }}>
        404 — Not found
      </div>
      <h1 style={{ fontFamily: serif, fontSize: "min(56px,8vw)", fontWeight: 400, lineHeight: 1.1, margin: "26px 0 0" }}>
        This page has gone <em>quiet</em>.
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.7, opacity: 0.7, maxWidth: 480, margin: "22px auto 0" }}>
        The page you are looking for does not exist or has moved. The analysis, however, is still here.
      </p>
      <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 36, flexWrap: "wrap" }}>
        <Link
          href="/writing"
          className="btn-primary"
          style={{
            display: "inline-block",
            padding: "14px 26px",
            fontSize: 11,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Read the writing
        </Link>
        <Link
          href="/"
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
            alignSelf: "center",
          }}
        >
          Back to the start →
        </Link>
      </div>
    </div>
  );
}
