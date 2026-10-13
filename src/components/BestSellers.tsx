"use client";

import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

type BestSellersProps = {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (id: number) => void;
};

export default function BestSellers({ products, onQuickView, onAddToCart }: BestSellersProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Customer Favourites</span>
      <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">🏆 Best Sellers</h2>
      <p className="mt-1 text-sm text-slate-500">Customers der sobcheye pochonder products</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.map((p) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} />)}</div>
    </section>
  );
}
