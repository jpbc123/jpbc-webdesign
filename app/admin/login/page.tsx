import Logo from "@/components/Logo";
import { LoginForm } from "./login-form";

export const metadata = { title: "Sign in" };

const ERRORS: Record<string, string> = {
  "not-owner": "This account does not have access.",
  "no-supabase": "Supabase is not configured yet. Add the keys from .env.example to your environment variables.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="card w-full max-w-sm p-6 shadow-sm">
        <Logo />
        <h1 className="mt-6 text-xl font-bold text-ink">Client admin</h1>
        <p className="mt-1 text-sm text-muted">Client records, payments and receipts.</p>
        <LoginForm initialError={ERRORS[error ?? ""]} />
      </div>
    </div>
  );
}
