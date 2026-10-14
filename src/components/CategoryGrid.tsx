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
              className={`flex h-full w-full flex-col items-center gap-1.5 rounded-3xl border p-3 text-center shadow-sm transition-all hover:shadow-lg hover:ring-2 hover:ring-violet-600/40 sm:p-5 ${category === c ? "border-violet-600 bg-violet-50 shadow-md shadow-violet-600/10 ring-1 ring-violet-600/30" : "border-slate-200/80 bg-white hover:border-violet-200"}`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100/80 text-2xl shadow-sm ring-1 ring-violet-200/60 sm:h-14 sm:w-14 sm:text-3xl">{categoryIcons[c]}</span>
              <span className="text-xs font-bold leading-tight tracking-tight text-slate-900 sm:text-sm">{c === "All" ? "All" : c}</span>
              <span className="hidden text-[11px] text-slate-400 sm:block">{categoryCounts[c]} products</span>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
