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

// Mist banks: soft fog drifting over the delta shallows.
const MISTS = [
  { left: "4%", top: "10%", size: 140, delay: "0s", dur: "10s", c: "rgba(57, 189, 164, 0.28)" },
  { left: "74%", top: "4%", size: 190, delay: "-4s", dur: "12s", c: "rgba(111, 213, 192, 0.30)" },
  { left: "44%", top: "44%", size: 110, delay: "-7s", dur: "9s", c: "rgba(22, 160, 135, 0.24)" },
  { left: "86%", top: "50%", size: 100, delay: "-2s", dur: "11s", c: "rgba(57, 189, 164, 0.22)" },
];

// Monsoon rain: slender drops sliding down with a sideways sway.
const RAIN = [
  { left: "8%", delay: "0s", dur: "9s", h: 20, c: "#39bda4" },
  { left: "21%", delay: "-3s", dur: "10.5s", h: 14, c: "#16a087" },
  { left: "36%", delay: "-6s", dur: "9.5s", h: 24, c: "#6fd5c0" },
  { left: "53%", delay: "-2s", dur: "11s", h: 16, c: "#0e7e6b" },
  { left: "68%", delay: "-7.5s", dur: "9.8s", h: 22, c: "#39bda4" },
  { left: "82%", delay: "-4.5s", dur: "10.8s", h: 15, c: "#16a087" },
  { left: "93%", delay: "-1s", dur: "9.2s", h: 19, c: "#6fd5c0" },
];

function RainDrop({ left, delay, dur, h, c }: (typeof RAIN)[number]) {
  return (
    <div
      aria-hidden
      className="rain-fall pointer-events-none absolute top-0"
      style={{ left, animationDelay: delay, animationDuration: dur }}
    >
      <div
        style={{
          width: 3,
          height: h,
          borderRadius: 999,
          background: `linear-gradient(180deg, transparent, ${c})`,
          boxShadow: `0 0 8px 1px ${c}66`,
          opacity: 0.85,
        }}
      />
    </div>
  );
}

// Delta wave divider: layered river waves into the page below.
const waveBack = "M0,34 C120,54 240,14 360,34 C480,54 600,14 720,34 C840,54 960,14 1080,34 C1200,54 1320,14 1440,34 L1440,56 L0,56 Z";
const waveFront = "M0,24 C120,44 240,6 360,26 C480,46 600,6 720,26 C840,46 960,6 1080,26 C1200,46 1320,6 1440,26";

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* monsoon delta: cool porcelain wash with drifting mist and falling rain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#eefbf8]/80 via-[#eef5f4] to-[#eef5f4]" />

      {/* rotating ripple swirl */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 z-0 hidden opacity-40 sm:block">
        <div
          className="ripple-spin h-[480px] w-[480px] rounded-full"
          style={{ background: "conic-gradient(from 0deg, rgba(57,189,164,0.30) 0deg 18deg, transparent 18deg 40deg, rgba(22,160,135,0.22) 40deg 62deg, transparent 62deg 84deg, rgba(240,173,31,0.20) 84deg 106deg, transparent 106deg 128deg, rgba(57,189,164,0.30) 128deg 150deg, transparent 150deg 172deg, rgba(22,160,135,0.22) 172deg 194deg, transparent 194deg 216deg, rgba(240,173,31,0.20) 216deg 238deg, transparent 238deg 260deg, rgba(57,189,164,0.30) 260deg 282deg, transparent 282deg 304deg, rgba(22,160,135,0.22) 304deg 326deg, transparent 326deg 348deg, rgba(240,173,31,0.20) 348deg 360deg)", maskImage: "radial-gradient(circle, black 0%, transparent 68%)", WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 68%)" }}
        />
      </div>

      {/* drifting mist banks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {MISTS.map((g, i) => (
          <div
            key={i}
            className="pool-breathe absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* falling monsoon rain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {RAIN.map((r, i) => (
          <RainDrop key={i} {...r} />
        ))}
      </div>

      {/* 4-banner carousel (image-only slides) */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="overflow-hidden rounded-[22px] shadow-[0_24px_60px_-24px_rgba(6,43,38,0.5)] ring-2 ring-brand-500/60 ring-offset-4 ring-offset-[#eef5f4]">
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
              <div key={s.l} className="ripple-glow relative overflow-hidden rounded-[22px] border border-brand-400/30 bg-[#ffffff] p-4 pt-0 text-center transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="block h-1.5 w-full bg-gradient-to-r from-brand-600 via-gold to-brand-400" />
                <span aria-hidden className="mx-auto mb-2 mt-4 flex h-4 w-4 items-center justify-center">
                  <span className="block h-3.5 w-3.5 rounded-full bg-gradient-to-br from-brand-300 to-brand-600 shadow-[0_0_10px_2px_rgba(57,189,164,0.6)] ring-2 ring-brand-100" />
                </span>
                <span className="block text-2xl font-black tracking-tight text-brand-500">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#55756f]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-500">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#14332e]">Featured <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 flex items-center gap-1.5" aria-hidden>
              <span className="block h-2.5 w-2.5 rounded-full bg-brand-500" />
              <span className="block h-2.5 w-2.5 rounded-full bg-gold" />
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
                className="ripple-glow group cursor-pointer overflow-hidden rounded-[22px] border border-brand-400/30 bg-[#ffffff] transition-all hover:-translate-y-2"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden rounded-t-[18px]">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(192,127,13,0.8)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-8 bottom-0 h-1 rounded-full bg-gradient-to-r from-brand-600 via-gold to-brand-400" />
                </div>
                <div className="border-t border-brand-400/20 p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#14332e]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-500">{tk(p.price)} <span className="text-xs font-medium text-[#55756f] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 -rotate-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-5 py-2 text-sm font-black tracking-wide text-white shadow-[0_8px_24px_-8px_rgba(22,160,135,0.7)] ring-2 ring-gold/70">-45% TODAY</span>
        </div>
      </div>

      {/* delta wave divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-14 w-full">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="block h-full w-full">
          <path d={waveBack} fill="#16a087" opacity="0.14" />
          <path d={waveFront} fill="none" stroke="#f0ad1f" strokeWidth="3" opacity="0.6" />
        </svg>
      </div>
    </section>
  );
}
