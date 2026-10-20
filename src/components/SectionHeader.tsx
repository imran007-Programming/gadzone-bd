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
          <h2 className="flex items-center gap-3 text-[1.65rem] font-black leading-tight tracking-tight text-[#14332e] sm:text-[2rem]">
            <span className="relative inline-flex h-5 w-5 items-center justify-center" aria-hidden>
              <span className="absolute h-5 w-5 rounded-full border-2 border-brand-400" />
              <span className="absolute h-2.5 w-2.5 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 shadow-[0_0_12px_1px_rgba(57,189,164,0.6)]" />
            </span>
            <span><span className="bg-gradient-to-r from-brand-500 to-gold-deep bg-clip-text text-transparent">{accent}</span> {rest}</span>
          </h2>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-[#55756f]">{subtitle}</p>}
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full border-2 border-brand-500/70 bg-gradient-to-b from-brand-500 to-brand-700 px-6 py-2.5 text-sm font-extrabold text-white shadow-[0_10px_26px_-10px_rgba(22,160,135,0.85)] transition hover:brightness-110 active:scale-[0.98]"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
