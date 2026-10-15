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
    <section className="relative overflow-hidden bg-[#171717] text-neutral-100">
      {/* rose glow blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-32 right-[-6rem] h-[26rem] w-[36rem] rounded-[100%] bg-rose-600/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-24 -left-24 h-[22rem] w-[22rem] rounded-full bg-amber-500/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-rose-800/30 blur-3xl" />
      {/* rose dot-grid texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(225,29,72,0.22)_1.2px,transparent_1.2px)] [background-size:26px_26px]" />

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
              <div key={s.l} className="flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 py-2.5 pl-2.5 pr-8 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] ring-1 ring-rose-300/20 backdrop-blur-xl">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-amber-400 text-base font-black text-white shadow-md shadow-rose-950/60">{s.v.replace("+", "").replace("K", "")[0]}</span>
                <span>
                  <span className="block text-lg font-black leading-none tracking-tight text-white">{s.v}</span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-200/80">{s.l}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-rose-600 text-sm shadow-md shadow-rose-950/60">🔥</span>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-neutral-100">Featured Picks</p>
            <span className="h-[3px] flex-1 bg-gradient-to-r from-rose-600 via-amber-500 to-transparent" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer rounded-2xl border border-white/60 bg-white/95 p-3 shadow-[0_18px_45px_-18px_rgba(225,29,72,0.55)] ring-1 ring-rose-100 backdrop-blur transition-all hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-18px_rgba(225,29,72,0.75)]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden rounded-xl bg-gradient-to-b from-rose-100 to-white">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2 top-2 rounded-md bg-amber-500 px-3 py-1.5 text-[11px] font-black text-neutral-950 shadow-lg shadow-rose-950/30">-{discountPct(p)}%</span>
                </div>
                <div className="px-2 pb-2 pt-3 text-center"><p className="truncate text-sm font-bold tracking-tight text-neutral-900">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-rose-600">{tk(p.price)} <span className="text-xs font-medium text-neutral-400 line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 -rotate-2 rounded-full bg-amber-400 px-5 py-2 text-sm font-black tracking-wide text-neutral-950 shadow-xl shadow-rose-950/40 ring-2 ring-white/50">-45% TODAY</span>
        </div>
      </div>
    </section>
  );
}
