// Captures the hero mockup screenshots from a live demo site.
// Usage: node scripts/capture-hero.mjs [url]   (default: dental demo)
// Outputs public/images/hero/{desktop,mobile}-screenshot.webp — rerun after
// any demo-site redesign to refresh the homepage hero.

import { chromium, devices } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const url = process.argv[2] ?? "https://dental.jpbcwebdesigns.com";
const outDir = path.resolve("public/images/hero");
const WEBP_QUALITY = 80;
// Full-page captures can be very tall; crop so the payload stays sane. The
// hero clips to the screen area anyway and only scrolls partway on hover.
const MAX_HEIGHT = { desktop: 2400, mobile: 2000 };

async function capture(browser, name, contextOptions) {
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Demo/preview deployments show a "Draf pratonton — belum live" banner;
  // hide it so the hero mockup shows a clean client-style page.
  await page.evaluate(() => {
    let banner;
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      if (
        (cs.position === "fixed" || cs.position === "sticky") &&
        el.getBoundingClientRect().top < 5 &&
        el.offsetHeight < 80 &&
        /belum live|pratonton/i.test(el.textContent ?? "")
      ) {
        banner = el;
        break;
      }
    }
    if (!banner) return;
    // The layout offsets content to clear the banner (wrapper padding-top,
    // sticky header top) — undo anything matching the banner's height.
    const h = banner.offsetHeight;
    banner.remove();
    for (const el of document.querySelectorAll("body > *")) {
      if (Math.abs(parseFloat(getComputedStyle(el).paddingTop) - h) < 2) el.style.paddingTop = "0px";
    }
    // Un-stick sticky/fixed headers so full-page stitching doesn't capture
    // them stuck partway down the page.
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      if ((cs.position === "sticky" || cs.position === "fixed") && parseFloat(cs.top) < 100) {
        el.style.position = "static";
      }
    }
  });
  // Scroll through the page so lazy-loaded images render, then back to top.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  const png = await page.screenshot({ fullPage: true });
  await context.close();

  const image = sharp(png);
  const meta = await image.metadata();
  const targetWidth = contextOptions.viewport.width;
  const scale = meta.width / targetWidth; // undo deviceScaleFactor
  const cropHeight = Math.min(meta.height, Math.round(MAX_HEIGHT[name] * scale));
  const out = path.join(outDir, `${name}-screenshot.webp`);
  await image
    .extract({ left: 0, top: 0, width: meta.width, height: cropHeight })
    .resize({ width: targetWidth })
    .webp({ quality: WEBP_QUALITY })
    .toFile(out);
  const { width, height } = await sharp(out).metadata();
  console.log(`${out}: ${width}x${height}`);
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
try {
  await capture(browser, "desktop", {
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });
  await capture(browser, "mobile", {
    ...devices["iPhone 14"],
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
} finally {
  await browser.close();
}
