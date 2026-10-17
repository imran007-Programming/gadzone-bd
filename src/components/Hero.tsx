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
    <section className="relative overflow-hidden">
      {/* ember hearth: warm ivory field + terracotta glow orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-100/80 via-[#f9f1e6] to-[#faf5ec]" />
      <div aria-hidden className="pointer-events-none absolute -top-32 left-[8%] h-[26rem] w-[26rem] rounded-full bg-brand-300/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-40 -right-32 h-[24rem] w-[24rem] rounded-full bg-brand-200/70 blur-3xl" />
      {/* ember diagonal stripe ribbon */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 h-14 -skew-y-2 bg-[repeating-linear-gradient(-45deg,#bd4c16_0,#bd4c16_14px,transparent_14px,transparent_28px)] opacity-15" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[8.5rem] h-6 -skew-y-2 bg-[repeating-linear-gradient(-45deg,#7d3317_0,#7d3317_10px,transparent_10px,transparent_20px)] opacity-20" />

      {/* 4-banner carousel (image-only slides) */}
      <div className="relative">
        <BannerCarousel />
      </div>

      {/* Stats + featured picks, kept from the previous hero */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-10 md:pb-32">
        <motion.div variants={container} initial="hidden" animate="show" {...anim}>
          <motion.div variants={item} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { v: "500+", l: "Products" },
              { v: "64", l: "Districts Delivery" },
              { v: "50K+", l: "Happy Customers" },
              { v: "COD", l: "Available" },
            ].map((s) => (
              <div key={s.l} className="relative overflow-hidden rounded-2xl border-l-[6px] border-l-brand-600 bg-white/90 p-4 shadow-[0_14px_0_-10px_rgba(153,59,20,0.55)] ring-1 ring-brand-100 backdrop-blur-md">
                <span className="block text-2xl font-black tracking-tight text-brand-800">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-600">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-900">Featured <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 block h-1.5 w-28 -skew-x-12 bg-gradient-to-r from-brand-500 to-brand-300" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_12px_0_-8px_rgba(153,59,20,0.45)] ring-1 ring-brand-100 transition-all hover:-translate-y-1.5 hover:shadow-[0_16px_0_-8px_rgba(153,59,20,0.55)] hover:ring-brand-300"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden rounded-t-2xl">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 -rotate-3 rounded-md bg-brand-600 px-2.5 py-1 text-[11px] font-black text-white shadow-md shadow-brand-800/30">-{discountPct(p)}%</span>
                </div>
                <div className="border-t-2 border-dashed border-brand-200 p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-slate-800">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-700">{tk(p.price)} <span className="text-xs font-medium text-slate-400 line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 -rotate-2 rounded-lg bg-gradient-to-r from-brand-500 to-brand-700 px-5 py-2 text-sm font-black tracking-wide text-white shadow-lg shadow-brand-600/40">-45% TODAY</span>
        </div>
      </div>

      {/* ember angled slash divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-16 w-full md:h-20">
        <div className="absolute inset-x-[-10%] bottom-0 h-full skew-y-[-2deg] bg-[#faf5ec]" />
        <div aria-hidden className="absolute inset-x-[-10%] bottom-3 h-2 skew-y-[-2deg] bg-gradient-to-r from-brand-500 via-brand-300 to-brand-500" />
      </div>
    </section>
  );
}
