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

// Aurora washes: glacial teal, aurora violet and pink glows blooming over the paper.
const GLOWS = [
  { left: "4%", top: "10%", size: 150, delay: "0s", dur: "11s", c: "rgba(20,184,166, 0.28)" },
  { left: "72%", top: "4%", size: 200, delay: "-4s", dur: "13s", c: "rgba(139,92,246, 0.22)" },
  { left: "44%", top: "44%", size: 120, delay: "-7s", dur: "10s", c: "rgba(236,72,153, 0.18)" },
  { left: "86%", top: "50%", size: 110, delay: "-2s", dur: "12s", c: "rgba(15,118,110, 0.22)" },
];

// Drifting ice crystals: fine aurora motes sinking softly through the hero.
const DOTS = [
  { left: "8%", delay: "0s", dur: "12s", s: 7, c: "#14b8a6" },
  { left: "21%", delay: "-3s", dur: "13s", s: 5, c: "#8b5cf6" },
  { left: "36%", delay: "-6s", dur: "12.5s", s: 8, c: "#0f766e" },
  { left: "53%", delay: "-2s", dur: "13.5s", s: 6, c: "#8b5cf6" },
  { left: "68%", delay: "-7.5s", dur: "12.2s", s: 7, c: "#14b8a6" },
  { left: "82%", delay: "-4.5s", dur: "13.2s", s: 5, c: "#8b5cf6" },
  { left: "93%", delay: "-1s", dur: "11.6s", s: 6, c: "#0f766e" },
];

function Dot({ left, delay, dur, s, c }: (typeof DOTS)[number]) {
  return (
    <div
      aria-hidden
      className="pop-fall pointer-events-none absolute top-0"
      style={{ left, animationDelay: delay, animationDuration: dur }}
    >
      <div
        style={{
          width: s,
          height: s,
          borderRadius: 9999,
          background: c,
          opacity: 0.85,
        }}
      />
    </div>
  );
}

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* frost grain texture + cool gradient washes + drifting ice crystals */}
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#dcf3f1]/70 via-gold-soft/30 to-transparent" />

      {/* aurora ribbon: a diagonal band of light sweeping teal → violet → pink */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-16 z-0 hidden opacity-90 sm:block">
        <div className="relative h-[560px] w-[560px] rotate-[24deg]">
          <div className="pop-spin absolute inset-0 rounded-full bg-gradient-to-br from-brand-400 via-gold to-popblue opacity-70 blur-2xl" />
          <div className="absolute inset-16 rounded-full border-[3px] border-dashed border-[#fcffff]/50" />
          <div className="absolute inset-32 rounded-full bg-gradient-to-br from-brand-300/60 via-gold/40 to-popblue/50 blur-xl" />
        </div>
      </div>

      {/* drifting aurora washes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="pop-drift absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* drifting ice crystals */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {DOTS.map((r, i) => (
          <Dot key={i} {...r} />
        ))}
      </div>

      {/* 4-banner carousel (image-only slides) in a frosted aurora frame */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="pop-lift rounded-3xl bg-gradient-to-br from-[#dcf3f1] to-[#c3eae4] p-2.5">
            <div className="overflow-hidden rounded-2xl ring-1 ring-[#d3e8e4]">
              <BannerCarousel />
            </div>
          </div>
        </div>
      </div>

      {/* Stats + featured picks */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-10 md:pb-28">
        <motion.div variants={container} initial="hidden" animate="show" {...anim}>
          <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { v: "500+", l: "Products" },
              { v: "64", l: "Districts Delivery" },
              { v: "50K+", l: "Happy Customers" },
              { v: "COD", l: "Available" },
            ].map((s) => (
              <div key={s.l} className="pop-lift relative overflow-hidden rounded-3xl bg-[#fcffff] p-4 pb-3 text-center">
                <span className="block text-2xl font-black tracking-tight text-brand-700">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#52707a]">{s.l}</span>
                <span aria-hidden className="mx-auto mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-brand-500 via-gold to-popblue" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="inline-block rounded-full bg-gradient-to-r from-brand-600 via-gold to-popblue px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-white shadow-[0_8px_20px_-6px_rgba(15,118,110,0.6)]">Handpicked for you</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#12262b]">Featured <span className="bg-gradient-to-r from-brand-700 to-popblue-deep bg-clip-text text-transparent">Picks</span></h2>
            <span className="zigzag mt-3 block w-44" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="pop-lift group cursor-pointer overflow-hidden rounded-3xl bg-[#fcffff]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden ring-1 ring-inset ring-[#d3e8e4]">
                    <ProductImage product={p} />
                  </div>
                  <span className="starburst absolute -right-1 -top-1 flex h-16 w-16 items-center justify-center p-4 text-center text-[11px] font-black leading-tight">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-brand-500 via-gold to-popblue" />
                </div>
                <div className="p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#12262b]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-700">{tk(p.price)} <span className="text-xs font-medium text-[#52707a] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="starburst pop-bob absolute -top-9 right-2 flex h-28 w-28 items-center justify-center p-6 text-center text-[13px] font-black leading-tight">-45%<br />TODAY</span>
        </div>
      </div>

      {/* frost-wave divider into the page */}
      <div aria-hidden className="zigzag absolute bottom-0 left-0 w-full opacity-90" />
    </section>
  );
}
