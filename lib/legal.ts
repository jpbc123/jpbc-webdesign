import type { Metadata } from "next";
import type { Market } from "@/config/markets/types";
import { mpath } from "./market";
import { marketRobots } from "./seo";

// The registered business behind JPBC Web Designs, MY Swift Audit and MyResit.
// Named in the footer, /terms and /privacy, and in each product's own legal pages.
export const OPERATOR = "RYC Software and Web Solutions";
export const OPERATOR_REG_NO = "202603276004";

/** Metadata for /terms and /privacy, which have no per-market copy in config/markets/. */
export function legalMetadata(market: Market, basePath: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: mpath(market, basePath) },
    robots: marketRobots(market),
  };
}
