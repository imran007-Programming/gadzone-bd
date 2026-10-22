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

// Morning light blooms washing across the grove hero.
const GLOWS = [
  { left: "4%", top: "8%", size: 180, delay: "0s", dur: "14s", c: "rgba(250, 204, 21, 0.30)" },
  { left: "70%", top: "2%", size: 230, delay: "-4s", dur: "15s", c: "rgba(16, 185, 129, 0.20)" },
  { left: "42%", top: "46%", size: 140, delay: "-7s", dur: "13s", c: "rgba(249, 115, 22, 0.16)" },
  { left: "84%", top: "52%", size: 130, delay: "-2s", dur: "14s", c: "rgba(253, 224, 71, 0.22)" },
];

// Sun motes rising through the morning air.
const DOTS = [
  { left: "8%", delay: "0s", dur: "7.2s", s: 10, c: "#facc15" },
  { left: "21%", delay: "-1.4s", dur: "7.8s", s: 14, c: "#fb923c" },
  { left: "36%", delay: "-2.6s", dur: "7.4s", s: 12, c: "#34d399" },
  { left: "53%", delay: "-0.8s", dur: "8s", s: 15, c: "#f97316" },
  { left: "68%", delay: "-3.2s", dur: "7.5s", s: 11, c: "#fde047" },
  { left: "82%", delay: "-2s", dur: "7.9s", s: 13, c: "#10b981" },
  { left: "93%", delay: "-0.4s", dur: "7.3s", s: 9, c: "#fdba74" },
];

// Soft morning clouds drifting over the hills.
const CLOUDS = [
  { left: "6%", top: "12%", w: 150, delay: "0s", dur: "26s" },
  { left: "48%", top: "6%", w: 190, delay: "-9s", dur: "32s" },
  { left: "76%", top: "20%", w: 130, delay: "-17s", dur: "24s" },
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

function Cloud({ left, top, w, delay, dur }: (typeof CLOUDS)[number]) {
  return (
    <div
      aria-hidden
      className="pop-drift pointer-events-none absolute"
      style={{ left, top, animationDelay: delay, animationDuration: dur }}
    >
      <div className="relative" style={{ width: w, height: w * 0.42 }}>
        <div className="absolute inset-x-0 bottom-0 h-3/5 rounded-full bg-white/90 shadow-[0_10px_26px_-10px_rgba(28,42,33,0.28)] ring-1 ring-ink/10" />
        <div className="absolute bottom-[18%] left-[12%] h-4/5 w-1/3 rounded-full bg-white ring-1 ring-ink/10" />
        <div className="absolute bottom-[22%] right-[14%] h-3/5 w-1/4 rounded-full bg-white/95 ring-1 ring-ink/10" />
      </div>
    </div>
  );
}

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* leaf-dot texture + morning sky wash */}
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-popblue-200/40 via-gold-200/20 to-transparent" />

      {/* sunrise: the morning sun climbing over rolling grove hills,
          ringed by slow sun rays and warm orbit rings, leaves bobbing */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-32 z-0 hidden opacity-90 sm:block">
        <div className="relative h-[600px] w-[600px]">
          <div className="sun-disc absolute inset-8 rounded-full blur-xl" />
          <div className="sun-rays pop-spin absolute inset-0" />
          {/* orbit rings around the morning sun */}
          {[0, 1, 2].map((r) => (
            <span
              key={r}
              className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold-300/60"
              style={{
                width: `${96 - r * 20}%`,
                height: `${96 - r * 20}%`,
                boxShadow: "0 0 24px 2px rgba(249, 115, 22, 0.35), inset 0 0 18px rgba(250, 204, 21, 0.16)",
                opacity: 1 - r * 0.22,
              }}
            />
          ))}
          {/* the morning sun itself: warm golden disc with a bright core */}
          <div className="absolute inset-44 rounded-full border-[3px] border-white/90 bg-[radial-gradient(circle_at_38%_34%,#ffffff_0%,#fef9c3_40%,#fde047_70%,#f97316_100%)] shadow-[0_0_80px_-8px_rgba(249,115,22,0.7),inset_0_0_40px_rgba(255,255,255,0.6)]" />
          {/* sun face speckle */}
          <div className="absolute inset-44 overflow-hidden rounded-full opacity-40">
            {[{l:"30%",t:"34%",s:46},{l:"58%",t:"52%",s:34},{l:"44%",t:"66%",s:24},{l:"64%",t:"30%",s:20}].map((crat, i) => (
              <span key={i} className="absolute rounded-full bg-gold-200/70" style={{ left: crat.l, top: crat.t, width: crat.s, height: crat.s }} />
            ))}
          </div>
          {/* rolling grove hills the sun rises behind */}
          <div aria-hidden className="absolute inset-x-6 bottom-16 h-48 rounded-t-[100%] border-t-2 border-ink/70 bg-gradient-to-t from-brand-800 via-brand-600 to-brand-400" />
          <div aria-hidden className="absolute inset-x-24 bottom-6 h-36 rounded-t-[100%] border-t-2 border-ink/70 bg-gradient-to-t from-brand-900 via-brand-700 to-brand-500" />
          {/* leaf sprigs bobbing on the hilltops */}
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 12 + ((i * 37) % 76);
            const y = 62 + ((i * 53) % 24);
            const colors = ["#10b981", "#facc15", "#34d399", "#fb923c"];
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
          {/* tangerine glint peeking from behind the sun */}
          <div className="absolute inset-44 translate-x-8 translate-y-7 rotate-[10deg] rounded-full bg-gold-400/60 blur-md" />
        </div>
      </div>

      {/* rising morning light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="pop-drift absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* clouds drifting over the grove */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {CLOUDS.map((c, i) => (
          <Cloud key={i} {...c} />
        ))}
      </div>

      {/* sun motes drifting up through the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {DOTS.map((r, i) => (
          <Dot key={i} {...r} />
        ))}
      </div>

      {/* 4-banner carousel in a grove sticker frame */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="rounded-[2.5rem] border-2 border-ink bg-white p-2 shadow-[8px_8px_0_rgba(28,42,33,0.9)]">
            <div className="rounded-[2rem] bg-gradient-to-r from-brand-600 via-popblue-400 to-gold-500 p-1.5">
              <div className="overflow-hidden rounded-[1.6rem] ring-2 ring-ink/80">
                <BannerCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* grove ticker: pine ribbon tilted for energy, shop's own promises */}
      <div aria-hidden className="relative z-10 mt-8 -rotate-1 border-y-2 border-ink bg-gradient-to-r from-brand-700 via-brand-800 to-brand-700 py-3 shadow-[0_18px_40px_-18px_rgba(5,150,105,0.6)]">
        <div className="overflow-hidden py-2">
          <div className="pop-ticker flex w-max items-center gap-8 pr-8">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.22em] text-popblue-300 drop-shadow">
                {t} <span className="text-gold-300">✦</span>
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
                <span className="relative block bg-gradient-to-br from-brand-600 to-gold-600 bg-clip-text text-2xl font-black tracking-tight text-transparent">{s.v}</span>
                <span className="relative mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-mute">{s.l}</span>
                <span aria-hidden className="relative mx-auto mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-brand-300 via-popblue-300 to-gold-300 shadow-[0_0_12px_rgba(250,204,21,0.6)]" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="inline-block rounded-full border-2 border-ink bg-popblue-300 px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-ink shadow-[4px_4px_0_rgba(28,42,33,0.9)]">Handpicked for you</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">Featured <span className="relative bg-gradient-to-r from-brand-600 to-gold-600 bg-clip-text text-transparent">Picks<span aria-hidden className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-gradient-to-r from-brand-300 to-gold-300 opacity-70 blur-[3px]" /></span></h2>
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
                  <div className="overflow-hidden border-b-2 border-ink/80">
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

      {/* grove line into the page */}
      <div aria-hidden className="zigzag absolute bottom-0 left-0 w-full opacity-90" />
    </section>
  );
}
