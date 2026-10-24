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
      <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#f2d9e3] transition hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-[#a08870]">{label}</p>
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${accent}`}>{icon}</span>
        </div>
        <p className="mt-2 truncate text-3xl font-black tracking-tight text-[#2b1f16]">{value}</p>
        {sub && <p className="mt-1 text-xs font-semibold text-[#a08870]">{sub}</p>}
      </div>
    </Reveal>
  );
}
