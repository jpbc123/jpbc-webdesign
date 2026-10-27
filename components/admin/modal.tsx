"use client";

import { useRef } from "react";

/**
 * A button that opens a native <dialog> as a modal. Esc and a click on the
 * backdrop close it; children get `close` to call when they're done.
 */
export function Modal({
  label,
  title,
  className = "btn btn-primary",
  children,
}: {
  label: React.ReactNode;
  title: string;
  className?: string;
  children: (close: () => void) => React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();

  return (
    <>
      <button type="button" onClick={() => ref.current?.showModal()} className={className}>
        {label}
      </button>
      <dialog
        ref={ref}
        aria-label={title}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl bg-transparent p-0 text-left backdrop:bg-black/50"
      >
        <div className="card max-h-[90vh] overflow-y-auto p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-lg font-bold text-ink">{title}</h2>
            <button type="button" onClick={close} aria-label="Close" className="-m-1 rounded-full px-2 text-xl leading-none text-muted hover:text-ink">
              ×
            </button>
          </div>
          {children(close)}
        </div>
      </dialog>
    </>
  );
}
