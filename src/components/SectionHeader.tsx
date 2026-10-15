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
            <span className="bg-gradient-to-r from-lime-600 to-yellow-500 bg-clip-text text-transparent">{accent}</span> {rest}
          </h2>
          <span className="mt-2.5 flex items-center gap-2" aria-hidden>
            <span className="block h-2.5 w-2.5 rounded-full bg-lime-600" />
            <span className="block h-[3px] w-16 rounded-full bg-gradient-to-r from-lime-600 via-yellow-500 to-yellow-400" />
            <span className="block h-2.5 w-2.5 rounded-full bg-yellow-500" />
          </span>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-slate-500">{subtitle}</p>}
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full border-2 border-neutral-900 bg-lime-400 px-5 py-2.5 text-sm font-black text-neutral-900 shadow-[3px_3px_0_#171717] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:scale-[0.98]"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
