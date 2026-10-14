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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2a1206] via-[#431407] to-[#1c0a00] text-white">
      {/* warm ember glow accents */}
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-orange-500/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-amber-500/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-orange-700/20 blur-3xl" />

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
              <div key={s.l} className="rounded-xl border border-orange-200/20 bg-white/[0.07] px-5 py-3.5 shadow-sm shadow-orange-950/30 backdrop-blur-md">
                <p className="text-2xl font-black tracking-tight text-amber-50">{s.v}</p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-orange-200/80">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-300">⭐ Featured Picks</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="group cursor-pointer overflow-hidden rounded-xl bg-white text-stone-900 shadow-lg shadow-orange-950/20 ring-1 ring-orange-100 transition-shadow hover:shadow-xl hover:shadow-orange-900/20"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <ProductImage product={p} />
                  <span className="absolute left-0 top-3 -skew-x-6 rounded-r-md bg-orange-600 px-3 py-1 text-xs font-black tracking-wide text-white shadow-md">-{discountPct(p)}%</span>
                </div>
                <div className="p-3.5"><p className="truncate text-sm font-bold tracking-tight">{p.name}</p><p className="mt-0.5 text-sm font-extrabold tracking-tight text-orange-600">{tk(p.price)} <span className="text-xs font-medium text-stone-400 line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -right-2 -top-3 rotate-6 rounded-md bg-orange-600 px-4 py-2 text-sm font-black tracking-wide text-white shadow-lg shadow-orange-600/30">-45% TODAY</span>
        </div>
      </div>
    </section>
  );
}
