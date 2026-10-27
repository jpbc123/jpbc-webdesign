/**
 * Dark-mode-only hero backdrop: twinkling stars, shooting stars and our UFO,
 * who flies in, beams down for a few seconds and zooms off again.
 *
 * Pure CSS animation (see "Night sky" in globals.css). In light mode the
 * whole layer is display:none, so none of it runs.
 */
export default function NightSky() {
  return (
    <div className="night-sky hidden dark:block" aria-hidden>
      <div className="night-stars" />
      <div className="night-stars night-stars--far" />
      <span className="shooting-star" style={{ top: "8%", left: "72%", animationDuration: "9s", animationDelay: "2s" }} />
      <span className="shooting-star" style={{ top: "22%", left: "38%", animationDuration: "13s", animationDelay: "6s" }} />
      <span className="shooting-star" style={{ top: "4%", left: "95%", animationDuration: "17s", animationDelay: "11s" }} />
      <div className="ufo-flight">
        <div className="ufo-bob">
          <div className="ufo-beam">
            <span className="ufo-sparkle" />
            <span className="ufo-sparkle" />
            <span className="ufo-sparkle" />
          </div>
          <Ufo />
        </div>
      </div>
    </div>
  );
}

function Ufo() {
  return (
    <svg viewBox="0 0 120 80" className="ufo" role="presentation">
      <defs>
        <linearGradient id="ufo-hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dbe4ff" />
          <stop offset="1" stopColor="#7c8cf0" />
        </linearGradient>
        <linearGradient id="ufo-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e0f7ff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#9bdcf5" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Antenna with a blinking tip */}
      <rect x="59.3" y="6" width="1.4" height="10" rx="0.7" fill="#a5b4fc" />
      <circle className="ufo-tip" cx="60" cy="5" r="3.2" fill="#ffbe73" />
      {/* The pilot: a round mint alien with big eyes and rosy cheeks */}
      <circle cx="60" cy="34" r="12.5" fill="#8ee6b0" />
      <ellipse cx="54.6" cy="32.5" rx="3.3" ry="4.2" fill="#13203d" />
      <ellipse cx="65.4" cy="32.5" rx="3.3" ry="4.2" fill="#13203d" />
      <circle cx="55.6" cy="31" r="1.2" fill="#fff" />
      <circle cx="66.4" cy="31" r="1.2" fill="#fff" />
      <circle cx="50" cy="38" r="2.2" fill="#ff8fab" opacity="0.7" />
      <circle cx="70" cy="38" r="2.2" fill="#ff8fab" opacity="0.7" />
      <path d="M57 38.5q3 3 6 0" stroke="#13203d" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      {/* Glass dome over the pilot */}
      <path d="M33 44a27 27 0 0 1 54 0z" fill="url(#ufo-glass)" stroke="#c7e9ff" strokeOpacity="0.6" />
      <path d="M41 32q5-9 15-11" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* Saucer */}
      <ellipse cx="60" cy="52" rx="50" ry="13" fill="url(#ufo-hull)" />
      <ellipse cx="60" cy="46" rx="38" ry="6" fill="#eef2ff" />
      <ellipse cx="60" cy="64" rx="18" ry="4.5" fill="#4f5bd5" />
      {/* Running lights */}
      <circle className="ufo-light" cx="22" cy="54" r="3" fill="#ffbe73" />
      <circle className="ufo-light" cx="41" cy="58" r="3" fill="#ff8fab" style={{ animationDelay: "0.3s" }} />
      <circle className="ufo-light" cx="60" cy="59.5" r="3" fill="#8ee6b0" style={{ animationDelay: "0.6s" }} />
      <circle className="ufo-light" cx="79" cy="58" r="3" fill="#ff8fab" style={{ animationDelay: "0.9s" }} />
      <circle className="ufo-light" cx="98" cy="54" r="3" fill="#ffbe73" style={{ animationDelay: "1.2s" }} />
    </svg>
  );
}
