// Shape of a market. Every market-specific value on the site lives in one of
// these objects — components never hardcode a price, phone number, currency,
// or country reference.
//
// IMPORTANT: a Market must stay plain, serializable data (no functions, no
// RegExp). Server layouts pass the active market straight into client
// components as props, which is how the client bundle stays free of any
// build-time env vars. Formatting/behaviour helpers live in lib/market.ts.
//
// Any string below may contain price tokens — {monthly}, {setup}, {lumpSum},
// {care}, {extraPage}, {gbp}, {seoMonthly}, {minMonths} — which are resolved
// once when the market is loaded (see config/markets/index.ts). That way a
// price change in `pricing` propagates through every sentence on the site.

export type MarketCode = "my" | "ph" | "au";

export type MetaEntry = { title: string; description: string };

/** Page keys that exist in every market (the shared top-level pages). */
export type PageKey =
  | "home"
  | "pricing"
  | "work"
  | "about"
  | "faq"
  | "blog"
  | "contact"
  | "getStarted";

export type Market = {
  code: MarketCode;
  /** Human label for the market switcher, e.g. "Malaysia" */
  label: string;
  flag: string;
  /** BCP-47 tag used for hreflang */
  locale: string;
  /** Underscored form used by Open Graph */
  ogLocale: string;
  /** URL prefix — "" for the default market at the root, else "/ph", "/au" */
  pathPrefix: string;
  /** Soft-launch switch: disabled markets build but are unlinked + noindex */
  enabled: boolean;

  currency: {
    /** Prefix shown before the amount, e.g. "RM", "₱", "A$" */
    symbol: string;
    /** ISO 4217 code used in JSON-LD offers */
    code: string;
    /** Locale used for thousand separators */
    numberLocale: string;
  };

  /** Set per market. NEVER FX-converted from another market's numbers. */
  pricing: {
    monthly: number;
    /** Upfront cost of the monthly plan — 0 everywhere today */
    setup: number;
    lumpSum: number;
    /** Monthly hosting & care on the lump-sum plan */
    lumpSumCare: number;
    minimumMonths: number;
    addons: {
      extraPage: number;
      googleBusinessProfile: number;
      localSeoMonthly: number;
    };
  };

  contact: {
    /** Digits only, country code first, no "+" — used for wa.me links */
    whatsapp: string;
    /** Human-readable form of the same number */
    phoneDisplay: string;
    email: string;
    /** Short service-area line, e.g. "Klang Valley, Malaysia" */
    serviceArea: string;
    /** Full service-area paragraph on /contact */
    serviceAreaBody: string;
    hours: string;
    afterHoursNote: string;
  };

  /** Phone entry + validation rules for the lead forms. */
  phone: {
    /** Country calling code, digits only */
    dialCode: string;
    /** Source for a RegExp, tested against digits-only input */
    pattern: string;
    label: string;
    placeholder: string;
    error: string;
  };

  heroCopy: {
    badge: string;
    headlineLead: string;
    headlineHighlight: string;
    subheadline: string;
  };

  /** Locale-flavoured strings. MY keeps its Manglish; PH/AU use neutral English. */
  voice: {
    /** Prefilled text on WhatsApp links with no message of their own */
    waDefaultMessage: string;
    /** Domain types included, e.g. ".com or .com.my" */
    domainLine: string;
    homeWhatWeDoDesign: string;
    homeWhatWeDoSeo: string;
    homeWorkHeading: string;
    homeWorkIntro: string;
    /** Answer-first question that opens /pricing */
    pricingQuestion: string;
    /** JSON-LD product description on /pricing */
    productDescription: string;
    /** JSON-LD LocalBusiness description on the home page */
    businessDescription: string;
    workAnswerFirst: string;
    aboutH1: string;
    aboutAnswerFirst: string;
    aboutStory: string[];
    aboutBeliefs: { title: string; body: string }[];
    blogIntro: string;
    blogComingSoon: string;
    footerBlurb: string;
    footerHoursNote: string;
    footerLegalLine: string;
    formNamePlaceholder: string;
    formBusinessPlaceholder: string;
    /** Business-name example on the /get-started intake form */
    formIntakeBusinessPlaceholder: string;
    /** Contact form success message */
    formThanks: string;
    /** Intake form success heading; {business} is replaced at runtime */
    intakeThanks: string;
    /** Payment-methods FAQ answer (FPX in MY, other rails elsewhere) */
    faqPayment: string;
    /** Languages FAQ — the question itself differs per market */
    faqLanguages: { q: string; a: string };
    /** CTA band default subheading */
    ctaSub: string;
    /** 404 page — one per market, so /ph never 404s in Manglish */
    notFound: {
      heading: string;
      body: string;
      homeCta: string;
      reportCta: string;
      /** WhatsApp prefill behind the report CTA */
      waMessage: string;
    };
  };

  /** Titles + descriptions for the shared pages. */
  meta: Record<PageKey, MetaEntry>;

  /** Which work to show. PH/AU run on demo sites until local client work exists. */
  workExamples: {
    /** Slugs from data/portfolio.ts, in display order */
    portfolioSlugs: string[];
    showIndustryDemos: boolean;
    /** Honest note shown when there's no local client work yet */
    demosNote?: string;
  };

  /** Page families that only make sense in some markets. */
  pages: {
    /** /services/[slug] — needs market-specific service copy before enabling */
    services: boolean;
    /** /locations/[slug] — city pages, Malaysia only */
    locations: boolean;
  };

  /** Structured-data details for the active market. */
  schema: {
    address?: { locality: string; region: string; country: string };
    areaServed: { type: "City" | "Country" | "AdministrativeArea"; names: string[] };
  };
};
