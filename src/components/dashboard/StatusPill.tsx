"use client";

import type { OrderStatus } from "@/types";

export const STATUSES: OrderStatus[] = ["Processing", "Shipped", "Delivered", "Cancelled"];

export const STATUS_STYLES: Record<OrderStatus, string> = {
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-amber-100 text-emerald-800",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

export function formatOrderDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function initials(name?: string | null, email?: string | null) {
  const base = (name ?? email ?? "G").trim();
  return base.slice(0, 1).toUpperCase();
}

export function StatusPill({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}
