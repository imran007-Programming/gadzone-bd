"use client";

import { CATEGORIES, PRODUCTS } from "@/data/products";

type CategoryGridProps = {
  category: string;
  onCategoryChange: (category: string) => void;
};

const categoryIcons: Record<string, string> = {
  "Mobile Accessories": "📱", "Audio & Wearables": "🎧", "Computer & Office": "💻", "Smart Home": "🏠", "Lifestyle & Travel": "🎒",
};

export default function CategoryGrid({ category, onCategoryChange }: CategoryGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-2xl font-black">Shop by Category</h2>
      <p className="text-sm text-gray-500">Category-te click korle product filter hoye jabe</p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.filter((c) => c !== "All").map((c) => (
          <button key={c} onClick={() => { onCategoryChange(c); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
            className={`rounded-2xl border p-5 text-center transition hover:border-brand hover:shadow-lg ${category === c ? "border-brand bg-orange-50" : "border-gray-100 bg-white"}`}>
            <span className="text-4xl">{categoryIcons[c]}</span>
            <span className="mt-2 block text-sm font-bold">{c}</span>
            <span className="text-xs text-gray-500">{PRODUCTS.filter((p) => p.category === c).length} products</span>
          </button>
        ))}
      </div>
    </section>
  );
}
