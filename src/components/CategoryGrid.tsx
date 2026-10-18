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
              className={`flex h-full w-full flex-col items-center gap-1.5 rounded-2xl border p-3 text-center shadow-sm transition-all hover:shadow-[0_12px_32px_-12px_rgba(34, 211, 238,0.35)] hover:ring-1 hover:ring-brand-400/50 sm:p-5 ${category === c ? "border-brand-400/60 bg-gradient-to-b from-brand-400/20 to-brand-400/5 shadow-[0_12px_32px_-12px_rgba(34, 211, 238,0.45)] ring-1 ring-brand-400/40" : "border-[#22304d] bg-[#101a30] hover:border-brand-400/40"}`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-300 to-brand-600 text-2xl shadow-[0_6px_18px_-6px_rgba(34, 211, 238,0.4)] ring-1 ring-brand-300/40 sm:h-14 sm:w-14 sm:text-3xl">{categoryIcons[c]}</span>
              <span className="text-xs font-bold leading-tight tracking-tight text-[#eaf0fa] sm:text-sm">{c === "All" ? "All" : c}</span>
              <span className="hidden text-[11px] text-[#93a0b8] sm:block">{categoryCounts[c]} products</span>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
