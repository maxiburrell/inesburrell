import Link from "next/link";
import CalLink from "./CalLink";

const label: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: ".24em",
  textTransform: "uppercase",
  fontWeight: 600,
  color: "#c9909a",
};

const col: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 16 };
const linkCol: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 12, fontSize: 14.5, opacity: 0.75 };

export default function Footer() {
  return (
    <div style={{ background: "#221d18", color: "#f8f4ec", overflow: "hidden" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "clamp(24px,5vw,72px) clamp(24px,5vw,72px) 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 48,
            flexWrap: "wrap",
            paddingBottom: 56,
            borderBottom: "1px solid rgba(248,244,236,.12)",
          }}
        >
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-footer-white.png"
              alt="Ines Burrell — Geopolitical Advisory"
              style={{ height: 130, display: "block", marginLeft: -6 }}
            />
          </div>
          <div style={{ display: "flex", gap: "min(80px,6vw)", flexWrap: "wrap" }}>
            <div style={col}>
              <div style={label}>Explore</div>
              <div style={linkCol}>
                <Link href="/about" className="hover-dim" style={{ textDecoration: "none" }}>About</Link>
                <Link href="/#services" className="hover-dim" style={{ textDecoration: "none" }}>Services</Link>
                <Link href="/writing" className="hover-dim" style={{ textDecoration: "none" }}>Writings</Link>
                <Link href="/contact" className="hover-dim" style={{ textDecoration: "none" }}>Contact</Link>
              </div>
            </div>
            <div style={col}>
              <div style={label}>Follow</div>
              <div style={linkCol}>
                <a href="https://inesburrell.substack.com" target="_blank" rel="noopener" className="hover-dim" style={{ textDecoration: "none" }}>
                  Liminal Lines — Substack
                </a>
                <a href="https://www.linkedin.com/in/inesburrell" target="_blank" rel="noopener" className="hover-dim" style={{ textDecoration: "none" }}>
                  LinkedIn
                </a>
              </div>
            </div>
            <div style={col}>
              <div style={label}>Get in touch</div>
              <div style={{ ...linkCol, alignItems: "flex-start" }}>
                <a
                  href="mailto:info@inesburrell.com"
                  className="hover-dim"
                  style={{ textDecoration: "none", borderBottom: "1px solid rgba(248,244,236,.3)", paddingBottom: 1 }}
                >
                  info@inesburrell.com
                </a>
                <CalLink
                  className="hover-dim"
                  style={{ textDecoration: "none", borderBottom: "1px solid rgba(248,244,236,.3)", paddingBottom: 1 }}
                >
                  Book a call
                </CalLink>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            padding: "22px 0 6px",
            fontSize: 12.5,
            opacity: 0.55,
          }}
        >
          <span>© {new Date().getFullYear()} Ines Burrell — Geopolitical Advisory · United Kingdom</span>
          <Link href="/privacy-policy" style={{ textDecoration: "none", borderBottom: "1px solid rgba(248,244,236,.3)" }}>
            Privacy
          </Link>
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif),serif",
            fontSize: "clamp(100px,16.67vw,200px)",
            fontStyle: "italic",
            lineHeight: 0.85,
            opacity: 0.06,
            textAlign: "center",
            margin: "24px -20px -30px",
            whiteSpace: "nowrap",
          }}
        >
          Ines Burrell
        </div>
      </div>
    </div>
  );
}
