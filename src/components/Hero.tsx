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

// Ember sparks: tiny glowing embers drifting upward through the hero.
const SPARKS = [
  { left: "9%", delay: "0s", dur: "13s", size: 7, c: "#d66d2a" },
  { left: "27%", delay: "-4s", dur: "15s", size: 5, c: "#e28a4c" },
  { left: "52%", delay: "-8s", dur: "14s", size: 9, c: "#f2a41f" },
  { left: "71%", delay: "-2.5s", dur: "16s", size: 6, c: "#d66d2a" },
  { left: "88%", delay: "-6s", dur: "12.5s", size: 8, c: "#b8551e" },
  { left: "40%", delay: "-10s", dur: "14.5s", size: 5, c: "#ffc94d" },
];

function Spark({ left, delay, dur, size, c }: (typeof SPARKS)[number]) {
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
          background: `radial-gradient(circle at 40% 35%, #fff7e6, ${c} 70%)`,
          boxShadow: `0 0 12px 2px ${c}88`,
          opacity: 0.9,
        }}
      />
    </div>
  );
}

// Hearth light pools: soft breathing patches of rust and marigold.
const POOLS = [
  { left: "6%", top: "14%", size: 250, delay: "0s", dur: "8.5s", c: "rgba(214, 109, 42, 0.16)" },
  { left: "66%", top: "4%", size: 310, delay: "-2.5s", dur: "10s", c: "rgba(242, 164, 31, 0.13)" },
  { left: "38%", top: "42%", size: 200, delay: "-5s", dur: "7.5s", c: "rgba(184, 85, 30, 0.18)" },
  { left: "80%", top: "48%", size: 170, delay: "-1s", dur: "9s", c: "rgba(226, 138, 76, 0.15)" },
];

// Zephyr streaks: thin warm lines gliding sideways like a harvest breeze.
const ZEPHYRS = [
  { left: "10%", top: "20%", width: 130, delay: "0s", dur: "10s", c: "#d66d2a" },
  { left: "32%", top: "62%", width: 95, delay: "-3s", dur: "11.5s", c: "#93441c" },
  { left: "56%", top: "14%", width: 145, delay: "-6s", dur: "9.5s", c: "#e28a4c" },
  { left: "74%", top: "56%", width: 105, delay: "-1.5s", dur: "12.5s", c: "#b8551e" },
  { left: "42%", top: "36%", width: 75, delay: "-8s", dur: "10.5s", c: "#f2a41f" },
];

function Zephyr({ left, top, width, delay, dur, c }: (typeof ZEPHYRS)[number]) {
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

// Scalloped valance divider: a row of arches into the page below.
const SCALLOPS = 40;
const scallopPath =
  `M0,46 ` +
  Array.from({ length: SCALLOPS }, () => `a18,18 0 0 1 36,0`).join(" ") +
  ` L1440,56 L0,56 Z`;
const scallopStroke =
  `M0,46 ` +
  Array.from({ length: SCALLOPS }, () => `a18,18 0 0 1 36,0`).join(" ");

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* ember orchard: warm cream wash with rising sparks and hearth pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fbeee2]/80 via-[#fdf8f2] to-[#fdf8f2]" />

      {/* hearth light pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {POOLS.map((g, i) => (
          <div
            key={i}
            className="hearth-breathe absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* rising ember sparks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {SPARKS.map((b, i) => (
          <Spark key={i} {...b} />
        ))}
      </div>

      {/* gliding zephyr streaks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {ZEPHYRS.map((c, i) => (
          <Zephyr key={i} {...c} />
        ))}
      </div>

      {/* 4-banner carousel (image-only slides) */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="overflow-hidden rounded-[26px] shadow-[0_24px_60px_-24px_rgba(51,22,8,0.55)] ring-2 ring-brand-500/60 ring-offset-4 ring-offset-[#fdf8f2]">
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
              <div key={s.l} className="ember-glow relative overflow-hidden rounded-b-[20px] rounded-t-[48px] border border-brand-400/30 bg-[#ffffff] p-4 pt-6 text-center transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="absolute -top-7 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-gradient-to-b from-gold-soft to-gold/70 opacity-60 blur-xl" />
                <span aria-hidden className="mx-auto mb-2 block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-gold-deep to-gold shadow-[0_0_10px_2px_rgba(242,164,31,0.6)]" />
                <span className="block text-2xl font-black tracking-tight text-brand-500">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6f5a4b]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-500">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#3a2318]">Featured <span className="bg-gradient-to-r from-gold to-brand-400 bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 flex items-center gap-1.5" aria-hidden>
              <span className="block h-2.5 w-2.5 rounded-full bg-gold" />
              <span className="block h-2.5 w-2.5 rounded-full bg-brand-500" />
              <span className="block h-2.5 w-2.5 rounded-full bg-brand-800" />
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
                className="ember-glow group cursor-pointer overflow-hidden rounded-b-[20px] rounded-t-[64px] border border-brand-400/30 bg-[#ffffff] transition-all hover:-translate-y-2"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden rounded-t-[56px]">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(217,126,6,0.8)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-8 bottom-0 h-1 rounded-full bg-gradient-to-r from-gold-deep via-gold to-brand-400" />
                </div>
                <div className="border-t border-brand-400/20 p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#3a2318]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-500">{tk(p.price)} <span className="text-xs font-medium text-[#6f5a4b] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rotate-2 rounded-full border-2 border-dashed border-gold-soft/90 bg-gradient-to-r from-gold-deep to-gold px-5 py-2 text-sm font-black tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(242,164,31,0.7)]">-45% TODAY</span>
        </div>
      </div>

      {/* scalloped valance divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-14 w-full">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="block h-full w-full">
          <path d={scallopPath} fill="#d66d2a" opacity="0.12" />
          <path d={scallopStroke} fill="none" stroke="#f2a41f" strokeWidth="2.5" opacity="0.55" />
        </svg>
      </div>
    </section>
  );
}
