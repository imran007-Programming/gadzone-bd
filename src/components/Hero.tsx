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

// Tide bubbles: translucent circles rising through the hero.
const BUBBLES = [
  { left: "8%", height: 340, delay: "0s", dur: "14s", size: 26, c: "#5eead4" },
  { left: "26%", height: 420, delay: "-5s", dur: "16s", size: 18, c: "#0d9488" },
  { left: "52%", height: 380, delay: "-9s", dur: "15s", size: 30, c: "#f59e0b" },
  { left: "74%", height: 440, delay: "-3s", dur: "17s", size: 20, c: "#5eead4" },
  { left: "90%", height: 340, delay: "-7s", dur: "13.5s", size: 24, c: "#0d9488" },
];

function TideBubble({ left, delay, dur, size, c }: (typeof BUBBLES)[number]) {
  return (
    <div
      aria-hidden
      className="tide-rise pointer-events-none absolute bottom-0"
      style={{ left, animationDelay: delay, animationDuration: dur }}
    >
      <span
        className="block rounded-full"
        style={{
          width: size,
          height: size,
          border: `2px solid ${c}`,
          background: `radial-gradient(circle at 32% 30%, rgba(255,255,255,0.85), transparent 55%), ${c}33`,
          opacity: 0.75,
        }}
      />
    </div>
  );
}

// Sunlight-through-water pools: soft breathing light patches.
const GLOWS = [
  { left: "10%", top: "18%", size: 220, delay: "0s", dur: "7.5s", c: "rgba(13,148,136,0.20)" },
  { left: "70%", top: "8%", size: 280, delay: "-2.5s", dur: "9s", c: "rgba(245,158,11,0.14)" },
  { left: "42%", top: "46%", size: 180, delay: "-5s", dur: "6.5s", c: "rgba(15,118,110,0.22)" },
  { left: "84%", top: "52%", size: 150, delay: "-1s", dur: "8s", c: "rgba(13,148,136,0.16)" },
];

// Floating sea-glass chips: frosted rounded shards drifting in the tide.
const CHIPS = [
  { left: "14%", top: "30%", size: 26, delay: "0s", dur: "11s", c: "#0d9488" },
  { left: "33%", top: "16%", size: 20, delay: "-3s", dur: "12s", c: "#115e59" },
  { left: "61%", top: "26%", size: 30, delay: "-6s", dur: "10s", c: "#5eead4" },
  { left: "80%", top: "20%", size: 22, delay: "-1.5s", dur: "13s", c: "#0f766e" },
  { left: "47%", top: "58%", size: 18, delay: "-8s", dur: "11.5s", c: "#f59e0b" },
];

function SeaChip({ left, top, size, delay, dur, c }: (typeof CHIPS)[number]) {
  return (
    <div
      aria-hidden
      className="chip-drift pointer-events-none absolute"
      style={{ left, top, animationDelay: delay, animationDuration: dur }}
    >
      <div
        className="relative"
        style={{
          width: size * 1.6,
          height: size,
          borderRadius: "38% 62% 55% 45% / 52% 44% 56% 48%",
          background: `linear-gradient(135deg, ${c}cc, ${c}44)`,
          boxShadow: `0 0 22px 2px ${c}55, inset 2px 3px 6px rgba(255,255,255,0.6)`,
          border: "1px solid rgba(255,255,255,0.7)",
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
      {/* tidal porcelain: bright tide wash with rising bubbles and light pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#e8f1ef]/80 via-[#f6faf9] to-[#f6faf9]" />

      {/* sunlight-through-water pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="pool-pulse absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* rising tide bubbles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {BUBBLES.map((b, i) => (
          <TideBubble key={i} {...b} />
        ))}
      </div>

      {/* floating sea-glass chips */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {CHIPS.map((c, i) => (
          <SeaChip key={i} {...c} />
        ))}
      </div>

      {/* 4-banner carousel (image-only slides) */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="overflow-hidden rounded-[22px] ring-1 ring-brand-400/30 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
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
              <div key={s.l} className="ember-glow relative overflow-hidden rounded-[18px] border border-brand-400/25 bg-[#ffffff] p-4 transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-70" />
                <span aria-hidden className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/15 blur-2xl" />
                <span className="block text-2xl font-black tracking-tight text-brand-300">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#52716c]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-400">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#0f2e2b]">Featured <span className="bg-gradient-to-r from-gold to-brand-300 bg-clip-text text-transparent">Picks</span></h2>
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
                className="ember-glow group cursor-pointer overflow-hidden rounded-[18px] border border-brand-400/25 bg-[#ffffff] transition-all hover:-translate-y-2"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(217,119,6,0.8)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-60" />
                </div>
                <div className="border-t border-dashed border-brand-400/25 p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#0f2e2b]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-300">{tk(p.price)} <span className="text-xs font-medium text-[#52716c] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rounded-full bg-gradient-to-r from-gold-deep to-gold px-5 py-2 text-sm font-black tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(245,158,11,0.7)] ring-1 ring-gold-soft/60">-45% TODAY</span>
        </div>
      </div>

      {/* tide-wave divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-12 w-full">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,30 C 120,44 240,16 360,30 S 600,44 720,28 S 960,14 1080,30 S 1320,44 1440,28" fill="none" stroke="#0d9488" strokeWidth="2.5" opacity="0.6" />
          <path d="M0,38 C 140,48 280,26 420,38 S 660,48 800,36 S 1040,26 1180,38 S 1340,46 1440,36" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.5" />
          <path d="M0,30 C 120,44 240,16 360,30 S 600,44 720,28 S 960,14 1080,30 S 1320,44 1440,28 L1440,48 L0,48 Z" fill="#0d9488" opacity="0.06" />
        </svg>
      </div>
    </section>
  );
}
