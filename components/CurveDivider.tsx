/**
 * Sweeping curve between a hero (navy) section and the page background.
 * Rendered as an SVG that takes the color of the section *below* it.
 */
export default function CurveDivider({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={`block h-12 w-full sm:h-20 ${flip ? "rotate-180" : ""}`}
      >
        <path d="M0,64 C240,96 480,0 720,16 C960,32 1200,96 1440,48 L1440,90 L0,90 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
