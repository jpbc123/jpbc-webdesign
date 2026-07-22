# Prompt for Claude Code — Multi-Market Locale Layer (/ph and /au)

Run from the root of the jpbcwebdesigns.com repo. Paste everything below the line.

---

Add a market/locale layer to my site so the same codebase serves three markets: Malaysia (default, at the root), the Philippines (`/ph`), and Australia (`/au`). Inspect the existing codebase first and match its framework, routing, styling, and component conventions exactly. This is a refactor to make market-specific content data-driven — it must NOT change how the Malaysian site currently looks or behaves at its existing URLs.

## Core requirement: nothing about Malaysia changes

- Existing MY pages keep their current URLs (no `/my` prefix, no redirects).
- MY content, pricing, and copy render exactly as they do today.
- If in doubt on any detail, preserve current MY behaviour.

## 1. Market config

Create `src/config/markets/` with one file per market (`my.js`, `ph.js`, `au.js`) plus an index that resolves the active market. Each market config holds:

- `code`, `label` (e.g. "Malaysia"), `flag` emoji, `locale` (en-MY / en-PH / en-AU)
- `currency` symbol + formatting rules
- `pricing`: monthly price, setup fee (0), and any package prices — set per market, NEVER converted from another market's numbers
- `contact`: WhatsApp number, display phone, email, service area / location line
- `heroCopy`: headline, subheadline, badge text (allows market-specific wording)
- `voice`: an object of any locale-flavoured strings currently hardcoded in components (e.g. Manglish phrases like "we reply cepat") so each market can override them — MY keeps its current strings, PH and AU get neutral English equivalents
- `workExamples`: which portfolio/demo items to show (MY shows current client work; PH and AU can show the industry demo sites until real local work exists)
- `enabled`: boolean, so I can soft-launch a market

Extract every currently-hardcoded market-specific value (prices, phone/WhatsApp links, "Malaysian" wording, location references) out of components and into the MY config. Components read from the active market config only.

**Values to use for now:**
- MY: exactly what's on the site today (RM179/month).
- PH: currency ₱, price **₱1,400/month**, service area "Philippines (remote)", English copy with no Manglish. Use my existing WhatsApp number unless a `PH_WHATSAPP` env var is set.
- AU: currency A$, price **A$179/month**, service area "Australia (remote)", English copy. Mark `enabled: false` for now — the pages should build but stay unlinked and `noindex` until I flip it.

## 2. Routing

- MY: existing routes unchanged at root.
- PH: `/ph`, `/ph/pricing`, `/ph/work`, `/ph/contact`, etc. — mirroring the existing top-level pages via the market layer. Do not duplicate page files; use the framework's dynamic routing or a shared page-component approach so there's ONE source of truth per page type.
- AU: same structure under `/au`, built but excluded from the sitemap and marked `noindex` while `enabled: false`.
- Localised pages that don't apply (e.g. Malaysian city/location pages) should not be generated for PH/AU.

## 3. Market switcher

- Small, unobtrusive switcher in the footer (and optionally the header if it fits cleanly): flag + market name, listing only `enabled` markets, linking to the equivalent page in that market where one exists, else that market's home.
- No auto-redirect based on IP or browser locale — visitors choose. (Auto-redirect breaks SEO crawling and annoys people.)
- Persist choice in `localStorage` only to highlight the current selection; never to force a redirect.

## 4. SEO

- `hreflang` alternate tags linking the three market versions of each page, plus `x-default` pointing to MY.
- Canonical URLs per market page.
- Market-appropriate titles and meta descriptions from config (e.g. PH pages say Philippines, not Malaysia).
- Sitemap includes MY and PH; excludes AU while disabled.
- JSON-LD business schema uses the active market's contact/service-area details.

## 5. Quality bar

- No visual regression on MY: verify homepage, pricing, work, and contact pages look identical to before, in both dark and light mode, at 375px and desktop.
- `/ph` renders correct currency and pricing everywhere prices appear, with no Malaysian references left in copy, meta tags, or structured data.
- WhatsApp links resolve to the correct number with market-appropriate prefilled text.
- Production build passes; no console errors; no new dependencies unless genuinely necessary.
- Finish by summarising: files touched, how to add a new market, how to change a market's pricing, and how to flip AU to enabled when I'm ready.
