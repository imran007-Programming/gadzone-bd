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
      {/* mulberry night: deep plum-espresso gradient + wine glow blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#210b11] via-[#3d1220] to-[#210b11]" />
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-6rem] h-[30rem] w-[30rem] rounded-[40%_60%_55%_45%/50%_45%_55%_50%] bg-rose-600/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-72 -left-36 h-[26rem] w-[26rem] rounded-[60%_40%_45%_55%/45%_55%_45%_55%] bg-amber-500/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-24 left-1/3 h-[18rem] w-[18rem] rounded-full bg-rose-900/40 blur-3xl" />
      {/* wine mist texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,228,230,0.20)_1.2px,transparent_1.2px)] [background-size:30px_30px]" />
      {/* champagne top accent strip */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200" />

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
              <div key={s.l} className="flex items-center gap-3 rounded-full border border-white/25 bg-white/10 py-2 pl-2 pr-7 shadow-lg shadow-black/20 backdrop-blur-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-800 text-base font-black text-white ring-2 ring-amber-200/60">{s.v.replace("+", "").replace("K", "")[0]}</span>
                <span>
                  <span className="block text-lg font-black leading-none tracking-tight text-white">{s.v}</span>
                  <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.14em] text-rose-200">{s.l}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-200 text-base text-rose-950 shadow-lg shadow-black/25 ring-2 ring-white/30">✨</span>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-white">Featured <span className="rounded-full bg-amber-200 px-4 py-1 text-rose-950">Picks</span></p>
            <span className="h-px flex-1 bg-gradient-to-r from-amber-200/70 via-rose-400/50 to-transparent" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer rounded-[1.75rem] bg-white/95 p-3 shadow-xl shadow-black/25 ring-1 ring-white/40 backdrop-blur transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-rose-950/40"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-rose-50 to-white">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-rose-700 px-3 py-1 text-[11px] font-black text-white shadow-md shadow-rose-950/30">-{discountPct(p)}%</span>
                </div>
                <div className="px-2 pb-1.5 pt-3 text-center"><p className="truncate text-sm font-bold tracking-tight text-stone-900">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-rose-800">{tk(p.price)} <span className="text-xs font-medium text-stone-400 line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 -rotate-2 rounded-full bg-amber-200 px-5 py-2 text-sm font-black tracking-wide text-rose-950 shadow-lg shadow-black/30 ring-2 ring-white/40">-45% TODAY</span>
        </div>
      </div>

      {/* soft curve divider into the page */}
      <svg aria-hidden viewBox="0 0 1440 90" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-16 w-full text-[#f8f3ea] md:h-20">
        <path fill="currentColor" d="M0,64 C360,10 1080,10 1440,64 L1440,90 L0,90 Z" />
      </svg>
    </section>
  );
}
