import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static-generation-first: every page is prerendered at build time.
  // The only server code is /api/leads (lead capture + webhook forward),
  // so this deploys cleanly to Vercel / Cloudflare Pages.
  reactStrictMode: true,
};

export default nextConfig;
