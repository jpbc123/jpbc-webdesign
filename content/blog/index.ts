import type { Post } from "./types";
import { post as websiteCost } from "./website-cost-malaysia";
import { post as websiteVsFacebook } from "./website-vs-facebook-page";
import { post as googleBusinessProfile } from "./google-business-profile-malaysia";
import { post as shopeeVsOwnStore } from "./shopee-vs-own-online-store-malaysia";
import { post as slowWebsite } from "./why-is-my-website-slow";
import { post as domains } from "./com-my-vs-my-vs-com-domain";

export type { Post } from "./types";

// Every published article. To add one: create content/blog/<file>.tsx
// exporting `post`, then import it here. The blog index, the article route,
// the sitemap and the home page's "From the blog" strip all read this list.
//
// Newest first by date. Posts sharing a date keep the order listed here, so
// list the one you want featured first.
export const posts: Post[] = [
  websiteCost,
  websiteVsFacebook,
  googleBusinessProfile,
  shopeeVsOwnStore,
  slowWebsite,
  domains,
].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Format an ISO date for display, e.g. "24 October 2026". */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
