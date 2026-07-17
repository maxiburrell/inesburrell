"use client";

import { useState } from "react";

export type Faq = { q: string; a: string };

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(-1);

  return (
    <>
      {faqs.map((f, i) => (
        <div key={f.q} style={{ borderTop: "1px solid rgba(34,29,24,.16)" }}>
          <button
            onClick={() => setOpen((o) => (o === i ? -1 : i))}
            className="hover-dim"
            aria-expanded={open === i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 24,
              padding: "22px 0",
              cursor: "pointer",
              width: "100%",
              background: "none",
              border: "none",
              textAlign: "left",
              color: "inherit",
              font: "inherit",
            }}
          >
            <div style={{ fontFamily: "var(--font-serif),serif", fontSize: 24 }}>{f.q}</div>
            <div style={{ fontFamily: "var(--font-serif),serif", fontSize: 24, color: "#6e222d" }}>
              {open === i ? "−" : "+"}
            </div>
          </button>
          {open === i && (
            <div
              style={{
                fontSize: 16.5,
                lineHeight: 1.7,
                opacity: 0.72,
                padding: "0 clamp(24px,5vw,60px) 26px 0",
                maxWidth: 620,
              }}
            >
              {f.a}
            </div>
          )}
        </div>
      ))}
      <div style={{ borderTop: "1px solid rgba(34,29,24,.16)" }} />
    </>
  );
}
