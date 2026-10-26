// The work marquee under the home hero. Every item carries an honest label,
// so demos and our own sites are never passed off as client work. Add client
// projects here (kind: "Client project") as they launch. Screenshots live in
// /public/work/.

import type { Market, MarketCode } from "@/config/markets/types";

export type ShowcaseKind = "Client project" | "Own project" | "Own product" | "Concept / demo build";

export type ShowcaseItem = {
  name: string;
  kind: ShowcaseKind;
  sector: string;
  image: string;
  url: string;
  /** Markets that show this item; omit to show it everywhere */
  markets?: MarketCode[];
};

export const showcase: ShowcaseItem[] = [
  { name: "Setia Alam Garden Services", kind: "Own project", sector: "Landscaping", image: "/work/setia-alam-garden-services.jpg", url: "https://setiaalamgardenservices.com", markets: ["my"] },
  { name: "MY Swift Audit", kind: "Own product", sector: "Audit & accounting software", image: "/work/swift-audit.jpg", url: "https://myswiftaudit.com", markets: ["my"] },
  { name: "Dental clinic", kind: "Concept / demo build", sector: "Healthcare", image: "/work/demo-dental.jpg", url: "https://dental.jpbcwebdesigns.com" },
  { name: "Feng Shui & Beyond", kind: "Own project", sector: "Lifestyle & media", image: "/work/fengshui-and-beyond.jpg", url: "https://fengshuiandbeyond.com", markets: ["my"] },
  { name: "MyResit", kind: "Own product", sector: "AI receipt keeping", image: "/work/myresit.jpg", url: "https://myresit.com.my", markets: ["my"] },
  { name: "Renovation contractor", kind: "Concept / demo build", sector: "Construction", image: "/work/demo-construction.jpg", url: "https://construction.jpbcwebdesigns.com/demo" },
  { name: "Martial arts gym", kind: "Concept / demo build", sector: "Fitness", image: "/work/demo-fitness.jpg", url: "https://fitness.jpbcwebdesigns.com" },
];

export function showcaseFor(market: Market): ShowcaseItem[] {
  return showcase.filter((item) => !item.markets || item.markets.includes(market.code));
}

/** Who we build for: the text marquee. Wider than shops on purpose. */
export const sectors = [
  "Law firms", "Clinics", "Accounting firms", "Restaurants", "Contractors",
  "Tuition centres", "Workshops", "Online stores", "Gyms", "Property agents",
  "Travel agencies", "Consultancies",
];
