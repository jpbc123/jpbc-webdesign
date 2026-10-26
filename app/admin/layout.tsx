import type { Metadata } from "next";

// The private client admin. Only reachable at the secret ADMIN_PATH (see
// proxy.ts); never in the sitemap, robots.txt or any link on the site.

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · JPBC Admin" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-dvh flex-col">{children}</div>;
}
