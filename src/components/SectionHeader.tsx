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
          <h2 className="flex items-center gap-3 text-[1.65rem] font-black leading-tight tracking-tight text-[#2b1a12] sm:text-[2rem]">
            <span className="starburst pop-bob relative inline-flex h-10 w-10 shrink-0 items-center justify-center" aria-hidden>
              <span className="text-sm font-black text-[#fffdf8]">★</span>
            </span>
            <span><span className="bg-gradient-to-r from-brand-700 to-gold-deep bg-clip-text text-transparent">{accent}</span> {rest}</span>
          </h2>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-[#7a5a48]">{subtitle}</p>}
          <span aria-hidden className="mt-3 flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-[#2b1a12] bg-brand-500" />
            <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-[#2b1a12] bg-gold" />
            <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-[#2b1a12] bg-popblue" />
            <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-[#2b1a12] bg-gold" />
            <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-[#2b1a12] bg-brand-500" />
            <span className="zigzag ml-1 w-24 opacity-90" />
          </span>
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-lg border-2 border-[#2b1a12] bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-2.5 text-sm font-black text-white shadow-[4px_4px_0_#2b1a12] transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:shadow-none"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
