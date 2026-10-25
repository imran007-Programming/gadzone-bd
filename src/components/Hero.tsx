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

// Warm grove light drifting over the leaves.
const ORBS = [
  { left: "4%", top: "8%", size: 180, delay: "0s", dur: "14s", c: "rgba(5,150,105, 0.20)" },
  { left: "70%", top: "2%", size: 230, delay: "-4s", dur: "15s", c: "rgba(245,158,11, 0.20)" },
  { left: "42%", top: "46%", size: 150, delay: "-7s", dur: "13s", c: "rgba(234,88,12, 0.16)" },
  { left: "84%", top: "52%", size: 130, delay: "-2s", dur: "14s", c: "rgba(194,65,12, 0.16)" },
];

// Leaves drifting down through the grove.
const FLAKES = [
  { left: "8%", delay: "0s", dur: "9.2s", s: 12, c: "#059669" },
  { left: "21%", delay: "-1.4s", dur: "10.8s", s: 16, c: "#f59e0b" },
  { left: "36%", delay: "-2.6s", dur: "9.8s", s: 13, c: "#10b981" },
  { left: "53%", delay: "-0.8s", dur: "10.4s", s: 17, c: "#ea580c" },
  { left: "68%", delay: "-3.2s", dur: "9.6s", s: 12, c: "#fbbf24" },
  { left: "82%", delay: "-2s", dur: "10.2s", s: 14, c: "#047857" },
  { left: "93%", delay: "-0.4s", dur: "9.4s", s: 10, c: "#9a3412" },
];

// Firefly blinks scattered through the light.
const STARS = Array.from({ length: 26 }).map((_, i) => ({
  left: `${(i * 37 + 11) % 96}%`,
  top: `${(i * 53 + 7) % 62}%`,
  size: 2 + ((i * 7) % 3),
  delay: `${-(i * 0.53) % 3.4}s`,
}));

function Flake({ left, delay, dur, s, c }: (typeof FLAKES)[number]) {
  return (
    <div
      aria-hidden
      className="pop-fall pointer-events-none absolute top-0"
      style={{ left, animationDelay: delay, animationDuration: dur }}
    >
      <div
        style={{
          width: s,
          height: s,
          borderRadius: "35%",
          background: `linear-gradient(135deg, ${c} 0%, #ffffffcc 45%, ${c} 100%)`,
          boxShadow: `0 0 12px 2px ${c}66`,
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
      {/* frost wash under the circuit light */}
      <div className="relative bg-gradient-to-b from-[#fff7ed] via-[#fef3c7] to-[#ffedd5]">
        <div aria-hidden className="bazaar-awning absolute inset-x-0 top-0 z-30 h-3" />
        <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-70" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-400/15" />

        {/* frost wash sweeping the circuit */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-[560px] opacity-90 sm:block">
          <div className="pop-drift absolute -left-24 top-6 h-72 w-[52rem] rotate-[-8deg] rounded-full bg-gradient-to-r from-brand-400/35 via-popblue-300/20 to-transparent blur-3xl" />
          <div className="pop-drift absolute -right-24 top-40 h-64 w-[44rem] rotate-[10deg] rounded-full bg-gradient-to-r from-transparent via-gold-300/25 to-brand-400/30 blur-3xl" style={{ animationDelay: "-12s" }} />
        </div>

        {/* circuit core: a first-light orb ringed by a slow-spinning signal dial */}
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-32 z-0 hidden opacity-90 sm:block">
          <div className="relative h-[600px] w-[600px]">
            <div className="nebula-core absolute inset-8 rounded-full blur-xl" />
            <div className="sun-rays pop-spin absolute inset-0" />
            {/* signal rings around the beacon */}
            {[0, 1, 2].map((r) => (
              <span
                key={r}
                className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-300/70"
                style={{
                  width: `${96 - r * 20}%`,
                  height: `${96 - r * 20}%`,
                  boxShadow: "0 0 28px 2px rgba(13,148,136, 0.45), inset 0 0 18px rgba(6,182,212, 0.25)",
                  opacity: 1 - r * 0.22,
                }}
              />
            ))}
            {/* the circuit heart: a layered first-light disc */}
            <div className="sun-disc pop-spin absolute inset-44 rounded-full" style={{ animationDuration: "60s" }} />
            {/* beacon glints */}
            <div className="absolute inset-44 overflow-hidden rounded-full opacity-40">
              {[{l:"30%",t:"34%",s:46},{l:"58%",t:"52%",s:34},{l:"44%",t:"66%",s:24},{l:"64%",t:"30%",s:20}].map((glint, i) => (
                <span key={i} className="absolute rounded-full bg-white/80" style={{ left: glint.l, top: glint.t, width: glint.s, height: glint.s }} />
              ))}
            </div>
            {/* sweeping signal beams */}
            {[0, 1, 2].map((b) => (
              <span
                key={b}
                className="pop-spin absolute left-1/2 top-1/2 origin-bottom rounded-full bg-gradient-to-t from-brand-400/50 to-transparent blur-md"
                style={{ width: 26, height: 240, transform: `translate(-50%, -100%) rotate(${b * 120}deg)`, animationDuration: "36s" }}
              />
            ))}
            {/* buoys dancing around the beacon */}
            {Array.from({ length: 10 }).map((_, i) => {
              const x = 12 + ((i * 37) % 76);
              const y = 62 + ((i * 53) % 24);
              const colors = ["#0d9488", "#06b6d4", "#1d4ed8", "#0891b2"];
              return (
                <span
                  key={i}
                  className="pop-bob absolute h-3.5 w-3.5 rounded-[35%] ring-1 ring-white/60"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    background: colors[i % colors.length],
                    boxShadow: `0 0 14px 3px ${colors[i % colors.length]}66`,
                    animationDelay: `${-i * 0.7}s`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* drifting signal glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
          {ORBS.map((g, i) => (
            <div
              key={i}
              className="pop-drift absolute rounded-full blur-3xl"
              style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
            />
          ))}
        </div>

        {/* beacon glints */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
          {STARS.map((s, i) => (
            <span
              key={i}
              className="pop-twinkle absolute rounded-full bg-[#0d9488]"
              style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }}
            />
          ))}
        </div>

        {/* rising signal spray */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
          {FLAKES.map((r, i) => (
            <Flake key={i} {...r} />
          ))}
        </div>

        {/* 4-banner carousel in a glass frame */}
        <div className="relative z-20">
          <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
            <div className="pop-lift !overflow-visible p-2">
              <div className="rounded-lg bg-gradient-to-r from-brand-500 via-gold-400 to-popblue-400 p-[4px] shadow-[0_24px_56px_-18px_rgba(13,148,136, 0.45)]">
                <div className="overflow-hidden rounded-md bg-paper ring-1 ring-ink/20">
                  <BannerCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* signal ticker: deep violet band with white type */}
        <div aria-hidden className="relative z-10 mt-8 border-y border-brand-300/60 bg-gradient-to-r from-brand-600/95 via-popblue-600/95 to-brand-700/95 py-3 shadow-[0_14px_30px_-14px_rgba(15,23,42, 0.5)] backdrop-blur">
          <div className="overflow-hidden py-2">
            <div className="pop-ticker flex w-max items-center gap-8 pr-8">
              {[...TICKER, ...TICKER].map((t, i) => (
                <span key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.22em] text-white drop-shadow-[0_1px_0_rgba(15,23,42, 0.6)]">
                  {t} <span className="text-white/70">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* signal divider into the page */}
        <div aria-hidden className="zigzag relative z-10 mx-auto mt-0 w-full max-w-7xl opacity-90" />
      </div>

      {/* Stats + featured picks under the circuit beacon */}
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
                <span className="relative block bg-gradient-to-br from-brand-600 via-gold-600 to-popblue-600 bg-clip-text text-2xl font-black tracking-tight text-transparent">{s.v}</span>
                <span className="relative mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-mute">{s.l}</span>
                <span aria-hidden className="relative mx-auto mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-200 shadow-[0_2px_6px_rgba(217,119,6, 0.5)]" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="inline-block rounded-full border border-brand-400/60 bg-white/70 px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-brand-700 shadow-[0_8px_24px_-8px_rgba(15,23,42, 0.6)] backdrop-blur">Handpicked for you</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">Featured <span className="relative bg-gradient-to-r from-brand-500 via-brand-600 to-ink bg-clip-text text-transparent">Picks<span aria-hidden className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 opacity-60 blur-[3px]" /></span></h2>
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
                  <div className="overflow-hidden border-b-2 border-brand-300">
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

      {/* signal divider into the page */}
      <div aria-hidden className="zigzag absolute bottom-0 left-0 w-full opacity-90" />
    </section>
  );
}
