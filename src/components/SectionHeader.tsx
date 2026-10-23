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
          <h2 className="flex items-center gap-3 text-[1.65rem] font-black leading-tight tracking-tight text-ink sm:text-[2rem]">
            <span className="starburst pop-bob relative inline-flex h-10 w-10 shrink-0 items-center justify-center" aria-hidden>
              <span className="text-sm font-black text-[#0d1b2a]">★</span>
            </span>
            <span><span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">{accent}</span> {rest}</span>
          </h2>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-mute">{subtitle}</p>}
          <span aria-hidden className="mt-3 flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-500 shadow-[0_2px_8px_-1px_rgba(14, 165, 233, 0.7)]" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-popblue-800 shadow-[0_2px_8px_-1px_rgba(13, 27, 42, 0.7)]" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gold-500 shadow-[0_2px_8px_-1px_rgba(99, 102, 241, 0.7)]" />
            <span className="zigzag ml-1 w-32" />
          </span>
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-sm border border-brand-700 bg-brand-600 px-6 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_#6366f1] transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[4px_4px_0_#0d1b2a] active:translate-y-0"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
