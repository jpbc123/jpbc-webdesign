import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";
import { services } from "@/data/services";
import { posts } from "@/content/blog";
import { enabledMarkets, SHARED_PAGE_PATHS } from "@/config/markets";
import { mpath } from "@/lib/market";
import { absoluteUrl } from "@/lib/site";

// One block per enabled market. Soft-launched markets (enabled: false) are
// left out entirely — they also render noindex until they go live.

export default function sitemap(): MetadataRoute.Sitemap {
  return enabledMarkets.flatMap((market) => [
    ...SHARED_PAGE_PATHS.map((path) => ({
      url: absoluteUrl(mpath(market, path)),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...(market.pages.services
      ? services.map((s) => ({
          url: absoluteUrl(mpath(market, `/services/${s.slug}`)),
          changeFrequency: "monthly" as const,
          priority: 0.9,
        }))
      : []),
    ...(market.pages.locations
      ? locations.map((l) => ({
          url: absoluteUrl(mpath(market, `/locations/${l.slug}`)),
          changeFrequency: "monthly" as const,
          priority: 0.9,
        }))
      : []),
    // Malaysia-only tool page (app/(my)/website-cost-calculator).
    ...(market.code === "my"
      ? [{ url: absoluteUrl("/website-cost-calculator"), changeFrequency: "monthly" as const, priority: 0.8 }]
      : []),
    ...(market.pages.blogPosts
      ? posts.map((p) => ({
          url: absoluteUrl(mpath(market, `/blog/${p.slug}`)),
          lastModified: p.updated ?? p.date,
          changeFrequency: "yearly" as const,
          priority: 0.7,
        }))
      : []),
  ]);
}
