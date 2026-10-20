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

// Glacier washes: mint, glacier and pine glows drifting over the ice.
const GLOWS = [
  { left: "4%", top: "10%", size: 150, delay: "0s", dur: "14s", c: "rgba(52,211,153, 0.30)" },
  { left: "72%", top: "4%", size: 200, delay: "-4s", dur: "15s", c: "rgba(8,145,178, 0.20)" },
  { left: "44%", top: "44%", size: 120, delay: "-7s", dur: "13s", c: "rgba(110,231,183, 0.18)" },
  { left: "86%", top: "50%", size: 110, delay: "-2s", dur: "14s", c: "rgba(22,163,74, 0.22)" },
];

// Expanding pulse rings: mist waves rising from the hero floor.
const DOTS = [
  { left: "8%", delay: "0s", dur: "5.2s", s: 60, c: "rgba(52,211,153, 0.35)" },
  { left: "21%", delay: "-1.4s", dur: "5.8s", s: 46, c: "rgba(110,231,183, 0.35)" },
  { left: "36%", delay: "-2.6s", dur: "5.4s", s: 66, c: "rgba(52,211,153, 0.30)" },
  { left: "53%", delay: "-0.8s", dur: "6s", s: 52, c: "rgba(8,145,178, 0.32)" },
  { left: "68%", delay: "-3.2s", dur: "5.5s", s: 62, c: "rgba(22,163,74, 0.30)" },
  { left: "82%", delay: "-2s", dur: "5.9s", s: 44, c: "rgba(110,231,183, 0.32)" },
  { left: "93%", delay: "-0.4s", dur: "5.3s", s: 56, c: "rgba(8,145,178, 0.30)" },
];

// Ticker phrases reuse the hero's existing stats copy.
const TICKER = ["GadZone BD", "500+ Products", "64 Districts Delivery", "50K+ Happy Customers", "Cash on Delivery"];

function Dot({ left, delay, dur, s, c }: (typeof DOTS)[number]) {
  return (
    <div
      aria-hidden
      className="pop-fall pointer-events-none absolute bottom-0"
      style={{ left, animationDelay: delay, animationDuration: dur }}
    >
      <div
        style={{
          width: s,
          height: s,
          borderRadius: 9999,
          border: `3px solid ${c}`,
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
      {/* aurora dot grid + violet gradient washes + pulse rings */}
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#d8eadf]/70 via-gold-soft/30 to-transparent" />

      {/* aurora core: a slowly orbiting stack of violet, lime and cyan rings */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-16 z-0 hidden opacity-90 sm:block">
        <div className="relative h-[560px] w-[560px]">
          <div className="pop-spin absolute inset-0 rounded-full bg-[conic-gradient(from_20deg,#6ee7b7,#34d399,#34d399,#6ee7b7)] opacity-70 blur-2xl" />
          <div className="absolute inset-16 rounded-full border-[3px] border-dashed border-brand-500/60" />
          <div className="absolute inset-32 rounded-full border-2 border-[#0e2b22]/40 bg-gradient-to-br from-brand-300/70 via-gold/40 to-popblue/50 blur-xl" />
          <div className="absolute inset-48 rounded-full bg-gradient-to-br from-brand-600 via-brand-400 to-popblue opacity-90 blur-sm" />
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

      {/* rising motes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {DOTS.map((r, i) => (
          <Dot key={i} {...r} />
        ))}
      </div>

      {/* 4-banner carousel in a frosted glass frame with an aurora top edge */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="pop-lift overflow-hidden bg-[#ffffff]">
            <div aria-hidden className="pop-stripes h-4 border-b border-brand-600/20" />
            <div className="overflow-hidden p-2">
              <div className="overflow-hidden rounded-2xl ring-1 ring-brand-600/25">
                <BannerCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* aurora ticker: infinite marquee of the shop's own promises */}
      <div aria-hidden className="relative z-10 mt-8 -rotate-1 border-y border-brand-400/30 bg-gradient-to-r from-brand-950 via-brand-800 to-brand-950 py-2.5 shadow-[0_18px_44px_-20px_rgba(221,83,17,0.7)]">
        <div className="overflow-hidden">
          <div className="pop-ticker flex w-max items-center gap-8 pr-8">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.22em] text-[#eef7f1]">
                {t} <span className="text-gold">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats + featured picks */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-10 md:pb-28">
        <motion.div variants={container} initial="hidden" animate="show" {...anim}>
          <motion.div variants={item} className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { v: "500+", l: "Products" },
              { v: "64", l: "Districts Delivery" },
              { v: "50K+", l: "Happy Customers" },
              { v: "COD", l: "Available" },
            ].map((s) => (
              <div key={s.l} className="pop-lift relative overflow-hidden bg-[#ffffff] p-4 pb-3 text-center">
                <span className="block text-2xl font-black tracking-tight text-brand-700">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#5c7268]">{s.l}</span>
                <span aria-hidden className="mx-auto mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-brand-600 via-gold to-popblue" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="inline-block rounded-full bg-gradient-to-r from-brand-600 via-gold to-popblue px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-white shadow-[0_16px_38px_-14px_rgba(221,83,17,0.6)]">Handpicked for you</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0e2b22]">Featured <span className="bg-gradient-to-r from-brand-700 to-popblue-deep bg-clip-text text-transparent">Picks</span></h2>
            <span className="zigzag mt-3 block w-44" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="pop-lift group cursor-pointer overflow-hidden bg-[#ffffff]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden border-b border-brand-600/20">
                    <ProductImage product={p} />
                  </div>
                  <span className="starburst absolute -right-1 -top-1 flex h-16 w-16 items-center justify-center p-4 text-center text-[11px] font-black leading-tight">-{discountPct(p)}%</span>
                  <span aria-hidden className="pop-stripes absolute inset-x-0 bottom-0 h-2 border-t border-brand-600/20" />
                </div>
                <div className="p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#0e2b22]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-700">{tk(p.price)} <span className="text-xs font-medium text-[#5c7268] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="starburst pop-bob absolute -top-9 right-2 flex h-28 w-28 items-center justify-center p-6 text-center text-[13px] font-black leading-tight">-45%<br />TODAY</span>
        </div>
      </div>

      {/* stripe divider into the page */}
      <div aria-hidden className="zigzag absolute bottom-0 left-0 w-full opacity-90" />
    </section>
  );
}
