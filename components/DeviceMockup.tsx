/**
 * Pure-CSS laptop + phone mockup showing a miniature sample client site.
 * No images = nothing to load = the hero itself proves the speed pitch.
 */
export default function DeviceMockup() {
  return (
    <div className="relative mx-auto w-full max-w-lg select-none" aria-hidden>
      {/* Laptop */}
      <div className="rounded-t-xl border-4 border-slate-700 bg-white shadow-2xl dark:border-slate-600 dark:bg-slate-900">
        <div className="rounded-t-lg bg-white p-3 dark:bg-slate-900">
          {/* Mini site: hero */}
          <div className="rounded-md bg-[#0b1f3a] p-3">
            <div className="flex items-center justify-between">
              <div className="h-2 w-14 rounded bg-cyan-400" />
              <div className="flex gap-1">
                <div className="h-1.5 w-6 rounded bg-white/40" />
                <div className="h-1.5 w-6 rounded bg-white/40" />
                <div className="h-1.5 w-6 rounded bg-white/40" />
              </div>
            </div>
            <div className="mt-4 h-3 w-3/4 rounded bg-white/90" />
            <div className="mt-1.5 h-3 w-1/2 rounded bg-white/90" />
            <div className="mt-3 flex gap-2">
              <div className="h-4 w-16 rounded-full bg-cyan-400" />
              <div className="h-4 w-16 rounded-full border border-white/40" />
            </div>
          </div>
          {/* Mini site: content cards */}
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="h-10 rounded bg-slate-100 dark:bg-slate-800" />
            <div className="h-10 rounded bg-slate-100 dark:bg-slate-800" />
            <div className="h-10 rounded bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="mt-2 h-2 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-1 h-2 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
      <div className="mx-auto h-3 w-3/4 rounded-b-xl bg-slate-300 shadow-lg dark:bg-slate-700" />

      {/* Phone, floating over the laptop's corner */}
      <div className="absolute -bottom-6 -right-2 w-24 rotate-6 rounded-2xl border-4 border-slate-700 bg-white p-1.5 shadow-2xl dark:border-slate-600 dark:bg-slate-900 sm:w-28">
        <div className="rounded-lg bg-[#0b1f3a] p-2">
          <div className="h-1.5 w-8 rounded bg-cyan-400" />
          <div className="mt-2 h-2 w-full rounded bg-white/90" />
          <div className="mt-1 h-2 w-2/3 rounded bg-white/90" />
          <div className="mt-2 h-3 w-12 rounded-full bg-cyan-400" />
        </div>
        <div className="mt-1.5 space-y-1">
          <div className="h-6 rounded bg-slate-100 dark:bg-slate-800" />
          <div className="h-6 rounded bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>

      {/* Load-time badge */}
      <div className="absolute -left-2 -top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-ink shadow-lg sm:-left-6">
        Loads in 0.6s ⚡
      </div>
    </div>
  );
}
