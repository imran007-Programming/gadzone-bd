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

const SPARKS = ["#60a5fa", "#fb923c", "#bfdbfe", "#fdba74", "#38bdf8", "#fed7aa"];

// Deterministic rising-spark positions (client component, but stable across renders).
const RISING = [
  { left: "4%", size: 7, delay: "0s", dur: "12s" },
  { left: "12%", size: 5, delay: "-4s", dur: "15s" },
  { left: "21%", size: 9, delay: "-8s", dur: "13s" },
  { left: "33%", size: 5, delay: "-2s", dur: "17s" },
  { left: "47%", size: 8, delay: "-11s", dur: "14s" },
  { left: "59%", size: 4, delay: "-6s", dur: "16s" },
  { left: "70%", size: 8, delay: "-1s", dur: "12.5s" },
  { left: "82%", size: 6, delay: "-9s", dur: "15.5s" },
  { left: "91%", size: 7, delay: "-5.5s", dur: "13.5s" },
  { left: "96%", size: 5, delay: "-12s", dur: "14.5s" },
];

// Kites in kite-paper colors: diamond body + string tail with bow ties.
const KITES = [
  { left: "6%", top: "16%", size: 54, delay: "0s", dur: "7s", from: "#fb923c", to: "#ea580c" },
  { left: "20%", top: "34%", size: 40, delay: "-2.4s", dur: "8.5s", from: "#fb7185", to: "#e11d48" },
  { left: "78%", top: "20%", size: 62, delay: "-4s", dur: "6.4s", from: "#38bdf8", to: "#0284c7" },
  { left: "90%", top: "40%", size: 44, delay: "-1.2s", dur: "9s", from: "#fde047", to: "#facc15" },
  { left: "64%", top: "8%", size: 34, delay: "-5.6s", dur: "7.8s", from: "#93c5fd", to: "#2563eb" },
];

function Kite({ left, top, size, delay, dur, from, to }: (typeof KITES)[number]) {
  const tail = Math.round(size * 1.6);
  return (
    <div
      aria-hidden
      className="kite-sway pointer-events-none absolute"
      style={{ left, top, animationDelay: delay, animationDuration: dur }}
    >
      <div
        className="rotate-45 rounded-[6px] shadow-[0_10px_24px_-8px_rgba(37,99,235,0.45)]"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${from}, ${to})`,
          border: "2px solid rgba(255,255,255,0.75)",
        }}
      />
      <div className="relative mx-auto w-px" style={{ height: tail, background: "linear-gradient(180deg, rgba(29,78,216,0.45), rgba(29,78,216,0.08))" }}>
        {[0.35, 0.62, 0.88].map((f) => (
          <span
            key={f}
            className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-[2px] bg-white shadow-sm ring-1 ring-[#d3e0f2]"
            style={{ top: `${f * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function Cloud({ left, top, w, delay, dur, opacity }: { left: string; top: string; w: number; delay: string; dur: string; opacity: number }) {
  return (
    <div
      aria-hidden
      className="cloud-drift pointer-events-none absolute"
      style={{ left, top, animationDelay: delay, animationDuration: dur, opacity }}
    >
      <div className="relative rounded-full bg-white/85 blur-md" style={{ width: w, height: w * 0.36 }}>
        <div className="absolute -top-[45%] left-[18%] h-[90%] w-[46%] rounded-full bg-white/90" />
        <div className="absolute -top-[30%] left-[52%] h-[72%] w-[36%] rounded-full bg-white/80" />
      </div>
    </div>
  );
}

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* azure kites: pale sky wash with drifting paper clouds and floating kites */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#d9e9fb] via-[#f2f8ff] to-[#f2f8ff]" />
      <Cloud left="4%" top="6%" w={180} delay="0s" dur="24s" opacity={0.8} />
      <Cloud left="58%" top="14%" w={240} delay="-9s" dur="30s" opacity={0.65} />
      <Cloud left="30%" top="2%" w={130} delay="-16s" dur="20s" opacity={0.7} />
      <Cloud left="82%" top="30%" w={150} delay="-5s" dur="26s" opacity={0.55} />

      {/* floating kites */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {KITES.map((k, i) => (
          <Kite key={i} {...k} />
        ))}
      </div>

      {/* rising spark motes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {RISING.map((p, i) => (
          <span
            key={i}
            className="spark-rise absolute bottom-0 block rounded-full"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.dur,
              background: SPARKS[i % SPARKS.length],
              opacity: 0.55,
              boxShadow: `0 0 8px 2px ${SPARKS[i % SPARKS.length]}66`,
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
              <div key={s.l} className="neon-lift relative overflow-hidden rounded-2xl border border-[#d3e0f2] bg-white/85 p-4">
                <span aria-hidden className="absolute -right-4 -top-4 h-16 w-16 rotate-45 bg-gradient-to-br from-[#fb923c]/25 to-transparent" />
                <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#2563eb] via-[#fb923c] to-[#2563eb]" />
                <span className="block text-2xl font-black tracking-tight text-[#1d4ed8]">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#5d6b82]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#60a5fa]">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#17233c]">Featured <span className="bg-gradient-to-r from-[#fb923c] to-[#2563eb] bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 flex items-center gap-1.5" aria-hidden>
              <span className="block h-1.5 w-16 rounded-full bg-gradient-to-r from-[#fb923c] to-[#fdba74]" />
              <span className="block h-1.5 w-10 rounded-full bg-gradient-to-r from-[#2563eb] to-[#93c5fd]" />
              <span className="block h-1.5 w-6 rounded-full bg-[#ea580c]" />
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
                className="neon-lift group cursor-pointer overflow-hidden rounded-3xl border border-[#e3ebf7] bg-[#ffffff] transition-all hover:-translate-y-2 hover:border-[#2563eb]/60"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-[#ea580c] to-[#fb923c] px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(251,146,60,0.7)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563eb] via-[#fb923c] to-[#2563eb]" />
                </div>
                <div className="border-t border-dashed border-[#d3e0f2] p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#17233c]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-[#1d4ed8]">{tk(p.price)} <span className="text-xs font-medium text-[#5d6b82] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rounded-full bg-gradient-to-r from-[#1e3a8a] to-[#172554] px-5 py-2 text-sm font-black tracking-wide text-[#bfdbfe] shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)] ring-1 ring-[#2563eb]/50">-45% TODAY</span>
        </div>
      </div>

      {/* sky-wave divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-12 w-full">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,32 C 120,8 240,44 360,30 S 600,14 720,30 S 960,44 1080,30 S 1320,16 1440,30 L1440,48 L0,48 Z" fill="#2563eb" opacity="0.10" />
          <path d="M0,32 C 120,8 240,44 360,30 S 600,14 720,30 S 960,44 1080,30 S 1320,16 1440,30" fill="none" stroke="#2563eb" strokeWidth="2.5" opacity="0.8" />
          <path d="M0,40 C 160,20 320,46 480,36 S 800,26 960,38 S 1280,46 1440,36" fill="none" stroke="#fb923c" strokeWidth="2" opacity="0.6" />
        </svg>
      </div>
    </section>
  );
}
