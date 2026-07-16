"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

/**
 * "Lepas Kerja" sky details for the dark hero: rare shooting stars (pure CSS,
 * each on its own long cycle) and a tiny UFO that drifts across the upper sky
 * every 45–90s. Clicking the UFO makes it wobble and flash its beam.
 * Dark mode only; everything sits behind hero content and is clipped by the
 * hero's overflow-hidden.
 */

const FLIGHT_MS = 14000; // keep in sync with the ufo-flight duration in globals.css

// Each star: where it starts, its heading, and how long its cycle is.
// Visible for only ~3.5% of the cycle so a sighting feels lucky.
const stars: CSSProperties[] = [
  { "--top": "14%", "--left": "6%", "--angle": "34deg", "--dur": "26s", "--delay": "4s" },
  { "--top": "7%", "--left": "52%", "--angle": "42deg", "--dur": "42s", "--delay": "15s" },
  { "--top": "26%", "--left": "66%", "--angle": "28deg", "--dur": "58s", "--delay": "9s" },
].map((s) => s as CSSProperties);

export default function NightSkyFx() {
  const [flying, setFlying] = useState(false);
  const [zapped, setZapped] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: ReturnType<typeof setTimeout>;
    const arm = () => {
      t = setTimeout(() => {
        setFlying(true);
        t = setTimeout(() => {
          setFlying(false);
          arm();
        }, FLIGHT_MS + 500);
      }, 45_000 + Math.random() * 45_000);
    };
    arm();
    return () => clearTimeout(t);
  }, []);

  function zap() {
    if (zapped) return;
    setZapped(true);
    setTimeout(() => setZapped(false), 800);
  }

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden dark:block" aria-hidden>
      {stars.map((style, i) => (
        <span key={i} className="shooting-star" style={style} />
      ))}

      <div className={`ufo${flying ? " ufo-flying" : ""}${zapped ? " ufo-zap" : ""}`} onClick={zap}>
        <div className="ufo-inner">
          <svg width="44" height="40" viewBox="0 0 44 40" fill="none">
            {/* beam flash under the saucer (shows on click) */}
            <polygon className="ufo-beam" points="16,22 28,22 36,40 8,40" fill="url(#ufoBeam)" />
            {/* soft glow under the saucer */}
            <ellipse cx="22" cy="24" rx="12" ry="4" fill="var(--accent)" opacity="0.25" />
            {/* dome */}
            <path d="M15 15a7 7 0 0 1 14 0z" fill="#bfe6fa" opacity="0.85" />
            {/* saucer body */}
            <ellipse cx="22" cy="17.5" rx="14" ry="5.5" fill="#8ea8cc" />
            <ellipse cx="22" cy="16.5" rx="14" ry="4.5" fill="#b8cbe8" />
            {/* running lights */}
            <circle cx="14" cy="19" r="1.3" fill="var(--accent)" />
            <circle cx="22" cy="20.5" r="1.3" fill="var(--accent)" />
            <circle cx="30" cy="19" r="1.3" fill="var(--accent)" />
            <defs>
              <linearGradient id="ufoBeam" x1="22" y1="22" x2="22" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22d3ee" stopOpacity="0.7" />
                <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
