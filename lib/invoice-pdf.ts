import { PDFDocument, rgb, StandardFonts, type PDFFont, type PDFPage } from "pdf-lib";
import { addMonths, longDateLabel, monthKey, type Client, type Payment, type Settings } from "./billing";

// Draws the A4 invoice for one recorded payment, laid out like the first one
// sent to Gary (INV-20261015-001): seller top left, INVOICE + meta top right,
// bill-to, one line item, totals, payment and notes. Always "PAID", since
// invoices are made from payments already received.

const hex = (h: string) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const INK = hex("#1f2937");
const MUTED = hex("#6b7280");
const LINE = hex("#d1d5db");
const ACCENT = hex("#1d4ed8");

const MM = 72 / 25.4;
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 18 * MM;
const RIGHT = PAGE_W - MARGIN;
const WIDTH = RIGHT - MARGIN;

const BASE = 9.5;
const SMALL = 8.5;

/** The standard PDF fonts only cover WinAnsi; swap or drop anything else. */
function clean(text: string): string {
  return text
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, "");
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const out: string[] = [];
  for (const para of text.split(/\r?\n/).map(clean)) {
    let line = "";
    for (const word of para.split(/\s+/).filter(Boolean)) {
      const next = line ? `${line} ${word}` : word;
      if (line && font.widthOfTextAtSize(next, size) > maxWidth) {
        out.push(line);
        line = word;
      } else line = next;
    }
    out.push(line);
  }
  return out;
}

const money = (n: number) => n.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** "2026-11-01" → "1 Nov 2026"; lastDay gives the month's last day instead. */
function dayMonth(key: string, lastDay = false): string {
  const [y, m] = key.split("-").map(Number);
  const d = lastDay ? new Date(Date.UTC(y, m, 0)) : new Date(Date.UTC(y, m - 1, 1));
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

function servicePeriod(months: string[]): string | null {
  const keys = [...new Set(months.map(monthKey))].sort();
  if (!keys.length) return null;
  const n = keys.length;
  const contiguous = keys.every((k, i) => i === 0 || addMonths(keys[i - 1], 1) === k);
  if (contiguous)
    return `Service period: ${dayMonth(keys[0])} to ${dayMonth(keys[n - 1], true)} (${n} month${n === 1 ? "" : "s"}).`;
  return `Service months: ${keys.map((k) => dayMonth(k).replace(/^1 /, "")).join(", ")}.`;
}

function paymentLine(p: Payment, s: Settings): string {
  const method = (p.method ?? "").trim();
  const to = s.bank_details?.trim() ? ` to ${s.bank_details.trim()}` : "";
  let how = "";
  if (/^bank transfer$/i.test(method) || /^duitnow$/i.test(method)) how = ` by ${method === "DuitNow" ? "DuitNow" : "bank transfer"}${to}`;
  else if (/^cash$/i.test(method)) how = " in cash";
  else if (/^card$/i.test(method)) how = " by card";
  return `Received in full on ${longDateLabel(p.paid_on)}${how}.`;
}

export type InvoiceInput = { invoiceNo: string; payment: Payment; client: Client; settings: Settings };

/** The invoice's one line item: title, detail lines, qty and prices. */
function invoiceItem({ payment: p, client: c }: Pick<InvoiceInput, "payment" | "client">) {
  const qty = p.months.length || 1;
  const amount = Number(p.amount);
  const host = (c.site_url ?? c.domains ?? "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const defaultTitle = p.months.length ? `${c.plan?.trim() || "Website plan"}: monthly fee` : "Website services";
  const defaultDetails = p.months.length
    ? c.invoice_item?.trim() || (host ? `Website ${host}: hosting, maintenance and support.` : "Website hosting, maintenance and support.")
    : "";

  const details = [p.item_details?.trim() || defaultDetails];
  if (p.months.length) {
    details.push(servicePeriod(p.months) ?? "");
    if (c.agreement_date) details.push(`As per the ${c.plan?.trim() || "service"} agreement signed ${longDateLabel(c.agreement_date)}.`);
  }
  return {
    title: p.item_title?.trim() || defaultTitle,
    details: details.filter(Boolean),
    qty,
    unit: amount / qty,
    amount,
  };
}

export async function buildInvoicePdf(input: InvoiceInput): Promise<Uint8Array> {
  const { invoiceNo, payment: p, client: c, settings: s } = input;
  const doc = await PDFDocument.create();
  const seller = s.trading_name || "JPBC Web Designs";
  doc.setTitle(`Invoice ${invoiceNo}`);
  doc.setAuthor(s.operator_name ? `${seller} (${s.operator_name})` : seller);
  doc.setCreator(seller);

  const page: PDFPage = doc.addPage([PAGE_W, PAGE_H]);
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  type Opts = { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb> };
  const text = (t: string, x: number, y: number, o: Opts = {}) =>
    page.drawText(clean(t), { x, y, font: o.font ?? regular, size: o.size ?? BASE, color: o.color ?? INK });
  const textRight = (t: string, right: number, y: number, o: Opts = {}) => {
    const font = o.font ?? regular;
    const size = o.size ?? BASE;
    text(t, right - font.widthOfTextAtSize(clean(t), size), y, o);
  };
  const rule = (x1: number, x2: number, y: number, thickness: number, color = INK) =>
    page.drawLine({ start: { x: x1, y }, end: { x: x2, y }, thickness, color });
  /** Wrapped lines going down from y; returns the y below the last line. */
  const lines = (t: string, x: number, y: number, maxWidth: number, o: Opts & { leading?: number } = {}) => {
    const size = o.size ?? BASE;
    const leading = o.leading ?? (size === SMALL ? 12 : 13.5);
    for (const l of wrap(t, o.font ?? regular, size, maxWidth)) {
      text(l, x, y, o);
      y -= leading;
    }
    return y;
  };
  const label = (t: string, y: number) => text(t, MARGIN, y, { font: bold, size: SMALL, color: MUTED });

  // ---- header: seller (left) and INVOICE + meta (right)
  const top = PAGE_H - MARGIN;
  const leftW = WIDTH - 70 * MM - 6;
  let y = top - 14;
  text(seller.toUpperCase(), MARGIN, y, { font: bold, size: 14 });
  y -= 13;
  if (s.website) y = lines(s.website, MARGIN, y, leftW, { size: SMALL, color: MUTED });
  y -= 2 * MM;
  if (s.operator_name) {
    text("Operated by ", MARGIN, y, { size: SMALL, color: MUTED });
    text(s.operator_name.toUpperCase(), MARGIN + regular.widthOfTextAtSize("Operated by ", SMALL), y, { font: bold, size: SMALL, color: MUTED });
    y -= 12;
  }
  if (s.reg_no) y = lines(`SSM Reg. No. ${s.reg_no}`, MARGIN, y, leftW, { size: SMALL, color: MUTED });
  if (s.address) y = lines(s.address, MARGIN, y, leftW, { size: SMALL, color: MUTED });
  if (s.phone) y = lines(`Tel: ${s.phone}`, MARGIN, y, leftW, { size: SMALL, color: MUTED });
  if (s.email) y = lines(`Email: ${s.email}`, MARGIN, y, leftW, { size: SMALL, color: MUTED });
  const leftBottom = y;

  textRight("INVOICE", RIGHT, top - 20, { font: bold, size: 22, color: ACCENT });
  const metaX = RIGHT - 70 * MM;
  let my = top - 20 - 26 - 4 * MM + 13;
  for (const [k, v, o] of [
    ["Invoice no.", invoiceNo, { font: bold }],
    ["Invoice date", longDateLabel(p.paid_on), {}],
    ["Status", "PAID", { font: bold, color: ACCENT }],
  ] as const) {
    text(k, metaX, my, { size: SMALL, color: MUTED });
    textRight(v, RIGHT, my, o);
    my -= 16;
  }
  y = Math.min(leftBottom, my) - 8 * MM;

  // ---- bill to
  label("BILL TO", y);
  y -= 15;
  y = lines(c.business_name.toUpperCase(), MARGIN, y, WIDTH, { font: bold });
  if (c.ssm_no) y = lines(`SSM Reg. No. ${c.ssm_no}`, MARGIN, y, WIDTH * 0.7, { size: SMALL, color: MUTED });
  if (c.address) y = lines(c.address, MARGIN, y, WIDTH * 0.7, { size: SMALL, color: MUTED });
  if (c.contact_name) y = lines(`Attn: ${c.contact_name}`, MARGIN, y, WIDTH * 0.7, { size: SMALL, color: MUTED });
  y -= 8 * MM;

  // ---- line item
  const colAmount = RIGHT;
  const colUnit = RIGHT - 32 * MM;
  const colQty = colUnit - 32 * MM;
  const descW = WIDTH - 78 * MM - 6;
  text("Description", MARGIN, y, { font: bold });
  textRight("Qty", colQty, y, { font: bold });
  textRight("Unit price (RM)", colUnit, y, { font: bold });
  textRight("Amount (RM)", colAmount, y, { font: bold });
  y -= 7;
  rule(MARGIN, RIGHT, y, 0.8);
  y -= 15;

  const item = invoiceItem(input);
  textRight(String(item.qty), colQty, y);
  textRight(money(item.unit), colUnit, y);
  textRight(money(item.amount), colAmount, y);
  y = lines(item.title, MARGIN, y, descW, { font: bold });
  for (const d of item.details) y = lines(d, MARGIN, y, descW, { size: SMALL, color: MUTED });
  y -= 2;
  rule(MARGIN, RIGHT, y, 0.5, LINE);
  y -= 3 * MM + 12;

  // ---- totals
  const valueLeft = RIGHT - 32 * MM;
  const labelRight = valueLeft - 6;
  const row = (k: string, v: string, strong = false) => {
    textRight(k, labelRight, y, strong ? { font: bold } : {});
    textRight(v, RIGHT, y, strong ? { font: bold } : {});
    y -= 19;
  };
  row("Subtotal", money(item.amount));
  row("SST", "Not charged");
  rule(valueLeft, RIGHT, y + 13, 0.8);
  row("Total (RM)", money(item.amount), true);
  row("Amount paid", money(item.amount));
  rule(valueLeft, RIGHT, y + 13, 0.5, LINE);
  row("Balance due (RM)", "0.00", true);
  y -= 10 * MM - 19 + 12;

  // ---- payment + notes
  label("PAYMENT", y);
  y -= 16;
  y = lines(paymentLine(p, s), MARGIN, y, WIDTH);
  y -= 6 * MM - 4;

  const notes = (s.invoice_notes ?? "").split(/\r?\n/).filter((n) => n.trim());
  const lastMonth = [...p.months].map(monthKey).sort().pop();
  if (lastMonth && c.status === "active" && Number(c.monthly_fee) > 0)
    notes.push(`The next monthly fee of RM${money(Number(c.monthly_fee))} is due on ${longDateLabel(addMonths(lastMonth, 1))}.`);
  if (notes.length) {
    label("NOTES", y);
    y -= 15;
    for (const n of notes) y = lines(n, MARGIN, y, WIDTH, { size: SMALL, color: MUTED });
    y -= 12 * MM - 12;
  }

  text(`Thank you for choosing ${seller}.`, MARGIN, y);
  y -= 18;
  text("This is a computer-generated invoice. No signature is required.", MARGIN, y, { size: SMALL, color: MUTED });

  return doc.save();
}
