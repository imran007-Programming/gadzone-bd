"use client";

import { PRODUCTS, type Product } from "@/data/products";
import { tk, discountPct } from "@/lib/format";
import ProductImage from "./ProductImage";

type HeroProps = {
  onQuickView: (product: Product) => void;
};

export default function Hero({ onQuickView }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* emerald glow accents */}
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold tracking-wide text-emerald-300">🔥 UP TO 45% OFF — EID MEGA SALE</span>
          <h1 className="mt-5 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">Best Gadgets,<br />Best Price in <span className="text-amber-400">Bangladesh</span></h1>
          <p className="mt-4 max-w-md text-base text-slate-300">Original products, official warranty, Cash on Delivery — 64 zelay delivery. Earbuds theke smartwatch, sob ek jaygay.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#shop" className="rounded-full bg-emerald-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700">Shop Now →</a>
            <a href="#flash" className="rounded-full border border-white/30 px-7 py-3.5 font-bold transition hover:bg-white/10">⚡ Flash Deals</a>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { v: "500+", l: "Products" },
              { v: "64", l: "Districts Delivery" },
              { v: "50K+", l: "Happy Customers" },
              { v: "COD", l: "Available" },
            ].map((s) => (
              <div key={s.l} className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
                <p className="text-2xl font-black">{s.v}</p>
                <p className="text-xs text-slate-400">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
            <div className="grid grid-cols-2 gap-3">
              {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p) => (
                <div key={p.id} className="group cursor-pointer overflow-hidden rounded-3xl bg-white text-slate-900 shadow-md transition hover:-translate-y-1 hover:shadow-xl" onClick={() => onQuickView(p)}>
                  <div className="relative">
                    <ProductImage product={p} />
                    <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-slate-950">-{discountPct(p)}%</span>
                  </div>
                  <div className="p-3"><p className="truncate text-sm font-bold">{p.name}</p><p className="text-sm font-extrabold text-emerald-600">{tk(p.price)} <span className="text-xs font-medium text-slate-400 line-through">{tk(p.oldPrice)}</span></p></div>
                </div>
              ))}
            </div>
          </div>
          <span className="absolute -right-2 -top-3 rotate-6 rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg">-45% TODAY</span>
        </div>
      </div>
    </section>
  );
}
