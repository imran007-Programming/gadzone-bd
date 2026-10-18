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
      {/* ember harvest: cream field, diagonal pinstripes, copper band */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-100/70 via-[#fbf4e9] to-[#faf3e9]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgba(192,94,14,0.055) 0px, rgba(192,94,14,0.055) 2px, transparent 2px, transparent 14px)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-[28rem] w-[28rem] -rotate-12 bg-brand-500/15 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute top-64 -left-28 h-[22rem] w-[22rem] rotate-12 bg-brand-300/25 blur-2xl" />

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
              <div key={s.l} className="relative overflow-hidden rounded-xl border-2 border-brand-200 bg-white p-4 shadow-[5px_5px_0_0_rgba(192,94,14,0.18)]">
                <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-brand-600" />
                <span className="block pl-3 text-2xl font-black tracking-tight text-brand-800">{s.v}</span>
                <span className="mt-1 block pl-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-700">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-slate-900">Featured <span className="text-brand-600">Picks</span></h2>
            <span className="mt-3 block h-2.5 w-32 bg-brand-600" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer overflow-hidden rounded-xl border-2 border-brand-200 bg-white shadow-[6px_6px_0_0_rgba(192,94,14,0.16)] transition-all hover:-translate-y-2 hover:border-brand-400 hover:shadow-[8px_8px_0_0_rgba(192,94,14,0.28)]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 -rotate-3 rounded-md bg-brand-600 px-2.5 py-1 text-[11px] font-black text-white shadow-[3px_3px_0_0_rgba(55,26,5,0.35)]">-{discountPct(p)}%</span>
                </div>
                <div className="border-t-2 border-brand-100 p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-slate-800">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-700">{tk(p.price)} <span className="text-xs font-medium text-slate-400 line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 -rotate-2 rounded-lg bg-brand-600 px-5 py-2 text-sm font-black tracking-wide text-white shadow-[4px_4px_0_0_rgba(55,26,5,0.35)]">-45% TODAY</span>
        </div>
      </div>

      {/* ember harvest zigzag divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-10 w-full">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,40 L0,20 L48,34 L96,8 L144,26 L192,12 L240,32 L288,10 L336,28 L384,14 L432,34 L480,10 L528,28 L576,12 L624,32 L672,10 L720,26 L768,14 L816,32 L864,10 L912,28 L960,12 L1008,34 L1056,10 L1104,28 L1152,14 L1200,32 L1248,10 L1296,26 L1344,12 L1392,30 L1440,16 L1440,40 Z" fill="#faf3e9" />
          <path d="M0,22 L48,34 L96,8 L144,26 L192,12 L240,32 L288,10 L336,28 L384,14 L432,34 L480,10 L528,28 L576,12 L624,32 L672,10 L720,26 L768,14 L816,32 L864,10 L912,28 L960,12 L1008,34 L1056,10 L1104,28 L1152,14 L1200,32 L1248,10 L1296,26 L1344,12 L1392,30 L1440,16" fill="none" stroke="#edb76c" strokeWidth="3" opacity="0.7" />
        </svg>
      </div>
    </section>
  );
}
