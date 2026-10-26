import type { CSSProperties } from "react";

/* Per-letter idle-blink timing [duration, delay] in seconds — deliberately
   uneven so the neon letters flick off and back on out of sync. */
const neonBlink: [number, number][] = [
  [4.7, 0.4], [6.1, 2.3], [3.9, 1.1], [5.3, 2.9], [4.1, 0.2], [5.9, 1.7],
  [3.6, 2.6], [6.7, 0.8], [4.4, 1.9], [5.1, 3.1], [3.3, 0.6],
];

/**
 * The JPBC signboard logo (styles in .brand-board, globals.css). With
 * `afterHours`, a neon "after hours" sign hangs beside it in dark mode: the
 * letters warm up each time dark mode switches on (display:none -> inline
 * restarts the CSS animations), then blink individually like a bar light.
 * "wide" shows it only on xl screens, where the header has room for it.
 */
export default function Logo({ afterHours }: { afterHours?: "always" | "wide" }) {
  return (
    <span className="flex items-end gap-2">
      <span className="brand-board">
        <span className="brand-name">JPBC</span>
        <span className="brand-desc">
          <span>WEB</span>
          <span>DESIGNS</span>
        </span>
      </span>
      {afterHours && (
        <span
          className={`hidden whitespace-nowrap pb-0.5 font-script text-lg leading-none text-neon ${
            afterHours === "wide" ? "xl:dark:inline" : "dark:inline"
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
      )}
    </span>
  );
}
