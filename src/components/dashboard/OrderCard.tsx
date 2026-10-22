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
    <article className="rounded-lg bg-[#faf4ea] p-5 shadow-sm ring-1 ring-[#fad9a4] transition hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-black text-[#33241a]">{order.id}</p>
          <p className="mt-0.5 text-sm text-[#b59b7e]">
            {formatOrderDate(order.date)} · {itemCount} item{itemCount === 1 ? "" : "s"} · {order.payment}
          </p>
          {showCustomer && (
            <p className="mt-1 text-sm font-semibold text-[#b59b7e]">
              {order.name} <span className="font-normal text-[#b59b7e]">· {order.email}</span>
            </p>
          )}
        </div>
        {statusEditable ? (
          <label className="flex items-center gap-2">
            <span className="sr-only">Status for order {order.id}</span>
            <select
              value={order.status}
              onChange={(e) => onStatusChange?.(order.id, e.target.value as OrderStatus)}
              className="cursor-pointer rounded-full border border-[#fad9a4] bg-[#faf4ea] px-3 py-1.5 text-xs font-bold text-[#b59b7e] outline-none"
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

      <p className="mt-3 truncate text-sm text-[#b59b7e]">{summary || "No items"}</p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#f2b234] pt-3">
        <button onClick={() => setExpanded((v) => !v)} aria-expanded={expanded} className="text-sm font-bold text-brand-700 hover:text-brand-700">
          {expanded ? "Hide details ↑" : "View details ↓"}
        </button>
        <p className="text-sm font-bold text-[#33241a]">
          Total <span className="ml-1 text-base text-brand-700">{tk(order.total)}</span>
        </p>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 rounded-lg bg-[#faf4ea] p-4">
          <ul className="space-y-2 text-sm">
            {order.items.map((it, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span className="text-[#b59b7e]">{it.name} <span className="text-[#b59b7e]">× {it.qty}</span></span>
                <span className="shrink-0 font-semibold text-[#33241a]">{tk(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="grid gap-3 border-t border-[#fad9a4] pt-3 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold tracking-wide text-[#b59b7e] uppercase">Delivery address</p>
              <p className="mt-1 font-semibold text-[#b59b7e]">{order.name}</p>
              <p className="text-[#b59b7e]">{order.address}</p>
              <p className="text-[#b59b7e]">{order.district}</p>
              <p className="text-[#b59b7e]">{order.phone}</p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-wide text-[#b59b7e] uppercase">Order info</p>
              <p className="mt-1 text-[#b59b7e]">Payment: <span className="font-semibold text-[#b59b7e]">{order.payment}</span></p>
              <p className="text-[#b59b7e]">Email: <span className="font-semibold text-[#b59b7e]">{order.email}</span></p>
              <p className="text-[#b59b7e]">Status: <span className="font-semibold text-[#b59b7e]">{order.status}</span></p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
