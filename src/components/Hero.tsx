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

const MOTES = ["#9a63e6", "#ff6f3c", "#d4bdf8", "#ffc9ae", "#b891f1", "#ff6f3c"];

// Deterministic rising-spark positions (client component, but stable across renders).
const RISING = [
  { left: "4%", size: 7, delay: "0s", dur: "15s" },
  { left: "12%", size: 5, delay: "-4s", dur: "18s" },
  { left: "21%", size: 9, delay: "-8s", dur: "16s" },
  { left: "33%", size: 5, delay: "-2s", dur: "20s" },
  { left: "47%", size: 8, delay: "-11s", dur: "17s" },
  { left: "59%", size: 4, delay: "-6s", dur: "19s" },
  { left: "70%", size: 8, delay: "-1s", dur: "15.5s" },
  { left: "82%", size: 6, delay: "-9s", dur: "18.5s" },
  { left: "91%", size: 7, delay: "-5.5s", dur: "16.5s" },
  { left: "96%", size: 5, delay: "-12s", dur: "17.5s" },
];

// Comet orbs: glowing planet core + tilted orbiting ring.
const ORBS = [
  { left: "6%", top: "14%", size: 72, delay: "0s", dur: "12s", from: "#9a63e6", to: "#521f97" },
  { left: "20%", top: "38%", size: 46, delay: "-3s", dur: "10s", from: "#ff9a5c", to: "#d9481b" },
  { left: "76%", top: "12%", size: 88, delay: "-6s", dur: "14s", from: "#ff6f3c", to: "#d9481b" },
  { left: "88%", top: "42%", size: 56, delay: "-1.5s", dur: "11s", from: "#b891f1", to: "#6428b8" },
  { left: "62%", top: "6%", size: 38, delay: "-8s", dur: "13s", from: "#d4bdf8", to: "#7c3ed4" },
];

function CometOrb({ left, top, size, delay, dur, from, to }: (typeof ORBS)[number]) {
  const ring = Math.round(size * 1.7);
  return (
    <div
      aria-hidden
      className="orb-float pointer-events-none absolute"
      style={{ left, top, animationDelay: delay, animationDuration: dur }}
    >
      {/* orbit ring */}
      <div
        className="comet-orbit absolute left-1/2 top-1/2"
        style={{
          width: ring,
          height: ring,
          marginLeft: -ring / 2,
          marginTop: -ring / 2,
          borderRadius: "50%",
          border: `2px dashed ${from}66`,
          animationDuration: `${Math.round(size / 4)}s`,
        }}
      />
      {/* comet core */}
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle at 32% 30%, #ffffff 0%, ${from} 38%, ${to} 100%)`,
          boxShadow: `0 0 42px 8px ${from}55, inset -6px -8px 18px ${to}88`,
          border: "2px solid rgba(255,255,255,0.7)",
        }}
      />
    </div>
  );
}

// Ember sparks: small four-point starburst diamonds.
const SPARKS = [
  { left: "12%", top: "60%", size: 16, delay: "0s", dur: "9s", c: "#ff6f3c" },
  { left: "30%", top: "70%", size: 12, delay: "-2.5s", dur: "8s", c: "#9a63e6" },
  { left: "68%", top: "58%", size: 18, delay: "-5s", dur: "10s", c: "#ff6f3c" },
  { left: "84%", top: "66%", size: 13, delay: "-1s", dur: "7.5s", c: "#ffc9ae" },
];

function Spark({ left, top, size, delay, dur, c }: (typeof SPARKS)[number]) {
  return (
    <div
      aria-hidden
      className="spark-float pointer-events-none absolute"
      style={{ left, top, animationDelay: delay, animationDuration: dur }}
    >
      <div
        style={{
          width: size,
          height: size,
          background: c,
          transform: "rotate(45deg)",
          clipPath: "polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%)",
          filter: `drop-shadow(0 0 6px ${c})`,
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
      {/* indigo twilight: lavender dusk wash with comet orbs and ember sparks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#d4bdf8]/70 via-[#faf7fe] to-[#faf7fe]" />
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-[#9a63e6]/40 to-[#521f97]/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-[#ff9a5c]/45 to-[#ff6f3c]/15 blur-3xl" />

      {/* floating comet orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {ORBS.map((k, i) => (
          <CometOrb key={i} {...k} />
        ))}
      </div>

      {/* ember sparks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {SPARKS.map((k, i) => (
          <Spark key={i} {...k} />
        ))}
      </div>

      {/* rising spark motes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {RISING.map((p, i) => (
          <span
            key={i}
            className="mote-rise absolute bottom-0 block rounded-full"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.dur,
              background: MOTES[i % MOTES.length],
              opacity: 0.55,
              boxShadow: `0 0 10px 3px ${MOTES[i % MOTES.length]}88`,
            }}
          />
        ))}
      </div>

      {/* 4-banner carousel (image-only slides) */}
      <div className="relative">
        <BannerCarousel />
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
              <div key={s.l} className="sticker-lift relative overflow-hidden rounded-2xl border-2 border-brand-900 bg-white/90 p-4 transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-gradient-to-br from-[#ff6f3c]/40 to-transparent" />
                <span aria-hidden className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#521f97] via-[#ff6f3c] to-[#521f97]" />
                <span className="block text-2xl font-black tracking-tight text-brand-700">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#5e5478]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-500">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#241a36]">Featured <span className="bg-gradient-to-r from-[#d9481b] to-[#7c3ed4] bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 flex items-center gap-1.5" aria-hidden>
              <span className="block h-2 w-16 rounded-full bg-gradient-to-r from-[#d9481b] to-[#ff9a5c]" />
              <span className="block h-2 w-10 rounded-full bg-gradient-to-r from-[#7c3ed4] to-[#b891f1]" />
              <span className="block h-2 w-6 rounded-full bg-[#521f97]" />
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
                className="sticker-lift group cursor-pointer overflow-hidden rounded-2xl border-2 border-brand-900 bg-[#ffffff] transition-all hover:-translate-y-2"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-lg bg-gradient-to-r from-[#d9481b] to-[#ff6f3c] px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(255,111,60,0.8)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#521f97] via-[#ff6f3c] to-[#521f97]" />
                </div>
                <div className="border-t-2 border-dashed border-brand-200 p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#241a36]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-700">{tk(p.price)} <span className="text-xs font-medium text-[#5e5478] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rounded-xl border-2 border-[#ffc9ae] bg-gradient-to-r from-[#1d0b38] to-[#421c76] px-5 py-2 text-sm font-black tracking-wide text-[#ffc9ae] shadow-[6px_6px_0_0_rgba(217,72,27,0.85)]">-45% TODAY</span>
        </div>
      </div>

      {/* comet-trail divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-12 w-full">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,34 C 160,10 320,46 480,32 S 800,18 960,36 S 1280,46 1440,30 L1440,48 L0,48 Z" fill="#7c3ed4" opacity="0.12" />
          <path d="M0,34 C 160,10 320,46 480,32 S 800,18 960,36 S 1280,46 1440,30" fill="none" stroke="#7c3ed4" strokeWidth="2.5" opacity="0.7" />
          <path d="M0,42 C 200,24 380,48 560,38 S 920,28 1100,40 S 1300,46 1440,38" fill="none" stroke="#ff6f3c" strokeWidth="2" opacity="0.65" />
        </svg>
      </div>
    </section>
  );
}
