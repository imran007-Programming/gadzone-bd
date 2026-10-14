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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#032726] via-[#0b4a43] to-[#01100e] text-white">
      {/* aurora glow accents */}
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-teal-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-16 h-[28rem] w-[28rem] rounded-full bg-emerald-400/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute left-2/3 top-0 h-56 w-[36rem] -translate-x-1/2 rounded-[100%] bg-emerald-200/15 blur-3xl" />
      {/* dotted aurora texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.07)_1.5px,transparent_1.5px)] [background-size:26px_26px]" />

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
              <div key={s.l} className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 py-2 pl-2 pr-6 shadow-lg shadow-teal-950/40 backdrop-blur-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-teal-500 text-base font-black text-[#032726] shadow-md shadow-teal-900/40">{s.v.replace("+", "").replace("K", "")[0]}</span>
                <span>
                  <span className="block text-lg font-black leading-none tracking-tight text-emerald-50">{s.v}</span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-200/80">{s.l}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-sm shadow-md shadow-teal-900/40">⭐</span>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">Featured Picks</p>
            <span className="h-px flex-1 bg-gradient-to-r from-emerald-400/60 to-transparent" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer overflow-hidden rounded-3xl border border-teal-100/80 bg-white text-slate-900 shadow-[0_20px_45px_-22px_rgba(13,148,136,0.55)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_55px_-20px_rgba(13,148,136,0.65)]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative p-2.5">
                  <div className="overflow-hidden rounded-2xl border border-teal-100">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#032726] text-[11px] font-black text-emerald-300 shadow-lg ring-2 ring-teal-300/70">-{discountPct(p)}%</span>
                </div>
                <div className="px-4 pb-4 pt-1"><p className="truncate text-sm font-bold tracking-tight">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-teal-700">{tk(p.price)} <span className="text-xs font-medium text-slate-400 line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 -rotate-3 rounded-full border-2 border-dashed border-white/50 bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-2 text-sm font-black tracking-wide text-[#032726] shadow-xl shadow-teal-950/40">-45% TODAY</span>
        </div>
      </div>
    </section>
  );
}
