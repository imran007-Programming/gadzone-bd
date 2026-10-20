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

// Fireflies: tiny glowing fireflies drifting upward over the pond.
const FIREFLIES = [
  { left: "9%", delay: "0s", dur: "14s", size: 7, c: "#a3b914" },
  { left: "27%", delay: "-4s", dur: "16s", size: 5, c: "#4db57e" },
  { left: "52%", delay: "-8s", dur: "15s", size: 9, c: "#d9f99d" },
  { left: "71%", delay: "-2.5s", dur: "17s", size: 6, c: "#1f9e63" },
  { left: "88%", delay: "-6s", dur: "13.5s", size: 8, c: "#6e870b" },
  { left: "40%", delay: "-10s", dur: "15.5s", size: 5, c: "#e2f5a8" },
];

function Firefly({ left, delay, dur, size, c }: (typeof FIREFLIES)[number]) {
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
          background: `radial-gradient(circle at 40% 35%, #f4fde4, ${c} 70%)`,
          boxShadow: `0 0 12px 2px ${c}88`,
          opacity: 0.9,
        }}
      />
    </div>
  );
}

// Lantern light pools: soft breathing patches of jade and lime.
const POOLS = [
  { left: "6%", top: "14%", size: 250, delay: "0s", dur: "9s", c: "rgba(31, 158, 99, 0.16)" },
  { left: "66%", top: "4%", size: 310, delay: "-2.5s", dur: "10.5s", c: "rgba(163, 185, 20, 0.13)" },
  { left: "38%", top: "42%", size: 200, delay: "-5s", dur: "8s", c: "rgba(20, 129, 81, 0.18)" },
  { left: "80%", top: "48%", size: 170, delay: "-1s", dur: "9.5s", c: "rgba(77, 181, 126, 0.15)" },
];

// Leaf drifts: thin green strokes gliding sideways like leaves on pond water.
const DRIFTS = [
  { left: "10%", top: "20%", width: 130, delay: "0s", dur: "11s", c: "#1f9e63" },
  { left: "32%", top: "62%", width: 95, delay: "-3s", dur: "12.5s", c: "#116a44" },
  { left: "56%", top: "14%", width: 145, delay: "-6s", dur: "10s", c: "#4db57e" },
  { left: "74%", top: "56%", width: 105, delay: "-1.5s", dur: "13.5s", c: "#148151" },
  { left: "42%", top: "36%", width: 75, delay: "-8s", dur: "11.5s", c: "#a3b914" },
];

function Drift({ left, top, width, delay, dur, c }: (typeof DRIFTS)[number]) {
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

// Pond ripple divider: two layered waves into the page below.
const waveBack = "M0,44 C120,14 240,14 360,44 S600,74 720,44 S960,14 1080,44 S1320,74 1440,44 L1440,56 L0,56 Z";
const waveFront = "M0,36 C140,60 280,60 420,36 S700,12 840,36 S1120,60 1260,36 S1400,20 1440,32 L1440,56 L0,56 Z";

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* pondside firefly: mint wash with drifting fireflies and lantern pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#e7f4ec]/80 via-[#f1f8f2] to-[#f1f8f2]" />

      {/* lantern light pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {POOLS.map((g, i) => (
          <div
            key={i}
            className="hearth-breathe absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* rising fireflies */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {FIREFLIES.map((b, i) => (
          <Firefly key={i} {...b} />
        ))}
      </div>

      {/* gliding leaf drifts */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {DRIFTS.map((c, i) => (
          <Drift key={i} {...c} />
        ))}
      </div>

      {/* 4-banner carousel (image-only slides) */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="overflow-hidden rounded-[18px] shadow-[0_24px_60px_-24px_rgba(5,46,30,0.55)] ring-2 ring-brand-500/60 ring-offset-4 ring-offset-[#f1f8f2]">
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
                <span aria-hidden className="mx-auto mb-2 mt-4 block h-2.5 w-2.5 rotate-45 bg-gradient-to-br from-gold-deep to-gold shadow-[0_0_10px_2px_rgba(163,185,20,0.6)]" />
                <span className="block text-2xl font-black tracking-tight text-brand-500">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#4c665b]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-500">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#102b1f]">Featured <span className="bg-gradient-to-r from-gold to-brand-400 bg-clip-text text-transparent">Picks</span></h2>
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
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(110,135,11,0.8)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-8 bottom-0 h-1 rounded-full bg-gradient-to-r from-gold-deep via-gold to-brand-400" />
                </div>
                <div className="border-t border-brand-400/20 p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#102b1f]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-500">{tk(p.price)} <span className="text-xs font-medium text-[#4c665b] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 -rotate-2 rounded-lg border-2 border-dashed border-gold-soft/90 bg-gradient-to-r from-gold-deep to-gold px-5 py-2 text-sm font-black tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(163,185,20,0.7)]">-45% TODAY</span>
        </div>
      </div>

      {/* pond ripple divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-14 w-full">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="block h-full w-full">
          <path d={waveBack} fill="#1f9e63" opacity="0.12" />
          <path d={waveFront} fill="none" stroke="#a3b914" strokeWidth="2.5" opacity="0.55" />
        </svg>
      </div>
    </section>
  );
}
