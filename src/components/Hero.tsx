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
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/90 via-white to-white text-slate-900">
      {/* soft mint glow blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-28 right-[-8rem] h-[26rem] w-[36rem] rounded-full bg-teal-300/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-40 -left-28 h-[22rem] w-[22rem] rounded-full bg-teal-200/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
      {/* soft dot texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(13,148,136,0.12)_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
      {/* teal top accent strip */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-teal-300 via-teal-500 to-teal-300" />

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
              <div key={s.l} className="flex items-center gap-3 rounded-full bg-white/80 py-2 pl-2 pr-7 shadow-lg shadow-teal-900/10 ring-1 ring-teal-100 backdrop-blur">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-base font-black text-white shadow-md shadow-teal-500/40">{s.v.replace("+", "").replace("K", "")[0]}</span>
                <span>
                  <span className="block text-lg font-black leading-none tracking-tight text-slate-900">{s.v}</span>
                  <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.14em] text-teal-700">{s.l}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-sm shadow-md shadow-teal-500/40">🔥</span>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Featured <span className="rounded-full bg-teal-500 px-3 py-1 text-white">Picks</span></p>
            <span className="flex flex-1 flex-col gap-1" aria-hidden>
              <span className="h-[3px] w-full rounded-full bg-gradient-to-r from-teal-400 via-teal-200 to-transparent" />
              <span className="h-[2px] w-2/3 rounded-full bg-teal-100" />
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer rounded-3xl bg-white p-2.5 shadow-xl shadow-teal-900/10 ring-1 ring-teal-100 transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-teal-900/15"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-teal-50 to-white">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2 top-2 rounded-full bg-teal-600 px-3 py-1 text-[11px] font-black text-white shadow-md shadow-teal-600/40">-{discountPct(p)}%</span>
                </div>
                <div className="px-2 pb-1.5 pt-3 text-center"><p className="truncate text-sm font-bold tracking-tight text-slate-900">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-teal-700">{tk(p.price)} <span className="text-xs font-medium text-slate-400 line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 -rotate-2 rounded-full bg-teal-500 px-5 py-2 text-sm font-black tracking-wide text-white shadow-lg shadow-teal-500/40">-45% TODAY</span>
        </div>
      </div>
    </section>
  );
}
