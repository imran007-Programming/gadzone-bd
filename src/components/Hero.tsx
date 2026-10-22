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

// Moonlit canopy: jade, firefly-lime and teal embers drifting
// over the deep forest-night sky.
const GLOWS = [
  { left: "4%", top: "10%", size: 150, delay: "0s", dur: "14s", c: "rgba(5, 150, 105, 0.28)" },
  { left: "72%", top: "4%", size: 200, delay: "-4s", dur: "15s", c: "rgba(163, 230, 53, 0.16)" },
  { left: "44%", top: "44%", size: 120, delay: "-7s", dur: "13s", c: "rgba(252, 219, 171, 0.5)" },
  { left: "86%", top: "50%", size: 110, delay: "-2s", dur: "14s", c: "rgba(45, 212, 191, 0.18)" },
];

// firefly motes: glowing spores rising through the night canopy.
const DOTS = [
  { left: "8%", delay: "0s", dur: "7.2s", s: 22, c: "#34d399" },
  { left: "21%", delay: "-1.4s", dur: "7.8s", s: 16, c: "#bef264" },
  { left: "36%", delay: "-2.6s", dur: "7.4s", s: 24, c: "#2dd4bf" },
  { left: "53%", delay: "-0.8s", dur: "8s", s: 18, c: "#a3e635" },
  { left: "68%", delay: "-3.2s", dur: "7.5s", s: 22, c: "#2dd4bf" },
  { left: "82%", delay: "-2s", dur: "7.9s", s: 15, c: "#bef264" },
  { left: "93%", delay: "-0.4s", dur: "7.3s", s: 20, c: "#34d399" },
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
          background: `radial-gradient(circle at 32% 28%, #ffffffcc, ${c} 62%)`,
          filter: "blur(0.6px)",
          boxShadow: `0 0 12px 2px ${c}66`,
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
      {/* canopy spore wash */}
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-950/60 via-popblue-soft/40 to-transparent" />

      {/* moonlit canopy: a pale jade moon with concentric halo rings
          and fireflies circling it, offset right */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-32 z-0 hidden opacity-90 sm:block">
        <div className="relative h-[600px] w-[600px]">
          <div className="nebula-core absolute inset-8 rounded-full blur-2xl" />
          <div className="orbit-rings pop-spin absolute inset-0" />
          {/* moon halo rings: concentric circles rippling outward */}
          {[0, 1, 2, 3].map((r) => (
            <span
              key={r}
              className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-300/60"
              style={{
                width: `${88 - r * 13}%`,
                height: `${88 - r * 13}%`,
                boxShadow: "0 0 24px 2px rgba(5, 150, 105, 0.35)",
                opacity: 1 - r * 0.18,
              }}
            />
          ))}
          {/* circling fireflies */}
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 12 + ((i * 37) % 76);
            const y = 8 + ((i * 53) % 70);
            return (
              <span
                key={i}
                className="pop-bob absolute h-4 w-4 rounded-full bg-gold shadow-[0_0_18px_4px_rgba(163, 230, 53,0.65)] ring-2 ring-white/60"
                style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${-i * 0.7}s` }}
              />
            );
          })}
          {/* the moon disc itself */}
          <div className="absolute inset-44 rounded-full border border-brand-200/60 bg-[radial-gradient(circle_at_38%_34%,#ecfdf5_0%,#a7f3d0_38%,#34d399_72%,#047857_100%)] shadow-[0_0_90px_28px_rgba(5, 150, 105,0.4)]" />
          <div className="absolute inset-44 rounded-full border border-white/40" />
          {/* moon craters: soft darker jade patches */}
          <div className="absolute inset-44 overflow-hidden rounded-full">
            <div className="absolute left-[30%] top-[28%] h-16 w-16 rounded-full bg-brand-700/25 blur-md" />
            <div className="absolute left-[55%] top-[48%] h-12 w-12 rounded-full bg-brand-700/20 blur-md" />
            <div className="absolute left-[42%] top-[66%] h-10 w-14 rounded-full bg-brand-700/20 blur-md" />
          </div>
        </div>
      </div>

      {/* drifting moonlit swell */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="pop-drift absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* firefly motes rising through the canopy */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {DOTS.map((r, i) => (
          <Dot key={i} {...r} />
        ))}
      </div>

      {/* 4-banner carousel in a moonlit frame with a glowing top edge */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="pop-lift overflow-hidden bg-paper">
            <div aria-hidden className="pop-stripes h-4 border-b border-brand-600/20" />
            <div className="overflow-hidden p-2">
              <div className="overflow-hidden rounded-lg ring-2 ring-brand-500/20">
                <BannerCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* moonlit ticker: ribbon band, marquee of the shop's own promises */}
      <div aria-hidden className="relative z-10 mt-8 border-y border-brand-300/40 bg-gradient-to-r from-brand-400 via-gold to-popblue py-3 shadow-[0_18px_44px_-20px_rgba(16, 185, 129, 0.6)]">
        <div className="overflow-hidden py-2">
          <div className="pop-ticker flex w-max items-center gap-8 pr-8">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.22em] text-brand-950">
                {t} <span className="text-brand-950/60">✦</span>
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
              <div key={s.l} className="pop-lift relative overflow-hidden bg-paper p-4 pb-3 text-center">
                <span className="block text-2xl font-black tracking-tight text-brand-300">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-mute">{s.l}</span>
                <span aria-hidden className="mx-auto mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-brand-600 via-gold to-popblue" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="inline-block rounded-full bg-gradient-to-r from-brand-400 via-gold to-popblue px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-brand-950 shadow-[0_16px_38px_-14px_rgba(16, 185, 129, 0.6)]">Handpicked for you</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">Featured <span className="bg-gradient-to-r from-brand-300 to-gold bg-clip-text text-transparent">Picks</span></h2>
            <span className="zigzag mt-3 block w-44" aria-hidden />
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
                  <div className="overflow-hidden border-b border-brand-600/20">
                    <ProductImage product={p} />
                  </div>
                  <span className="starburst absolute -right-1 -top-1 flex h-16 w-16 items-center justify-center p-4 text-center text-[11px] font-black leading-tight">-{discountPct(p)}%</span>
                  <span aria-hidden className="pop-stripes absolute inset-x-0 bottom-0 h-2 border-t border-brand-600/20" />
                </div>
                <div className="p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-ink">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-300">{tk(p.price)} <span className="text-xs font-medium text-mute line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="starburst pop-bob absolute -top-9 right-2 flex h-28 w-28 items-center justify-center p-6 text-center text-[13px] font-black leading-tight">-45%<br />TODAY</span>
        </div>
      </div>

      {/* moonlit divider into the page */}
      <div aria-hidden className="zigzag absolute bottom-0 left-0 w-full opacity-90" />
    </section>
  );
}
