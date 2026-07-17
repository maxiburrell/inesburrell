import type { Metadata } from "next";
import Link from "next/link";
import CalLink from "@/components/CalLink";

export const metadata: Metadata = {
  title: "Message Received | Ines Burrell",
  description: "Thank you — your message is with me. You will hear back within two working days.",
  robots: { index: false },
};

const serif = "var(--font-serif),serif";

const rowLabel: React.CSSProperties = {
  color: "#6e222d",
  fontSize: 11,
  letterSpacing: ".18em",
  textTransform: "uppercase",
  fontWeight: 600,
  flex: "none",
};

export default function ThankYouPage() {
  return (
    <>
      {/* message */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "130px 24px clamp(24px,5vw,60px)", textAlign: "center" }}>
        <div style={{ width: 44, height: 1, background: "#6e222d", margin: "0 auto" }} />
        <div style={{ fontSize: 11, letterSpacing: ".26em", textTransform: "uppercase", color: "#6e222d", fontWeight: 600, marginTop: 26 }}>
          Message received
        </div>
        <h1
          style={{
            fontFamily: serif,
            fontSize: "min(58px,5.5vw)",
            lineHeight: 1.1,
            fontWeight: 400,
            margin: "22px 0 0",
            letterSpacing: "-.01em",
          }}
        >
          Thank you. Your message is <em>with me</em>.
        </h1>
        <div
          style={{
            fontSize: 18,
            lineHeight: 1.75,
            opacity: 0.72,
            marginTop: 24,
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          You will hear back from me — not an autoresponder — within two working days. Everything you have written is
          confidential.
        </div>
      </div>

      {/* next steps */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 120px" }}>
        <div style={{ border: "1px solid rgba(34,29,24,.16)", background: "#fff", padding: "40px 44px" }}>
          <div style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "#6e222d", fontWeight: 600 }}>
            While you wait
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 10 }}>
            <Link
              href="/writing"
              className="hover-dim"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 24,
                borderBottom: "1px solid rgba(34,29,24,.12)",
                padding: "18px 0",
                textDecoration: "none",
              }}
            >
              <span style={{ fontFamily: serif, fontSize: 22 }}>Read the latest analysis</span>
              <span style={rowLabel}>Writing →</span>
            </Link>
            <a
              href="https://inesburrell.substack.com"
              target="_blank"
              rel="noopener"
              className="hover-dim"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 24,
                borderBottom: "1px solid rgba(34,29,24,.12)",
                padding: "18px 0",
                textDecoration: "none",
              }}
            >
              <span style={{ fontFamily: serif, fontSize: 22 }}>
                Subscribe to <em>Liminal Lines</em>
              </span>
              <span style={rowLabel}>Substack →</span>
            </a>
            <CalLink
              className="hover-dim"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 24,
                padding: "18px 0 4px",
                textDecoration: "none",
              }}
            >
              <span style={{ fontFamily: serif, fontSize: 22 }}>Prefer to talk sooner? Book a call</span>
              <span style={rowLabel}>Book →</span>
            </CalLink>
          </div>
        </div>
      </div>
    </>
  );
}
