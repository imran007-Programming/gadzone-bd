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

// Signal wash: violet, cyan and magenta drifting through the cool haze.
const GLOWS = [
  { left: "4%", top: "10%", size: 150, delay: "0s", dur: "14s", c: "rgba(106, 61, 224, 0.28)" },
  { left: "72%", top: "4%", size: 200, delay: "-4s", dur: "15s", c: "rgba(8, 145, 178, 0.16)" },
  { left: "44%", top: "44%", size: 120, delay: "-7s", dur: "13s", c: "rgba(106, 61, 224, 0.12)" },
  { left: "86%", top: "50%", size: 110, delay: "-2s", dur: "14s", c: "rgba(236, 72, 153, 0.18)" },
];

// Rising signal pips: bright motes floating upward off the river.
const DOTS = [
  { left: "8%", delay: "0s", dur: "7.2s", s: 22, c: "#6a3de0" },
  { left: "21%", delay: "-1.4s", dur: "7.8s", s: 16, c: "#a5f3fc" },
  { left: "36%", delay: "-2.6s", dur: "7.4s", s: 24, c: "#67e8f9" },
  { left: "53%", delay: "-0.8s", dur: "8s", s: 18, c: "#0891b2" },
  { left: "68%", delay: "-3.2s", dur: "7.5s", s: 22, c: "#6a3de0" },
  { left: "82%", delay: "-2s", dur: "7.9s", s: 15, c: "#fbcfe8" },
  { left: "93%", delay: "-0.4s", dur: "7.3s", s: 20, c: "#a5f3fc" },
];

// Ticker phrases reuse the hero's existing stats copy.
const TICKER = ["GadZone BD", "500+ Products", "64 Districts Delivery", "50K+ Happy Customers", "Cash on Delivery"];

function Dot({ left, delay, dur, s, c }: (typeof DOTS)[number]) {
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
          borderRadius: "9999px",
          background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${c} 45%, transparent 75%)`,
          boxShadow: `0 0 14px 2px ${c}66`,
          border: `1px solid ${c}88`,
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
      {/* signal wash */}
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-300/20 via-gold-500/10 to-transparent" />

      {/* orbit beacon: a tilted glass signal slab ringed by beacon rings,
          with rising signal pips and a magenta underlayer, offset right */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-32 z-0 hidden opacity-90 sm:block">
        <div className="relative h-[600px] w-[600px]">
          <div className="nebula-core absolute inset-8 rounded-full blur-2xl" />
          <div className="orbit-rings pop-spin absolute inset-0" />
          {/* beacon rings: concentric circles pulsing outward */}
          {[0, 1, 2, 3].map((r) => (
            <span
              key={r}
              className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-400/60"
              style={{
                width: `${88 - r * 13}%`,
                height: `${88 - r * 13}%`,
                boxShadow: "0 0 24px 2px rgba(106, 61, 224, 0.35)",
                opacity: 1 - r * 0.18,
              }}
            />
          ))}
          {/* drifting signal blooms */}
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 12 + ((i * 37) % 76);
            const y = 8 + ((i * 53) % 70);
            return (
              <span
                key={i}
                className="pop-bob absolute h-4 w-4 rounded-full bg-popblue-400 shadow-[0_0_16px_4px_rgba(106, 61, 224,0.5)] ring-2 ring-[#f5f3ff]/25"
                style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${-i * 0.7}s` }}
              />
            );
          })}
          {/* magenta layer peeking from behind the slab */}
          <div className="absolute inset-44 translate-x-8 translate-y-7 rotate-[10deg] rounded-[4rem] bg-popblue-500" />
          {/* the signal slab itself: tilted glass square with a violet core */}
          <div className="absolute inset-44 rotate-[10deg] rounded-[4rem] border-[3px] border-[#a5f3fc] bg-[radial-gradient(circle_at_38%_34%,#f5f1ff_0%,#8056f2_55%,#372771_100%)] shadow-[0_0_70px_-8px_rgba(106,61,224,0.75),0_0_120px_-20px_rgba(8,145,178,0.5)]" />
          {/* river grid over the slab */}
          <div className="halftone absolute inset-44 rotate-[10deg] overflow-hidden rounded-[4rem] opacity-60" />
          {/* cyan signal core at the slab's heart */}
          <div className="absolute inset-[245px] rounded-full bg-[radial-gradient(circle_at_40%_35%,#ffffff_0%,#67e8f9_45%,#0891b2_100%)] shadow-[0_0_50px_-6px_rgba(8,145,178,0.9)]" />
        </div>
      </div>

      {/* drifting cool haze */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="pop-drift absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* signal pips rising off the river */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {DOTS.map((r, i) => (
          <Dot key={i} {...r} />
        ))}
      </div>

      {/* 4-banner carousel in a deep-glass frame with a wave ribbon top edge */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="pop-lift overflow-hidden bg-paper">
            <div aria-hidden className="pop-stripes h-4 border-b border-brand-400/20" />
            <div className="overflow-hidden p-2">
              <div className="overflow-hidden rounded-lg ring-2 ring-brand-400/20">
                <BannerCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* river ticker: signal-band, marquee of the shop's own promises */}
      <div aria-hidden className="relative z-10 mt-8 border-y border-brand-300/40 bg-gradient-to-r from-brand-500 via-gold-600 to-popblue-500 py-3 shadow-[0_0_40px_-8px_rgba(106, 61, 224,0.5)]">
        <div className="overflow-hidden py-2">
          <div className="pop-ticker flex w-max items-center gap-8 pr-8">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.22em] text-[#f5f3ff]">
                {t} <span className="text-[#f5f3ff]/60">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats + featured picks */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-10 md:pb-28">
        <motion.div variants={container} initial="hidden" animate="show" {...anim}>
          <motion.div variants={item} className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { v: "500+", l: "Products" },
              { v: "64", l: "Districts Delivery" },
              { v: "50K+", l: "Happy Customers" },
              { v: "COD", l: "Available" },
            ].map((s) => (
              <div key={s.l} className="pop-lift relative overflow-hidden border-t-4 border-t-brand-400 bg-paper p-4 pb-3 text-center">
                <span aria-hidden className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-brand-400/15 to-transparent" />
                <span className="relative block text-2xl font-black tracking-tight text-brand-700">{s.v}</span>
                <span className="relative mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-mute">{s.l}</span>
                <span aria-hidden className="relative mx-auto mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-brand-400 via-popblue-400 to-gold-400 shadow-[0_0_12px_rgba(106, 61, 224,0.6)]" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="inline-block rounded-full border-2 border-gold-400/50 bg-gold-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-gold-700 shadow-[0_0_20px_rgba(236, 72, 153,0.35)]">Handpicked for you</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">Featured <span className="relative text-brand-700">Picks<span aria-hidden className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-gradient-to-r from-brand-400 to-gold-400 opacity-80 blur-[3px]" /></span></h2>
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
                className="pop-lift group cursor-pointer overflow-hidden bg-paper"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden border-b border-brand-400/20">
                    <ProductImage product={p} />
                  </div>
                  <span className="starburst absolute -right-1 -top-1 flex h-16 w-16 items-center justify-center p-4 text-center text-[11px] font-black leading-tight">-{discountPct(p)}%</span>
                  <span aria-hidden className="pop-stripes absolute inset-x-0 bottom-0 h-2 border-t border-brand-400/20" />
                </div>
                <div className="p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-ink">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-700">{tk(p.price)} <span className="text-xs font-medium text-mute line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="starburst pop-bob absolute -top-9 right-2 flex h-28 w-28 items-center justify-center p-6 text-center text-[13px] font-black leading-tight">-45%<br />TODAY</span>
        </div>
      </div>

      {/* signal-line divider into the page */}
      <div aria-hidden className="zigzag absolute bottom-0 left-0 w-full opacity-90" />
    </section>
  );
}
