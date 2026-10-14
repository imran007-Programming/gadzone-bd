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
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">{accent}</span> {rest}
          </h2>
          <span className="mt-2.5 flex items-center gap-1.5" aria-hidden>
            <span className="block h-2 w-12 -skew-x-12 rounded-sm bg-gradient-to-r from-amber-600 to-orange-500" />
            <span className="block h-2 w-2 -skew-x-12 rounded-sm bg-orange-500" />
            <span className="block h-2 w-2 -skew-x-12 rounded-sm bg-amber-300" />
          </span>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-slate-500">{subtitle}</p>}
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full border border-amber-200 bg-white px-5 py-2.5 text-sm font-bold text-amber-700 shadow-sm ring-1 ring-amber-100 transition hover:border-amber-500 hover:bg-amber-600 hover:text-white hover:shadow-lg hover:shadow-amber-600/25 active:scale-[0.98]"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
