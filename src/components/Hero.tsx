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

// Tide bubbles: hollow seafoam rings floating upward through the hero.
const BUBBLES = [
  { left: "10%", delay: "0s", dur: "14s", size: 22, c: "#14b3a6" },
  { left: "28%", delay: "-4s", dur: "16s", size: 14, c: "#2ccfc2" },
  { left: "54%", delay: "-8s", dur: "15s", size: 28, c: "#f59e0b" },
  { left: "73%", delay: "-2.5s", dur: "17s", size: 17, c: "#14b3a6" },
  { left: "89%", delay: "-6s", dur: "13.5s", size: 24, c: "#0f948a" },
  { left: "41%", delay: "-10s", dur: "15.5s", size: 12, c: "#fbbf24" },
];

function Bubble({ left, delay, dur, size, c }: (typeof BUBBLES)[number]) {
  return (
    <div
      aria-hidden
      className="bubble-rise pointer-events-none absolute bottom-0"
      style={{ left, animationDelay: delay, animationDuration: dur }}
    >
      <span
        className="block rounded-full"
        style={{
          width: size,
          height: size,
          border: `2px solid ${c}b3`,
          background: `radial-gradient(circle at 32% 30%, rgba(255,255,255,0.9), transparent 52%)`,
          boxShadow: `inset 0 0 10px 2px ${c}55, 0 0 14px 2px ${c}44`,
          opacity: 0.85,
        }}
      />
    </div>
  );
}

// Tide light pools: soft breathing patches of teal and amber.
const GLOWS = [
  { left: "8%", top: "16%", size: 240, delay: "0s", dur: "8s", c: "rgba(20, 179, 166, 0.18)" },
  { left: "68%", top: "6%", size: 300, delay: "-2.5s", dur: "9.5s", c: "rgba(245, 158, 11, 0.13)" },
  { left: "40%", top: "44%", size: 190, delay: "-5s", dur: "7s", c: "rgba(15, 146, 138, 0.20)" },
  { left: "82%", top: "50%", size: 160, delay: "-1s", dur: "8.5s", c: "rgba(44, 207, 194, 0.16)" },
];

// Current lines: thin streaks gliding horizontally like surface currents.
const CURRENTS = [
  { left: "8%", top: "22%", width: 120, delay: "0s", dur: "11s", c: "#14b3a6" },
  { left: "30%", top: "64%", width: 90, delay: "-3s", dur: "12s", c: "#0d6e68" },
  { left: "58%", top: "16%", width: 140, delay: "-6s", dur: "10s", c: "#2ccfc2" },
  { left: "76%", top: "58%", width: 100, delay: "-1.5s", dur: "13s", c: "#0f948a" },
  { left: "44%", top: "38%", width: 70, delay: "-8s", dur: "11.5s", c: "#f59e0b" },
];

function Current({ left, top, width, delay, dur, c }: (typeof CURRENTS)[number]) {
  return (
    <div
      aria-hidden
      className="current-drift pointer-events-none absolute"
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

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* tidal pine: seafoam wash with rising bubbles and tide pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#e4f6f1]/80 via-[#f4faf8] to-[#f4faf8]" />

      {/* tide light pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="tide-breathe absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* rising tide bubbles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {BUBBLES.map((b, i) => (
          <Bubble key={i} {...b} />
        ))}
      </div>

      {/* gliding current lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {CURRENTS.map((c, i) => (
          <Current key={i} {...c} />
        ))}
      </div>

      {/* 4-banner carousel (image-only slides) */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="overflow-hidden rounded-[18px] shadow-[0_24px_60px_-24px_rgba(7,48,43,0.55)] ring-2 ring-brand-500/50 ring-offset-4 ring-offset-[#f4faf8]">
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
              <div key={s.l} className="ember-glow relative overflow-hidden rounded-[18px] border border-brand-400/30 bg-[#ffffff] p-4 pt-5 transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[5px] bg-gradient-to-r from-gold-deep via-gold to-brand-400" />
                <span aria-hidden className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/15 blur-2xl" />
                <span className="block text-2xl font-black tracking-tight text-brand-300">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#5a7570]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-400">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#07302b]">Featured <span className="bg-gradient-to-r from-gold to-brand-300 bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 flex items-center gap-1.5" aria-hidden>
              <span className="block h-2 w-16 rounded-full bg-gradient-to-r from-gold-deep to-gold" />
              <span className="block h-2 w-10 rounded-full bg-gradient-to-r from-brand-400 to-brand-200" />
              <span className="block h-2 w-6 rounded-full bg-brand-700" />
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
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(217,119,6,0.8)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gold-deep via-gold to-brand-400" />
                </div>
                <div className="border-t border-brand-400/20 p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#07302b]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-300">{tk(p.price)} <span className="text-xs font-medium text-[#5a7570] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 -rotate-2 rounded-lg border-2 border-dashed border-gold-soft/80 bg-gradient-to-r from-gold-deep to-gold px-5 py-2 text-sm font-black tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(245,158,11,0.7)]">-45% TODAY</span>
        </div>
      </div>

      {/* tide wave divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-14 w-full">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,32 C 240,52 480,12 720,30 C 960,48 1200,14 1440,34 L1440,56 L0,56 Z" fill="#14b3a6" opacity="0.10" />
          <path d="M0,32 C 240,52 480,12 720,30 C 960,48 1200,14 1440,34" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.7" />
          <path d="M0,42 C 260,58 500,24 740,40 C 980,56 1220,26 1440,44" fill="none" stroke="#14b3a6" strokeWidth="2" opacity="0.5" />
        </svg>
      </div>
    </section>
  );
}
