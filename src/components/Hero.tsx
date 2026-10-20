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

// Cool lagoon glows: soft aqua light drifting over the rain-soaked shore.
const GLOWS = [
  { left: "4%", top: "10%", size: 140, delay: "0s", dur: "10s", c: "rgba(40,165,181, 0.28)" },
  { left: "74%", top: "4%", size: 190, delay: "-4s", dur: "12s", c: "rgba(146,198,210, 0.30)" },
  { left: "44%", top: "44%", size: 110, delay: "-7s", dur: "9s", c: "rgba(14,124,134, 0.24)" },
  { left: "86%", top: "50%", size: 100, delay: "-2s", dur: "11s", c: "rgba(40,165,181, 0.22)" },
];

// Falling rain: thin monsoon streaks pouring down over the lagoon.
const RAINDROPS = [
  { left: "8%", delay: "0s", dur: "9s", h: 26, c: "#3aabb9" },
  { left: "21%", delay: "-3s", dur: "10.5s", h: 18, c: "#14909e" },
  { left: "36%", delay: "-6s", dur: "9.5s", h: 32, c: "#6fcad4" },
  { left: "53%", delay: "-2s", dur: "11s", h: 20, c: "#0e6570" },
  { left: "68%", delay: "-7.5s", dur: "9.8s", h: 28, c: "#3aabb9" },
  { left: "82%", delay: "-4.5s", dur: "10.8s", h: 18, c: "#14909e" },
  { left: "93%", delay: "-1s", dur: "9.2s", h: 24, c: "#6fcad4" },
];

function RainStreak({ left, delay, dur, h, c }: (typeof RAINDROPS)[number]) {
  return (
    <div
      aria-hidden
      className="rain-fall pointer-events-none absolute top-0"
      style={{ left, animationDelay: delay, animationDuration: dur }}
    >
      <div
        style={{
          width: 2,
          height: h,
          borderRadius: 999,
          background: `linear-gradient(180deg, transparent, ${c})`,
          boxShadow: `0 0 8px 1px ${c}55`,
          opacity: 0.85,
        }}
      />
    </div>
  );
}

// Rolling wave divider: the lagoon's surface ripples into the page below.
const wave = "M0,32 C120,48 240,16 360,28 C480,40 600,20 720,30 C840,40 960,18 1080,28 C1200,38 1320,22 1440,32 L1440,56 L0,56 Z";

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* monsoon lagoon: icy wash with drifting aqua glows and falling rain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f2f8fc]/80 via-[#ecf3f8] to-[#ecf3f8]" />

      {/* rotating tide ring */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 z-0 hidden opacity-40 sm:block">
        <div
          className="tide-spin h-[480px] w-[480px] rounded-full border-[26px] border-dashed border-brand-400/25"
          style={{ maskImage: "radial-gradient(circle, black 0%, transparent 68%)", WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 68%)" }}
        />
      </div>

      {/* drifting lagoon glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="buoy-breathe absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* falling monsoon rain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {RAINDROPS.map((r, i) => (
          <RainStreak key={i} {...r} />
        ))}
      </div>

      {/* 4-banner carousel (image-only slides) */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="overflow-hidden rounded-xl border-4 border-brand-700/25 shadow-[0_24px_60px_-24px_rgba(6,38,48,0.5)]">
            <BannerCarousel />
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
              <div key={s.l} className="lagoon-lift relative overflow-hidden rounded-xl border-2 border-brand-700/25 bg-[#ffffff] p-4 pb-3 text-center transition-transform duration-300 hover:-translate-y-1">
                <span className="block text-2xl font-black tracking-tight text-brand-500">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#5f7a8c]">{s.l}</span>
                <span aria-hidden className="mx-auto mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-brand-500 via-gold to-brand-700" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-500">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#14242f]">Featured <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 flex items-center gap-2" aria-hidden>
              <span className="block h-2 w-10 rounded-full bg-brand-500" />
              <span className="block h-2 w-10 rounded-full bg-gold" />
              <span className="block h-2 w-10 rounded-full bg-brand-800" />
            </span>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="lagoon-lift group cursor-pointer overflow-hidden rounded-[18px] border-2 border-brand-700/25 bg-[#ffffff] transition-all hover:-translate-y-2"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden rounded-t-[14px]">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-md bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(199,78,38,0.8)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute -bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-600 via-gold to-brand-400" />
                </div>
                <div className="p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#14242f]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-500">{tk(p.price)} <span className="text-xs font-medium text-[#5f7a8c] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rotate-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-700 px-5 py-2 text-sm font-black tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(14,124,134,0.7)] ring-2 ring-gold/70">-45% TODAY</span>
        </div>
      </div>

      {/* rolling wave divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-14 w-full">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="block h-full w-full">
          <path d={wave} fill="#0e7c86" opacity="0.16" />
          <path d="M0,32 C120,48 240,16 360,28 C480,40 600,20 720,30 C840,40 960,18 1080,28 C1200,38 1320,22 1440,32" fill="none" stroke="#ef5d3a" strokeWidth="3" opacity="0.6" />
        </svg>
      </div>
    </section>
  );
}
