import type { Market } from "@/config/markets/types";

/**
 * Hero visual: a shoplot front. A fascia signboard ("BISNES ANDA" — your
 * business, with the kinds of business we serve underneath) over a striped
 * awning, and in the window, a live site we built on a laptop-width browser
 * and a phone. The point it makes: your business, with its website in the
 * window. The sign deliberately avoids "shop" so a clinic or a vet sees
 * itself in it too.
 *
 * Frames are pure CSS — zero payload beyond the two screenshots. They are
 * full-page captures of the live dental demo site; refresh them with
 *   node scripts/capture-hero.mjs [url]
 * which overwrites public/images/hero/{desktop,mobile}-screenshot.webp.
 *
 * On devices with a real pointer, hovering the window slowly pans the
 * screenshot to the bottom of the page, like someone scrolling the site.
 * (Tailwind v4 scopes hover: to @media (hover:hover); motion-reduce: disables it.)
 */
export default function ShopfrontMockup({ market }: { market: Market }) {
  return (
    <div className="relative mx-auto w-full max-w-md select-none lg:max-w-lg">
      <div className="board overflow-hidden bg-surface-2">
        {/* Fascia signboard */}
        <div className="screws border-b-2 border-frame bg-sign-green px-6 py-4 text-center text-sign-green-ink [--sign-glow:var(--sign-green-ink)]">
          <p className="sign sign-lit text-3xl sm:text-4xl">{market.signage.shopName}</p>
          {/* A no-break space glues each dot to the word before it, so a wrapped
              line never starts with "·". */}
          <p className="mt-2 text-balance text-[0.62rem] font-bold uppercase tracking-[0.1em] opacity-90 sm:text-[0.7rem] sm:tracking-[0.14em]">
            {market.signage.shopSub.split(" · ").join("\u00a0· ")}
          </p>
        </div>

        <div className="awning" aria-hidden />

        {/* Shop window */}
        <div className="group relative -mt-2 px-5 pb-8 pt-2 sm:px-8">
          <div className="overflow-hidden rounded-tag border-2 border-frame bg-surface shadow-[4px_4px_0_var(--shadow-hard)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 border-b-2 border-frame bg-surface-2 px-3 py-2" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-sign-red" />
              <span className="h-2.5 w-2.5 rounded-full bg-sign-yellow" />
              <span className="h-2.5 w-2.5 rounded-full bg-sign-green" />
              <span className="ml-2 h-4 flex-1 rounded-sm bg-surface" />
            </div>
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

          {/* Phone leaning against the window */}
          <div className="absolute -bottom-2 right-1 hidden w-24 rotate-[5deg] sm:block sm:w-28">
            <div className="overflow-hidden rounded-[1.4rem] border-4 border-frame bg-sign-black shadow-[4px_4px_0_var(--shadow-hard)]">
              <div className="relative aspect-[9/18] overflow-hidden rounded-[1.1rem]">
                <img
                  src="/images/hero/mobile-screenshot.webp"
                  alt="The same website on a phone — mobile-first design by JPBC Web Designs"
                  width={390}
                  height={2000}
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price-tag style load-time label hanging off the corner */}
      <div className="absolute -left-3 top-24 z-10 -rotate-6 sm:-left-8">
        <div className="sign rounded-tag border-2 border-frame bg-sign-yellow px-3 py-2 text-sm text-sign-yellow-ink shadow-[3px_3px_0_var(--shadow-hard)]">
          Loads in 0.6s
        </div>
      </div>
    </div>
  );
}
