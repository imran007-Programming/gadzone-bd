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
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
      <SectionHeader accent="Shop" rest="by Category" subtitle="Explore our most popular gadget categories and find your perfect pick." />
      <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3 lg:grid-cols-6">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c} delay={i * 0.05}>
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { onCategoryChange(c); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`flex h-full w-full flex-col items-center gap-1.5 rounded-2xl border p-2.5 text-center shadow-sm transition-shadow hover:shadow-md hover:ring-2 hover:ring-violet-600/40 sm:p-4 ${category === c ? "border-violet-600 bg-violet-50" : "border-slate-200 bg-white"}`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-2xl sm:h-14 sm:w-14 sm:text-3xl">{categoryIcons[c]}</span>
              <span className="text-[11px] font-bold leading-tight text-slate-900 sm:text-sm">{c === "All" ? "All" : c}</span>
              <span className="hidden text-[11px] text-slate-500 sm:block">{categoryCounts[c]} products</span>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
