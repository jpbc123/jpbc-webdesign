import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";
import { services } from "@/data/services";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/pricing", "/work", "/about", "/faq", "/blog", "/contact", "/get-started"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...locations.map((l) => ({
      url: `${SITE_URL}/locations/${l.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
