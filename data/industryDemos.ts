// Live industry demo sites shown in the "Websites by Industry" section on
// /work. These are OUR demo builds, not client projects — keep them out of
// the portfolio grid so the "every project is live client work" claim stays
// honest. Add a new industry here and the section picks it up automatically.

import type { Market, MarketCode } from "@/config/markets/types";

export type IndustryDemo = {
  slug: string;
  name: string;
  /** Live demo site URL — cards open this in a new tab */
  url: string;
  /** Default (market-neutral) wording */
  blurb: string;
  /** Overrides where a market says it differently */
  blurbByMarket?: Partial<Record<MarketCode, string>>;
};

export const industryDemos: IndustryDemo[] = [
  {
    slug: "construction",
    name: "Construction",
    url: "https://construction.jpbcwebdesigns.com/demo",
    blurb: "Project-focused sites for builders and contractors — services, past work, and WhatsApp quote requests front and centre.",
  },
  {
    slug: "fitness",
    name: "Gyms & Fitness",
    url: "https://fitness.jpbcwebdesigns.com",
    blurb: "High-energy sites for gyms and martial arts academies — schedule, classes, and free-trial funnel built in.",
  },
];

/** The demo list with each blurb written for the active market. */
export function industryDemosFor(market: Market): IndustryDemo[] {
  return industryDemos.map((demo) => ({
    ...demo,
    blurb: demo.blurbByMarket?.[market.code] ?? demo.blurb,
  }));
}
