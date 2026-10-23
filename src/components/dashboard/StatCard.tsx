"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type StatCardProps = {
  label: string;
  value: string;
  icon: ReactNode;
  sub?: string;
  accent?: string;
  delay?: number;
};

export default function StatCard({ label, value, icon, sub, accent = "bg-brand-100 text-brand-700", delay = 0 }: StatCardProps) {
  return (
    <Reveal delay={delay}>
      <div className="rounded-lg bg-[#f8f7fe] p-5 shadow-sm ring-1 ring-[#e2def6] transition hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-[#7d7499]">{label}</p>
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${accent}`}>{icon}</span>
        </div>
        <p className="mt-2 truncate text-3xl font-black tracking-tight text-[#191430]">{value}</p>
        {sub && <p className="mt-1 text-xs font-semibold text-[#7d7499]">{sub}</p>}
      </div>
    </Reveal>
  );
}
