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
          <h2 className="flex items-center gap-3 text-[1.65rem] font-black leading-tight tracking-tight text-[#241a36] sm:text-[2rem]">
            <span className="inline-block h-10 w-3 rounded-full bg-gradient-to-b from-gold-soft via-gold to-gold-deep shadow-[0_0_16px_rgba(255,111,60,0.8)]" aria-hidden />
            <span><span className="text-brand-600">{accent}</span> {rest}</span>
          </h2>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-[#5e5478]">{subtitle}</p>}
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-xl border-2 border-brand-950 bg-gradient-to-r from-brand-700 to-brand-950 px-6 py-2.5 text-sm font-bold text-white shadow-[4px_4px_0_0_rgba(217,72,27,0.9)] transition hover:brightness-110 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
