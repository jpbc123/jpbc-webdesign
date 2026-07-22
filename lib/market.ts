// Behaviour that belongs with a market but can't live inside the config
// (which has to stay plain, serializable data so server components can pass a
// market straight into client components).

import type { Market } from "@/config/markets/types";

/** Format an amount in the market's currency, e.g. price(my, 3500) → "RM3,500". */
export function price(market: Market, amount: number): string {
  return `${market.currency.symbol}${amount.toLocaleString(market.currency.numberLocale)}`;
}

/** Prefix a root-relative path with the market's prefix: "/pricing" → "/ph/pricing". */
export function mpath(market: Market, path: string): string {
  if (path === "/") return market.pathPrefix || "/";
  return `${market.pathPrefix}${path}`;
}

/** Build a wa.me click-to-chat link to the market's number, with a pre-filled message. */
export function waLink(market: Market, message?: string): string {
  const text = message ?? market.voice.waDefaultMessage;
  return `https://wa.me/${market.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Strip formatting characters so a typed number can be pattern-matched. */
function digitsOnly(raw: string): string {
  return raw.replace(/[\s\-()+.]/g, "");
}

/** Validate a phone number against the active market's rule. */
export function isValidPhone(market: Market, raw: string): boolean {
  return new RegExp(market.phone.pattern).test(digitsOnly(raw));
}

/** Normalise a phone number to international format, e.g. "012-345 6789" → "+60123456789". */
export function normalisePhone(market: Market, raw: string): string {
  const digits = digitsOnly(raw);
  const { dialCode } = market.phone;
  if (digits.startsWith(dialCode)) return `+${digits}`;
  if (digits.startsWith("0")) return `+${dialCode}${digits.slice(1)}`;
  return `+${dialCode}${digits}`;
}

/** Substitute {business} into a template string. */
export function fillBusiness(template: string, business: string): string {
  return template.replace(/\{business\}/g, business);
}

/**
 * Price tokens available inside market copy. Resolved once at load time
 * (see config/markets/index.ts) so a change in `pricing` flows through every
 * sentence, meta description, and FAQ answer in that market.
 */
function tokensFor(market: Market): Record<string, string> {
  const { pricing } = market;
  return {
    monthly: price(market, pricing.monthly),
    setup: price(market, pricing.setup),
    lumpSum: price(market, pricing.lumpSum),
    care: price(market, pricing.lumpSumCare),
    extraPage: price(market, pricing.addons.extraPage),
    gbp: price(market, pricing.addons.googleBusinessProfile),
    seoMonthly: price(market, pricing.addons.localSeoMonthly),
    minMonths: String(pricing.minimumMonths),
    serviceArea: market.contact.serviceArea,
    market: market.label,
  };
}

function fillDeep<T>(value: T, tokens: Record<string, string>): T {
  if (typeof value === "string") {
    return value.replace(/\{(\w+)\}/g, (match, key: string) =>
      key in tokens ? tokens[key] : match
    ) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => fillDeep(item, tokens)) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) out[key] = fillDeep(val, tokens);
    return out as T;
  }
  return value;
}

/** Return a copy of the market with every price token in its copy resolved. */
export function resolveMarketTokens(market: Market): Market {
  return fillDeep(market, tokensFor(market));
}
