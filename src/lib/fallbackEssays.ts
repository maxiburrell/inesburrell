/**
 * Placeholder essays shown until the real posts are migrated into Sanity.
 * Mirrors the v3c design data. Remove once migration (build plan phase 5)
 * is complete.
 */
export type EssayCard = {
  title: string;
  slug: string | null;
  category: string;
  date: string;
  readingTime: string;
  image: string;
  excerpt?: string;
};

export const fallbackEssays: EssayCard[] = [
  {
    title: "Has Reality Stopped Obeying Putin?",
    slug: null,
    category: "Russia",
    date: "3 July 2026",
    readingTime: "9 min",
    image: "/images/ph-essay-1.jpg",
    excerpt:
      "The Kremlin's narratives have always bent facts. The question now is whether the facts have stopped bending back.",
  },
  {
    title: "Don’t Watch the Russian Economy. Watch the Repressions.",
    slug: null,
    category: "Russia",
    date: "19 June 2026",
    readingTime: "7 min",
    image: "/images/ph-essay-2.jpg",
    excerpt:
      "GDP figures tell you what the regime wants you to see. The arrests tell you what it fears.",
  },
  {
    title: "A Short Course in Russian Diplomacy",
    slug: null,
    category: "Analysis",
    date: "5 June 2026",
    readingTime: "11 min",
    image: "/images/ph-essay-3.jpg",
    excerpt:
      "What negotiation means when one party treats the table as a battlefield.",
  },
  {
    title: "Public Humiliation Can Be Fatal for Aging Dictators",
    slug: null,
    category: "Russia",
    date: "22 May 2026",
    readingTime: "8 min",
    image: "/images/ph-essay-4.jpg",
    excerpt:
      "Authoritarian systems can absorb losses. What they cannot absorb is ridicule.",
  },
  {
    title: "Have Markets Decided to Ride Out the Oil Crisis of 2026?",
    slug: null,
    category: "Global Economy",
    date: "9 May 2026",
    readingTime: "6 min",
    image: "/images/ph-essay-5.jpg",
    excerpt:
      "Prices say calm. Positioning says something else entirely.",
  },
  {
    title: "The Parting of the Ways Across the Arab World",
    slug: null,
    category: "European Security",
    date: "24 April 2026",
    readingTime: "10 min",
    image: "/images/ph-essay-6.jpg",
    excerpt:
      "Old alignments are dissolving faster than new ones are forming.",
  },
];
