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

const GLINTS = ["#67e8f9", "#ff6b4a", "#a5f3fc", "#ff9d7e", "#22d3ee", "#ffc9b5"];

// Deterministic rising-glint positions (client component, but stable across renders).
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

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* neon night market: deep indigo night with cyan haze and coral glints */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0f1130] via-[#141640] to-[#0f1130]" />
      <div
        aria-hidden
        className="orb-float pointer-events-none absolute -top-28 right-[-4rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.32),rgba(34,211,238,0.1)_60%,transparent_72%)] blur-[12px]"
      />
      <div
        aria-hidden
        className="orb-float pointer-events-none absolute -top-20 left-[-6rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,107,74,0.22),transparent_70%)] blur-[20px]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        aria-hidden
        className="orb-float pointer-events-none absolute bottom-[-6rem] left-1/3 h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.22),transparent_70%)] blur-[18px]"
        style={{ animationDelay: "-3.5s" }}
      />

      {/* rising glint shower */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {RISING.map((p, i) => (
          <span
            key={i}
            className="glint-rise absolute bottom-0 block rounded-full"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.dur,
              background: GLINTS[i % GLINTS.length],
              opacity: 0.7,
              boxShadow: `0 0 10px 2px ${GLINTS[i % GLINTS.length]}88`,
            }}
          />
        ))}
      </div>

      {/* market-wire: a glowing string of neon nodes across the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden sm:block">
        <svg viewBox="0 0 1440 96" preserveAspectRatio="none" className="block h-24 w-full">
          <path d="M-20,4 Q 360,92 720,40 Q 1080,-12 1460,44" fill="none" stroke="#22d3ee" strokeWidth="2.5" opacity="0.45" />
          <path d="M-20,4 Q 360,92 720,40 Q 1080,-12 1460,44" fill="none" stroke="#22d3ee" strokeWidth="7" opacity="0.08" />
        </svg>
        <div className="absolute inset-x-0 top-0 mx-auto flex max-w-6xl justify-between px-12">
          {Array.from({ length: 10 }).map((_, i) => {
            const droop = 12 + Math.sin((i / 9) * Math.PI) * 46;
            const coral = i % 3 === 1;
            return (
              <span key={i} className="flex flex-col items-center" style={{ marginTop: 4 }}>
                <span className="block w-px" style={{ height: droop, background: "linear-gradient(180deg,#22d3ee66,#22d3ee22)" }} />
                <span
                  className="wire-pulse block"
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "9999px",
                    animationDelay: `${-i * 0.32}s`,
                    background: coral
                      ? "radial-gradient(circle at 35% 35%, #ffc9b5, #ff6b4a 60%, #e0522e)"
                      : "radial-gradient(circle at 35% 35%, #a5f3fc, #22d3ee 60%, #0e7490)",
                    boxShadow: coral
                      ? "0 0 18px 4px rgba(255,107,74,0.55)"
                      : "0 0 18px 4px rgba(34,211,238,0.55)",
                  }}
                />
              </span>
            );
          })}
        </div>
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
              <div key={s.l} className="neon-lift relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-white/[0.05] p-4 backdrop-blur-sm">
                <span aria-hidden className="absolute -right-4 -top-4 h-16 w-16 rotate-45 bg-gradient-to-br from-[#ff6b4a]/25 to-transparent" />
                <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#22d3ee] via-[#ff6b4a] to-[#22d3ee]" />
                <span className="block text-2xl font-black tracking-tight text-[#a5f3fc]">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#a7abc9]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#67e8f9]">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#eef0ff]">Featured <span className="bg-gradient-to-r from-[#ff6b4a] to-[#22d3ee] bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 flex items-center gap-1.5" aria-hidden>
              <span className="block h-1.5 w-16 rounded-full bg-gradient-to-r from-[#ff6b4a] to-[#ff9d7e]" />
              <span className="block h-1.5 w-10 rounded-full bg-gradient-to-r from-[#22d3ee] to-[#a5f3fc]" />
              <span className="block h-1.5 w-6 rounded-full bg-[#8b5cf6]" />
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
                className="neon-lift group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#1c1f45] transition-all hover:-translate-y-2 hover:border-[#22d3ee]/60"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-[#e0522e] to-[#ff6b4a] px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(255,107,74,0.7)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#22d3ee] via-[#ff6b4a] to-[#22d3ee]" />
                </div>
                <div className="border-t border-dashed border-white/15 p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#eef0ff]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-[#67e8f9]">{tk(p.price)} <span className="text-xs font-medium text-[#a7abc9] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rounded-full bg-gradient-to-r from-[#0e7490] to-[#155e75] px-5 py-2 text-sm font-black tracking-wide text-[#a5f3fc] shadow-[0_8px_20px_-8px_rgba(34,211,238,0.6)] ring-1 ring-[#22d3ee]/50">-45% TODAY</span>
        </div>
      </div>

      {/* neon wave divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-12 w-full">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,30 Q 90,10 180,28 T 360,28 T 540,28 T 720,28 T 900,28 T 1080,28 T 1260,28 T 1440,28 L1440,48 L0,48 Z" fill="#22d3ee" opacity="0.12" />
          <path d="M0,30 Q 90,10 180,28 T 360,28 T 540,28 T 720,28 T 900,28 T 1080,28 T 1260,28 T 1440,28" fill="none" stroke="#22d3ee" strokeWidth="2.5" opacity="0.8" />
          <path d="M0,40 Q 120,22 240,38 T 480,38 T 720,38 T 960,38 T 1200,38 T 1440,38" fill="none" stroke="#ff6b4a" strokeWidth="2" opacity="0.6" />
        </svg>
      </div>
    </section>
  );
}
