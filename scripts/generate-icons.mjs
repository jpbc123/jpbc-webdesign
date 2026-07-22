/**
 * Regenerates the raster favicons from the badge geometry in public/favicon.svg.
 *
 *   node scripts/generate-icons.mjs      (or: npm run icons)
 *
 * Rasterising is done with the Playwright chromium that's already a dev
 * dependency, so there's no extra image toolchain to install. Keep the path
 * data below in sync with public/favicon.svg if the mark ever changes.
 *
 * The tab icon keeps its rounded corners; the app icons are full-bleed, because
 * iOS and Android apply their own mask and would otherwise composite our
 * transparent corners onto white/black.
 */
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const PUBLIC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public");

const NAVY = "#0b1f3a";
const CYAN = "#22d3ee";
const MARK = "M22 20H44M38 20V35A9 9 0 0 1 20 35";

const svg = (radius) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${radius}" fill="${NAVY}"/>
  <path d="${MARK}" fill="none" stroke="${CYAN}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const targets = [
  { file: "favicon-32.png", size: 32, radius: 14 },
  { file: "apple-touch-icon.png", size: 180, radius: 0 },
  { file: "icon-192.png", size: 192, radius: 0 },
  { file: "icon-512.png", size: 512, radius: 0 },
];

/** Wraps a single PNG in an ICO container (PNG-in-ICO, supported since IE11). */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette colours
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);
  return Buffer.concat([header, entry, png]);
}

const browser = await chromium.launch();
const page = await browser.newPage();
let ico32;

for (const { file, size, radius } of targets) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<style>html,body{margin:0;padding:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg(radius)}`
  );
  const png = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  if (file === "favicon-32.png") ico32 = png;
  else writeFileSync(path.join(PUBLIC, file), png);
  console.log(`${file} (${size}x${size})`);
}

writeFileSync(path.join(PUBLIC, "favicon.ico"), pngToIco(ico32, 32));
console.log("favicon.ico (32x32)");

await browser.close();
