"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { PRODUCTS, type Product } from "@/data/products";
import { tk, discountPct } from "@/lib/format";
import ProductImage from "./ProductImage";
import BannerCarousel from "./BannerCarousel";

type HeroProps = {
  onQuickView: (product: Product) => void;
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden bg-[#1c1917] text-stone-100">
      {/* ember glow blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-32 right-[-6rem] h-[26rem] w-[36rem] rounded-[100%] bg-orange-600/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-24 -left-24 h-[22rem] w-[22rem] rounded-full bg-amber-500/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-orange-800/30 blur-3xl" />
      {/* rivet-row texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(234,88,12,0.22)_1.5px,transparent_1.5px)] [background-size:22px_22px]" />

      {/* 4-banner carousel (image-only slides) */}
      <BannerCarousel />

      {/* Stats + featured picks, kept from the previous hero */}
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 md:pb-20">
        <motion.div variants={container} initial="hidden" animate="show" {...anim}>
          <motion.div variants={item} className="flex flex-wrap gap-3">
            {[
              { v: "500+", l: "Products" },
              { v: "64", l: "Districts Delivery" },
              { v: "50K+", l: "Happy Customers" },
              { v: "COD", l: "Available" },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-3 rounded-lg border border-orange-900/60 bg-stone-900/80 py-2 pl-2 pr-6 shadow-lg shadow-black/40 backdrop-blur-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-orange-600 text-base font-black text-white shadow-md shadow-orange-950/50">{s.v.replace("+", "").replace("K", "")[0]}</span>
                <span>
                  <span className="block text-lg font-black leading-none tracking-tight text-amber-400">{s.v}</span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">{s.l}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-600 text-sm shadow-md shadow-orange-950/60">🔥</span>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-stone-100">Featured Picks</p>
            <span className="h-[3px] flex-1 bg-gradient-to-r from-orange-600 via-amber-500 to-transparent" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer rounded-lg border border-orange-900/50 bg-stone-900 p-3 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.8)] transition-all hover:-translate-y-1 hover:border-orange-600 hover:shadow-[0_26px_50px_-20px_rgba(234,88,12,0.45)]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden rounded-md bg-gradient-to-b from-stone-800 to-stone-900">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2 top-2 rounded-md bg-amber-500 px-3 py-1.5 text-[11px] font-black text-stone-950 shadow-lg shadow-black/40">-{discountPct(p)}%</span>
                </div>
                <div className="px-2 pb-2 pt-3 text-center"><p className="truncate text-sm font-bold tracking-tight text-stone-100">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-amber-400">{tk(p.price)} <span className="text-xs font-medium text-stone-500 line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rotate-2 rounded-md bg-orange-600 px-5 py-2 text-sm font-black tracking-wide text-white shadow-xl shadow-black/50">-45% TODAY</span>
        </div>
      </div>
    </section>
  );
}
