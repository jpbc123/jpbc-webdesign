# Prompt for Claude Code — Expanding Sticky Header

Run from the root of the jpbcwebdesigns.com repo, paste everything below the line. (Can be the same session as the hero/work tasks.)

---

Add a scroll-triggered "expanding island" behavior to my existing site header. First inspect the current header component and match the site's conventions and theming (dark/light modes) — don't rebuild the header, just add this behavior to it.

## The behavior

- **At the top of the page (state A — current look):** the header is its existing floating rounded-pill container, inset from the viewport edges with visible margin, transparent page background showing around it.
- **After scrolling down past a small threshold (~60px) (state B):** the header smoothly expands to a full-width sticky bar — border-radius animates to 0 (or near 0), horizontal margins/insets collapse to 0, the container stretches edge-to-edge, height can compress slightly (a few px), and the bar gains a translucent background with `backdrop-filter: blur()` plus a subtle bottom shadow so it reads above page content.
- **Scrolling back to the top** reverses the animation to state A.
- The transition should feel like one continuous morph, ~300ms with an ease like `cubic-bezier(0.4, 0, 0.2, 1)`, both directions.

## Implementation requirements

- The header must be `position: fixed` (or `sticky`) in BOTH states so content never jumps when the state toggles — if it isn't already fixed, restructure minimally and add a spacer so page content keeps its current offset. Zero layout shift on toggle.
- Detect scroll state with an IntersectionObserver on a tiny sentinel element at the top of the page (preferred) or a passive scroll listener with requestAnimationFrame — no work on every scroll event.
- Toggle a single class (e.g. `header--expanded`) and do all animation in CSS transitions on the inner container (max-width, margin, border-radius, padding, background, box-shadow). Don't animate properties that thrash layout beyond this one element.
- Translucent blurred background must look correct in BOTH dark and light themes (pick appropriate rgba values per theme via the existing CSS variables), and text/logo contrast must remain accessible in both states.
- Include a solid-color fallback for browsers without `backdrop-filter` support (`@supports`).
- Respect `prefers-reduced-motion`: state still toggles (the bar still becomes full-width and readable) but with transitions disabled.
- Mobile: keep the behavior but tune it — the pill is already nearly full-width on small screens, so state B mainly adds the blur background + shadow and removes the radius. The mobile menu button and any open mobile menu must continue working correctly in both states.
- No new dependencies.

## Wrap-up

Test at 375px, 768px, and desktop widths, in dark and light mode, including: scrolling slowly across the threshold repeatedly (no flicker), keyboard-tabbing through nav links in both states, and opening the mobile menu in both states. Confirm production build passes, then summarize the files touched.
