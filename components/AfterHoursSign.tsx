"use client";

import { useSyncExternalStore, type CSSProperties } from "react";

/* Per-letter idle-blink timing [duration, delay] in seconds — deliberately
   uneven so the neon letters flick off and back on out of sync. */
const neonBlink: [number, number][] = [
  [4.7, 0.4], [6.1, 2.3], [3.9, 1.1], [5.3, 2.9], [4.1, 0.2], [5.9, 1.7],
  [3.6, 2.6], [6.7, 0.8], [4.4, 1.9], [5.1, 3.1], [3.3, 0.6],
];

/** True from 6pm to 6am studio time (Shah Alam), whatever the visitor's timezone. */
function isAfterHours() {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Kuala_Lumpur" }).format(
      new Date()
    )
  );
  return hour >= 18 || hour < 6;
}

// Re-check once a minute so the sign switches on/off while the page is open.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

/**
 * The neon "after hours" sign beside the logo. It renders nothing on the
 * server and lights up after hydration, so the warm-up animation plays when
 * the sign appears. "wide" shows it only on xl screens, where the header has
 * room for it.
 */
export default function AfterHoursSign({ variant }: { variant: "always" | "wide" }) {
  const lit = useSyncExternalStore(subscribe, isAfterHours, () => false);
  if (!lit) return null;

  return (
    <span
      className={`whitespace-nowrap pb-0.5 font-script text-lg leading-none text-neon ${
        variant === "wide" ? "hidden xl:inline" : "inline"
      }`}
      aria-hidden
    >
      {"after hours".split("").map((ch, i) =>
        ch === " " ? (
          <span key={i}> </span>
        ) : (
          <span
            key={i}
            className={i === 2 ? "neon-letter neon-letter--flicker" : "neon-letter"}
            style={
              {
                "--d": `${i * 0.1}s`,
                "--fdur": `${neonBlink[i % neonBlink.length][0]}s`,
                "--fdel": `${neonBlink[i % neonBlink.length][1]}s`,
              } as CSSProperties
            }
          >
            {ch}
          </span>
        )
      )}
    </span>
  );
}
