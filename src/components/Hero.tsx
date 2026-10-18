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
      {/* neon aurora: drifting aurora ribbons over midnight indigo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0f1e] via-[#0d1630] to-[#0a0f1e]" />
      <div
        aria-hidden
        className="aurora-drift pointer-events-none absolute -top-40 -left-24 h-[26rem] w-[46rem] -rotate-12 rounded-[100%] bg-gradient-to-r from-brand-400/25 via-[#a78bfa]/20 to-transparent blur-[90px]"
      />
      <div
        aria-hidden
        className="aurora-drift pointer-events-none absolute -top-24 right-[-10rem] h-[22rem] w-[40rem] rotate-12 rounded-[100%] bg-gradient-to-l from-[#a3e635]/15 via-brand-500/20 to-transparent blur-[90px]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(103,232,249,0.5)_1px,transparent_1.4px)] [background-size:42px_42px]"
      />
      <div aria-hidden className="pointer-events-none absolute top-40 left-1/3 h-[20rem] w-[20rem] rounded-full bg-brand-500/20 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-16 right-[10%] h-[16rem] w-[16rem] rounded-full bg-[#a78bfa]/15 blur-[100px]" />

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
              <div key={s.l} className="relative overflow-hidden rounded-2xl border border-[#22304d] bg-[#101a30] p-4 shadow-[0_12px_32px_-12px_rgba(2, 8, 26,0.2)] backdrop-blur-sm">
                <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-brand-300 to-brand-600" />
                <span className="block pl-3 text-2xl font-black tracking-tight text-[#eaf0fa]">{s.v}</span>
                <span className="mt-1 block pl-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#93a0b8]">{s.l}</span>
                <span aria-hidden className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-400/15 blur-xl" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-600">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#eaf0fa]">Featured <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 block h-1.5 w-32 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 shadow-[0_0_16px_rgba(34, 211, 238,0.35)]" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-[#22304d] bg-[#101a30] shadow-[0_12px_36px_-12px_rgba(2,8,26,0.55)] backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-brand-400/60 hover:shadow-[0_0_28px_-6px_rgba(34,211,238,0.45)]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-brand-300 to-brand-500 px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(34, 211, 238,0.45)]">-{discountPct(p)}%</span>
                </div>
                <div className="border-t border-[#22304d] p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#eaf0fa]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-600">{tk(p.price)} <span className="text-xs font-medium text-[#93a0b8] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rounded-full border border-brand-400/60 bg-[#041a22] px-5 py-2 text-sm font-black tracking-wide text-brand-300 shadow-[0_0_24px_-4px_rgba(34,211,238,0.6)]">-45% TODAY</span>
        </div>
      </div>

      {/* neon aurora wave divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-12 w-full">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,48 C200,10 420,44 720,28 C1020,12 1240,42 1440,20 L1440,48 Z" fill="#0a0f1e" />
          <path d="M0,34 C200,10 420,44 720,28 C1020,12 1240,42 1440,20" fill="none" stroke="#22d3ee" strokeWidth="2.5" opacity="0.7" />
          <path d="M0,40 C220,16 440,46 740,34 C1040,22 1260,44 1440,28" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.4" />
        </svg>
      </div>
    </section>
  );
}
