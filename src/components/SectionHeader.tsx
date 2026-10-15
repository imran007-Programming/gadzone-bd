"use client";

import Reveal from "./Reveal";

type SectionHeaderProps = {
  accent: string;
  rest: string;
  subtitle?: string;
  showViewAll?: boolean;
};

export default function SectionHeader({ accent, rest, subtitle, showViewAll = true }: SectionHeaderProps) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl border-l-4 border-emerald-600 pl-4 sm:pl-5">
          <h2 className="text-[1.65rem] font-black leading-tight tracking-tight text-slate-900 sm:text-[2rem]">
            <span className="text-emerald-700">{accent}</span> {rest}
          </h2>
          <span className="mt-2.5 block h-1 w-24 rounded-full bg-gradient-to-r from-emerald-600 to-lime-400" aria-hidden />
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-slate-500">{subtitle}</p>}
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full border-2 border-emerald-600 bg-emerald-600 px-5 py-2.5 text-sm font-black text-white shadow-[0_12px_28px_-10px_rgba(5,150,105,0.7)] transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:border-emerald-700 active:scale-[0.98]"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
