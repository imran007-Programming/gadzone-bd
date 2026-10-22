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

// Dusk aurora: violet, amber and sky light blooms across the hero.
const GLOWS = [
  { left: "4%", top: "8%", size: 180, delay: "0s", dur: "14s", c: "rgba(124, 58, 237, 0.30)" },
  { left: "70%", top: "2%", size: 230, delay: "-4s", dur: "15s", c: "rgba(14, 165, 233, 0.22)" },
  { left: "42%", top: "46%", size: 140, delay: "-7s", dur: "13s", c: "rgba(245, 158, 11, 0.16)" },
  { left: "84%", top: "52%", size: 130, delay: "-2s", dur: "14s", c: "rgba(139, 92, 246, 0.20)" },
];

// Fireflies rising through the evening air.
const DOTS = [
  { left: "8%", delay: "0s", dur: "7.2s", s: 10, c: "#a78bfa" },
  { left: "21%", delay: "-1.4s", dur: "7.8s", s: 14, c: "#fcd34d" },
  { left: "36%", delay: "-2.6s", dur: "7.4s", s: 12, c: "#7dd3fc" },
  { left: "53%", delay: "-0.8s", dur: "8s", s: 15, c: "#f59e0b" },
  { left: "68%", delay: "-3.2s", dur: "7.5s", s: 11, c: "#8b5cf6" },
  { left: "82%", delay: "-2s", dur: "7.9s", s: 13, c: "#38bdf8" },
  { left: "93%", delay: "-0.4s", dur: "7.3s", s: 9, c: "#ddd6fe" },
];

// Ticker phrases reuse the hero's existing stats copy.
const TICKER = ["GadZone BD", "500+ Products", "64 Districts Delivery", "50K+ Happy Customers", "Cash on Delivery"];

function Dot({ left, delay, dur, s, c }: (typeof DOTS)[number]) {
  return (
    <div
      aria-hidden
      className="pop-fall pointer-events-none absolute bottom-0"
      style={{ left, animationDelay: delay, animationDuration: dur }}
    >
      <div
        style={{
          width: s,
          height: s,
          borderRadius: "9999px",
          background: `radial-gradient(circle at 38% 34%, #ffffff 0%, ${c} 55%, ${c} 100%)`,
          boxShadow: `0 0 14px 3px ${c}66`,
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
      {/* firefly texture + dusk wash */}
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-200/30 via-transparent to-transparent" />

      {/* dusk sun: a warm violet disc low on the horizon, ringed by slow
          amber rays and violet orbit rings, with fireflies rising */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-32 z-0 hidden opacity-90 sm:block">
        <div className="relative h-[600px] w-[600px]">
          <div className="sun-disc absolute inset-8 rounded-full blur-xl" />
          <div className="sun-rays pop-spin absolute inset-0" />
          {/* orbit rings around the dusk sun */}
          {[0, 1, 2].map((r) => (
            <span
              key={r}
              className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-300/60"
              style={{
                width: `${96 - r * 20}%`,
                height: `${96 - r * 20}%`,
                boxShadow: "0 0 24px 2px rgba(124, 58, 237, 0.35), inset 0 0 18px rgba(245, 158, 11, 0.14)",
                opacity: 1 - r * 0.22,
              }}
            />
          ))}
          {/* ember motes */}
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 12 + ((i * 37) % 76);
            const y = 8 + ((i * 53) % 70);
            const colors = ["#c4b5fd", "#fcd34d", "#7dd3fc", "#ffffff"];
            return (
              <span
                key={i}
                className="pop-bob absolute h-3.5 w-3.5 rounded-full ring-2 ring-white/40"
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
          {/* dusk ridge silhouettes the sun sinks behind */}
          <div aria-hidden className="absolute inset-x-10 bottom-24 h-40 rounded-t-[100%] bg-gradient-to-t from-brand-900/50 via-brand-700/25 to-transparent" />
          <div aria-hidden className="absolute inset-x-24 bottom-16 h-32 rounded-t-[100%] bg-gradient-to-t from-brand-800/40 via-brand-600/20 to-transparent" />
          {/* amber shimmer peeking from behind the sun */}
          <div className="absolute inset-44 translate-x-8 translate-y-7 rotate-[10deg] rounded-full bg-gold-400/60 blur-md" />
          {/* the dusk sun itself: warm violet disc with an amber halo */}
          <div className="absolute inset-44 rounded-full border-[3px] border-white/80 bg-[radial-gradient(circle_at_38%_34%,#ffffff_0%,#ede9fe_40%,#c4b5fd_70%,#7c3aed_100%)] shadow-[0_0_80px_-8px_rgba(124,58,237,0.7),inset_0_0_40px_rgba(255,255,255,0.6)]" />
          {/* sun texture speckle */}
          <div className="absolute inset-44 overflow-hidden rounded-full opacity-40">
            {[{l:"30%",t:"34%",s:46},{l:"58%",t:"52%",s:34},{l:"44%",t:"66%",s:24},{l:"64%",t:"30%",s:20}].map((crat, i) => (
              <span key={i} className="absolute rounded-full bg-brand-200/60" style={{ left: crat.l, top: crat.t, width: crat.s, height: crat.s }} />
            ))}
          </div>
          {/* ember pearl */}
          <div className="absolute inset-[250px] rounded-full bg-[radial-gradient(circle_at_40%_35%,#ffffff_0%,#fcd34d_55%,#f59e0b_100%)] shadow-[0_0_50px_-6px_rgba(245,158,11,0.9)]" />
        </div>
      </div>

      {/* rising dusk glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="pop-drift absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* fireflies drifting up through the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {DOTS.map((r, i) => (
          <Dot key={i} {...r} />
        ))}
      </div>

      {/* 4-banner carousel in a dusk frame edged with violet light */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="rounded-[2.5rem] bg-gradient-to-r from-brand-600 via-popblue-500 to-gold-500 p-1 shadow-[0_30px_60px_-24px_rgba(124,58,237,0.55)] ring-4 ring-brand-200/50">
            <div className="overflow-hidden rounded-[calc(2rem-4px)] bg-white/70 backdrop-blur-xl">
              <div className="overflow-hidden p-2">
                <div className="overflow-hidden rounded-[1.6rem] ring-1 ring-white/70">
                  <BannerCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* dusk ticker: deep-signal bar with the shop's own promises */}
      <div aria-hidden className="relative z-10 mt-8 border-y border-white/40 bg-gradient-to-r from-brand-800/95 via-brand-950/95 to-brand-800/95 py-3 shadow-[0_18px_40px_-18px_rgba(124,58,237,0.6)] backdrop-blur-md">
        <div className="overflow-hidden py-2">
          <div className="pop-ticker flex w-max items-center gap-8 pr-8">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.22em] text-white drop-shadow">
                {t} <span className="text-white/60">✦</span>
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
              <div key={s.l} className="pop-lift relative overflow-hidden bg-white/80 p-4 pb-3 text-center backdrop-blur-sm">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-400 via-gold-400 to-popblue-400" />
                <span className="relative block bg-gradient-to-br from-brand-600 to-popblue-600 bg-clip-text text-2xl font-black tracking-tight text-transparent">{s.v}</span>
                <span className="relative mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-mute">{s.l}</span>
                <span aria-hidden className="relative mx-auto mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-brand-300 via-popblue-300 to-gold-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="inline-block rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-gold-700 shadow-[0_10px_24px_-12px_rgba(124,58,237,0.5)] backdrop-blur-md">Handpicked for you</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">Featured <span className="relative bg-gradient-to-r from-brand-600 to-popblue-600 bg-clip-text text-transparent">Picks<span aria-hidden className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-gradient-to-r from-brand-300 to-popblue-300 opacity-70 blur-[3px]" /></span></h2>
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
                className="pop-lift group cursor-pointer overflow-hidden bg-white/80 backdrop-blur-sm"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden border-b border-brand-100">
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

      {/* dusk line into the page */}
      <div aria-hidden className="zigzag absolute bottom-0 left-0 w-full opacity-90" />
    </section>
  );
}
