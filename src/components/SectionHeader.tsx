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
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">{accent}</span> {rest}
          </h2>
          <span className="mt-2.5 flex items-center gap-2" aria-hidden>
            <span className="block h-2.5 w-2.5 rotate-45 bg-amber-500" />
            <span className="block h-[3px] w-16 rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-amber-400" />
            <span className="block h-2.5 w-2.5 rotate-45 bg-orange-600" />
          </span>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-slate-500">{subtitle}</p>}
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-xl border border-orange-200 bg-white px-5 py-2.5 text-sm font-bold text-orange-700 shadow-sm ring-1 ring-orange-100 transition hover:border-orange-500 hover:bg-orange-600 hover:text-white hover:shadow-lg hover:shadow-orange-600/25 active:scale-[0.98]"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
