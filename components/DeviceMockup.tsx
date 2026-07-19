/**
 * Laptop + phone hero mockup. The frames are pure CSS — zero payload beyond
 * the two screenshots — which is the point: hand-coded, no page builders.
 *
 * The screenshots are full-page captures of the live dental demo site.
 * To refresh them (or feature a different site), run:
 *   node scripts/capture-hero.mjs [url]
 * which overwrites public/images/hero/{desktop,mobile}-screenshot.webp.
 *
 * On devices with a real pointer, hovering the laptop slowly pans the
 * screenshot to the bottom of the page, like someone scrolling the site.
 * (Tailwind v4 scopes hover: to @media (hover:hover), so touch devices
 * never trigger it; motion-reduce: disables the pan entirely.)
 */
export default function DeviceMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xs select-none [perspective:1600px] sm:max-w-md lg:max-w-lg">
      {/* Soft cyan glow pooled under the devices */}
      <div className="absolute inset-x-6 bottom-0 top-10 rounded-full bg-accent/15 blur-3xl dark:bg-accent/25" aria-hidden />

      {/* Laptop, tilted slightly toward the headline */}
      <div className="group relative [transform-style:preserve-3d] [transform:rotateX(4deg)_rotateY(-7deg)]">
        <div className="overflow-hidden rounded-t-xl border-[6px] border-b-0 border-slate-800 bg-slate-950 shadow-2xl shadow-black/40 dark:border-slate-600">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src="/images/hero/desktop-screenshot.webp"
              alt="Screenshot of a dental clinic website built by JPBC Web Designs"
              width={1280}
              height={2400}
              loading="eager"
              fetchPriority="high"
              className="h-full w-full object-cover [object-position:top] [transition:object-position_7s_ease-in-out] group-hover:[object-position:bottom] motion-reduce:transition-none motion-reduce:group-hover:[object-position:top]"
            />
          </div>
        </div>
        {/* Base / hinge */}
        <div className="relative -mx-[4%] h-3 rounded-b-xl bg-slate-300 shadow-lg dark:bg-slate-600" aria-hidden>
          <div className="absolute left-1/2 top-0 h-1.5 w-16 -translate-x-1/2 rounded-b-md bg-slate-400/80 dark:bg-slate-500" />
        </div>
      </div>

      {/* Phone overlapping the laptop's lower-right corner, tilted the other way */}
      <div className="absolute -bottom-8 -right-2 hidden w-24 [transform:rotateX(2deg)_rotateY(8deg)_rotate(5deg)] sm:block sm:w-28">
        <div className="overflow-hidden rounded-[1.6rem] border-4 border-slate-800 bg-slate-950 shadow-2xl shadow-black/50 dark:border-slate-600">
          <div className="relative aspect-[9/18] overflow-hidden rounded-[1.3rem]">
            <img
              src="/images/hero/mobile-screenshot.webp"
              alt="The same website on a phone — mobile-first design by JPBC Web Designs"
              width={390}
              height={2000}
              loading="eager"
              fetchPriority="high"
              className="h-full w-full object-cover object-top"
            />
            {/* Speaker notch */}
            <div className="absolute left-1/2 top-1.5 h-1.5 w-10 -translate-x-1/2 rounded-full bg-slate-950/90" aria-hidden />
          </div>
        </div>
      </div>

      {/* Load-time badge, pinned to the laptop's top-left corner */}
      <div className="absolute -left-2 -top-4 z-10 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-ink shadow-lg sm:-left-6">
        Loads in 0.6s
      </div>
    </div>
  );
}
