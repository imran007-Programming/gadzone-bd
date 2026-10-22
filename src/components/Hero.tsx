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

// Warm dust clouds drifting across the morning market sky.
const ORBS = [
  { left: "4%", top: "8%", size: 180, delay: "0s", dur: "14s", c: "rgba(239,154,8, 0.26)" },
  { left: "70%", top: "2%", size: 230, delay: "-4s", dur: "15s", c: "rgba(207,95,31, 0.30)" },
  { left: "42%", top: "46%", size: 140, delay: "-7s", dur: "13s", c: "rgba(225,79,56, 0.20)" },
  { left: "84%", top: "52%", size: 130, delay: "-2s", dur: "14s", c: "rgba(248,180,52, 0.28)" },
];

// Marigold petals rising off the morning market floor.
const PETALS = [
  { left: "8%", delay: "0s", dur: "8.2s", s: 12, c: "#ef9a08" },
  { left: "21%", delay: "-1.4s", dur: "9.8s", s: 16, c: "#e14f38" },
  { left: "36%", delay: "-2.6s", dur: "8.8s", s: 13, c: "#f8b434" },
  { left: "53%", delay: "-0.8s", dur: "9.4s", s: 17, c: "#cf5f1f" },
  { left: "68%", delay: "-3.2s", dur: "8.6s", s: 12, c: "#fbcd6d" },
  { left: "82%", delay: "-2s", dur: "9.2s", s: 14, c: "#e37f3d" },
  { left: "93%", delay: "-0.4s", dur: "8.4s", s: 10, c: "#f07a68" },
];

// Sun sparkles scattered over the morning sky.
const STARS = Array.from({ length: 26 }).map((_, i) => ({
  left: `${(i * 37 + 11) % 96}%`,
  top: `${(i * 53 + 7) % 62}%`,
  size: 2 + ((i * 7) % 3),
  delay: `${-(i * 0.53) % 3.2}s`,
}));

function Petal({ left, delay, dur, s, c }: (typeof PETALS)[number]) {
  return (
    <div
      aria-hidden
      className="pop-fall pointer-events-none absolute bottom-0"
      style={{ left, animationDelay: delay, animationDuration: dur }}
    >
      <div
        style={{
          width: s,
          height: s * 1.3,
          borderRadius: "62% 8% 62% 8% / 62% 8% 62% 8%",
          background: `linear-gradient(135deg, ${c} 0%, #ffffff55 45%, ${c} 100%)`,
          boxShadow: `0 0 14px 3px ${c}77`,
        }}
      />
    </div>
  );
}

// Ticker phrases reuse the hero's existing stats copy.
const TICKER = ["GadZone BD", "500+ Products", "64 Districts Delivery", "50K+ Happy Customers", "Cash on Delivery"];

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* morning market sky */}
      <div className="relative bg-gradient-to-b from-[#fde9c4] via-[#f8c47e] to-[#ef9a54]">
        <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-900/30" />

        {/* sunbeams sweeping the morning sky */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-[560px] opacity-90 sm:block">
          <div className="pop-drift absolute -left-24 top-6 h-72 w-[52rem] rotate-[-8deg] rounded-full bg-gradient-to-r from-gold-300/50 via-gold-400/40 to-popblue-300/35 blur-3xl" />
          <div className="pop-drift absolute -right-24 top-40 h-64 w-[44rem] rotate-[10deg] rounded-full bg-gradient-to-r from-popblue-300/35 via-brand-300/40 to-gold-300/45 blur-3xl" style={{ animationDelay: "-12s" }} />
        </div>

        {/* morning sun: a glowing disc ringed by a slow-spinning halo */}
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-32 z-0 hidden opacity-90 sm:block">
          <div className="relative h-[600px] w-[600px]">
            <div className="nebula-core absolute inset-8 rounded-full blur-xl" />
            <div className="sun-rays pop-spin absolute inset-0" />
            {/* halo rings around the sun */}
            {[0, 1, 2].map((r) => (
              <span
                key={r}
                className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold-400/70"
                style={{
                  width: `${96 - r * 20}%`,
                  height: `${96 - r * 20}%`,
                  boxShadow: "0 0 28px 2px rgba(239,154,8, 0.45), inset 0 0 18px rgba(225,79,56, 0.2)",
                  opacity: 1 - r * 0.22,
                }}
              />
            ))}
            {/* the sun itself: a warm glowing sphere */}
            <div className="absolute inset-44 rounded-full border-[3px] border-white/90 bg-[radial-gradient(circle_at_38%_34%,#ffffff_0%,#fef1d2_40%,#fbcd6d_70%,#ef9a08_100%)] shadow-[0_0_80px_-8px_rgba(239,154,8,0.7),inset_0_0_40px_rgba(255,255,255,0.6)]" />
            {/* sun glints */}
            <div className="absolute inset-44 overflow-hidden rounded-full opacity-40">
              {[{l:"30%",t:"34%",s:46},{l:"58%",t:"52%",s:34},{l:"44%",t:"66%",s:24},{l:"64%",t:"30%",s:20}].map((glint, i) => (
                <span key={i} className="absolute rounded-full bg-white/80" style={{ left: glint.l, top: glint.t, width: glint.s, height: glint.s }} />
              ))}
            </div>
            {/* sweeping heat beams */}
            {[0, 1, 2].map((b) => (
              <span
                key={b}
                className="pop-spin absolute left-1/2 top-1/2 origin-bottom rounded-full bg-gradient-to-t from-gold-400/50 to-transparent blur-md"
                style={{ width: 26, height: 240, transform: `translate(-50%, -100%) rotate(${b * 120}deg)`, animationDuration: "36s" }}
              />
            ))}
            {/* warm motes dancing around the sun */}
            {Array.from({ length: 10 }).map((_, i) => {
              const x = 12 + ((i * 37) % 76);
              const y = 62 + ((i * 53) % 24);
              const colors = ["#ef9a08", "#e14f38", "#f8b434", "#cf5f1f"];
              return (
                <span
                  key={i}
                  className="pop-bob absolute h-3.5 w-3.5 rounded-full ring-2 ring-white/60"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    background: colors[i % colors.length],
                    boxShadow: `0 0 16px 4px ${colors[i % colors.length]}88`,
                    animationDelay: `${-i * 0.7}s`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* drifting warm dust */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
          {ORBS.map((g, i) => (
            <div
              key={i}
              className="pop-drift absolute rounded-full blur-3xl"
              style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
            />
          ))}
        </div>

        {/* sun sparkles */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
          {STARS.map((s, i) => (
            <span
              key={i}
              className="pop-twinkle absolute rounded-full bg-white"
              style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }}
            />
          ))}
        </div>

        {/* rising marigold petals */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
          {PETALS.map((r, i) => (
            <Petal key={i} {...r} />
          ))}
        </div>

        {/* 4-banner carousel in a warm souk frame */}
        <div className="relative z-20">
          <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
            <div className="rounded-[1.75rem] border-2 border-[#33200f] bg-[#fffdf7] p-2 shadow-[6px_6px_0_rgba(51,32,15,0.9)]">
              <div className="rounded-[1.25rem] bg-gradient-to-r from-gold-400 via-brand-500 to-popblue-500 p-1.5 shadow-[0_0_30px_-6px_rgba(239,154,8,0.5)]">
                <div className="overflow-hidden rounded-[1rem] border-2 border-[#33200f] bg-brand-100">
                  <BannerCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* souk ticker: chili-red ribbon, saffron type */}
        <div aria-hidden className="relative z-10 mt-8 border-y-2 border-[#33200f] bg-popblue-700/95 py-3 shadow-[0_18px_40px_-18px_rgba(225,79,56,0.6)]">
          <div className="overflow-hidden py-2">
            <div className="pop-ticker flex w-max items-center gap-8 pr-8">
              {[...TICKER, ...TICKER].map((t, i) => (
                <span key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.22em] text-gold-200 drop-shadow-[0_0_12px_rgba(253,226,165,0.6)]">
                  {t} <span className="text-gold-400">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* woven market hem into the paper below */}
        <div aria-hidden className="zigzag relative z-10 mx-auto mt-0 w-full max-w-7xl opacity-90" />
      </div>

      {/* Stats + featured picks on warm sand paper */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-10 md:pb-28">
        <motion.div variants={container} initial="hidden" animate="show" {...anim}>
          <motion.div variants={item} className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { v: "500+", l: "Products" },
              { v: "64", l: "Districts Delivery" },
              { v: "50K+", l: "Happy Customers" },
              { v: "COD", l: "Available" },
            ].map((s) => (
              <div key={s.l} className="pop-lift relative overflow-hidden p-4 pb-3 pt-5 text-center">
                <span className="relative block bg-gradient-to-br from-brand-700 via-popblue-600 to-gold-600 bg-clip-text text-2xl font-black tracking-tight text-transparent">{s.v}</span>
                <span className="relative mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-mute">{s.l}</span>
                <span aria-hidden className="relative mx-auto mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-gold-400 via-brand-500 to-popblue-500 shadow-[0_0_12px_rgba(239,154,8,0.6)]" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="inline-block rounded-full border-2 border-[#33200f] bg-white/80 px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-brand-700 shadow-[3px_3px_0_rgba(51,32,15,0.9)]">Handpicked for you</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">Featured <span className="relative bg-gradient-to-r from-brand-600 via-popblue-500 to-gold-600 bg-clip-text text-transparent">Picks<span aria-hidden className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-gradient-to-r from-popblue-400 to-gold-400 opacity-70 blur-[3px]" /></span></h2>
            <span className="zigzag mt-4 block w-44" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="pop-lift group cursor-pointer overflow-hidden pt-2"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden border-b-2 border-[#33200f]/10">
                    <ProductImage product={p} />
                  </div>
                  <span className="starburst absolute -right-1 -top-1 flex h-16 w-16 items-center justify-center p-4 text-center text-[11px] font-black leading-tight">-{discountPct(p)}%</span>
                  <span aria-hidden className="pop-stripes absolute inset-x-0 bottom-0 h-1.5" />
                </div>
                <div className="p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-ink">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-700">{tk(p.price)} <span className="text-xs font-medium text-mute line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="starburst pop-bob absolute -top-9 right-2 flex h-28 w-28 items-center justify-center p-6 text-center text-[13px] font-black leading-tight">-45%<br />TODAY</span>
        </div>
      </div>

      {/* chili ribbon into the page */}
      <div aria-hidden className="zigzag absolute bottom-0 left-0 w-full opacity-90" />
    </section>
  );
}
