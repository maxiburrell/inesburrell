import type { Metadata } from "next";
import Link from "next/link";
import CalLink from "@/components/CalLink";
import FaqAccordion, { type Faq } from "@/components/FaqAccordion";
import { getRecentEssays } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Political Risk Consulting & Geopolitical Advisory | Ines Burrell",
  description:
    "Political risk consulting and geopolitical risk advisory for businesses and organisations. Russia, Eastern Europe and Eurasia expertise. Direct access to the analyst — book a call.",
};

const eyebrow: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: ".26em",
  textTransform: "uppercase",
  color: "#6e222d",
  fontWeight: 600,
};

const serif = "var(--font-serif),serif";

const stats = [
  { n: "5", c: "Languages — English, Latvian, Russian, Portuguese, working Ukrainian" },
  { n: "2", c: "Europes — born in the Baltics, half a life lived in Western Europe" },
  { n: "MA", c: "International Relations, University of Exeter" },
  { n: "Live", c: "Published in Persuasion · live broadcast commentary" },
];

const services = [
  {
    n: "01",
    t: "Written reports",
    d: "Analysis of current, past and possible future events in a country, region or group of countries, tailored to your goals — sanctions advisory, due diligence, risk assessment, market entry and exit.",
  },
  {
    n: "02",
    t: "Strategic advisory",
    d: "In-person or remote sessions where we discuss your goals and find solutions that depend on timely understanding of the geopolitical landscape.",
  },
  {
    n: "03",
    t: "Ongoing reports",
    d: "Assessing changes and monitoring situations in specific regions or countries as they develop.",
  },
];

const process = [
  { n: "01", t: "Get in touch", body: <>Use the <Link href="/contact" style={{ color: "#6e222d", textDecoration: "underline" }}>contact form</Link>, or book a call directly.</> },
  { n: "02", t: "We talk", body: <>We discuss your needs and your goals.</> },
  { n: "03", t: "Proposal", body: <>You receive a proposal: deliverables, timeline, fee.</> },
  { n: "04", t: "Follow-up", body: <>After delivery, a follow-up call — findings, next steps, future needs.</> },
];

const promises = [
  "The analysis you will receive will always be specific to your situation, never generic or recycled.",
  "I will ask a lot of questions. Your questions will become mine.",
  "If you have a problem I cannot solve, I will tell you without wasting your time.",
  "All your information is confidential. I will not discuss you or your operations with any third party. Not even my cat.",
  "I have good manners, but I will not lie to you.",
];

const faqs: Faq[] = [
  {
    q: "What does geopolitical advisory actually involve?",
    a: "Geopolitical advisory is the analysis of political environments outside your country — how governments, conflicts, elections, sanctions and international relationships interact, and what that means for your specific business decisions. Unlike news coverage, it is targeted analysis built to answer your specific problem or question.",
  },
  {
    q: "How is a geopolitical analyst different from a general consultant?",
    a: "A general consultant looks at your organisation — its structure, strategy, and operations. A geopolitical analyst looks at the political environment your organisation operates in, and tells you how that environment can or will affect your business.",
  },
  {
    q: "How is this different from just following the news?",
    a: "The news tells you what happened. Geopolitical analysis tells you why it happened, what it means for your specific situation, and where it is likely to go next.",
  },
  {
    q: "Do I work directly with you or with a team?",
    a: "You work directly with me. I am a one-person operation. The analyst you hire is the analyst who does the work.",
  },
  {
    q: "How do you handle confidentiality?",
    a: "Everything you share with me stays with me. I will not discuss you, your organisation, or your operations with any third party. Not even my cat. I am happy to sign your confidentiality agreement.",
  },
];

export default async function HomePage() {
  const essays = await getRecentEssays();

  return (
    <>
      {/* hero */}
      <div
        className="m-grid1"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "clamp(56px,11vw,96px) clamp(24px,5vw,72px) 0",
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "clamp(24px,5vw,72px)",
          alignItems: "end",
        }}
      >
        <div>
          <div style={eyebrow}>Geopolitical advisory — Russia · Eastern Europe · Eurasia</div>
          <h1
            style={{
              fontFamily: serif,
              fontSize: "min(86px,7vw)",
              lineHeight: 1.04,
              fontWeight: 400,
              margin: "26px 0 0",
              letterSpacing: "-.01em",
            }}
          >
            Geopolitical <em>advisory</em> for decisions that <em>can&rsquo;t wait</em>.
          </h1>
        </div>
        <div style={{ borderLeft: "1px solid rgba(34,29,24,.2)", padding: "0 0 8px 28px" }}>
          <div style={{ fontSize: 17, lineHeight: 1.65, opacity: 0.75 }}>
            Somebody who understands the global political environment just as well as you understand your business.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 26, alignItems: "flex-start" }}>
            <CalLink
              className="btn-primary"
              style={{
                display: "inline-block",
                padding: "14px 24px",
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Book a consultation
            </CalLink>
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
              Read the analysis →
            </Link>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1440, margin: "72px auto 0", padding: "0 clamp(24px,5vw,72px)" }}>
        <div style={{ height: "min(420px,58vw)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ph-hero-wide.jpg"
            alt="European architecture, warm duotone"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>

      {/* problem narrative */}
      <div
        className="m-grid1"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "clamp(64px,13vw,120px) clamp(24px,5vw,72px)",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "clamp(24px,5vw,72px)",
        }}
      >
        <div>
          <div style={{ ...eyebrow, paddingTop: 8 }}>The problem</div>
          <div style={{ height: "min(360px,52vw)", marginTop: 36 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ph-problem.jpg"
              alt="Archive detail"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
        <div style={{ maxWidth: 820 }}>
          <div style={{ fontFamily: serif, fontSize: 32, lineHeight: 1.5, fontWeight: 400 }}>
            You have a business to run. You do not have time to become a <em>geopolitical analyst</em> in addition to
            that.
          </div>
          <div style={{ fontSize: 18, lineHeight: 1.75, opacity: 0.72, marginTop: 28, maxWidth: 660 }}>
            An expansion into a new country. An election that will re-price a market. A war moving closer to the
            European Union. Or no foreign links at all — and your industry is dragged into the global turmoil anyway.
            You are uncertain how geopolitical events will affect your business, and events change too quickly to
            follow to the extent an informed decision needs.
          </div>
          <div style={{ fontFamily: serif, fontSize: 26, lineHeight: 1.45, marginTop: 32 }}>
            What you need is a <em>geopolitical advisory</em> service.
          </div>
          <a
            href="#services"
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
              marginTop: 26,
            }}
          >
            Three ways of working together ↓
          </a>
        </div>
      </div>

      {/* about + stats */}
      <div id="about" style={{ background: "#f1ebdf" }}>
        <div
          className="m-grid1"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "clamp(64px,13vw,120px) clamp(24px,5vw,72px)",
            display: "grid",
            gridTemplateColumns: "minmax(280px,420px) minmax(0,1fr)",
            gap: "min(80px,6vw)",
            alignItems: "start",
          }}
        >
          <div style={{ height: "min(500px,115vw)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portrait-ines.jpg"
              alt="Portrait of Ines Burrell"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div>
            <div style={eyebrow}>In this case, the expert is me</div>
            <div
              style={{
                fontFamily: serif,
                fontSize: "clamp(21px,3.5vw,42px)",
                lineHeight: 1.2,
                fontWeight: 400,
                marginTop: 20,
                maxWidth: 680,
              }}
            >
              Born in the Baltics, half a life in Western Europe. They are not the same. <em>It takes one to know one.</em>
            </div>
            <div
              className="m-grid1"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                gap: "0 40px",
                marginTop: 44,
                borderTop: "1px solid rgba(34,29,24,.16)",
              }}
            >
              {stats.map((s) => (
                <div
                  key={s.n}
                  style={{
                    display: "flex",
                    gap: 18,
                    alignItems: "baseline",
                    borderBottom: "1px solid rgba(34,29,24,.16)",
                    padding: "18px 0",
                  }}
                >
                  <div style={{ fontFamily: serif, fontSize: "clamp(21px,3.5vw,42px)", lineHeight: 1, color: "#6e222d", minWidth: 70 }}>
                    {s.n}
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.65, minWidth: 0 }}>{s.c}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* writing carousel */}
      <div id="writing" style={{ background: "#f8f4ec" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "clamp(64px,13vw,120px) 0 100px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 48,
              padding: "0 clamp(24px,5vw,72px)",
            }}
          >
            <div>
              <div style={eyebrow}>Writing &amp; commentary</div>
              <div
                style={{
                  fontFamily: serif,
                  fontSize: "clamp(25px,4.17vw,50px)",
                  fontWeight: 400,
                  marginTop: 18,
                  lineHeight: 1.12,
                  maxWidth: 700,
                }}
              >
                Published author. <em>Live commentator.</em> Weekly analyst.
              </div>
            </div>
            <Link
              href="/writing"
              className="hover-dim"
              style={{
                flex: "none",
                display: "inline-block",
                color: "#6e222d",
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "1px solid #6e222d",
                paddingBottom: 3,
                marginBottom: 8,
              }}
            >
              All essays →
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              overflowX: "auto",
              padding: "52px clamp(24px,5vw,72px) 8px",
              scrollSnapType: "x mandatory",
            }}
          >
            <div
              style={{
                flex: "none",
                width: 360,
                scrollSnapAlign: "start",
                background: "#40161d",
                color: "#f8f4ec",
                padding: "40px 36px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", opacity: 0.6, fontWeight: 600 }}>
                  As published in
                </div>
                <div style={{ fontFamily: serif, fontSize: "clamp(22px,3.67vw,44px)", fontStyle: "italic", marginTop: 14 }}>
                  Persuasion
                </div>
              </div>
              <div>
                <div style={{ fontSize: 15, lineHeight: 1.65, opacity: 0.75 }}>
                  Essays on Russia, European security and the politics of the in-between — for an international
                  readership.
                </div>
                <a
                  href="https://www.persuasion.community"
                  target="_blank"
                  rel="noopener"
                  className="underline-cream"
                  style={{
                    display: "inline-block",
                    color: "#f8f4ec",
                    fontSize: 11,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    textDecoration: "none",
                    paddingBottom: 3,
                    marginTop: 20,
                  }}
                >
                  Read in Persuasion →
                </a>
              </div>
            </div>
            {essays.map((e) => (
              <Link
                key={e.title}
                href={`/writing/${e.slug}`}
                className="card-hover"
                style={{
                  flex: "none",
                  width: 340,
                  scrollSnapAlign: "start",
                  background: "#fff",
                  border: "1px solid rgba(34,29,24,.14)",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  color: "#221d18",
                }}
              >
                <div style={{ height: 190 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={e.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "22px 26px 24px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                  <div style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "#6e222d", fontWeight: 600 }}>
                    {e.category}
                  </div>
                  <div style={{ fontFamily: serif, fontSize: 25, lineHeight: 1.25 }}>{e.title}</div>
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
      </div>

      {/* services */}
      <div
        id="services"
        style={{ maxWidth: 1440, margin: "0 auto", padding: "clamp(64px,13vw,120px) clamp(24px,5vw,72px) clamp(24px,5vw,60px)" }}
      >
        <div style={eyebrow}>Commissioned formats</div>
        <div style={{ fontFamily: serif, fontSize: "clamp(26px,4.33vw,52px)", fontWeight: 400, marginTop: 18 }}>
          Three ways of <em>working</em> together
        </div>
        <div style={{ marginTop: 48 }}>
          {services.map((sv) => (
            <div
              key={sv.n}
              className="m-grid1"
              style={{
                display: "grid",
                gridTemplateColumns: "90px 340px 1fr",
                gap: 40,
                alignItems: "baseline",
                borderTop: "1px solid rgba(34,29,24,.16)",
                padding: "34px 0",
              }}
            >
              <div style={{ fontFamily: serif, fontSize: 22, color: "#6e222d" }}>{sv.n}</div>
              <div style={{ fontFamily: serif, fontSize: 31, fontWeight: 400 }}>{sv.t}</div>
              <div style={{ fontSize: 16.5, lineHeight: 1.7, opacity: 0.7, maxWidth: 560 }}>{sv.d}</div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(34,29,24,.16)" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 44, flexWrap: "wrap" }}>
          <CalLink
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
            Book a call
          </CalLink>
          <div style={{ fontFamily: serif, fontSize: 19, fontStyle: "italic", opacity: 0.7 }}>
            Not sure which format fits? A 15-minute call sorts it out.
          </div>
        </div>
      </div>

      {/* process */}
      <div
        className="m-grid1"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "clamp(24px,5vw,60px) clamp(24px,5vw,72px) 120px",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "clamp(24px,5vw,72px)",
        }}
      >
        <div>
          <div style={eyebrow}>How the service works</div>
          <div style={{ fontFamily: serif, fontSize: "clamp(19px,3.17vw,38px)", fontWeight: 400, marginTop: 16, lineHeight: 1.15 }}>
            Four steps, no theatre.
          </div>
        </div>
        <div
          className="m-grid1"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
            background: "rgba(34,29,24,.16)",
            border: "1px solid rgba(34,29,24,.16)",
          }}
        >
          {process.map((p) => (
            <div key={p.n} style={{ background: "#f8f4ec", padding: 32 }}>
              <div style={{ fontFamily: serif, fontSize: 19, color: "#6e222d" }}>{p.n}</div>
              <div style={{ fontFamily: serif, fontSize: 25, marginTop: 10 }}>{p.t}</div>
              <div style={{ fontSize: 15.5, lineHeight: 1.65, opacity: 0.68, marginTop: 8 }}>{p.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* promises */}
      <div style={{ background: "#f1ebdf" }}>
        <div
          className="m-grid1"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "clamp(64px,13vw,120px) clamp(24px,5vw,72px)",
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "clamp(24px,5vw,72px)",
          }}
        >
          <div>
            <div style={{ fontFamily: serif, fontSize: "clamp(75px,12.5vw,150px)", lineHeight: 0.6, color: "#6e222d", opacity: 0.85 }}>
              &ldquo;
            </div>
            <div style={{ fontFamily: serif, fontSize: "clamp(19px,3.17vw,38px)", fontWeight: 400, marginTop: 34, lineHeight: 1.15 }}>
              My promises to <em>you</em>
            </div>
          </div>
          <div style={{ maxWidth: 760 }}>
            {promises.map((pr) => (
              <div key={pr.slice(0, 24)} style={{ borderBottom: "1px solid rgba(34,29,24,.16)", padding: "24px 0" }}>
                <div style={{ fontFamily: serif, fontSize: 23, lineHeight: 1.55, fontStyle: "italic" }}>{pr}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div
        id="faq"
        className="m-grid1"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "clamp(64px,13vw,120px) clamp(24px,5vw,72px)",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "clamp(24px,5vw,72px)",
        }}
      >
        <div style={eyebrow}>Questions</div>
        <div style={{ maxWidth: 760 }}>
          <FaqAccordion faqs={faqs} />
          <div style={{ fontFamily: serif, fontSize: 19, fontStyle: "italic", opacity: 0.75, marginTop: 28 }}>
            A question I haven&rsquo;t answered?{" "}
            <Link href="/contact" style={{ color: "#6e222d", fontStyle: "normal" }}>
              Ask me directly →
            </Link>
          </div>
        </div>
      </div>

      {/* CTA band */}
      <div style={{ background: "#40161d", color: "#f8f4ec" }}>
        <div
          className="m-grid1"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "clamp(60px,12vw,110px) clamp(24px,5vw,72px)",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(24px,5vw,72px)",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontFamily: serif, fontSize: "clamp(23px,3.83vw,46px)", fontWeight: 400, lineHeight: 1.2, maxWidth: 760 }}>
              This is a dangerous time to be struck by <em>indecision</em>.
            </div>
            <div style={{ fontSize: 17.5, opacity: 0.7, marginTop: 16, maxWidth: 520, lineHeight: 1.65 }}>
              Expert advice can save you many sleepless nights and wrong turns.
            </div>
          </div>
          <CalLink
            className="btn-cream"
            style={{
              flex: "none",
              display: "inline-block",
              padding: "18px 36px",
              fontSize: 11.5,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Book a call
          </CalLink>
        </div>
      </div>

      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
