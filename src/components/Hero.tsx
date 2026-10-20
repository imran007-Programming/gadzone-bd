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

// Sun discs: soft glowing suns hanging over the bazaar awnings.
const SUNS = [
  { left: "6%", top: "10%", size: 120, delay: "0s", dur: "9s", c: "rgba(232, 162, 32, 0.30)" },
  { left: "72%", top: "6%", size: 170, delay: "-3s", dur: "11s", c: "rgba(217, 93, 34, 0.22)" },
  { left: "40%", top: "46%", size: 100, delay: "-6s", dur: "8s", c: "rgba(224, 122, 54, 0.26)" },
  { left: "88%", top: "52%", size: 90, delay: "-1.5s", dur: "9.5s", c: "rgba(232, 162, 32, 0.24)" },
];

// Ember sparks: tiny warm sparks drifting upward from the souk stalls.
const EMBERS = [
  { left: "9%", delay: "0s", dur: "14s", size: 7, c: "#e8a020" },
  { left: "27%", delay: "-4s", dur: "16s", size: 5, c: "#e07a36" },
  { left: "52%", delay: "-8s", dur: "15s", size: 9, c: "#fbe9c6" },
  { left: "71%", delay: "-2.5s", dur: "17s", size: 6, c: "#d95d22" },
  { left: "88%", delay: "-6s", dur: "13.5s", size: 8, c: "#b5760d" },
  { left: "40%", delay: "-10s", dur: "15.5s", size: 5, c: "#f5d488" },
];

function Ember({ left, delay, dur, size, c }: (typeof EMBERS)[number]) {
  return (
    <div
      aria-hidden
      className="spark-rise pointer-events-none absolute bottom-0"
      style={{ left, animationDelay: delay, animationDuration: dur }}
    >
      <span
        className="block rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 40% 35%, #fff8e8, ${c} 70%)`,
          boxShadow: `0 0 12px 2px ${c}88`,
          opacity: 0.9,
        }}
      />
    </div>
  );
}

// Heat streaks: thin honey lines gliding sideways like shimmer off hot sand.
const STREAKS = [
  { left: "10%", top: "20%", width: 130, delay: "0s", dur: "11s", c: "#d95d22" },
  { left: "32%", top: "62%", width: 95, delay: "-3s", dur: "12.5s", c: "#983817" },
  { left: "56%", top: "14%", width: 145, delay: "-6s", dur: "10s", c: "#e07a36" },
  { left: "74%", top: "56%", width: 105, delay: "-1.5s", dur: "13.5s", c: "#bd4a1b" },
  { left: "42%", top: "36%", width: 75, delay: "-8s", dur: "11.5s", c: "#e8a020" },
];

function Streak({ left, top, width, delay, dur, c }: (typeof STREAKS)[number]) {
  return (
    <div
      aria-hidden
      className="zephyr-drift pointer-events-none absolute"
      style={{ left, top, animationDelay: delay, animationDuration: dur }}
    >
      <div
        className="relative"
        style={{
          width,
          height: 3,
          borderRadius: 999,
          background: `linear-gradient(90deg, transparent, ${c}cc, transparent)`,
          boxShadow: `0 0 12px 1px ${c}66`,
        }}
      />
    </div>
  );
}

// Souk zigzag divider: layered awning-style zigzags into the page below.
const zigBack = "M0,40 L72,20 L144,40 L216,20 L288,40 L360,20 L432,40 L504,20 L576,40 L648,20 L720,40 L792,20 L864,40 L936,20 L1008,40 L1080,20 L1152,40 L1224,20 L1296,40 L1368,20 L1440,40 L1440,56 L0,56 Z";
const zigFront = "M0,30 L90,52 L180,30 L270,52 L360,30 L450,52 L540,30 L630,52 L720,30 L810,52 L900,30 L990,52 L1080,30 L1170,52 L1260,30 L1350,52 L1440,30";

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* sunset souk: warm sand wash with sun discs, ember sparks and heat streaks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fdf3e2]/80 via-[#faf4e8] to-[#faf4e8]" />

      {/* rotating sun-ray halo */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 z-0 hidden opacity-40 sm:block">
        <div
          className="sun-spin h-[480px] w-[480px] rounded-full"
          style={{ background: "conic-gradient(from 0deg, rgba(232,162,32,0.28) 0deg 14deg, transparent 14deg 28deg, rgba(217,93,34,0.20) 28deg 42deg, transparent 42deg 56deg, rgba(232,162,32,0.28) 56deg 70deg, transparent 70deg 84deg, rgba(217,93,34,0.20) 84deg 98deg, transparent 98deg 112deg, rgba(232,162,32,0.28) 112deg 126deg, transparent 126deg 140deg, rgba(217,93,34,0.20) 140deg 154deg, transparent 154deg 168deg, rgba(232,162,32,0.28) 168deg 182deg, transparent 182deg 196deg, rgba(217,93,34,0.20) 196deg 210deg, transparent 210deg 224deg, rgba(232,162,32,0.28) 224deg 238deg, transparent 238deg 252deg, rgba(217,93,34,0.20) 252deg 266deg, transparent 266deg 280deg, rgba(232,162,32,0.28) 280deg 294deg, transparent 294deg 308deg, rgba(217,93,34,0.20) 308deg 322deg, transparent 322deg 336deg, rgba(232,162,32,0.28) 336deg 350deg, transparent 350deg 360deg)", maskImage: "radial-gradient(circle, black 0%, transparent 68%)", WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 68%)" }}
        />
      </div>

      {/* sun discs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {SUNS.map((g, i) => (
          <div
            key={i}
            className="hearth-breathe absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* rising ember sparks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {EMBERS.map((b, i) => (
          <Ember key={i} {...b} />
        ))}
      </div>

      {/* gliding heat streaks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {STREAKS.map((c, i) => (
          <Streak key={i} {...c} />
        ))}
      </div>

      {/* 4-banner carousel (image-only slides) */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="overflow-hidden rounded-[18px] shadow-[0_24px_60px_-24px_rgba(52,19,7,0.55)] ring-2 ring-brand-500/60 ring-offset-4 ring-offset-[#faf4e8]">
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
              <div key={s.l} className="ember-glow relative overflow-hidden rounded-[18px] border border-brand-400/30 bg-[#ffffff] p-4 pt-0 text-center transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="block h-1.5 w-full bg-gradient-to-r from-gold-soft via-gold to-brand-400" />
                <span aria-hidden className="mx-auto mb-2 mt-4 block h-2.5 w-2.5 rotate-45 bg-gradient-to-br from-gold-deep to-gold shadow-[0_0_10px_2px_rgba(232,162,32,0.6)]" />
                <span className="block text-2xl font-black tracking-tight text-brand-500">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6b5343]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-500">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#2e1c12]">Featured <span className="bg-gradient-to-r from-gold to-brand-400 bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 flex items-center gap-1.5" aria-hidden>
              <span className="block h-2.5 w-2.5 rotate-45 bg-gold" />
              <span className="block h-2.5 w-2.5 rotate-45 bg-brand-500" />
              <span className="block h-2.5 w-2.5 rotate-45 bg-brand-800" />
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
                className="ember-glow group cursor-pointer overflow-hidden rounded-[18px] border border-brand-400/30 bg-[#ffffff] transition-all hover:-translate-y-2"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden rounded-t-[14px]">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(181,122,14,0.8)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-8 bottom-0 h-1 rounded-full bg-gradient-to-r from-gold-deep via-gold to-brand-400" />
                </div>
                <div className="border-t border-brand-400/20 p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#2e1c12]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-500">{tk(p.price)} <span className="text-xs font-medium text-[#6b5343] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 -rotate-2 rounded-lg border-2 border-dashed border-gold-soft/90 bg-gradient-to-r from-gold-deep to-gold px-5 py-2 text-sm font-black tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(232,162,32,0.7)]">-45% TODAY</span>
        </div>
      </div>

      {/* souk zigzag awning divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-14 w-full">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="block h-full w-full">
          <path d={zigBack} fill="#d95d22" opacity="0.14" />
          <path d={zigFront} fill="none" stroke="#e8a020" strokeWidth="3" opacity="0.6" />
        </svg>
      </div>
    </section>
  );
}
