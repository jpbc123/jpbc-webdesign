import { resolveMarketTokens } from "@/lib/market";
import type { Market, MarketCode } from "./types";
import { my } from "./my";
import { ph } from "./ph";
import { au } from "./au";

export type { Market, MarketCode, PageKey } from "./types";

/**
 * The market layer.
 *
 * ADDING A MARKET
 *   1. Copy config/markets/ph.ts to <code>.ts, set `code`, `pathPrefix`
 *      ("/sg"), currency, its own prices, contact details, and copy.
 *   2. Add it to `markets` below and to MarketCode in types.ts.
 *   3. That's it — routing (/sg/...), the switcher, hreflang, and the sitemap
 *      all read from this registry. Start it with `enabled: false`.
 *
 * CHANGING A MARKET'S PRICING
 *   Edit that market's `pricing` block. Copy uses {monthly}, {setup},
 *   {lumpSum}, {care}, {extraPage}, {gbp}, {seoMonthly}, {minMonths} tokens,
 *   so prices propagate to every page, meta description, and FAQ answer.
 *
 * LAUNCHING A DISABLED MARKET
 *   Set `enabled: true` in its config. It then appears in the footer switcher,
 *   enters the sitemap and hreflang alternates, and stops rendering noindex.
 */
export const markets: Record<MarketCode, Market> = {
  my: resolveMarketTokens(my),
  ph: resolveMarketTokens(ph),
  au: resolveMarketTokens(au),
};

/** The market served from the root, with no path prefix. */
export const DEFAULT_MARKET_CODE: MarketCode = "my";

export const defaultMarket = markets[DEFAULT_MARKET_CODE];

export const allMarkets: Market[] = Object.values(markets);

/** Markets a visitor can reach — disabled ones stay unlinked. */
export const enabledMarkets: Market[] = allMarkets.filter((m) => m.enabled);

/** Markets that live under a path prefix, i.e. everything but the default. */
export const prefixedMarkets: Market[] = allMarkets.filter((m) => m.code !== DEFAULT_MARKET_CODE);

/**
 * The pages every market has. MY serves them at the root, other markets under
 * their prefix (see app/[market]/). Sitemap, hreflang, and the market switcher
 * all work off this list.
 */
export const SHARED_PAGE_PATHS = [
  "/",
  "/pricing",
  "/work",
  "/about",
  "/faq",
  "/blog",
  "/contact",
  "/get-started",
] as const;

export function getMarket(code: MarketCode): Market {
  return markets[code];
}

/** Resolve a /[market] route param. Returns undefined for unknown segments. */
export function resolveMarket(param: string): Market | undefined {
  return prefixedMarkets.find((m) => m.code === param);
}

/** Route params for the prefixed markets — used by generateStaticParams. */
export function marketParams(): { market: MarketCode }[] {
  return prefixedMarkets.map((m) => ({ market: m.code }));
}
