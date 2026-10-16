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
        <div className="max-w-xl border-l-4 border-yellow-500 pl-4 sm:pl-5">
          <h2 className="text-[1.65rem] font-black uppercase leading-tight tracking-tight text-slate-900 sm:text-[2rem]">
            <span className="text-yellow-600">{accent}</span> {rest}
          </h2>
          <span className="mt-2.5 block h-1.5 w-28 -skew-x-12 bg-yellow-500" aria-hidden />
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-slate-500">{subtitle}</p>}
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-lg border-2 border-neutral-950 bg-yellow-400 px-5 py-2.5 text-sm font-black text-neutral-950 shadow-[3px_3px_0_#09090b] transition hover:-translate-y-0.5 hover:bg-yellow-300 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
