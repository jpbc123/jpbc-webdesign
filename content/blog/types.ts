import type { ComponentType } from "react";
import type { Faq } from "@/data/faqs";
import type { Market } from "@/config/markets/types";

/**
 * One blog article. Each lives in its own file in content/blog/ as a typed
 * module, so posts get real JSX (tables, callouts, links to our own pages)
 * with no MDX toolchain, and prices come from the market config instead of
 * being typed into the copy, so they can't go stale.
 *
 * Articles are written for Malaysia and are served under /blog/<slug> only.
 */
export type Post = {
  slug: string;
  title: string;
  /** Meta description and the excerpt on the blog index (aim for ~150 characters) */
  description: string;
  /** ISO date, e.g. "2026-10-24" */
  date: string;
  /** ISO date of the last meaningful revision, if any */
  updated?: string;
  readMinutes: number;
  /** Short label on the post card, e.g. "Pricing" */
  tag: string;
  /** Searches this article is written to answer; keeps the post focused, not rendered */
  targetQueries: string[];
  /** Rendered as a Q&A block at the end and as FAQPage JSON-LD */
  faqs?: Faq[];
  Body: ComponentType<{ market: Market }>;
};
