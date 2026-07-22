# Prompt for Claude Code — Bracket Monogram Logo + Favicon

Run from the root of the jpbcwebdesigns.com repo. Paste everything below the line.

---

Replace the current text-only header logo with a proper logo lockup: an inline SVG bracket-monogram mark sitting to the LEFT of the two-line wordmark. Inspect the existing header/logo component and theme system first and match the site's conventions. Everything must work in light and dark mode and at all breakpoints.

## Layout — this is ONE horizontal row, not stacked

```
[ mark ]   JPBC
           WEB DESIGNS
```

- The mark sits left, vertically centred against the two-line wordmark block.
- The wordmark is two lines: `JPBC` on line 1, `WEB DESIGNS` on line 2.
- Mark height ≈ the combined height of both wordmark lines. Gap between mark and wordmark ≈ 10–12px.
- The entire lockup is a single link to home with `aria-label="JPBC Web Designs"`. The SVG mark is `aria-hidden="true"` (decorative — the wordmark carries the name).
- Total header height must not grow noticeably from today's. Scale font sizes down as needed, and verify the existing sticky/expanding-header behaviour still works.

## The mark — inline SVG, hand-coded

A stylised `J` framed by angle brackets, reading as `< J >`:

- Left element: a `<` chevron. Right element: a `>` chevron. Both drawn as `<path>` with `stroke-linecap="round"` and `stroke-linejoin="round"`, no fill.
- Centre: a capital `J` built from geometry, NOT a `<text>` element — a vertical stem with a hook curving left at the bottom (an arc or quadratic curve), plus a horizontal top bar across the stem. Rounded caps so it matches the chevrons' weight and feel.
- Optical balance: the `J` should be slightly heavier in stroke weight than the brackets so it reads as the subject, with the brackets as the frame. Roughly: brackets ~9 units, J ~12 units on a 100-unit viewBox.
- Square viewBox (e.g. `0 0 100 100`), `width`/`height` set in the component so it scales cleanly.

**Colour via CSS variables, not hardcoded hex:**
- Brackets: the cyan accent variable.
- `J`: the primary text colour variable (white in dark mode, dark navy in light mode).
- Both must flip correctly with the theme toggle. Use `currentColor` or CSS custom properties on the paths — never inline hex.

## Wordmark colours (swap from current treatment)

- `JPBC` — cyan accent, larger, bold, tight letter-spacing.
- `WEB DESIGNS` — white in dark mode / dark navy in light mode, smaller, uppercase, with letter-spacing tuned so its rendered width visually matches the width of `JPBC` above it. That optical alignment is what makes a stacked wordmark look intentional — check it by eye and adjust the tracking value until the two lines are the same width.
- Tight line-height so the two lines read as one block.

## "After Hours" script (dark mode only) — keep working with the new lockup

If the After Hours script overlay is currently implemented, make sure it still works against the new lockup:
- It must be `position: absolute` inside a `position: relative` lockup container, layered above the wordmark with `pointer-events: none`, crossing the `WEB DESIGNS` line, rotated about -5deg, in the handwritten script font.
- Every letter stays at `opacity: 1` at all times. Animate ONLY `text-shadow` glow intensity, staggered per letter so the glow travels across the phrase like a neon sign warming up. Never animate opacity, visibility, or colour to transparent.
- Hidden entirely in light mode. Static glow under `prefers-reduced-motion`.
- Make sure it does not collide with the new mark on the left — it should span the wordmark only.

## Favicon set

Derive the favicon from the same mark, simplified for small sizes:
- At 16×16 the full `< J >` is too busy. Produce a filled badge: rounded square in dark navy with the `J` alone in cyan, centred, thick strokes. Drop the brackets, or keep them only in the 512px version.
- Generate: `favicon.svg`, `favicon.ico` (32×32), `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png`, and `site.webmanifest` with theme/background colours from the site palette.
- Wire them into the document head correctly (SVG favicon with `rel="icon" type="image/svg+xml"` plus ICO fallback) and add `<meta name="theme-color">` matching the dark navy.
- The badge must be legible on both light and dark browser tab backgrounds — a filled badge handles this better than a transparent glyph.

## Wrap-up

Test in dark and light mode at 375px, 768px, and desktop: lockup alignment and vertical centring, the two wordmark lines matching width, the script overlay legibility and glow, header height, sticky-expand behaviour, and the favicon in a real browser tab. Confirm the production build passes, then summarise the files changed and where to tweak the mark's stroke weights, the wordmark letter-spacing, and the script's rotation and glow.
