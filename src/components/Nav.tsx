"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import CalLink from "./CalLink";

const links = [
  { href: "/about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/writing", label: "Writings" },
  { href: "/contact", label: "Contact" },
];

function closeMobileMenu() {
  const checkbox = document.getElementById("mnav") as HTMLInputElement | null;
  if (checkbox) checkbox.checked = false;
}

export default function Nav() {
  // Close the mobile menu whenever the route changes (client-side navigation
  // keeps DOM state, so the checkbox would otherwise stay checked).
  const pathname = usePathname();
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px clamp(24px,5vw,72px)",
        borderBottom: "1px solid rgba(34,29,24,.16)",
        background: "#f8f4ec",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <Link href="/" style={{ display: "block" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-header.png"
          alt="Ines Burrell — Geopolitical Advisory"
          style={{ height: 44, display: "block" }}
        />
      </Link>

      {/* mobile nav: checkbox hack, styled in globals.css */}
      <input type="checkbox" id="mnav" style={{ display: "none" }} />
      <label
        htmlFor="mnav"
        className="m-burger"
        aria-label="Open menu"
        style={{
          display: "none",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
          width: 44,
          height: 44,
          cursor: "pointer",
          position: "relative",
          zIndex: 60,
        }}
      >
        <span className="m-b1" style={{ display: "block", width: 26, height: 2, background: "#221d18", transition: "transform .35s ease" }} />
        <span className="m-b2" style={{ display: "block", width: 26, height: 2, background: "#221d18", transition: "opacity .25s ease,transform .35s ease" }} />
        <span className="m-b3" style={{ display: "block", width: 26, height: 2, background: "#221d18", transition: "transform .35s ease" }} />
      </label>
      <label
        htmlFor="mnav"
        className="m-backdrop"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(20,15,12,.45)",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity .4s ease",
          zIndex: 49,
        }}
      />
      <div
        className="m-menu"
        onClick={(e) => {
          // Close on any link or booking-button tap, including same-page
          // anchors (#services) where the pathname doesn't change.
          if ((e.target as HTMLElement).closest("a,button")) closeMobileMenu();
        }}
        style={{
          boxSizing: "border-box",
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(84vw,340px)",
          background: "#221d18",
          zIndex: 55,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 26,
          padding: "clamp(52px,10vw,84px) 52px",
          transform: "translateX(105%)",
          transition: "transform .5s cubic-bezier(.22,1,.36,1)",
          boxShadow: "-24px 0 60px rgba(0,0,0,.3)",
        }}
      >
        <Link href="/" style={{ fontFamily: "var(--font-serif),serif", fontSize: 32, color: "#f8f4ec", textDecoration: "none" }}>
          Home
        </Link>
        {links.map((l) => (
          <Link key={l.href} href={l.href} style={{ fontFamily: "var(--font-serif),serif", fontSize: 32, color: "#f8f4ec", textDecoration: "none" }}>
            {l.label}
          </Link>
        ))}
        <CalLink
          style={{
            fontSize: 11,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            fontWeight: 600,
            background: "#6e222d",
            color: "#f8f4ec",
            padding: "16px 24px",
            textAlign: "center",
            textDecoration: "none",
            marginTop: 14,
          }}
        >
          Book a call
        </CalLink>
      </div>

      {/* desktop nav */}
      <div
        className="m-hide"
        style={{
          display: "flex",
          gap: 36,
          alignItems: "center",
          fontSize: 12.5,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="hover-full" style={{ textDecoration: "none", opacity: 0.7 }}>
            {l.label}
          </Link>
        ))}
        <CalLink className="btn-primary" style={{ textDecoration: "none", padding: "11px 20px" }}>
          Book a call
        </CalLink>
      </div>
    </div>
  );
}
