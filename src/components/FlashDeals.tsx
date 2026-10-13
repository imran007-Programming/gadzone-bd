"use client";

import type { Product } from "@/data/products";
import type { Countdown } from "@/types";
import ProductCard from "./ProductCard";

type FlashDealsProps = {
  products: Product[];
  countdown: Countdown;
  onQuickView: (product: Product) => void;
  onAddToCart: (id: number) => void;
};

export default function FlashDeals({ products, countdown, onQuickView, onAddToCart }: FlashDealsProps) {
  const { hh, mm, ss } = countdown;
  return (
    <section id="flash" className="bg-gradient-to-r from-red-500 to-orange-500 py-10 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-black">⚡ Flash Deals — Today Only!</h2>
          <div className="flex items-center gap-2 text-sm font-bold">
            <span>Ends in</span>
            {[hh, mm, ss].map((v, i) => <span key={i} className="rounded-lg bg-black/30 px-2.5 py-1.5 text-lg tabular-nums">{v}</span>)}
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map((p) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} />)}</div>
      </div>
    </section>
  );
}
