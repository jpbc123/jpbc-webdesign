// Site-wide config — things that are true no matter which market you're in.
// Anything that varies by market (prices, WhatsApp number, email, currency,
// service area, copy) lives in config/markets/ instead.

export const SITE_URL = "https://jpbcwebdesigns.com";
export const SITE_NAME = "JPBC Web Designs";

/** Absolute URL for a root-relative path, e.g. "/ph/pricing". */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/**
 * Stable schema.org @id for the business itself. The home page declares it;
 * location and service pages point at it as `provider`, so Google sees one
 * business rather than a new one per page.
 */
export const BUSINESS_ID = `${SITE_URL}/#business`;
