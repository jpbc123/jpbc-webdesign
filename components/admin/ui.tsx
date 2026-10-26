"use client";

import { startTransition, useActionState } from "react";
import { useFormStatus } from "react-dom";

/** Shared field styles for the admin forms. */
export const labelCls = "mb-1 block text-sm font-semibold text-ink";
export const inputCls =
  "w-full rounded-xl border border-line-strong bg-surface px-3 py-2.5 text-ink placeholder:text-muted/60 focus:border-accent";

/**
 * Like useActionState, but submits via onSubmit so React does not reset the
 * form's fields when the server returns a validation error.
 */
export function useFormAction<S>(action: (prev: S, fd: FormData) => Promise<S>, initial: S) {
  const [state, dispatch, pending] = useActionState<S, FormData>(
    action as (prev: Awaited<S>, fd: FormData) => Promise<S>,
    initial as Awaited<S>,
  );
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => dispatch(fd));
  };
  return [state, onSubmit, pending] as const;
}

export function SubmitButton({
  children,
  pendingText = "Saving…",
  className = "btn btn-primary",
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${className} disabled:opacity-60`}>
      {pending ? pendingText : children}
    </button>
  );
}

/** Button that asks for confirmation before running a server action. */
export function ConfirmButton({
  action,
  message,
  children,
  className = "text-sm font-semibold text-red-600 hover:underline",
}: {
  action: () => Promise<void>;
  message: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      <SubmitButton className={className} pendingText="Working…">
        {children}
      </SubmitButton>
    </form>
  );
}
