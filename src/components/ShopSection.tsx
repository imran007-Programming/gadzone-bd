"use client";

import type { Product } from "@/data/products";
import type { SortKey } from "@/types";
import { tk } from "@/lib/format";
import ProductCard from "./ProductCard";

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
    <section id="shop" className="mx-auto max-w-7xl scroll-mt-32 px-4 pb-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h2 className="text-2xl font-black">All Products</h2><p className="text-sm text-gray-500">{filtered.length} products found {category !== "All" && `in ${category}`}</p></div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm font-semibold">Sort:</label>
          <select value={sort} onChange={(e) => onSortChange(e.target.value as SortKey)} className="rounded-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand">
            <option value="featured">Featured</option><option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option><option value="rating">Top Rated</option><option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
        <span className="text-sm font-bold">Max Price: <span className="text-brand">{tk(maxPrice)}</span></span>
        <input type="range" min={400} max={5000} step={50} value={maxPrice} onChange={(e) => onMaxPriceChange(Number(e.target.value))} className="w-48 accent-[#ff6b00]" />
        <span className="text-xs text-gray-500">৳400 — ৳5,000</span>
        <button onClick={onReset} className="ml-auto rounded-full border bg-white px-4 py-1.5 text-sm font-semibold hover:border-brand hover:text-brand">Reset Filters</button>
      </div>
      {filtered.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-orange-50 p-8 text-center font-semibold text-gray-600">No products found 😔 — Try a different search or filter.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((p) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} />)}</div>
      )}
    </section>
  );
}
