import type { ReactNode } from "react";

// CSS-only marquee: the items render twice in one track that slides left by
// half its width, so the loop is seamless. The copy is aria-hidden and inert
// so screen readers and keyboards meet each item once. Pauses on hover; with
// prefers-reduced-motion the track stops and simply scrolls sideways.
// Keyframes live with .marquee-track in globals.css.

export default function Marquee({
  children,
  reverse = false,
  seconds = 40,
  gap = "1.5rem",
}: {
  children: ReactNode;
  reverse?: boolean;
  seconds?: number;
  gap?: string;
}) {
  return (
    <div className="marquee relative overflow-hidden">
      <div
        className="marquee-track flex w-max"
        style={{ animationDuration: `${seconds}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className="flex shrink-0" style={{ gap, paddingRight: gap }}>{children}</div>
        <div className="flex shrink-0" style={{ gap, paddingRight: gap }} aria-hidden inert>{children}</div>
      </div>
    </div>
  );
}
