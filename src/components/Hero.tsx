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

// Dusk fireflies: warm glowing motes drifting upward through the hero.
const FIREFLIES = [
  { left: "10%", height: 340, delay: "0s", dur: "13s", size: 14, c: "#ff6a3d" },
  { left: "28%", height: 420, delay: "-4s", dur: "15s", size: 10, c: "#a677f1" },
  { left: "54%", height: 380, delay: "-8s", dur: "14s", size: 16, c: "#ff9e5e" },
  { left: "73%", height: 440, delay: "-2.5s", dur: "16s", size: 11, c: "#8a56ec" },
  { left: "89%", height: 340, delay: "-6s", dur: "12.5s", size: 13, c: "#ffb59b" },
];

function Firefly({ left, delay, dur, size, c }: (typeof FIREFLIES)[number]) {
  return (
    <div
      aria-hidden
      className="firefly-rise pointer-events-none absolute bottom-0"
      style={{ left, animationDelay: delay, animationDuration: dur }}
    >
      <span
        className="block rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 40% 35%, rgba(255,255,255,0.95), transparent 55%), ${c}`,
          boxShadow: `0 0 18px 4px ${c}99, 0 0 42px 8px ${c}44`,
          opacity: 0.9,
        }}
      />
    </div>
  );
}

// Dusk light pools: soft breathing patches of violet and flame.
const GLOWS = [
  { left: "8%", top: "16%", size: 240, delay: "0s", dur: "8s", c: "rgba(138, 86, 236, 0.18)" },
  { left: "68%", top: "6%", size: 300, delay: "-2.5s", dur: "9.5s", c: "rgba(255, 106, 61, 0.13)" },
  { left: "40%", top: "44%", size: 190, delay: "-5s", dur: "7s", c: "rgba(117, 64, 218, 0.20)" },
  { left: "82%", top: "50%", size: 160, delay: "-1s", dur: "8.5s", c: "rgba(166, 119, 241, 0.16)" },
];

// Orchid petals: two-lobed blossom shards swaying in the evening air.
const PETALS = [
  { left: "13%", top: "28%", size: 24, delay: "0s", dur: "10s", c: "#8a56ec", tilt: "-24deg" },
  { left: "32%", top: "14%", size: 18, delay: "-3s", dur: "11s", c: "#6132b6", tilt: "14deg" },
  { left: "60%", top: "24%", size: 28, delay: "-6s", dur: "9.5s", c: "#a677f1", tilt: "-10deg" },
  { left: "79%", top: "18%", size: 20, delay: "-1.5s", dur: "12s", c: "#7540da", tilt: "22deg" },
  { left: "46%", top: "56%", size: 16, delay: "-8s", dur: "10.5s", c: "#ff6a3d", tilt: "-18deg" },
];

function Petal({ left, top, size, delay, dur, c, tilt }: (typeof PETALS)[number]) {
  return (
    <div
      aria-hidden
      className="petal-sway pointer-events-none absolute"
      style={{ left, top, animationDelay: delay, animationDuration: dur }}
    >
      <div
        className="relative"
        style={{
          width: size * 1.15,
          height: size * 1.35,
          borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%",
          transform: `rotate(${tilt})`,
          background: `linear-gradient(150deg, ${c}f2, ${c}55)`,
          boxShadow: `0 0 20px 2px ${c}66, inset 2px 3px 8px rgba(255,255,255,0.55)`,
          border: "1px solid rgba(255,255,255,0.65)",
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
      {/* orchid dusk: warm ivory wash with drifting fireflies and dusk pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f1e9fb]/80 via-[#faf7fd] to-[#faf7fd]" />

      {/* dusk light pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="glow-breathe absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* drifting fireflies */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {FIREFLIES.map((f, i) => (
          <Firefly key={i} {...f} />
        ))}
      </div>

      {/* swaying orchid petals */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {PETALS.map((p, i) => (
          <Petal key={i} {...p} />
        ))}
      </div>

      {/* 4-banner carousel (image-only slides) */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="overflow-hidden rounded-[26px] ring-1 ring-brand-400/30 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
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
              <div key={s.l} className="ember-glow relative overflow-hidden rounded-[26px] border border-brand-400/25 bg-[#ffffff] p-4 pl-5 transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="absolute inset-y-0 left-0 w-[5px] bg-gradient-to-b from-gold via-brand-400 to-brand-700 opacity-80" />
                <span aria-hidden className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/15 blur-2xl" />
                <span className="block text-2xl font-black tracking-tight text-brand-300">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6b5b80]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-400">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#2c1842]">Featured <span className="bg-gradient-to-r from-gold to-brand-300 bg-clip-text text-transparent">Picks</span></h2>
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
                className="ember-glow group cursor-pointer overflow-hidden rounded-[26px] border border-brand-400/25 bg-[#ffffff] transition-all hover:-translate-y-2"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(224,68,30,0.8)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-4 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-60" />
                </div>
                <div className="border-t border-dashed border-brand-400/25 p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#2c1842]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-300">{tk(p.price)} <span className="text-xs font-medium text-[#6b5b80] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rounded-full bg-gradient-to-r from-gold-deep to-gold px-5 py-2 text-sm font-black tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(255,106,61,0.7)] ring-1 ring-gold-soft/60">-45% TODAY</span>
        </div>
      </div>

      {/* dusk arc divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-14 w-full">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,40 Q 180,8 360,32 T 720,30 T 1080,34 T 1440,28" fill="none" stroke="#8a56ec" strokeWidth="2.5" opacity="0.55" />
          <path d="M0,48 Q 200,20 400,42 T 800,40 T 1200,44 T 1440,40" fill="none" stroke="#ff6a3d" strokeWidth="2" opacity="0.5" />
          <path d="M0,40 Q 180,8 360,32 T 720,30 T 1080,34 T 1440,28 L1440,56 L0,56 Z" fill="#8a56ec" opacity="0.05" />
        </svg>
      </div>
    </section>
  );
}
