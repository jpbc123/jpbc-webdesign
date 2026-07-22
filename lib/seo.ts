import type { Metadata } from "next";
import type { Market, PageKey } from "@/config/markets/types";
import { defaultMarket, enabledMarkets } from "@/config/markets";
import { mpath } from "./market";

// Per-market SEO plumbing: canonicals, hreflang alternates, and the noindex
// flag that keeps a soft-launched market out of the index.

/**
 * hreflang map for a page that exists in every market. Disabled markets are
 * left out — we never point hreflang at a noindex page. x-default goes to the
 * default market (Malaysia).
 */
function alternateLanguages(basePath: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const market of enabledMarkets) {
    languages[market.locale] = mpath(market, basePath);
  }
  languages["x-default"] = mpath(defaultMarket, basePath);
  return languages;
}

/** Soft-launched markets build, but stay out of search results. */
export function marketRobots(market: Market): Metadata["robots"] {
  return market.enabled ? undefined : { index: false, follow: false };
}

/**
 * Metadata for one of the shared pages.
 * `basePath` is the unprefixed path, e.g. "/pricing" (use "/" for the home page).
 */
export function marketMetadata(market: Market, page: PageKey, basePath: string): Metadata {
  const { title, description } = market.meta[page];
  return {
    title,
    description,
    alternates: {
      canonical: mpath(market, basePath),
      languages: alternateLanguages(basePath),
    },
    robots: marketRobots(market),
  };
}
