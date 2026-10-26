import type { Market } from "@/config/markets/types";

// The website cost calculator (/website-cost-calculator, Malaysia only).
// JPBC's side comes from config/markets (never hardcoded here). The "typical
// quote" side is a low-high range built from published Malaysian price guides
// (checked 26 Oct 2026, sources below). Where the sources disagree we lean
// conservative: low ends are the cheapest freelancer figures we found, so the
// comparison never overstates the difference.

export type Range = [low: number, high: number];

export const typical = {
  /** Build of a site up to 5 pages; a 1-page site starts lower. */
  base: [1500, 8000] as Range,
  basePage1: [700, 3000] as Range,
  /** Each page beyond 5 */
  extraPage: [150, 1000] as Range,
  /** Translation per page, per extra language (translation only, no dev work) */
  translationPerPage: [40, 120] as Range,
  onlineStore: [1200, 8000] as Range,
  booking: [600, 2500] as Range,
  /** Usually bundled into SEO packages, so counted as zero (conservative). */
  googleBusinessProfile: [0, 0] as Range,
  localSeoMonthly: [1000, 3000] as Range,
  /** Hosting, domain and maintenance */
  careMonthly: [100, 500] as Range,
};

export const sources: { label: string; url: string }[] = [
  { label: "JPBC guide: freelancers RM1,500–6,000, agencies RM8,000 and up", url: "/blog/website-cost-malaysia" },
  { label: "Rebrand: template sites RM1,000–3,000, brochure sites RM2,000–5,000", url: "https://www.rebrand.com.my/web-design-pricing-malaysia-smes/" },
  { label: "Specflux: landing pages RM700–3,000, maintenance RM100–500+ a month, SEO from RM1,000 a month", url: "https://www.specflux.com/web-design/website-design-malaysia-price/" },
  { label: "Jumix Design: extra pages RM1,000 each", url: "https://jumixdesign.com/how-much-does-it-cost-to-design-a-website-in-malaysia/" },
  { label: "iSalesAI calculator: extra pages about RM150 each, online store +RM1,200, booking +RM600", url: "https://isalesai.com.my/website-cost-calculator" },
  { label: "ZenWeb: booking pages RM800–2,500 each, a store adds RM2,000–8,000", url: "https://zenweb.my/services/web-design/pricing/" },
  { label: "USM translation rates: RM100–120 per web page", url: "https://ppblt.usm.my/index.php/services/translation-and-editing" },
  { label: "UMP translation rates: RM37.50–50 per page", url: "https://pbm.ump.edu.my/index.php/students-info/translation-editing" },
];

export type Choices = {
  pages: number;
  languages: number;
  store: boolean;
  booking: boolean;
  gbp: boolean;
  seo: boolean;
};

export type Estimate = { upfront: number; monthly: number };
export type RangeEstimate = { upfront: Range; monthly: Range };

const INCLUDED_PAGES = 5;

export function jpbcEstimates(m: Market, c: Choices): { monthlyPlan: Estimate; lumpSum: Estimate } {
  const a = m.pricing.addons;
  const extras =
    Math.max(0, c.pages - INCLUDED_PAGES) * a.extraPage +
    (c.store ? a.onlineStoreFrom ?? 0 : 0) +
    (c.booking ? a.bookingFrom ?? 0 : 0) +
    (c.gbp ? a.googleBusinessProfile : 0);
  const seo = c.seo ? a.localSeoMonthly : 0;
  return {
    monthlyPlan: { upfront: m.pricing.setup + extras, monthly: m.pricing.monthly + seo },
    lumpSum: { upfront: m.pricing.lumpSum + extras, monthly: m.pricing.lumpSumCare + seo },
  };
}

export function marketEstimate(c: Choices): RangeEstimate {
  const add = (r: Range, n = 1): Range => [r[0] * n, r[1] * n];
  const parts: Range[] = [
    c.pages <= 1 ? typical.basePage1 : typical.base,
    add(typical.extraPage, Math.max(0, c.pages - INCLUDED_PAGES)),
    add(typical.translationPerPage, c.pages * (c.languages - 1)),
  ];
  if (c.store) parts.push(typical.onlineStore);
  if (c.booking) parts.push(typical.booking);
  if (c.gbp) parts.push(typical.googleBusinessProfile);
  const upfront = parts.reduce<Range>((s, r) => [s[0] + r[0], s[1] + r[1]], [0, 0]);
  const monthly: Range = c.seo
    ? [typical.careMonthly[0] + typical.localSeoMonthly[0], typical.careMonthly[1] + typical.localSeoMonthly[1]]
    : typical.careMonthly;
  return { upfront, monthly };
}

/** Total paid over the first n months. */
export const totalOver = (e: Estimate, months: number) => e.upfront + e.monthly * months;
export const rangeOver = (e: RangeEstimate, months: number): Range => [
  e.upfront[0] + e.monthly[0] * months,
  e.upfront[1] + e.monthly[1] * months,
];
