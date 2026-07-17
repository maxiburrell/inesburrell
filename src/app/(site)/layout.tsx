import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CalScript from "@/components/CalScript";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inesburrell.com";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ines Burrell",
  url: SITE_URL,
  jobTitle: "Geopolitical analyst and advisor",
  knowsLanguage: ["en", "lv", "ru", "pt", "uk"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Exeter" },
  sameAs: ["https://inesburrell.substack.com"],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ines Burrell — Geopolitical Advisory",
  url: SITE_URL,
  description:
    "Bespoke geopolitical advisory and political risk consulting: written reports, strategic advisory and ongoing monitoring. Specialism in Russia, Eastern Europe and Eurasia.",
  founder: { "@type": "Person", name: "Ines Burrell" },
  areaServed: "Europe",
  email: "info@inesburrell.com",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CalScript />
      <Nav />
      <main>{children}</main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
