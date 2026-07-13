// Central site config — edit here, changes propagate everywhere.

// WhatsApp number (country code first, digits only, no "+").
export const WHATSAPP_NUMBER = "60122947847";

export const SITE_URL = "https://jpbcwebdesigns.com";
export const SITE_NAME = "JPBC Web Designs";
export const BUSINESS_EMAIL = "hello@jpbcwebdesigns.com"; // TODO: confirm email

export const DEFAULT_WA_MESSAGE =
  "Hi JPBC! I'm interested in a website for my business.";

/** Build a wa.me click-to-chat link with a pre-filled message. */
export function waLink(message: string = DEFAULT_WA_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Format a number as Malaysian Ringgit, e.g. rm(3500) → "RM3,500". */
export function rm(amount: number): string {
  return `RM${amount.toLocaleString("en-MY")}`;
}

/**
 * Malaysian mobile validation. Accepts +60 12-345 6789, 012-3456789,
 * 60123456789 etc. Normalise first, then test.
 */
export function isValidMalaysianPhone(raw: string): boolean {
  const digits = raw.replace(/[\s\-()+.]/g, "");
  // 01X-XXXXXXX(X) local format, or 601X... international format
  return /^(?:60|0)1\d{8,9}$/.test(digits);
}

/** Normalise a Malaysian phone number to +60 international format. */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/[\s\-()+.]/g, "");
  if (digits.startsWith("60")) return `+${digits}`;
  if (digits.startsWith("0")) return `+6${digits}`;
  return `+60${digits}`;
}
