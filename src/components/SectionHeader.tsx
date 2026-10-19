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
          <h2 className="flex items-center gap-3 text-[1.65rem] font-black leading-tight tracking-tight text-[#2c1842] sm:text-[2rem]">
            <span className="inline-block h-10 w-3 rounded-full bg-gradient-to-b from-gold-soft via-gold to-gold-deep shadow-[0_0_16px_rgba(255, 106, 61,0.8)]" aria-hidden />
            <span><span className="text-brand-300">{accent}</span> {rest}</span>
          </h2>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-[#6b5b80]">{subtitle}</p>}
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-xl bg-gradient-to-r from-brand-400 to-brand-600 px-6 py-2.5 text-sm font-bold text-[#2c1842] shadow-[0_8px_24px_-8px_rgba(138, 86, 236,0.7)] transition hover:brightness-110 active:scale-[0.98]"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
