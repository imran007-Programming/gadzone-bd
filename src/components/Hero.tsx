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

// Steam wisps: tall wavy paths rising through the hero.
const WISPS = [
  { left: "8%", height: 340, delay: "0s", dur: "13s", w: 3, c: "#e5ab63" },
  { left: "26%", height: 420, delay: "-4s", dur: "15s", w: 2.5, c: "#dd9040" },
  { left: "52%", height: 380, delay: "-8s", dur: "14s", w: 3, c: "#ff6a3d" },
  { left: "74%", height: 440, delay: "-2.5s", dur: "16s", w: 2.5, c: "#e5ab63" },
  { left: "90%", height: 340, delay: "-6s", dur: "12.5s", w: 3, c: "#dd9040" },
];

function SteamWisp({ left, height, delay, dur, w, c }: (typeof WISPS)[number]) {
  const d = `M 20 0 C 4 ${height * 0.25}, 36 ${height * 0.35}, 20 ${height * 0.5} S 4 ${height * 0.75}, 20 ${height}`;
  return (
    <div
      aria-hidden
      className="steam-rise pointer-events-none absolute bottom-0"
      style={{ left, animationDelay: delay, animationDuration: dur }}
    >
      <svg width="40" height={height} viewBox={`0 0 40 ${height}`} fill="none" className="block h-auto w-10">
        <path d={d} stroke={c} strokeWidth={w} strokeLinecap="round" opacity="0.5" />
        <path d={d} stroke={c} strokeWidth={w * 2.6} strokeLinecap="round" opacity="0.12" />
      </svg>
    </div>
  );
}

// Roast-glow orbs: warm breathing light pools.
const GLOWS = [
  { left: "10%", top: "18%", size: 220, delay: "0s", dur: "7s", c: "rgba(221,144,64,0.20)" },
  { left: "70%", top: "8%", size: 280, delay: "-2.5s", dur: "8.5s", c: "rgba(255,106,61,0.14)" },
  { left: "42%", top: "46%", size: 180, delay: "-5s", dur: "6s", c: "rgba(184,98,28,0.22)" },
  { left: "84%", top: "52%", size: 150, delay: "-1s", dur: "7.5s", c: "rgba(221,144,64,0.16)" },
];

// Floating roast beans: little ellipses with a center crease.
const BEANS = [
  { left: "14%", top: "30%", size: 26, delay: "0s", dur: "10s", c: "#b8621c" },
  { left: "33%", top: "16%", size: 20, delay: "-3s", dur: "11s", c: "#944c1a" },
  { left: "61%", top: "26%", size: 30, delay: "-6s", dur: "9s", c: "#d47c26" },
  { left: "80%", top: "20%", size: 22, delay: "-1.5s", dur: "12s", c: "#b8621c" },
  { left: "47%", top: "58%", size: 18, delay: "-8s", dur: "10.5s", c: "#763e1b" },
];

function Bean({ left, top, size, delay, dur, c }: (typeof BEANS)[number]) {
  return (
    <div
      aria-hidden
      className="bean-drift pointer-events-none absolute"
      style={{ left, top, animationDelay: delay, animationDuration: dur }}
    >
      <div
        className="relative"
        style={{
          width: size,
          height: size * 1.35,
          borderRadius: "50%",
          background: `radial-gradient(circle at 34% 30%, ${c}, #3a1f10 130%)`,
          boxShadow: `0 0 18px 2px ${c}66, inset -3px -4px 8px rgba(0,0,0,0.5)`,
          border: "1px solid rgba(245,234,217,0.25)",
        }}
      >
        <span
          className="absolute left-1/2 top-[8%] block h-[84%] w-[2px] -translate-x-1/2 rounded-full"
          style={{ background: "rgba(22,17,16,0.85)" }}
        />
      </div>
    </div>
  );
}

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* espresso noir: dark roast wash with rising steam and roast glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#2b2118]/80 via-[#161110] to-[#161110]" />

      {/* roast-glow orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="glow-pulse absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* rising steam wisps */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {WISPS.map((w, i) => (
          <SteamWisp key={i} {...w} />
        ))}
      </div>

      {/* floating roast beans */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {BEANS.map((b, i) => (
          <Bean key={i} {...b} />
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
              <div key={s.l} className="ember-glow relative overflow-hidden rounded-[18px] border border-brand-400/25 bg-[#221a14] p-4 transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-70" />
                <span aria-hidden className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/15 blur-2xl" />
                <span className="block text-2xl font-black tracking-tight text-brand-300">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#c4ab8a]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-400">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#f5ead9]">Featured <span className="bg-gradient-to-r from-gold to-brand-300 bg-clip-text text-transparent">Picks</span></h2>
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
                className="ember-glow group cursor-pointer overflow-hidden rounded-[18px] border border-brand-400/25 bg-[#221a14] transition-all hover:-translate-y-2"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(214,61,31,0.8)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-60" />
                </div>
                <div className="border-t border-dashed border-brand-400/25 p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#f5ead9]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-300">{tk(p.price)} <span className="text-xs font-medium text-[#c4ab8a] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rounded-full bg-gradient-to-r from-gold-deep to-gold px-5 py-2 text-sm font-black tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(255,106,61,0.7)] ring-1 ring-gold-soft/60">-45% TODAY</span>
        </div>
      </div>

      {/* heat-wave divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-12 w-full">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,30 C 120,44 240,16 360,30 S 600,44 720,28 S 960,14 1080,30 S 1320,44 1440,28" fill="none" stroke="#dd9040" strokeWidth="2.5" opacity="0.6" />
          <path d="M0,38 C 140,48 280,26 420,38 S 660,48 800,36 S 1040,26 1180,38 S 1340,46 1440,36" fill="none" stroke="#ff6a3d" strokeWidth="2" opacity="0.5" />
          <path d="M0,30 C 120,44 240,16 360,30 S 600,44 720,28 S 960,14 1080,30 S 1320,44 1440,28 L1440,48 L0,48 Z" fill="#dd9040" opacity="0.06" />
        </svg>
      </div>
    </section>
  );
}
