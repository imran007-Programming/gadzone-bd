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
            <span><span className="bg-gradient-to-r from-brand-300 to-gold bg-clip-text text-transparent">{accent}</span> {rest}</span>
          </h2>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-mute">{subtitle}</p>}
          <span aria-hidden className="mt-3 flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-500 shadow-[0_2px_8px_-1px_rgba(212, 74, 29, 0.7)] ring-2 ring-white/70" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gold shadow-[0_2px_8px_-1px_rgba(227, 91, 46, 0.7)] ring-2 ring-white/70" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-popblue shadow-[0_2px_8px_-1px_rgba(212, 74, 29,0.7)] ring-2 ring-white/70" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gold shadow-[0_2px_8px_-1px_rgba(227, 91, 46, 0.7)] ring-2 ring-white/70" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-500 shadow-[0_2px_8px_-1px_rgba(212, 74, 29, 0.7)] ring-2 ring-white/70" />
            <span className="zigzag ml-1 w-24 rounded-sm opacity-90" />
          </span>
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-2.5 text-sm font-black text-white shadow-[0_16px_38px_-14px_rgba(212, 74, 29, 0.6)] ring-1 ring-white/40 transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:shadow-none"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
