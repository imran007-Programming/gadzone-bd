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
    <article className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#f2d9e3] transition hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-black text-[#2b1f16]">{order.id}</p>
          <p className="mt-0.5 text-sm text-[#a08870]">
            {formatOrderDate(order.date)} · {itemCount} item{itemCount === 1 ? "" : "s"} · {order.payment}
          </p>
          {showCustomer && (
            <p className="mt-1 text-sm font-semibold text-[#a08870]">
              {order.name} <span className="font-normal text-[#a08870]">· {order.email}</span>
            </p>
          )}
        </div>
        {statusEditable ? (
          <label className="flex items-center gap-2">
            <span className="sr-only">Status for order {order.id}</span>
            <select
              value={order.status}
              onChange={(e) => onStatusChange?.(order.id, e.target.value as OrderStatus)}
              className="cursor-pointer rounded-full border border-[#f2d9e3] bg-white px-3 py-1.5 text-xs font-bold text-[#a08870] outline-none"
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

      <p className="mt-3 truncate text-sm text-[#a08870]">{summary || "No items"}</p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#f2d9e3] pt-3">
        <button onClick={() => setExpanded((v) => !v)} aria-expanded={expanded} className="text-sm font-bold text-brand-700 hover:text-brand-700">
          {expanded ? "Hide details ↑" : "View details ↓"}
        </button>
        <p className="text-sm font-bold text-[#2b1f16]">
          Total <span className="ml-1 text-base text-brand-700">{tk(order.total)}</span>
        </p>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 rounded-lg bg-white p-4">
          <ul className="space-y-2 text-sm">
            {order.items.map((it, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span className="text-[#a08870]">{it.name} <span className="text-[#a08870]">× {it.qty}</span></span>
                <span className="shrink-0 font-semibold text-[#2b1f16]">{tk(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="grid gap-3 border-t border-[#f2d9e3] pt-3 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold tracking-wide text-[#a08870] uppercase">Delivery address</p>
              <p className="mt-1 font-semibold text-[#a08870]">{order.name}</p>
              <p className="text-[#a08870]">{order.address}</p>
              <p className="text-[#a08870]">{order.district}</p>
              <p className="text-[#a08870]">{order.phone}</p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-wide text-[#a08870] uppercase">Order info</p>
              <p className="mt-1 text-[#a08870]">Payment: <span className="font-semibold text-[#a08870]">{order.payment}</span></p>
              <p className="text-[#a08870]">Email: <span className="font-semibold text-[#a08870]">{order.email}</span></p>
              <p className="text-[#a08870]">Status: <span className="font-semibold text-[#a08870]">{order.status}</span></p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
