"use client";

import { useActionState } from "react";
import { inputCls, labelCls } from "@/components/admin/ui";
import { signIn, type LoginState } from "../_actions/auth";

export function LoginForm({ initialError }: { initialError?: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, { error: initialError });
  return (
    <form action={action} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className={labelCls}>
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="username" className={inputCls} required />
      </div>
      <div>
        <label htmlFor="password" className={labelCls}>
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" className={inputCls} required />
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn-primary w-full disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
