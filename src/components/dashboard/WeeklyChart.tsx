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
    <div className="rounded-2xl bg-[#f8f7ff] p-5 shadow-sm ring-1 ring-[#c4e2d0]">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-black text-[#1e1b2e]">Orders — last 7 days</h3>
        <p className="text-sm font-bold text-brand-800">{total} order{total === 1 ? "" : "s"}</p>
      </div>
      {total === 0 ? (
        <p className="mt-4 text-sm text-[#7a7391]">No orders in the last 7 days yet. New orders will appear here as bars.</p>
      ) : null}
      <div className="mt-5 flex h-36 items-end gap-2 sm:gap-3" role="img" aria-label={`Bar chart of orders over the last 7 days, ${total} orders total`}>
        {days.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs font-bold text-[#7a7391]">{d.count}</span>
            <div
              className={`w-full max-w-10 rounded-t-xl transition-all ${i === days.length - 1 ? "bg-brand-500" : "bg-[#f8f7ff]/80"}`}
              style={{ height: `${Math.max(d.count === 0 ? 4 : (d.count / max) * 100, 4)}%` }}
            />
            <span className="text-xs font-semibold text-[#7a7391]">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
