"use client";

import type { StoredOrder } from "@/types";

function dayLabel(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "short" });
}

export default function WeeklyChart({ orders }: { orders: StoredOrder[] }) {
  const days: { label: string; count: number }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const next = new Date(day);
    next.setDate(day.getDate() + 1);
    const count = orders.filter((o) => {
      const t = new Date(o.date).getTime();
      return !Number.isNaN(t) && t >= day.getTime() && t < next.getTime();
    }).length;
    days.push({ label: dayLabel(day), count });
  }
  const max = Math.max(1, ...days.map((d) => d.count));
  const total = days.reduce((s, d) => s + d.count, 0);

  return (
    <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#e3e7ef]">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-black text-[#1c2a1e]">Orders — last 7 days</h3>
        <p className="text-sm font-bold text-brand-700">{total} order{total === 1 ? "" : "s"}</p>
      </div>
      {total === 0 ? (
        <p className="mt-4 text-sm text-[#64748b]">No orders in the last 7 days yet. New orders will appear here as bars.</p>
      ) : null}
      <div className="mt-5 flex h-36 items-end gap-2 sm:gap-3" role="img" aria-label={`Bar chart of orders over the last 7 days, ${total} orders total`}>
        {days.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs font-bold text-[#64748b]">{d.count}</span>
            <div
              className={`w-full max-w-10 rounded-t-xl transition-all ${i === days.length - 1 ? "bg-brand-500" : "bg-popblue-200"}`}
              style={{ height: `${Math.max(d.count === 0 ? 4 : (d.count / max) * 100, 4)}%` }}
            />
            <span className="text-xs font-semibold text-[#64748b]">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
