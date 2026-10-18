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
          <h2 className="flex items-center gap-3 text-[1.65rem] font-black leading-tight tracking-tight text-[#2f2417] sm:text-[2rem]">
            <span className="inline-block h-9 w-2.5 rounded-full bg-gradient-to-b from-brand-400 to-brand-700 shadow-[0_0_14px_rgba(240, 158, 18,0.7)]" aria-hidden />
            <span><span className="text-brand-600">{accent}</span> {rest}</span>
          </h2>
          {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-[#7d6a4f]">{subtitle}</p>}
        </div>
        {showViewAll && (
          <button
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(240, 158, 18,0.4)] transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-[0.98]"
          >
            All Products →
          </button>
        )}
      </div>
    </Reveal>
  );
}
