// TODO: Replace these 6 placeholders with real client projects as they launch.
// Each item drives a card on /work and the home page portfolio grid.

export type PortfolioItem = {
  slug: string;
  name: string;
  industry: string;
  /** Filter category on /work */
  category: "services" | "food" | "health" | "education";
  location: string;
  /** Measured mobile load time to show on the case card */
  loadTime: string;
  /** One-line summary shown on the card */
  blurb: string;
  /** "What we built" bullets for the case card */
  built: string[];
  /** Before → after story for the case card */
  beforeAfter: { before: string; after: string };
  /** Tailwind gradient classes for the placeholder visual */
  gradient: string;
};

export const portfolio: PortfolioItem[] = [
  {
    slug: "chillmaster-aircon",
    name: "ChillMaster Aircon Services",
    industry: "Aircon Service",
    category: "services",
    location: "Petaling Jaya",
    loadTime: "0.6s",
    blurb: "Service booking site for a two-van aircon team covering PJ and Subang.",
    built: [
      "5-page site with service-area pages for PJ, Subang, and Sunway",
      "WhatsApp booking flow with pre-filled service request message",
      "Google Business Profile optimisation — now in the local 3-pack for 'aircon service PJ'",
    ],
    beforeAfter: {
      before: "A Facebook page and a phone number written on the van.",
      after: "Ranks page 1 for 'aircon service Petaling Jaya'; bookings come in via WhatsApp daily.",
    },
    gradient: "from-sky-500 to-blue-700",
  },
  {
    slug: "klinik-pergigian-senyum",
    name: "Klinik Pergigian Senyum",
    industry: "Klinik",
    category: "health",
    location: "Shah Alam",
    loadTime: "0.7s",
    blurb: "Bilingual (BM/English) clinic site with treatment pages and panel info.",
    built: [
      "Treatment pages with clear pricing ranges — no more 'PM for price'",
      "Bilingual content: BM-first with English toggle",
      "FAQ schema so common questions appear directly in Google results",
    ],
    beforeAfter: {
      before: "An outdated site from 2016 that didn't work on phones.",
      after: "Mobile-first, loads in 0.7s, and new patient enquiries doubled in three months.",
    },
    gradient: "from-teal-400 to-emerald-600",
  },
  {
    slug: "restoran-kak-yam",
    name: "Restoran Kak Yam",
    industry: "Restoran",
    category: "food",
    location: "Klang",
    loadTime: "0.5s",
    blurb: "Menu-first restaurant site with daily specials the owner updates via WhatsApp.",
    built: [
      "Full photo menu with prices — customers decide before they arrive",
      "'Today's special' section we update whenever Kak Yam WhatsApps us",
      "Waze/Google Maps deep links and opening hours schema",
    ],
    beforeAfter: {
      before: "Menu photos scattered across old Facebook posts.",
      after: "One link for everything — menu, location, hours. Regulars share it in family groups.",
    },
    gradient: "from-orange-400 to-red-600",
  },
  {
    slug: "reno-tech-builders",
    name: "RenoTech Builders",
    industry: "Renovation",
    category: "services",
    location: "Kuala Lumpur",
    loadTime: "0.8s",
    blurb: "Portfolio-heavy renovation site built to win trust before the first call.",
    built: [
      "Project gallery organised by room and budget range",
      "Before/after sliders for their best transformations",
      "Lead form that qualifies budget and timeline before the WhatsApp chat",
    ],
    beforeAfter: {
      before: "Sending prospects a Google Drive folder of unsorted photos.",
      after: "A portfolio that closes deals — clients arrive already convinced.",
    },
    gradient: "from-amber-500 to-yellow-700",
  },
  {
    slug: "bright-minds-tuition",
    name: "Bright Minds Tuition Centre",
    industry: "Tuition Centre",
    category: "education",
    location: "Subang Jaya",
    loadTime: "0.6s",
    blurb: "Enrolment site with class schedules, fees, and teacher profiles.",
    built: [
      "Subject and level pages (UPSR-era to SPM) parents actually search for",
      "Transparent fee table — the #1 thing parents asked about",
      "Trial class booking via WhatsApp with pre-filled student details",
    ],
    beforeAfter: {
      before: "Parents had to call during office hours to ask about fees.",
      after: "Fees, schedules, and trial booking online — enquiries come in at 11pm.",
    },
    gradient: "from-violet-500 to-purple-700",
  },
  {
    slug: "ah-seng-motor-workshop",
    name: "Ah Seng Motor Workshop",
    industry: "Workshop",
    category: "services",
    location: "Puchong",
    loadTime: "0.6s",
    blurb: "No-nonsense workshop site: services, honest pricing, and a map that works.",
    built: [
      "Service list with from-prices for common jobs (service, brakes, aircon)",
      "Click-to-call and WhatsApp buttons pinned on mobile",
      "Local SEO pages for Puchong and Bandar Kinrara",
    ],
    beforeAfter: {
      before: "Word of mouth only — invisible to anyone new to the area.",
      after: "Steady stream of first-time customers who found them on Google.",
    },
    gradient: "from-slate-500 to-gray-700",
  },
];

export const portfolioCategories = [
  { key: "all", label: "All" },
  { key: "services", label: "Services & Trades" },
  { key: "food", label: "Food & Beverage" },
  { key: "health", label: "Health" },
  { key: "education", label: "Education" },
] as const;
