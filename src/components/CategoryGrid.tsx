"use client";

import { motion } from "framer-motion";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const categoryIcons: Record<string, string> = {
  All: "🛍️",
  "Mobile Accessories": "📱", "Audio & Wearables": "🎧", "Computer & Office": "💻", "Smart Home": "🏠", "Lifestyle & Travel": "🎒",
};

const categoryCounts: Record<string, number> = {
  All: PRODUCTS.length,
  ...Object.fromEntries(CATEGORIES.filter((c) => c !== "All").map((c) => [c, PRODUCTS.filter((p) => p.category === c).length])),
};

export default function CategoryGrid({ category, onCategoryChange }: { category: string; onCategoryChange: (category: string) => void }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
      <SectionHeader accent="Shop" rest="by Category" subtitle="Explore our most popular gadget categories and find your perfect pick." />
      <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-4 lg:grid-cols-6">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c} delay={i * 0.05}>
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { onCategoryChange(c); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`flex h-full w-full flex-col items-center gap-1.5 rounded-[22px] border-2 p-3 text-center shadow-sm transition-all hover:shadow-[0_12px_32px_-12px_rgba(124,58,237,0.35)] hover:ring-1 hover:ring-brand-400/50 sm:p-5 ${category === c ? "border-gold-deep/60 bg-gradient-to-b from-gold-soft to-brand-100 shadow-[0_12px_32px_-12px_rgba(124,58,237,0.45)] ring-1 ring-gold/50" : "border-[#eddfc9] bg-[#fffdf8] hover:border-gold-deep/60"}`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold via-brand-500 to-brand-800 p-1 text-2xl shadow-[0_6px_18px_-6px_rgba(124,58,237,0.5)] ring-2 ring-gold-soft sm:h-14 sm:w-14 sm:text-3xl"><span className="flex h-full w-full items-center justify-center rounded-full bg-[#fff8f0]">{categoryIcons[c]}</span></span>
              <span className="text-xs font-bold leading-tight tracking-tight text-[#431407] sm:text-sm">{c === "All" ? "All" : c}</span>
              <span className="hidden text-[11px] text-[#7c5f46] sm:block">{categoryCounts[c]} products</span>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
