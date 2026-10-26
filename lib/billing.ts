// Client records and the month maths behind "who owes what". Months are
// stored as the 1st of the month ("2026-11-01"); "now" is Malaysian time.

export type ClientStatus = "lead" | "active" | "paused" | "ended";

export type Client = {
  id: string;
  business_name: string;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  ssm_no: string | null;
  domains: string | null;
  site_url: string | null;
  hosting: string | null;
  plan: string | null;
  monthly_fee: number | null;
  billing_start: string | null;
  status: ClientStatus;
  notes: string | null;
  address: string | null;
  agreement_date: string | null;
  invoice_item: string | null;
  created_at: string;
};

export type Payment = {
  id: string;
  client_id: string;
  amount: number;
  paid_on: string;
  months: string[];
  method: string | null;
  invoice_no: string | null;
  notes: string | null;
  receipt_path: string | null;
  invoice_path: string | null;
  item_title: string | null;
  item_details: string | null;
  created_at: string;
};

/** Seller details printed on every invoice (the single jpbc.settings row). */
export type Settings = {
  trading_name: string;
  website: string | null;
  operator_name: string | null;
  reg_no: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  bank_details: string | null;
  invoice_notes: string | null;
};

export const STATUSES: ClientStatus[] = ["lead", "active", "paused", "ended"];
export const METHODS = ["Bank transfer", "DuitNow", "Cash", "Card", "Other"];

/** Today in Malaysia as YYYY-MM-DD. */
export function todayKL(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kuala_Lumpur" }).format(new Date());
}

/** "2026-11-15" or "2026-11" → "2026-11-01". */
export function monthKey(date: string): string {
  return `${date.slice(0, 7)}-01`;
}

/** Adds n months to a month key. */
export function addMonths(key: string, n: number): string {
  const [y, m] = key.split("-").map(Number);
  const total = y * 12 + (m - 1) + n;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}-01`;
}

/** Every month key from `from` to `to`, inclusive. */
export function monthRange(from: string, to: string): string[] {
  const out: string[] = [];
  for (let k = monthKey(from); k <= monthKey(to); k = addMonths(k, 1)) out.push(k);
  return out;
}

/** "2026-11-01" → "Nov 2026". */
export function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-MY", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** "2026-11-15" → "15 Nov 2026". */
export function dateLabel(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-MY", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

/** "2026-11-15" → "15 November 2026". */
export function longDateLabel(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function rm(amount: number | null | undefined): string {
  return `RM${Number(amount ?? 0).toLocaleString("en-MY", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

/**
 * Months an active client should have paid by now (from billing_start up to
 * this month) that no payment covers yet.
 */
export function unpaidMonths(client: Client, payments: Payment[], today = todayKL()): string[] {
  if (client.status !== "active" || !client.billing_start || !client.monthly_fee) return [];
  const paid = new Set(payments.filter((p) => p.client_id === client.id).flatMap((p) => p.months.map(monthKey)));
  return monthRange(client.billing_start, today).filter((k) => !paid.has(k));
}

/** First month not yet covered: the default "from" month for a new payment. */
export function nextUnpaidMonth(client: Client, payments: Payment[], today = todayKL()): string {
  const owed = unpaidMonths(client, payments, today);
  if (owed.length) return owed[0];
  const covered = payments.filter((p) => p.client_id === client.id).flatMap((p) => p.months.map(monthKey)).sort();
  return covered.length ? addMonths(covered[covered.length - 1], 1) : monthKey(client.billing_start ?? today);
}
