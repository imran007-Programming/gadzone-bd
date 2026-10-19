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

const GLINTS = ["#34d399", "#f59e0b", "#a7f3d0", "#fbbf24", "#059669", "#fde68a"];

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
      {/* sunlit spice bazaar: morning amber glow with a rising sun and drifting spice */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fde9c8] via-[#faf3e3] to-[#faf3e3]" />
      {/* rising sun disc with radiating rays */}
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2">
        <div className="orb-float absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.5),rgba(251,191,36,0.22)_55%,transparent_72%)] blur-[6px]" />
        <svg viewBox="0 0 352 352" className="absolute inset-0 h-full w-full">
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const x1 = 176 + Math.cos(a) * 96;
            const y1 = 176 + Math.sin(a) * 96;
            const x2 = 176 + Math.cos(a) * (i % 2 === 0 ? 132 : 116);
            const y2 = 176 + Math.sin(a) * (i % 2 === 0 ? 132 : 116);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d97706" strokeWidth={i % 2 === 0 ? 5 : 3} strokeLinecap="round" opacity="0.35" />;
          })}
          <circle cx="176" cy="176" r="72" fill="none" stroke="#f59e0b" strokeWidth="3" opacity="0.5" />
          <circle cx="176" cy="176" r="58" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="10 8" opacity="0.45" />
        </svg>
      </div>
      <div
        aria-hidden
        className="orb-float pointer-events-none absolute top-10 right-[-5rem] h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(5,150,105,0.18),transparent_70%)] blur-[16px]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        aria-hidden
        className="orb-float pointer-events-none absolute top-24 left-[-5rem] h-[14rem] w-[14rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.20),transparent_70%)] blur-[16px]"
        style={{ animationDelay: "-3.5s" }}
      />

      {/* drifting spice motes */}
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
              opacity: 0.55,
              boxShadow: `0 0 8px 2px ${GLINTS[i % GLINTS.length]}66`,
            }}
          />
        ))}
      </div>

      {/* sun bunting: strings of pennant flags across the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden sm:block">
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="block h-28 w-full">
          <path d="M-20,6 Q 360,104 720,46 Q 1080,-6 1460,52" fill="none" stroke="#047857" strokeWidth="2.5" opacity="0.5" />
        </svg>
        <div className="absolute inset-x-0 top-0 mx-auto flex max-w-6xl justify-between px-12">
          {Array.from({ length: 12 }).map((_, i) => {
            const droop = 14 + Math.sin((i / 11) * Math.PI) * 52;
            const palette = ["#059669", "#f59e0b", "#d97706"];
            const c = palette[i % 3];
            return (
              <span key={i} className="wire-pulse flex flex-col items-center" style={{ marginTop: 6, animationDelay: `${-i * 0.27}s`, transformOrigin: "top center" }}>
                <span className="block w-px" style={{ height: droop, background: "linear-gradient(180deg,#04785766,#04785722)" }} />
                <span
                  className="block"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "11px solid transparent",
                    borderRight: "11px solid transparent",
                    borderTop: `17px solid ${c}`,
                    opacity: 0.85,
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
              <div key={s.l} className="neon-lift relative overflow-hidden rounded-2xl border border-[#e8ddc2] bg-white/85 p-4">
                <span aria-hidden className="absolute -right-4 -top-4 h-16 w-16 rotate-45 bg-gradient-to-br from-[#f59e0b]/25 to-transparent" />
                <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#059669] via-[#f59e0b] to-[#059669]" />
                <span className="block text-2xl font-black tracking-tight text-[#047857]">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6b6c5f]">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#34d399]">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#1f2a20]">Featured <span className="bg-gradient-to-r from-[#f59e0b] to-[#059669] bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 flex items-center gap-1.5" aria-hidden>
              <span className="block h-1.5 w-16 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]" />
              <span className="block h-1.5 w-10 rounded-full bg-gradient-to-r from-[#059669] to-[#a7f3d0]" />
              <span className="block h-1.5 w-6 rounded-full bg-[#16a34a]" />
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
                className="neon-lift group cursor-pointer overflow-hidden rounded-3xl border border-[#eee4cb] bg-[#ffffff] transition-all hover:-translate-y-2 hover:border-[#059669]/60"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(245,158,11,0.7)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#059669] via-[#f59e0b] to-[#059669]" />
                </div>
                <div className="border-t border-dashed border-[#e8ddc2] p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#1f2a20]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-[#047857]">{tk(p.price)} <span className="text-xs font-medium text-[#6b6c5f] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rounded-full bg-gradient-to-r from-[#065f46] to-[#064e3b] px-5 py-2 text-sm font-black tracking-wide text-[#a7f3d0] shadow-[0_8px_20px_-8px_rgba(5,150,105,0.6)] ring-1 ring-[#059669]/50">-45% TODAY</span>
        </div>
      </div>

      {/* sunrise scallop divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-12 w-full">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,30 Q 90,10 180,28 T 360,28 T 540,28 T 720,28 T 900,28 T 1080,28 T 1260,28 T 1440,28 L1440,48 L0,48 Z" fill="#059669" opacity="0.12" />
          <path d="M0,30 Q 90,10 180,28 T 360,28 T 540,28 T 720,28 T 900,28 T 1080,28 T 1260,28 T 1440,28" fill="none" stroke="#059669" strokeWidth="2.5" opacity="0.8" />
          <path d="M0,40 Q 120,22 240,38 T 480,38 T 720,38 T 960,38 T 1200,38 T 1440,38" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
        </svg>
      </div>
    </section>
  );
}
