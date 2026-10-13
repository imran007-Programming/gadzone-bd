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
    <section id="flash" className="relative overflow-hidden bg-slate-950 py-12 text-white">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Limited Time</span>
            <h2 className="mt-1 text-3xl font-black tracking-tight">⚡ Flash Deals — Today Only!</h2>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold">
            <span className="text-slate-300">Ends in</span>
            {[hh, mm, ss].map((v, i) => <span key={i} className="rounded-xl bg-amber-400 px-3 py-1.5 text-lg font-black tabular-nums text-slate-950">{v}</span>)}
          </div>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map((p) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} />)}</div>
      </div>
    </section>
  );
}
