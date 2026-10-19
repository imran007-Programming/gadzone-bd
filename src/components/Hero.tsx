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

const DEW = ["#34d399", "#f59e0b", "#a7f3d0", "#fcd34d", "#6ee7b7", "#fde68a"];

// Deterministic rising-dew positions (client component, but stable across renders).
const RISING = [
  { left: "4%", size: 7, delay: "0s", dur: "14s" },
  { left: "12%", size: 5, delay: "-4s", dur: "17s" },
  { left: "21%", size: 9, delay: "-8s", dur: "15s" },
  { left: "33%", size: 5, delay: "-2s", dur: "19s" },
  { left: "47%", size: 8, delay: "-11s", dur: "16s" },
  { left: "59%", size: 4, delay: "-6s", dur: "18s" },
  { left: "70%", size: 8, delay: "-1s", dur: "14.5s" },
  { left: "82%", size: 6, delay: "-9s", dur: "17.5s" },
  { left: "91%", size: 7, delay: "-5.5s", dur: "15.5s" },
  { left: "96%", size: 5, delay: "-12s", dur: "16.5s" },
];

// Blossom leaves: leaf blade (border-radius petal) + stem with dew buds.
const LEAVES = [
  { left: "6%", top: "16%", size: 54, delay: "0s", dur: "8s", from: "#34d399", to: "#047857" },
  { left: "20%", top: "34%", size: 40, delay: "-2.4s", dur: "9.5s", from: "#f472b6", to: "#be185d" },
  { left: "78%", top: "20%", size: 62, delay: "-4s", dur: "7.4s", from: "#f59e0b", to: "#d97706" },
  { left: "90%", top: "40%", size: 44, delay: "-1.2s", dur: "10s", from: "#fde68a", to: "#f59e0b" },
  { left: "64%", top: "8%", size: 34, delay: "-5.6s", dur: "8.8s", from: "#6ee7b7", to: "#059669" },
];

function Leaf({ left, top, size, delay, dur, from, to }: (typeof LEAVES)[number]) {
  const stem = Math.round(size * 1.1);
  return (
    <div
      aria-hidden
      className="petal-sway pointer-events-none absolute"
      style={{ left, top, animationDelay: delay, animationDuration: dur }}
    >
      <div
        className="shadow-[0_10px_24px_-8px_rgba(4,120,87,0.45)]"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${from}, ${to})`,
          borderRadius: "100% 4px",
          border: "2px solid rgba(255,255,255,0.75)",
          transform: "rotate(45deg)",
        }}
      />
      <div className="relative mx-auto w-px" style={{ height: stem, background: "linear-gradient(180deg, rgba(4,120,87,0.45), rgba(4,120,87,0.08))" }}>
        {[0.35, 0.62, 0.88].map((f) => (
          <span
            key={f}
            className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white shadow-sm ring-1 ring-[#d2e4d9]"
            style={{ top: `${f * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function IvySprig({ left, top, w, delay, dur, opacity }: { left: string; top: string; w: number; delay: string; dur: string; opacity: number }) {
  return (
    <div
      aria-hidden
      className="leaf-drift pointer-events-none absolute"
      style={{ left, top, animationDelay: delay, animationDuration: dur, opacity }}
    >
      <div className="relative" style={{ width: w, height: w * 0.4 }}>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute bg-[#6ee7b7]/80"
            style={{
              left: `${12 + i * 22}%`,
              top: i % 2 === 0 ? "10%" : "45%",
              width: w * 0.16,
              height: w * 0.16,
              borderRadius: "100% 4px",
              transform: "rotate(45deg)",
            }}
          />
        ))}
        <span className="absolute left-[4%] right-[4%] top-1/2 h-px bg-[#059669]/50" />
      </div>
    </div>
  );
}

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* emerald grove: ivory morning wash with drifting ivy and blossom leaves */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#d9efe2] via-[#fafdf9] to-[#fafdf9]" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-[#fcd34d]/50 to-[#f59e0b]/20 blur-3xl" />
      <IvySprig left="4%" top="6%" w={180} delay="0s" dur="26s" opacity={0.8} />
      <IvySprig left="58%" top="14%" w={240} delay="-9s" dur="32s" opacity={0.65} />
      <IvySprig left="30%" top="2%" w={130} delay="-16s" dur="22s" opacity={0.7} />
      <IvySprig left="82%" top="30%" w={150} delay="-5s" dur="28s" opacity={0.55} />

      {/* floating blossom leaves */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {LEAVES.map((k, i) => (
          <Leaf key={i} {...k} />
        ))}
      </div>

      {/* rising dew motes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {RISING.map((p, i) => (
          <span
            key={i}
            className="dew-rise absolute bottom-0 block rounded-full"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.dur,
              background: DEW[i % DEW.length],
              opacity: 0.55,
              boxShadow: `0 0 8px 2px ${DEW[i % DEW.length]}66`,
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
              <div key={s.l} className="neon-lift relative overflow-hidden rounded-2xl border border-[#d2e4d9] bg-white/85 p-4">
                <span aria-hidden className="absolute -right-4 -top-4 h-16 w-16 bg-gradient-to-br from-[#f59e0b]/25 to-transparent" style={{ borderRadius: "100% 4px" }} />
                <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#059669] via-[#f59e0b] to-[#059669]" />
                <span className="block text-2xl font-black tracking-tight text-[#047857]">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#5a6f63]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#34d399]">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#152a20]">Featured <span className="bg-gradient-to-r from-[#d97706] to-[#059669] bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 flex items-center gap-1.5" aria-hidden>
              <span className="block h-2 w-16 rounded-full bg-gradient-to-r from-[#d97706] to-[#fcd34d]" />
              <span className="block h-2 w-10 rounded-full bg-gradient-to-r from-[#059669] to-[#6ee7b7]" />
              <span className="block h-2 w-6 rounded-full bg-[#047857]" />
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
                className="neon-lift group cursor-pointer overflow-hidden rounded-[20px] border-2 border-[#e5f0ea] bg-[#ffffff] transition-all hover:-translate-y-2 hover:border-[#059669]/60"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(245,158,11,0.7)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#059669] via-[#f59e0b] to-[#059669]" />
                </div>
                <div className="border-t border-dashed border-[#d2e4d9] p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#152a20]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-[#047857]">{tk(p.price)} <span className="text-xs font-medium text-[#5a6f63] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rounded-full bg-gradient-to-r from-[#064e3b] to-[#022c22] px-5 py-2 text-sm font-black tracking-wide text-[#a7f3d0] shadow-[0_8px_20px_-8px_rgba(4,120,87,0.6)] ring-1 ring-[#059669]/50">-45% TODAY</span>
        </div>
      </div>

      {/* ivy-vine divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-12 w-full">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,32 C 120,8 240,44 360,30 S 600,14 720,30 S 960,44 1080,30 S 1320,16 1440,30 L1440,48 L0,48 Z" fill="#059669" opacity="0.10" />
          <path d="M0,32 C 120,8 240,44 360,30 S 600,14 720,30 S 960,44 1080,30 S 1320,16 1440,30" fill="none" stroke="#059669" strokeWidth="2.5" opacity="0.8" />
          <path d="M0,40 C 160,20 320,46 480,36 S 800,26 960,38 S 1280,46 1440,36" fill="none" stroke="#d97706" strokeWidth="2" opacity="0.6" />
        </svg>
      </div>
    </section>
  );
}
