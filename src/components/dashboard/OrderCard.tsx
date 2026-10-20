"use client";

import { useState } from "react";
import { tk } from "@/lib/format";
import type { OrderStatus, StoredOrder } from "@/types";
import { STATUSES, StatusPill, formatOrderDate } from "./StatusPill";

type OrderCardProps = {
  order: StoredOrder;
  showCustomer?: boolean;
  statusEditable?: boolean;
  onStatusChange?: (id: string, next: OrderStatus) => void;
  defaultExpanded?: boolean;
};

export default function OrderCard({ order, showCustomer, statusEditable, onStatusChange, defaultExpanded }: OrderCardProps) {
  const [expanded, setExpanded] = useState(!!defaultExpanded);
  const itemCount = order.items.reduce((s, it) => s + it.qty, 0);
  const summary = order.items.slice(0, 2).map((it) => `${it.name} × ${it.qty}`).join(" · ") + (order.items.length > 2 ? ` +${order.items.length - 2} more` : "");

  return (
    <article className="rounded-2xl bg-[#fffdfd] p-5 shadow-sm ring-1 ring-[#ffe9ef] transition hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-black text-[#2b1b21]">{order.id}</p>
          <p className="mt-0.5 text-sm text-[#6f565e]">
            {formatOrderDate(order.date)} · {itemCount} item{itemCount === 1 ? "" : "s"} · {order.payment}
          </p>
          {showCustomer && (
            <p className="mt-1 text-sm font-semibold text-[#6f565e]">
              {order.name} <span className="font-normal text-[#6f565e]">· {order.email}</span>
            </p>
          )}
        </div>
        {statusEditable ? (
          <label className="flex items-center gap-2">
            <span className="sr-only">Status for order {order.id}</span>
            <select
              value={order.status}
              onChange={(e) => onStatusChange?.(order.id, e.target.value as OrderStatus)}
              className="cursor-pointer rounded-full border border-[#ffe9ef] bg-[#fffdfd] px-3 py-1.5 text-xs font-bold text-[#6f565e] outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        ) : (
          <StatusPill status={order.status} />
        )}
      </div>

      <p className="mt-3 truncate text-sm text-[#6f565e]">{summary || "No items"}</p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#fffdfd] pt-3">
        <button onClick={() => setExpanded((v) => !v)} aria-expanded={expanded} className="text-sm font-bold text-brand-800 hover:text-brand-700">
          {expanded ? "Hide details ↑" : "View details ↓"}
        </button>
        <p className="text-sm font-bold text-[#2b1b21]">
          Total <span className="ml-1 text-base text-brand-800">{tk(order.total)}</span>
        </p>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 rounded-2xl bg-[#fffdfd] p-4">
          <ul className="space-y-2 text-sm">
            {order.items.map((it, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span className="text-[#6f565e]">{it.name} <span className="text-[#6f565e]">× {it.qty}</span></span>
                <span className="shrink-0 font-semibold text-[#2b1b21]">{tk(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="grid gap-3 border-t border-[#ffe9ef] pt-3 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold tracking-wide text-[#6f565e] uppercase">Delivery address</p>
              <p className="mt-1 font-semibold text-[#6f565e]">{order.name}</p>
              <p className="text-[#6f565e]">{order.address}</p>
              <p className="text-[#6f565e]">{order.district}</p>
              <p className="text-[#6f565e]">{order.phone}</p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-wide text-[#6f565e] uppercase">Order info</p>
              <p className="mt-1 text-[#6f565e]">Payment: <span className="font-semibold text-[#6f565e]">{order.payment}</span></p>
              <p className="text-[#6f565e]">Email: <span className="font-semibold text-[#6f565e]">{order.email}</span></p>
              <p className="text-[#6f565e]">Status: <span className="font-semibold text-[#6f565e]">{order.status}</span></p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
