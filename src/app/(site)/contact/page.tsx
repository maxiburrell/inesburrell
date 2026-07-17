import type { Metadata } from "next";
import CalInline from "@/components/CalInline";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ines Burrell — write about what you're facing, or book a 30-minute introductory call directly. Every enquiry is confidential.",
};

const eyebrow: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: ".26em",
  textTransform: "uppercase",
  color: "#6e222d",
  fontWeight: 600,
};

const serif = "var(--font-serif),serif";

const directLabel: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: ".18em",
  textTransform: "uppercase",
  fontWeight: 600,
  opacity: 0.55,
};

export default function ContactPage() {
  return (
    <>
      {/* header */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "clamp(56px,11vw,96px) clamp(24px,5vw,72px) 0" }}>
        <div style={eyebrow}>Contact</div>
        <h1
          style={{
            fontFamily: serif,
            fontSize: "min(72px,6vw)",
            lineHeight: 1.06,
            fontWeight: 400,
            margin: "26px 0 0",
            letterSpacing: "-.01em",
            maxWidth: 900,
          }}
        >
          Two ways to <em>start</em>.
        </h1>
        <div style={{ fontSize: 18, lineHeight: 1.7, opacity: 0.72, marginTop: 22, marginBottom: 40, maxWidth: 560 }}>
          Write to me about what you&rsquo;re facing, or book a call directly. Either way, the first conversation is
          about understanding your situation — and it is confidential.
        </div>
      </div>

      {/* two routes: form + calendar */}
      <div
        className="m-grid1"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "clamp(48px,9vw,80px) clamp(24px,5vw,72px) 120px",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: 1,
          background: "rgba(34,29,24,.16)",
          border: "1px solid rgba(34,29,24,.16)",
        }}
      >
        {/* route 1: form */}
        <div style={{ background: "#f8f4ec", padding: "56px clamp(24px,5vw,60px)" }}>
          <div style={{ fontFamily: serif, fontSize: 22, color: "#6e222d" }}>01</div>
          <div style={{ fontFamily: serif, fontSize: 34, fontWeight: 400, marginTop: 12 }}>Write to me</div>
          <div style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.7, marginTop: 10, maxWidth: 440 }}>
            A few lines about your situation is enough. You will hear back from me, not an autoresponder, within two
            working days.
          </div>
          <ContactForm />
        </div>

        {/* route 2: calendar */}
        <div
          id="book"
          style={{ background: "#f1ebdf", padding: "56px clamp(24px,5vw,60px)", display: "flex", flexDirection: "column" }}
        >
          <div style={{ fontFamily: serif, fontSize: 22, color: "#6e222d" }}>02</div>
          <div style={{ fontFamily: serif, fontSize: 34, fontWeight: 400, marginTop: 12 }}>Book a call</div>
          <div style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.7, marginTop: 10, maxWidth: 440 }}>
            A 30-minute introductory call. We discuss your needs and goals — no charge, no obligation.
          </div>
          {/* Cal.com inline embed */}
          <CalInline
            style={{
              flex: 1,
              minHeight: 560,
              marginTop: 36,
              border: "1px solid rgba(34,29,24,.2)",
              background: "#fff",
              width: "100%",
              overflow: "auto",
            }}
          />
          <div style={{ display: "flex", gap: 28, marginTop: 24, fontSize: 13.5, opacity: 0.6 }}>
            <span>United Kingdom</span>
            <span>Mon–Fri</span>
            <span>GMT / BST</span>
            <span>English · Latvian · Russian · Portuguese</span>
          </div>
        </div>
      </div>

      {/* direct details */}
      <div style={{ background: "#f1ebdf" }}>
        <div
          className="m-grid1"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "clamp(48px,9vw,80px) clamp(24px,5vw,72px)",
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "clamp(24px,5vw,72px)",
          }}
        >
          <div style={{ ...eyebrow, paddingTop: 6 }}>Direct</div>
          <div
            className="m-grid1"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,auto)",
              gap: 48,
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <div>
              <div style={directLabel}>Email</div>
              <a
                href="mailto:info@inesburrell.com"
                className="card-hover"
                style={{
                  fontFamily: serif,
                  fontSize: 23,
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(34,29,24,.3)",
                  paddingBottom: 2,
                  display: "inline-block",
                  marginTop: 10,
                  overflowWrap: "anywhere",
                }}
              >
                info@inesburrell.com
              </a>
            </div>
            <div>
              <div style={directLabel}>LinkedIn</div>
              <a
                href="https://www.linkedin.com/in/inesburrell"
                target="_blank"
                rel="noopener"
                className="card-hover"
                style={{
                  fontFamily: serif,
                  fontSize: 23,
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(34,29,24,.3)",
                  paddingBottom: 2,
                  display: "inline-block",
                  marginTop: 10,
                }}
              >
                in/inesburrell
              </a>
            </div>
            <div>
              <div style={directLabel}>Substack</div>
              <a
                href="https://inesburrell.substack.com"
                target="_blank"
                rel="noopener"
                className="card-hover"
                style={{
                  fontFamily: serif,
                  fontSize: 23,
                  fontStyle: "italic",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(34,29,24,.3)",
                  paddingBottom: 2,
                  display: "inline-block",
                  marginTop: 10,
                }}
              >
                Liminal Lines
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
