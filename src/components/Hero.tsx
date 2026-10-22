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

// Rising forest signal: emerald, lime and teal light washing the hero.
const GLOWS = [
  { left: "4%", top: "8%", size: 170, delay: "0s", dur: "14s", c: "rgba(16,185,129, 0.30)" },
  { left: "70%", top: "2%", size: 220, delay: "-4s", dur: "15s", c: "rgba(16,185,129, 0.22)" },
  { left: "42%", top: "46%", size: 130, delay: "-7s", dur: "13s", c: "rgba(13,148,136, 0.16)" },
  { left: "84%", top: "52%", size: 120, delay: "-2s", dur: "14s", c: "rgba(16,185,129, 0.20)" },
];

// Drifting spore motes: tiny mint embers rising over the forest market.
const DOTS = [
  { left: "8%", delay: "0s", dur: "8.2s", s: 20, c: "#10b981" },
  { left: "21%", delay: "-1.4s", dur: "8.8s", s: 14, c: "#d7f2e0" },
  { left: "36%", delay: "-2.6s", dur: "8.4s", s: 22, c: "#34d399" },
  { left: "53%", delay: "-0.8s", dur: "9s", s: 16, c: "#0d9488" },
  { left: "68%", delay: "-3.2s", dur: "8.5s", s: 20, c: "#10b981" },
  { left: "82%", delay: "-2s", dur: "8.9s", s: 13, c: "#bef264" },
  { left: "93%", delay: "-0.4s", dur: "8.3s", s: 18, c: "#d7f2e0" },
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
      {/* spore-dot texture + mint wash */}
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-200/30 via-transparent to-transparent" />

      {/* forest orb: a signal orb ringed by slow pulse rings
          and drifting motes, offset right */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-32 z-0 hidden opacity-90 sm:block">
        <div className="relative h-[600px] w-[600px]">
          <div className="sun-disc absolute inset-8 rounded-full blur-xl" />
          <div className="sun-rays pop-spin absolute inset-0" />
          {/* concentric tide-ripple rings */}
          {[0, 1, 2, 3].map((r) => (
            <span
              key={r}
              className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-300/70"
              style={{
                width: `${88 - r * 13}%`,
                height: `${88 - r * 13}%`,
                boxShadow: "0 0 24px 2px rgba(16,185,129, 0.35)",
                opacity: 1 - r * 0.18,
              }}
            />
          ))}
          {/* drifting sparks */}
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 12 + ((i * 37) % 76);
            const y = 8 + ((i * 53) % 70);
            const colors = ["#84cc16", "#6ee7b7", "#a3e635", "#ffffff"];
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
          {/* lime aura peeking from behind the orb */}
          <div className="absolute inset-44 translate-x-8 translate-y-7 rotate-[10deg] rounded-full bg-gold-400/60 blur-md" />
          {/* the orb itself: emerald disc with a lime halo */}
          <div className="absolute inset-44 rounded-full border-[3px] border-white/80 bg-[radial-gradient(circle_at_38%_34%,#ffffff_0%,#ecfdf5_40%,#d7f2e0_70%,#6ee7b7_100%)] shadow-[0_0_80px_-8px_rgba(16,185,129,0.7),inset_0_0_40px_rgba(255,255,255,0.6)]" />
          {/* pale orb-speckle */}
          <div className="absolute inset-44 overflow-hidden rounded-full opacity-40">
            {[{l:"30%",t:"34%",s:46},{l:"58%",t:"52%",s:34},{l:"44%",t:"66%",s:24},{l:"64%",t:"30%",s:20}].map((crat, i) => (
              <span key={i} className="absolute rounded-full bg-gold-300/50" style={{ left: crat.l, top: crat.t, width: crat.s, height: crat.s }} />
            ))}
          </div>
          {/* bright signal core */}
          <div className="absolute inset-[250px] rounded-full bg-[radial-gradient(circle_at_40%_35%,#ffffff_0%,#bef264_55%,#34d399_100%)] shadow-[0_0_50px_-6px_rgba(13,148,136,0.9)]" />
        </div>
      </div>

      {/* rising forest signal */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="pop-drift absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* motes drifting through the canopy */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {DOTS.map((r, i) => (
          <Dot key={i} {...r} />
        ))}
      </div>

      {/* 4-banner carousel in a mint frame edged with emerald light */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="rounded-[2rem] bg-gradient-to-r from-brand-400 via-gold-400 to-popblue-400 p-[3px] shadow-[0_30px_60px_-24px_rgba(4,120,87,0.45)]">
            <div className="overflow-hidden rounded-[calc(2rem-3px)] bg-white/70 backdrop-blur-xl">
              <div className="overflow-hidden p-2">
                <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-white/70">
                  <BannerCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* forest ticker: emerald-signal bar with the shop's own promises */}
      <div aria-hidden className="relative z-10 mt-8 border-y border-white/40 bg-gradient-to-r from-brand-600/90 via-gold-600/90 to-popblue-600/90 py-3 shadow-[0_18px_40px_-18px_rgba(4,120,87,0.6)] backdrop-blur-md">
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
                <span className="relative block bg-gradient-to-br from-brand-600 to-gold-600 bg-clip-text text-2xl font-black tracking-tight text-transparent">{s.v}</span>
                <span className="relative mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-mute">{s.l}</span>
                <span aria-hidden className="relative mx-auto mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-brand-300 via-popblue-300 to-gold-300 shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="inline-block rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-gold-700 shadow-[0_10px_24px_-12px_rgba(5,150,105,0.5)] backdrop-blur-md">Handpicked for you</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">Featured <span className="relative bg-gradient-to-r from-brand-600 to-gold-600 bg-clip-text text-transparent">Picks<span aria-hidden className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-gradient-to-r from-brand-300 to-popblue-300 opacity-70 blur-[3px]" /></span></h2>
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

      {/* tide line into the page */}
      <div aria-hidden className="zigzag absolute bottom-0 left-0 w-full opacity-90" />
    </section>
  );
}
