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
          <h2 className="text-[1.65rem] font-black leading-tight tracking-tight text-slate-900 sm:text-[2rem]">
            <span className="text-violet-600">{accent}</span> {rest}
          </h2>
          <span className="mt-2.5 block h-1 w-16 rounded-full bg-gradient-to-r from-violet-600 to-violet-400" aria-hidden />
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-slate-500">{subtitle}</p>}
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100 transition hover:border-violet-600 hover:text-violet-600 hover:shadow active:scale-[0.98]"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
