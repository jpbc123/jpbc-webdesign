// Site-wide config — things that are true no matter which market you're in.
// Anything that varies by market (prices, WhatsApp number, email, currency,
// service area, copy) lives in config/markets/ instead.

export const SITE_URL = "https://jpbcwebdesigns.com";
export const SITE_NAME = "JPBC Web Designs";

/** Absolute URL for a root-relative path, e.g. "/ph/pricing". */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}
