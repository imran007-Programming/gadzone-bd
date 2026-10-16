"use client";

import type { Product } from "@/data/products";
import type { SortKey } from "@/types";
import { tk } from "@/lib/format";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

type ShopSectionProps = {
  filtered: Product[];
  category: string;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  onReset: () => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (id: number) => void;
};

export default function ShopSection({ filtered, category, sort, onSortChange, maxPrice, onMaxPriceChange, onReset, onQuickView, onAddToCart }: ShopSectionProps) {
  return (
    <section id="shop" className="mx-auto max-w-7xl scroll-mt-32 px-4 pb-20 sm:px-6 sm:pb-24">
      <Reveal>
        <span className="text-xs font-bold uppercase tracking-widest text-teal-500">Full Catalogue</span>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
          <div><h2 className="text-[2rem] font-black leading-tight tracking-tight text-slate-900">All Products</h2><p className="mt-1.5 text-sm text-slate-500">{filtered.length} products found {category !== "All" && `in ${category}`}</p></div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm font-bold text-slate-700">Sort:</label>
            <select value={sort} onChange={(e) => onSortChange(e.target.value as SortKey)} className="rounded-lg border border-teal-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20">
              <option value="featured">Featured</option><option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option><option value="rating">Top Rated</option><option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-teal-100 bg-white p-4 shadow-sm ring-1 ring-teal-100/60 sm:p-5">
          <span className="text-sm font-bold text-slate-900">Max Price: <span className="text-teal-500">{tk(maxPrice)}</span></span>
          <input type="range" min={400} max={5000} step={50} value={maxPrice} onChange={(e) => onMaxPriceChange(Number(e.target.value))} className="w-48 cursor-pointer accent-teal-500" />
          <span className="text-xs text-slate-500">৳400 — ৳5,000</span>
          <button onClick={onReset} className="ml-auto rounded-lg border border-teal-200 bg-white px-4 py-2 text-sm font-bold shadow-sm transition hover:border-teal-500 hover:text-teal-500 active:scale-[0.98]">Reset Filters</button>
        </div>
      </Reveal>
      {filtered.length === 0 ? (
        <p className="mt-10 rounded-3xl bg-teal-50/80 p-10 text-center font-semibold text-slate-600 ring-1 ring-teal-100">No products found 😔 — Try a different search or filter.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((p, i) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} delay={(i % 4) * 0.05} />)}</div>
      )}
    </section>
  );
}
