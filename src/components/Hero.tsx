"use client";

import { PRODUCTS, type Product } from "@/data/products";
import { tk } from "@/lib/format";
import ProductImage from "./ProductImage";

type HeroProps = {
  onQuickView: (product: Product) => void;
};

export default function Hero({ onQuickView }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-navy via-[#1a2b4a] to-[#2a1a4a] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:py-16 items-center">
        <div>
          <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-bold">🔥 UP TO 45% OFF — EID MEGA SALE</span>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Best Gadgets,<br />Best Price in <span className="text-orange-400">Bangladesh</span></h1>
          <p className="mt-3 max-w-md text-gray-300">Original products, official warranty, Cash on Delivery — 64 zelay delivery. Earbuds theke smartwatch, sob ek jaygay.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#shop" className="rounded-full bg-brand px-6 py-3 font-bold text-white hover:bg-brand-dark transition">Shop Now →</a>
            <a href="#flash" className="rounded-full border border-white/40 px-6 py-3 font-bold hover:bg-white/10 transition">⚡ Flash Deals</a>
          </div>
          <div className="mt-8 flex gap-6 sm:gap-10">
            <div><p className="text-2xl font-black">500+</p><p className="text-xs text-gray-400">Products</p></div>
            <div><p className="text-2xl font-black">64</p><p className="text-xs text-gray-400">Districts Delivery</p></div>
            <div><p className="text-2xl font-black">50K+</p><p className="text-xs text-gray-400">Happy Customers</p></div>
            <div><p className="text-2xl font-black">COD</p><p className="text-xs text-gray-400">Available</p></div>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
            <div className="grid grid-cols-2 gap-3">
              {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p) => (
                <div key={p.id} className="cursor-pointer overflow-hidden rounded-2xl bg-white text-navy" onClick={() => onQuickView(p)}>
                  <ProductImage product={p} />
                  <div className="p-2.5"><p className="truncate text-sm font-bold">{p.name}</p><p className="text-sm font-extrabold text-brand">{tk(p.price)} <span className="text-xs text-gray-400 line-through">{tk(p.oldPrice)}</span></p></div>
                </div>
              ))}
            </div>
          </div>
          <span className="absolute -right-2 -top-3 rotate-6 rounded-full bg-brand px-4 py-2 text-sm font-bold shadow-lg">-45% TODAY</span>
        </div>
      </div>
    </section>
  );
}
