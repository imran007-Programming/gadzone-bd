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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2a1206] via-[#4a1e08] to-[#120703] text-white">
      {/* ember sun glow */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 rounded-[100%] bg-orange-500/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-16 h-[24rem] w-[24rem] rounded-full bg-amber-600/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-red-700/25 blur-3xl" />
      {/* diagonal ember streak texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70 [background-image:repeating-linear-gradient(115deg,rgba(255,255,255,0.055)_0_2px,transparent_2px_26px)]" />

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
              <div key={s.l} className="flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 py-2.5 pl-2.5 pr-6 shadow-lg shadow-orange-950/50 backdrop-blur-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 text-base font-black text-[#2a1206] shadow-md shadow-orange-900/40">{s.v.replace("+", "").replace("K", "")[0]}</span>
                <span>
                  <span className="block text-lg font-black leading-none tracking-tight text-orange-50">{s.v}</span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-200/80">{s.l}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 text-sm shadow-md shadow-orange-900/40">⭐</span>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-100">Featured Picks</p>
            <span className="h-px flex-1 bg-gradient-to-r from-amber-400/60 to-transparent" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-orange-200/80 bg-white text-slate-900 shadow-[0_20px_45px_-22px_rgba(234,88,12,0.55)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_55px_-20px_rgba(234,88,12,0.65)]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative p-2.5">
                  <div className="overflow-hidden rounded-2xl border border-orange-100">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#2a1206] text-[11px] font-black text-orange-300 shadow-lg ring-2 ring-amber-400/70">-{discountPct(p)}%</span>
                </div>
                <div className="px-4 pb-4 pt-1"><p className="truncate text-sm font-bold tracking-tight">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-orange-700">{tk(p.price)} <span className="text-xs font-medium text-slate-400 line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 -rotate-3 rounded-xl border-2 border-dashed border-white/50 bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-2 text-sm font-black tracking-wide text-[#2a1206] shadow-xl shadow-orange-950/40">-45% TODAY</span>
        </div>
      </div>
    </section>
  );
}
