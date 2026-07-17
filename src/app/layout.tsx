import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted variable fonts (Newsreader + Source Sans 3, latin subset),
// downloaded from Google Fonts — keeps builds independent of fonts.googleapis.com.
const newsreader = localFont({
  variable: "--font-serif",
  src: [
    { path: "../fonts/newsreader-normal-latin.woff2", weight: "300 500", style: "normal" },
    { path: "../fonts/newsreader-italic-latin.woff2", weight: "300 500", style: "italic" },
  ],
  display: "swap",
});

const sourceSans = localFont({
  variable: "--font-sans",
  src: [
    { path: "../fonts/sourcesans-normal-latin.woff2", weight: "400 600", style: "normal" },
    { path: "../fonts/sourcesans-italic-latin.woff2", weight: "400 600", style: "italic" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://inesburrell.com"),
  title: {
    default: "Ines Burrell — Geopolitical Advisory",
    template: "%s | Ines Burrell — Geopolitical Advisory",
  },
  description:
    "Bespoke geopolitical advisory and political risk consulting. Russia, Eastern Europe and Eurasia expertise for businesses and organisations navigating global uncertainty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${sourceSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
