"use server";

import { redirect } from "next/navigation";
import { adminHref } from "@/lib/admin";
import { createAuthClient } from "@/lib/supabase/server";

export type LoginState = { error?: string };

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Please enter your email and password." };

  const supabase = await createAuthClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Incorrect email or password." };

  const { data: isOwner } = await supabase.rpc("is_owner");
  if (!isOwner) {
    await supabase.auth.signOut();
    return { error: "This account does not have access." };
  }
  redirect(adminHref(""));
}

export async function signOut() {
  const supabase = await createAuthClient();
  await supabase.auth.signOut();
  redirect(adminHref("/login"));
}
