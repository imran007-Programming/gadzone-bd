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
        <div className="max-w-xl rounded-l-3xl border-l-8 border-rose-700 pl-4 sm:pl-5">
          <h2 className="text-[1.65rem] font-black uppercase leading-tight tracking-tight text-stone-900 sm:text-[2rem]">
            <span className="text-rose-700">{accent}</span> {rest}
          </h2>
          <span className="mt-2.5 block h-1.5 w-28 rounded-full bg-gradient-to-r from-rose-700 to-amber-200" aria-hidden />
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-stone-500">{subtitle}</p>}
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full bg-white px-6 py-2.5 text-sm font-bold text-rose-800 shadow-lg shadow-stone-900/10 ring-2 ring-rose-200 transition hover:-translate-y-0.5 hover:bg-rose-700 hover:text-white hover:ring-rose-700 active:translate-y-0"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
