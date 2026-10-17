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
      {/* lagoon drift: pale mint gradient + soft teal glow orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-100/70 via-[#eef7f1] to-[#f0f8f3]" />
      <div aria-hidden className="pointer-events-none absolute -top-32 left-[8%] h-[26rem] w-[26rem] rounded-full bg-brand-300/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-40 -right-32 h-[24rem] w-[24rem] rounded-full bg-brand-200/60 blur-3xl" />
      {/* lagoon dot texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(17,130,97,0.10)_1.5px,transparent_1.5px)] [background-size:26px_26px]" />

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
              <div key={s.l} className="relative overflow-hidden rounded-3xl bg-white/80 p-4 shadow-[0_14px_35px_-18px_rgba(15,104,80,0.45)] ring-1 ring-brand-100 backdrop-blur-md">
                <span className="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r from-brand-400 to-brand-200" aria-hidden />
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
            <span className="mt-3 block h-1 w-24 rounded-full bg-gradient-to-r from-brand-500 to-brand-300" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-[0_18px_40px_-20px_rgba(15,104,80,0.35)] ring-1 ring-brand-100 transition-all hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-18px_rgba(15,104,80,0.5)] hover:ring-brand-300"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden rounded-t-3xl">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-black text-white shadow-md shadow-brand-800/30">-{discountPct(p)}%</span>
                </div>
                <div className="p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-slate-800">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-700">{tk(p.price)} <span className="text-xs font-medium text-slate-400 line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 -rotate-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-5 py-2 text-sm font-black tracking-wide text-white shadow-lg shadow-brand-600/40">-45% TODAY</span>
        </div>
      </div>

      {/* lagoon accent wave into the page */}
      <svg aria-hidden viewBox="0 0 1440 90" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-16 w-full text-[#f0f8f3] md:h-20">
        <path fill="currentColor" d="M0,64 C360,10 1080,10 1440,64 L1440,90 L0,90 Z" />
      </svg>
    </section>
  );
}
