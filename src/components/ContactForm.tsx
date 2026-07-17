"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const label: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: ".18em",
  textTransform: "uppercase",
  fontWeight: 600,
  opacity: 0.65,
};

const input: React.CSSProperties = {
  border: "1px solid rgba(34,29,24,.25)",
  background: "#fff",
  padding: "14px 16px",
  fontFamily: "var(--font-sans),sans-serif",
  fontSize: 16,
  color: "#221d18",
  outline: "none",
};

const field: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 8 };

/**
 * The "Write to me" form on /contact. Posts JSON to /api/contact and
 * redirects to /thank-you on success. The hidden "website" field is a
 * honeypot — real users never see or fill it.
 */
export default function ContactForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organisation, message, website }),
      });
      if (res.ok) {
        router.push("/thank-you");
        return;
      }
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Something went wrong sending your message. Please email directly.");
      setPending(false);
    } catch {
      setError("Something went wrong sending your message. Please email directly.");
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 36 }}
    >
      <style>{`.cf-input::placeholder{color:rgba(34,29,24,.4)}.cf-input:focus{border-color:#6e222d}`}</style>
      <div
        className="m-grid1"
        style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 22 }}
      >
        <div style={field}>
          <label htmlFor="c-name" style={label}>
            Name
          </label>
          <input
            id="c-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="cf-input"
            style={input}
          />
        </div>
        <div style={field}>
          <label htmlFor="c-email" style={label}>
            Email
          </label>
          <input
            id="c-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="cf-input"
            style={input}
          />
        </div>
      </div>
      <div style={field}>
        <label htmlFor="c-org" style={label}>
          Organisation{" "}
          <span style={{ opacity: 0.5, textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          id="c-org"
          type="text"
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
          placeholder="Company, firm or institution"
          className="cf-input"
          style={input}
        />
      </div>
      <div style={field}>
        <label htmlFor="c-msg" style={label}>
          What you&rsquo;re facing
        </label>
        <textarea
          id="c-msg"
          rows={6}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="The decision, question or situation on your mind. As much or as little detail as you're comfortable with at this stage."
          className="cf-input"
          style={{ ...input, lineHeight: 1.6, resize: "vertical" }}
        />
      </div>
      {/* honeypot — hidden from real users */}
      <div style={{ display: "none" }}>
        <label htmlFor="c-website">Website</label>
        <input
          id="c-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <button
          type="submit"
          disabled={pending}
          className="btn-primary"
          style={{
            border: "none",
            padding: "16px 30px",
            fontFamily: "var(--font-sans),sans-serif",
            fontSize: 11,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            fontWeight: 600,
            cursor: pending ? "default" : "pointer",
            opacity: pending ? 0.6 : 1,
          }}
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <div style={{ fontSize: 13.5, opacity: 0.55, maxWidth: 260, lineHeight: 1.5 }}>
          Everything you write here is confidential. Not even my cat.
        </div>
      </div>
      {error && (
        <div style={{ fontSize: 13.5, color: "#6e222d", lineHeight: 1.5 }}>{error}</div>
      )}
    </form>
  );
}
