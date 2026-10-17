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
    <section className="relative overflow-hidden text-white">
      {/* abyssal trench: deep ocean gradient + bioluminescent teal glow orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#03141b] via-[#06333f] to-[#03141b]" />
      <div aria-hidden className="pointer-events-none absolute -top-44 right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-brand-500/35 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-64 -left-40 h-[28rem] w-[28rem] rounded-full bg-cyan-300/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-16 left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-brand-900/60 blur-3xl" />
      {/* ocean current line texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(180deg,rgba(125,225,192,0.10)_0px,rgba(125,225,192,0.10)_1px,transparent_1px,transparent_34px)]" />

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
              <div key={s.l} className="relative overflow-hidden rounded-2xl border border-white/15 border-t-4 border-t-brand-400 bg-white/10 p-4 shadow-lg shadow-black/20 backdrop-blur-md">
                <span className="block text-2xl font-black tracking-tight text-white">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-cyan-200">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-300">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-white">Featured <span className="bg-gradient-to-r from-brand-400 to-cyan-200 bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 block h-1 w-24 rounded-full bg-gradient-to-r from-brand-500 to-cyan-300" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white/10 shadow-xl shadow-black/25 ring-1 ring-white/20 backdrop-blur-md transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:ring-cyan-300/50"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-cyan-300 px-2.5 py-1 text-[11px] font-black text-brand-950 shadow-md shadow-black/30">-{discountPct(p)}%</span>
                </div>
                <div className="p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-white">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-cyan-200">{tk(p.price)} <span className="text-xs font-medium text-white/50 line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rotate-3 rounded-xl bg-gradient-to-br from-cyan-300 to-brand-400 px-5 py-2 text-sm font-black tracking-wide text-brand-950 shadow-lg shadow-black/30 ring-2 ring-white/40">-45% TODAY</span>
        </div>
      </div>

      {/* tide accent strip along the base */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-1.5 bg-gradient-to-r from-brand-400 via-cyan-300 to-brand-400" />
      {/* soft curve divider into the page */}
      <svg aria-hidden viewBox="0 0 1440 90" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-16 w-full text-[#f0f6f4] md:h-20">
        <path fill="currentColor" d="M0,64 C360,10 1080,10 1440,64 L1440,90 L0,90 Z" />
      </svg>
    </section>
  );
}
