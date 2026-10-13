"use client";

import { motion } from "framer-motion";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import Reveal from "./Reveal";

type CategoryGridProps = {
  category: string;
  onCategoryChange: (category: string) => void;
};

const categoryIcons: Record<string, string> = {
  "Mobile Accessories": "📱", "Audio & Wearables": "🎧", "Computer & Office": "💻", "Smart Home": "🏠", "Lifestyle & Travel": "🎒",
};

export default function CategoryGrid({ category, onCategoryChange }: CategoryGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Browse Categories</span>
        <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Shop by Category</h2>
        <p className="mt-1 text-sm text-slate-500">Category-te click korle product filter hoye jabe</p>
      </Reveal>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.filter((c) => c !== "All").map((c, i) => (
          <Reveal key={c} delay={i * 0.06}>
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { onCategoryChange(c); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`h-full w-full rounded-3xl border p-6 text-center shadow-sm transition-shadow hover:shadow-lg hover:ring-2 hover:ring-emerald-600/40 ${category === c ? "border-emerald-600 bg-emerald-50" : "border-slate-200 bg-white"}`}
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">{categoryIcons[c]}</span>
              <span className="mt-3 block text-sm font-bold text-slate-900">{c}</span>
              <span className="text-xs text-slate-500">{PRODUCTS.filter((p) => p.category === c).length} products</span>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
