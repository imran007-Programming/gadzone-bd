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
        <div className="max-w-xl">
          <h2 className="flex items-center gap-3 text-[1.65rem] font-black leading-tight tracking-tight text-slate-900 sm:text-[2rem]">
            <span className="inline-block h-3.5 w-3.5 rotate-45 bg-gradient-to-br from-brand-500 to-amber-400" aria-hidden />
            <span><span className="text-brand-700">{accent}</span> {rest}</span>
          </h2>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-slate-500">{subtitle}</p>}
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-xl bg-brand-700 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-700/25 transition hover:-translate-y-0.5 hover:bg-brand-800 active:translate-y-0"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
