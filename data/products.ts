// Our own software products, sold by RYC Software and Web Solutions through
// Stripe. Shown at the top of /work so the business website lists what Stripe
// charges for, with prices. Keep these in step with each product's own
// pricing page (myswiftaudit.com/pricing, MyResit's lib/plans.ts).
//
// Prices are Malaysian ringgit in every market: both products are built for
// Malaysia.

export type ProductPlan = {
  name: string;
  price: string;
  /** Struck-through earlier price, for a promo. */
  was?: string;
  detail: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  /** Live site; omit while a product is not launched yet. */
  url?: string;
  /** Shown instead of a link while `url` is unset. */
  status?: string;
  domain: string;
  plans: ProductPlan[];
};

export const products: Product[] = [
  {
    slug: "my-swift-audit",
    name: "MY Swift Audit",
    tagline: "For Malaysian audit and accounting firms",
    blurb:
      "Turns a company's trial balance into full MPERS financial statements, audit working papers and the MBRS file for SSM.",
    url: "https://myswiftaudit.com",
    domain: "myswiftaudit.com",
    plans: [
      { name: "Free", price: "RM0", detail: "1 active company and 3 reports, no time limit" },
      {
        name: "Professional",
        price: "RM350 / month",
        detail: "or RM3,500 / year. Unlimited companies and reports, Word export, MBRS file, whole firm",
      },
    ],
  },
  {
    slug: "myresit",
    name: "MyResit",
    tagline: "For individuals and businesses in Malaysia",
    blurb:
      "Photograph a receipt, let AI read it, check what it found. Kept and searchable for the seven years LHDN asks, with tax reliefs and exports for your accountant.",
    url: "https://myresit.com.my",
    domain: "myresit.com.my",
    plans: [
      { name: "Free trial", price: "RM0", detail: "First 10 receipts read, no time limit" },
      {
        name: "Personal",
        price: "RM69 first year",
        was: "RM99",
        detail: "then RM99 / year. 360 receipts read a year, for personal use. Launch price for the first 31",
      },
      { name: "Basic", price: "RM30 / month", detail: "150 receipts read a month, for a business" },
      { name: "Plus", price: "RM50 / month", detail: "300 receipts read a month, for a business" },
    ],
  },
];
