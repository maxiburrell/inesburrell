import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking Confirmed | Ines Burrell",
  description: "Our call is in the diary. A calendar invitation with the video link is on its way to your inbox.",
  robots: { index: false },
};

const serif = "var(--font-serif),serif";

const steps = [
  {
    n: "01",
    d: "Have the decision in mind — the clearer the question, the more useful I can be in a short call.",
  },
  {
    n: "02",
    d: "Don’t prepare a briefing. I will ask a lot of questions — that is the method.",
  },
  {
    n: "03",
    d: "Anything discussed stays between us — before, during and after any engagement.",
  },
];

export default function BookingConfirmedPage() {
  return (
    <>
      {/* message */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "130px 24px clamp(24px,5vw,60px)", textAlign: "center" }}>
        <div style={{ width: 44, height: 1, background: "#6e222d", margin: "0 auto" }} />
        <div style={{ fontSize: 11, letterSpacing: ".26em", textTransform: "uppercase", color: "#6e222d", fontWeight: 600, marginTop: 26 }}>
          Booking confirmed
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
          Our call is <em>in the diary</em>.
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
          A calendar invitation with the video link is on its way to your inbox. If you need to reschedule or cancel,
          use the links in that email.
        </div>
      </div>

      {/* how to prepare */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 120px" }}>
        <div style={{ border: "1px solid rgba(34,29,24,.16)", background: "#fff", padding: "40px 44px" }}>
          <div style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "#6e222d", fontWeight: 600 }}>
            How to get the most from the call
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                style={{
                  display: "flex",
                  gap: 22,
                  borderBottom: i < steps.length - 1 ? "1px solid rgba(34,29,24,.12)" : undefined,
                  padding: i < steps.length - 1 ? "18px 0" : "18px 0 4px",
                  alignItems: "baseline",
                }}
              >
                <div style={{ fontFamily: serif, fontSize: 19, color: "#6e222d", flex: "none" }}>{s.n}</div>
                <div style={{ fontSize: 16.5, lineHeight: 1.65, opacity: 0.8 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link
            href="/writing"
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
            }}
          >
            Read the analysis while you wait →
          </Link>
        </div>
      </div>
    </>
  );
}
