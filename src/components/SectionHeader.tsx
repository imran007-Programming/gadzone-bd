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
              <span className="text-sm font-black text-white">★</span>
            </span>
            <span><span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">{accent}</span> {rest}</span>
          </h2>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-mute">{subtitle}</p>}
          <span aria-hidden className="mt-3 flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-brand-500" />
            <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-popblue-800" />
            <span className="inline-block h-2.5 w-2.5 rounded-[2px] bg-gold-500" />
            <span className="zigzag ml-1 w-40" />
          </span>
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-lg border border-brand-700 bg-brand-600 px-6 py-2.5 text-sm font-black text-white shadow-[0_14px_28px_-10px_rgba(6,78,59,0.6)] transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_20px_36px_-12px_rgba(6,78,59,0.65)] active:translate-y-0"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
