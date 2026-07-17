"use client";

import { useState } from "react";
import Link from "next/link";
import type { EssayCard } from "@/lib/posts";

const serif = "var(--font-serif),serif";

export default function ArchiveGrid({ essays }: { essays: EssayCard[] }) {
  const cats = ["All", ...Array.from(new Set(essays.map((e) => e.category)))];
  const [active, setActive] = useState("All");
  const shown = active === "All" ? essays : essays.filter((e) => e.category === active);

  return (
    <div style={{ maxWidth: 1440, margin: "0 auto", padding: "clamp(24px,5vw,72px) clamp(24px,5vw,72px) 120px" }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", borderBottom: "1px solid rgba(34,29,24,.16)", paddingBottom: 28 }}>
        {cats.map((label) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            style={{
              border: `1px solid ${label === active ? "#6e222d" : "rgba(34,29,24,.25)"}`,
              background: label === active ? "#6e222d" : "transparent",
              color: label === active ? "#f8f4ec" : "#221d18",
              padding: "10px 18px",
              fontFamily: "var(--font-sans),sans-serif",
              fontSize: 11,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        className="m-grid1"
        style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 24, marginTop: 44 }}
      >
        {shown.map((e) => (
          <Link
            key={e.title}
            href={`/writing/${e.slug}`}
            className="card-hover"
            style={{
              background: "#fff",
              border: "1px solid rgba(34,29,24,.14)",
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
              color: "#221d18",
            }}
          >
            <div style={{ height: 200 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ padding: "24px 28px 26px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
              <div style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "#6e222d", fontWeight: 600 }}>
                {e.category}
              </div>
              <div style={{ fontFamily: serif, fontSize: 26, lineHeight: 1.22 }}>{e.title}</div>
              {e.excerpt && <div style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.68 }}>{e.excerpt}</div>}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 16,
                  borderTop: "1px solid rgba(34,29,24,.14)",
                  paddingTop: 14,
                  marginTop: "auto",
                }}
              >
                <span style={{ fontSize: 13, opacity: 0.6 }}>{e.date}</span>
                <span style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", opacity: 0.55, fontWeight: 600 }}>
                  {e.readingTime} read
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
