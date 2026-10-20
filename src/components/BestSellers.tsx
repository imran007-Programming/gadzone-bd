"use client";

import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

type BestSellersProps = {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (id: number) => void;
};

export default function BestSellers({ products, onQuickView, onAddToCart }: BestSellersProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
      <Reveal>
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Customer Favourites</span>
        <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-[#33210f]">🏆 Best Sellers</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#7d6650]">Customers der sobcheye pochonder products</p>
      </Reveal>
      <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.map((p, i) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} delay={(i % 3) * 0.06} />)}</div>
    </section>
  );
}
