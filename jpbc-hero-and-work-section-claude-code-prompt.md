# Prompt for Claude Code — JPBC Hero Mockup + Websites by Industry Section

Run Claude Code from the root of the jpbcwebdesigns.com repo, then paste everything below the line.

---

Two deliverables for my existing website (jpbcwebdesigns.com). Before writing any code, inspect the codebase to learn the framework, styling approach, component conventions, and theming (the site has a dark/light mode toggle) — and match them exactly. Do not refactor anything unrelated to these two tasks.

## Deliverable 1 — Replace the hero graphic with a hand-coded device mockup

The homepage hero currently shows a generic skeleton-wireframe illustration on the right side. Replace it with a laptop + phone device mockup composition, built entirely in HTML/CSS (no PNG mockup, no external mockup library) — this is deliberate brand proof, since our tagline is "hand-coded, no page builders, loads in 0.6s."

**Composition:**
- A laptop frame (screen, thin bezel, base) angled slightly with CSS 3D transforms (`perspective` + small `rotateY`/`rotateX`), and a phone frame overlapping its lower-right corner at a slight opposite tilt — similar composition to classic agency heroes.
- Inside each screen, render a real website screenshot as an `<img>`. I will provide the screenshots at:
  - `public/images/hero/desktop-screenshot.webp` (full-page desktop capture, ~1280px wide)
  - `public/images/hero/mobile-screenshot.webp` (full-page mobile capture, ~390px wide)
  If those files don't exist yet, generate clean temporary placeholder SVGs at those paths (simple mock webpage layout in our palette) so everything works, and add a code comment telling me to overwrite them with real screenshots.
- The screenshots are full-page captures taller than the screens: clip them to the screen area, showing the top of the page by default. On hover (desktop only), slowly translate the desktop screenshot upward inside the laptop screen so it appears to scroll through the page (CSS transition, several seconds, ease-in-out; return on mouse leave). Skip this effect entirely under `prefers-reduced-motion`.
- Keep the existing "Loads in 0.6s 🔥" badge, repositioned to sit naturally on the mockup (e.g., pinned to the laptop's top-left corner).
- Subtle depth: soft shadow under both devices and a faint cyan glow consistent with the site's accent color. Must look correct in both dark and light themes.

**Performance & quality requirements:**
- The hero is above the fold: load the screenshots eagerly/priority, with explicit width/height to prevent layout shift.
- Total added payload beyond the screenshots should be ~0: frames are pure CSS. No new dependencies.
- Responsive: on tablet, scale the composition down; on mobile, simplify gracefully (e.g., laptop only, smaller, or stacked under the headline) — it must never cause horizontal scroll or push the CTA buttons below the fold awkwardly.
- Accessibility: meaningful alt text on the screenshots (e.g., "Screenshot of a website built by JPBC Web Designs"); frame elements marked decorative.

## Deliverable 2 — "Websites by Industry" section on /work

Add a new section to the /work page, placed AFTER the existing client project grid and BEFORE the "Want yours on this page?" CTA. Important context: the existing grid is real client work and the page promises "every project is live" — this new section is for live industry demo sites, and must be clearly labeled as demos so that trust claim stays honest.

**Content (use this copy):**
- Section heading: `Websites by Industry`
- Intro: `Live demo sites showing exactly what we build for your type of business. Explore one, then imagine it with your name on it — we'll build your free preview to prove it.`
- Cards (drive these from a data array so I can add more industries later without touching markup):
  1. 🦷 **Dental Clinics** — link: https://dental.jpbcwebdesigns.com — blurb: `Appointment-focused sites for kliniks — services, doctors, and WhatsApp booking front and centre.`
  2. 🥊 **Gyms & Fitness** — link: https://fitness.jpbcwebdesigns.com — blurb: `High-energy sites for gyms and martial arts academies — schedule, classes, and free-trial funnel built in.`
- Each card: small `Live demo` badge, opens in a new tab (`rel="noopener"`), hover state consistent with the existing work cards, and a small `Your industry next? →` link/card at the end of the row pointing to the existing WhatsApp CTA link used elsewhere on the page.
- Style must match the existing /work page design system (cards, spacing, typography, dark/light themes). Reuse existing card components if they exist rather than inventing new ones.
- If the /work page meta description is easy to update, extend it to mention industry demo sites for dental clinics and gyms.

## Wrap-up

- Run the dev server and the production build; confirm no errors, no layout shift warnings, and that both changes look right in dark AND light mode and at 375px width.
- Summarize what changed, which files were touched, and remind me of the two screenshot paths to overwrite.

Nope — Claude Code can do it for you. It's running on your machine with full internet access, so it can install Playwright, load your live sites in a headless browser, and capture pixel-perfect full-page screenshots at exactly the right sizes. (I can't do it from here — my sandbox can't reach your domain — but your local Claude Code can.)
Just paste this addendum into the same session, right after the main prompt:
One more thing: don't wait for me to provide the screenshots — generate them yourself.
Use Playwright (install it if needed) to capture full-page screenshots of
https://dental.jpbcwebdesigns.com — one at 1280px viewport width (desktop) and one
at 390px width (mobile, with a mobile user agent). Convert both to WebP at
reasonable quality (~80) and save them to the two paths specified above
(public/images/hero/desktop-screenshot.webp and mobile-screenshot.webp).
Wait for the page to fully render (fonts and images loaded) before capturing.
Swap the URL if you'd rather feature Setia Alam or another site. One bonus of doing it this way: the screenshot step becomes a repeatable script — worth asking Claude Code to save it as scripts/capture-hero.mjs so whenever you redesign a demo site, refreshing the hero is one command instead of a manual chore.