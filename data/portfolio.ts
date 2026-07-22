// All items are real, launched projects. Add new client projects here as
// they launch — each item drives a card on /work and the home page
// portfolio grid. Screenshots live in /public/work/<slug>.jpg.
//
// Which items a market shows is set by `workExamples.portfolioSlugs` in
// config/markets/<code>.ts.

import type { Market } from "@/config/markets/types";

export type PortfolioItem = {
  slug: string;
  name: string;
  industry: string;
  /** Filter category on /work */
  category: "apps" | "lifestyle" | "services" | "food" | "health" | "education";
  location: string;
  /** Live site URL — renders a "Visit site" link on the case card */
  url?: string;
  /** Measured mobile load time; omit to hide the badge until measured */
  loadTime?: string;
  /** One-line summary shown on the card */
  blurb: string;
  /** "What we built" bullets for the case card */
  built: string[];
  /** Before → after story for the case card */
  beforeAfter: { before: string; after: string };
  /** Screenshot of the live site, shown as the card thumbnail */
  image?: string;
  /** Tailwind gradient classes for the fallback visual when no screenshot yet */
  gradient: string;
};

export const portfolio: PortfolioItem[] = [
  {
    slug: "swift-audit",
    name: "Swift Audit",
    industry: "Audit / Fintech",
    category: "apps",
    location: "Malaysia",
    url: "https://myswiftaudit.com",
    // TODO: add measured mobile load time (loadTime: "0.Xs")
    blurb: "Web app that automates financial audit report preparation for Malaysian firms.",
    built: [
      "Brand-new build — designed and developed from zero, not a redesign",
      "Automates the preparation of financial audit reports to Malaysian requirements",
      "Full web application, not a brochure site: data in, formatted report out",
    ],
    beforeAfter: {
      before: "Audit reports drafted by hand — repetitive, slow, and easy to get wrong.",
      after: "Enter the engagement figures and the app generates the formatted report — drafting time cut from hours to minutes.",
    },
    image: "/work/swift-audit.jpg",
    gradient: "from-indigo-500 to-blue-800",
  },
  {
    slug: "fengshui-and-beyond",
    name: "Feng Shui & Beyond",
    industry: "Lifestyle / Infotainment",
    category: "lifestyle",
    location: "Online",
    url: "https://fengshuiandbeyond.com",
    // TODO: add measured mobile load time (loadTime: "0.Xs")
    blurb: "Infotainment portal with daily horoscopes, articles, and feng shui calculators.",
    built: [
      "Daily Chinese and Western horoscope lookup",
      "Feng shui calculators: Kua number, personal element, and Visiber",
      "Article section for feng shui and astrology content",
    ],
    beforeAfter: {
      before: "Horoscope and feng shui content scattered across the web, mostly in clunky old sites.",
      after: "One clean portal where readers check their daily horoscope and run their own calculations — built to keep them coming back.",
    },
    image: "/work/fengshui-and-beyond.jpg",
    gradient: "from-red-500 to-amber-600",
  },
  {
    slug: "setia-alam-garden-services",
    name: "Setia Alam Garden Services",
    industry: "Landscaping / Home Services",
    category: "services",
    location: "Setia Alam, Shah Alam",
    url: "https://setiaalamgardenservices.com",
    // TODO: add measured mobile load time (loadTime: "0.Xs")
    blurb: "Local-first site for garden maintenance and landscaping around Setia Alam.",
    built: [
      "Dedicated service pages: garden maintenance, landscaping, artificial grass, and tree care",
      "Area coverage for Setia Alam, Alam Impian, Bukit Raja, and Eco Ardence",
      "WhatsApp quote flow and click-to-call, with bilingual (EN/BM) copy for local search",
    ],
    beforeAfter: {
      before: "No web presence — homeowners searching for garden services in Setia Alam couldn't find them.",
      after: "A page for every service and area they cover, with quote requests arriving straight on WhatsApp.",
    },
    image: "/work/setia-alam-garden-services.jpg",
    gradient: "from-green-500 to-emerald-700",
  },
];

export const portfolioCategories = [
  { key: "all", label: "All" },
  { key: "apps", label: "Web Apps" },
  { key: "lifestyle", label: "Lifestyle & Media" },
  { key: "services", label: "Services & Trades" },
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

/** The client work a market shows, in the order listed in its config. */
export function portfolioFor(market: Market): PortfolioItem[] {
  return market.workExamples.portfolioSlugs
    .map((slug) => portfolio.find((p) => p.slug === slug))
    .filter((item): item is PortfolioItem => Boolean(item));
}

/** Only the filter buttons that have work behind them. */
export function categoriesFor(items: PortfolioItem[]): PortfolioCategory[] {
  return portfolioCategories.filter(
    (c) => c.key === "all" || items.some((item) => item.category === c.key)
  );
}
