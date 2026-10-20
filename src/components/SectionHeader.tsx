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
          <h2 className="flex items-center gap-3 text-[1.65rem] font-black leading-tight tracking-tight text-[#211a12] sm:text-[2rem]">
            <span className="starburst pop-bob relative inline-flex h-9 w-9 shrink-0 items-center justify-center bg-brand-500" aria-hidden>
              <span className="text-sm font-black text-[#211a12]">★</span>
            </span>
            <span><span className="bg-gradient-to-r from-brand-700 to-gold-deep bg-clip-text text-transparent">{accent}</span> {rest}</span>
          </h2>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-[#7a6a58]">{subtitle}</p>}
          <span aria-hidden className="mt-3 flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full border border-[#211a12] bg-brand-500" />
            <span className="inline-block h-2.5 w-2.5 rounded-full border border-[#211a12] bg-gold" />
            <span className="inline-block h-2.5 w-2.5 rounded-full border border-[#211a12] bg-popblue" />
            <span className="inline-block h-2.5 w-2.5 rounded-full border border-[#211a12] bg-gold" />
            <span className="inline-block h-2.5 w-2.5 rounded-full border border-[#211a12] bg-brand-500" />
            <span className="zigzag ml-1 w-24 opacity-80" />
          </span>
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-xl border-2 border-[#211a12] bg-brand-500 px-6 py-2.5 text-sm font-black text-[#211a12] shadow-[4px_4px_0_0_#211a12] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#211a12] active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
