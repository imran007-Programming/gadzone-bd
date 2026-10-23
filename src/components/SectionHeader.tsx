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
            <span><span className="bg-gradient-to-r from-brand-500 to-gold bg-clip-text text-transparent">{accent}</span> {rest}</span>
          </h2>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-mute">{subtitle}</p>}
          <span aria-hidden className="mt-3 flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-500 shadow-[0_2px_8px_-1px_rgba(99,102,241,0.7)]" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-popblue-500 shadow-[0_2px_8px_-1px_rgba(101,163,13,0.7)]" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gold-500 shadow-[0_2px_8px_-1px_rgba(6,182,212,0.7)]" />
            <span className="zigzag ml-1 w-32" />
          </span>
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-xl border-2 border-brand-800 bg-brand-600 px-6 py-2.5 text-sm font-black text-white shadow-[5px_5px_0_rgba(3,7,20,0.9)] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_rgba(3,7,20,0.9)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_rgba(3,7,20,0.9)]"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
