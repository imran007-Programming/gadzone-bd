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
    <section className="relative overflow-hidden bg-stone-950 text-white">
      {/* midnight ember: deep ink gradient + ember glow pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950" />
      <div aria-hidden className="pointer-events-none absolute -top-36 right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-orange-500/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-64 -left-32 h-[24rem] w-[24rem] rounded-full bg-amber-400/20 blur-3xl" />
      {/* ember spark texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(254,215,170,0.22)_1.5px,transparent_1.5px)] [background-size:26px_26px]" />
      {/* warm amber top accent strip */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300" />

      {/* 4-banner carousel (image-only slides) */}
      <div className="relative">
        <BannerCarousel />
      </div>

      {/* Stats + featured picks, kept from the previous hero */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-10 md:pb-32">
        <motion.div variants={container} initial="hidden" animate="show" {...anim}>
          <motion.div variants={item} className="flex flex-wrap gap-3">
            {[
              { v: "500+", l: "Products" },
              { v: "64", l: "Districts Delivery" },
              { v: "50K+", l: "Happy Customers" },
              { v: "COD", l: "Available" },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-3 border-2 border-amber-300/40 bg-white/10 py-2 pl-2 pr-7 shadow-[4px_4px_0_0_rgba(0,0,0,0.35)] backdrop-blur-md">
                <span className="flex h-11 w-11 items-center justify-center border-2 border-amber-300 bg-orange-900 text-base font-black text-amber-300">{s.v.replace("+", "").replace("K", "")[0]}</span>
                <span>
                  <span className="block text-lg font-black leading-none tracking-tight text-white">{s.v}</span>
                  <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.14em] text-orange-200">{s.l}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border-2 border-amber-300 bg-amber-400 text-sm text-stone-950">🌿</span>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-white">Featured <span className="bg-amber-400 px-3 py-1 text-stone-950">Picks</span></p>
            <span className="flex flex-1 flex-col gap-1" aria-hidden>
              <span className="h-[3px] w-full bg-gradient-to-r from-amber-400 via-orange-400 to-transparent" />
              <span className="h-[2px] w-2/3 bg-white/15" />
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
                className="group cursor-pointer border-2 border-stone-950 bg-white p-2.5 shadow-[5px_5px_0_0_#14532d] transition-all hover:-translate-y-1.5 hover:shadow-[8px_8px_0_0_#14532d]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden border border-orange-100 bg-gradient-to-b from-orange-50 to-white">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2 top-2 bg-orange-700 px-3 py-1 text-[11px] font-black text-white">-{discountPct(p)}%</span>
                </div>
                <div className="px-2 pb-1.5 pt-3 text-center"><p className="truncate text-sm font-bold tracking-tight text-slate-900">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-orange-900">{tk(p.price)} <span className="text-xs font-medium text-slate-400 line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 -rotate-2 border-2 border-stone-950 bg-amber-400 px-5 py-2 text-sm font-black tracking-wide text-stone-950 shadow-[4px_4px_0_0_rgba(0,0,0,0.4)]">-45% TODAY</span>
        </div>
      </div>

      {/* wave divider into the page */}
      <svg aria-hidden viewBox="0 0 1440 90" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-16 w-full text-[#faf8f0] md:h-20">
        <path fill="currentColor" d="M0,52 C220,86 460,18 720,44 C980,70 1220,78 1440,34 L1440,90 L0,90 Z" />
      </svg>
    </section>
  );
}
