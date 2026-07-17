import type { Metadata } from "next";
import CalLink from "@/components/CalLink";

export const metadata: Metadata = {
  title: "Geopolitical Analyst — About Ines Burrell",
  description:
    "Ines Burrell is a geopolitical analyst and geopolitical risk analyst covering Russia, Western and Eastern Europe, Eurasia, and European security. Born in the Baltics, half a life lived in Western Europe.",
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

const background = [
  { k: "Education", v: "MA International Relations, University of Exeter" },
  { k: "Previously", v: "Journalist — reporting and analysis across Europe" },
  { k: "Published in", v: "Persuasion; weekly at Liminal Lines on Substack" },
  { k: "Commentary", v: "Live broadcast commentary on Russia and European security" },
];

const promises = [
  "The analysis you will receive will always be specific to your situation, never generic or recycled.",
  "I will ask a lot of questions. Your questions will become mine.",
  "If you have a problem I cannot solve, I will tell you without wasting your time.",
  "All your information is confidential. I will not discuss you or your operations with any third party. Not even my cat.",
  "I have good manners, but I will not lie to you.",
];

export default function AboutPage() {
  return (
    <>
      {/* header: portrait + intro */}
      <div
        className="m-grid1"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "clamp(56px,11vw,96px) clamp(24px,5vw,72px) 0",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(300px,420px)",
          gap: "min(80px,6vw)",
          alignItems: "end",
        }}
      >
        <div>
          <div style={eyebrow}>About</div>
          <h1
            style={{
              fontFamily: serif,
              fontSize: "min(72px,6vw)",
              lineHeight: 1.06,
              fontWeight: 400,
              margin: "26px 0 0",
              letterSpacing: "-.01em",
            }}
          >
            It takes one to <em>know one</em>.
          </h1>
          <div style={{ fontSize: 18, lineHeight: 1.75, opacity: 0.75, marginTop: 24, maxWidth: 560 }}>
            I am a geopolitical analyst and geopolitical risk advisor with deep expertise in Western and Eastern
            Europe, Eurasia, and global and European security.
          </div>
        </div>
        <div style={{ height: "min(520px,115vw)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/portrait-ines.jpg"
            alt="Portrait of Ines Burrell"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>

      {/* two europes */}
      <div
        className="m-grid1"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "clamp(60px,12vw,110px) clamp(24px,5vw,72px)",
          display: "grid",
          gridTemplateColumns: "280px minmax(0,1fr)",
          gap: "clamp(24px,5vw,72px)",
        }}
      >
        <div style={{ ...eyebrow, paddingTop: 8 }}>Two Europes</div>
        <div style={{ maxWidth: 680 }}>
          <div style={{ fontFamily: serif, fontSize: 32, lineHeight: 1.5, fontWeight: 400 }}>
            I understand Europe from the position of an Eastern European, because I was born in the Baltics — and a
            Western European, because this is where I have lived half my life. <em>They are not the same.</em>
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.8, opacity: 0.72, margin: "28px 0 0" }}>
            Eastern Europe reads its large neighbour out of necessity, and reads it well. Western Europe has the luxury
            of distance — and pays for it in surprise. My work sits between the two: the closeness of one, the
            analytical frame of the other. I speak five languages, and I have spent a career listening in all of them.
          </p>
        </div>
      </div>

      {/* credentials strip */}
      <div style={{ background: "#f1ebdf" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "clamp(52px,10vw,90px) clamp(24px,5vw,72px)" }}>
          <div
            className="m-grid1"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "0 40px" }}
          >
            {stats.map((s) => (
              <div key={s.n} style={{ borderTop: "1px solid rgba(34,29,24,.2)", paddingTop: 18 }}>
                <div style={{ fontFamily: serif, fontSize: "clamp(26px,4.33vw,52px)", lineHeight: 1, color: "#6e222d" }}>
                  {s.n}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.65, marginTop: 12, minWidth: 0 }}>{s.c}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* background */}
      <div
        className="m-grid1"
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "clamp(60px,12vw,110px) clamp(24px,5vw,72px)",
          display: "grid",
          gridTemplateColumns: "280px minmax(0,1fr)",
          gap: "clamp(24px,5vw,72px)",
        }}
      >
        <div>
          <div style={{ ...eyebrow, paddingTop: 8 }}>Background</div>
          <div style={{ height: "min(340px,50vw)", marginTop: 36 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ph-problem.jpg"
              alt="Archive detail"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
        <div style={{ maxWidth: 680 }}>
          {background.map((b) => (
            <div
              key={b.k}
              className="m-grid1"
              style={{
                borderBottom: "1px solid rgba(34,29,24,.16)",
                padding: "28px 0",
                display: "grid",
                gridTemplateColumns: "200px minmax(0,1fr)",
                gap: 40,
                alignItems: "baseline",
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, opacity: 0.55 }}>
                {b.k}
              </div>
              <div style={{ fontFamily: serif, fontSize: 22, lineHeight: 1.5 }}>{b.v}</div>
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
            padding: "clamp(60px,12vw,110px) clamp(24px,5vw,72px)",
            display: "grid",
            gridTemplateColumns: "280px minmax(0,1fr)",
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

      {/* CTA */}
      <div style={{ background: "#40161d", color: "#f8f4ec" }}>
        <div
          className="m-grid1"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "clamp(56px,11vw,100px) clamp(24px,5vw,72px)",
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) auto",
            gap: "clamp(24px,5vw,72px)",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontFamily: serif, fontSize: "clamp(22px,3.67vw,44px)", fontWeight: 400, lineHeight: 1.2, maxWidth: 760 }}>
              If your decision depends on understanding a faraway ground — <em>let&rsquo;s talk</em>.
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
    </>
  );
}
