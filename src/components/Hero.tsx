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
      {/* midnight bazaar: deep ink, starfield dots, gold glow orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0f1e] via-[#0b1226] to-[#0a0f1e]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(251,191,36,0.16)_1px,transparent_1.5px)] [background-size:26px_26px]"
      />
      <div aria-hidden className="pointer-events-none absolute -top-28 right-1/4 h-[30rem] w-[30rem] rounded-full bg-brand-500/20 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute top-72 -left-28 h-[24rem] w-[24rem] rounded-full bg-brand-400/15 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-24 right-[8%] h-[18rem] w-[18rem] rounded-full bg-brand-600/15 blur-[100px]" />

      {/* 4-banner carousel (image-only slides) */}
      <div className="relative">
        <BannerCarousel />
      </div>

      {/* Stats + featured picks, kept from the previous hero */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-10 md:pb-28">
        <motion.div variants={container} initial="hidden" animate="show" {...anim}>
          <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { v: "500+", l: "Products" },
              { v: "64", l: "Districts Delivery" },
              { v: "50K+", l: "Happy Customers" },
              { v: "COD", l: "Available" },
            ].map((s) => (
              <div key={s.l} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-brand-300 to-brand-600" />
                <span className="block pl-3 text-2xl font-black tracking-tight text-white">{s.v}</span>
                <span className="mt-1 block pl-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">{s.l}</span>
                <span aria-hidden className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-400/15 blur-xl" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-400">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-white">Featured <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 block h-1.5 w-32 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 shadow-[0_0_16px_rgba(251,191,36,0.6)]" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-[0_12px_36px_-12px_rgba(0,0,0,0.65)] backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-brand-400/50 hover:shadow-[0_20px_50px_-12px_rgba(245,158,11,0.4)]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-brand-300 to-brand-500 px-2.5 py-1 text-[11px] font-black text-[#0a0f1e] shadow-[0_4px_14px_-4px_rgba(245,158,11,0.8)]">-{discountPct(p)}%</span>
                </div>
                <div className="border-t border-white/10 p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-slate-100">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-400">{tk(p.price)} <span className="text-xs font-medium text-slate-500 line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 px-5 py-2 text-sm font-black tracking-wide text-[#0a0f1e] shadow-[0_8px_24px_-8px_rgba(245,158,11,0.8)]">-45% TODAY</span>
        </div>
      </div>

      {/* midnight bazaar wave divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-10 w-full">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,40 C240,8 480,32 720,20 C960,8 1200,30 1440,14 L1440,40 Z" fill="#0a0f1e" />
          <path d="M0,26 C240,8 480,30 720,20 C960,10 1200,28 1440,14" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.55" />
        </svg>
      </div>
    </section>
  );
}
