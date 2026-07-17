import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Ines Burrell",
  description:
    "How your information is handled — what is collected, why, and your rights. Privacy policy for inesburrell.com.",
};

const serif = "var(--font-serif),serif";

const sections = [
  {
    h: "Who I am",
    p: "This website is operated by Ines Burrell, an independent geopolitical analyst and advisor. For the purposes of data protection law, I am the data controller for personal information collected through this site.",
  },
  {
    h: "What I collect",
    p: "Information you give me directly: your name, email address, phone number (if provided), organisation, and the content of your messages through the contact form or booking system. This site does not run advertising or sell data — full stop.",
  },
  {
    h: "Why I collect it",
    p: "To respond to your enquiry, prepare for and conduct consultations, deliver commissioned work, and — only if you subscribe — send you the weekly essay. Nothing else. The legal bases are your consent and the legitimate interest of responding to enquiries you initiate.",
  },
  {
    h: "Client confidentiality",
    p: "Information shared in the course of advisory work is treated as strictly confidential, beyond the legal minimum. I do not discuss clients, their operations, or the existence of a client relationship with any third party. I am happy to sign your confidentiality agreement.",
  },
  {
    h: "Third-party services",
    p: "The site uses a small number of processors to function: a scheduling service (Cal.com) for bookings, an email provider for correspondence, and Substack for the newsletter. Each receives only what it needs to do its job, and each is bound by its own privacy terms.",
  },
  {
    h: "Cookies & analytics",
    p: "This site uses no advertising cookies and no invasive tracking. If basic, privacy-respecting analytics are used, they collect aggregate visit statistics only and no personal profiles.",
  },
  {
    h: "How long I keep it",
    p: "Enquiry correspondence is kept for as long as needed to handle your matter and for a reasonable period afterwards. Client engagement records are kept as required by law and professional practice. You can ask me to delete your data at any time.",
  },
  {
    h: "Your rights",
    p: "You have the right to access, correct, delete, or receive a copy of your personal data, and to object to or restrict its processing. To exercise any of these, email me. You also have the right to complain to your data protection authority.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* header */}
      <div style={{ maxWidth: 840, margin: "0 auto", padding: "clamp(52px,10vw,90px) 24px 0" }}>
        <div style={{ fontSize: 11, letterSpacing: ".26em", textTransform: "uppercase", color: "#6e222d", fontWeight: 600 }}>
          Privacy policy
        </div>
        <h1
          style={{
            fontFamily: serif,
            fontSize: "min(56px,5vw)",
            lineHeight: 1.1,
            fontWeight: 400,
            margin: "24px 0 0",
            letterSpacing: "-.01em",
          }}
        >
          How your information is handled.
        </h1>
        <div style={{ fontSize: 15, opacity: 0.55, marginTop: 18 }}>Last updated: 12 July 2026</div>
        <div style={{ borderBottom: "1px solid rgba(34,29,24,.2)", marginTop: 40 }} />
      </div>

      {/* body */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px 90px" }}>
        {sections.map((s) => (
          <div key={s.h} style={{ padding: "26px 0", borderBottom: "1px solid rgba(34,29,24,.12)" }}>
            <div style={{ fontFamily: serif, fontSize: 26, fontWeight: 400 }}>{s.h}</div>
            <div style={{ fontSize: 16.5, lineHeight: 1.75, opacity: 0.75, marginTop: 12 }}>{s.p}</div>
          </div>
        ))}
        <div style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.7, marginTop: 36 }}>
          Questions about this policy —{" "}
          <a href="mailto:info@inesburrell.com" style={{ color: "#6e222d" }}>
            info@inesburrell.com
          </a>
          .
        </div>
      </div>
    </>
  );
}
