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

const SPARKS = ["#e8a020", "#f6dfa8", "#b97a0c", "#e8c258", "#d98f14", "#f2c14e"];

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

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* sundarban lantern: warm dusk glows + rising gold sparks over sandpaper */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f6f0df] via-[#f8f3e4] to-[#f6f0df]" />
      <div
        aria-hidden
        className="firefly-drift pointer-events-none absolute -top-28 right-[-4rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(232,160,32,0.34),rgba(232,160,32,0.1)_60%,transparent_72%)] blur-[12px]"
      />
      <div
        aria-hidden
        className="firefly-drift pointer-events-none absolute -top-20 left-[-6rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(30,122,88,0.2),transparent_70%)] blur-[20px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        aria-hidden
        className="firefly-drift pointer-events-none absolute bottom-[-6rem] left-1/3 h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(232,160,32,0.22),transparent_70%)] blur-[18px]"
        style={{ animationDelay: "-4s" }}
      />

      {/* rising spark shower */}
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
              opacity: 0.7,
              boxShadow: "0 0 10px 2px rgba(232,160,32,0.55)",
            }}
          />
        ))}
      </div>

      {/* hanging lantern string across the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden sm:block">
        <svg viewBox="0 0 1440 84" preserveAspectRatio="none" className="block h-[5.25rem] w-full">
          <path d="M-20,2 Q 720,96 1460,2" fill="none" stroke="#125539" strokeWidth="2.5" opacity="0.5" />
        </svg>
        <div className="absolute inset-x-0 top-0 mx-auto flex max-w-6xl justify-between px-12">
          {Array.from({ length: 10 }).map((_, i) => {
            const droop = 18 + Math.sin((i / 9) * Math.PI) * 40;
            return (
              <span key={i} className="lantern-sway flex flex-col items-center" style={{ animationDelay: `${-i * 0.6}s`, marginTop: 6 }}>
                <span className="block w-px" style={{ height: droop, background: "#125539", opacity: 0.5 }} />
                <span
                  className="block"
                  style={{
                    width: 22,
                    height: 28,
                    background: `linear-gradient(180deg, #f6dfa8, ${SPARKS[i % SPARKS.length]})`,
                    borderRadius: "45% 45% 50% 50% / 55% 55% 45% 45%",
                    opacity: 0.9,
                    boxShadow: "0 0 16px 3px rgba(232,160,32,0.5), inset 0 -4px 6px rgba(185,122,12,0.4)",
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
              <div key={s.l} className="lantern-lift cut-corners-sm relative overflow-hidden border-2 border-brand-800 bg-gradient-to-br from-brand-800 to-brand-950 p-4">
                <span aria-hidden className="absolute -right-4 -top-4 h-16 w-16 rotate-45 bg-gold/20" />
                <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-gold-deep via-gold to-gold-deep" />
                <span className="block text-2xl font-black tracking-tight text-gold-soft">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-200">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-700">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#22301f]">Featured <span className="bg-gradient-to-r from-gold-deep to-brand-600 bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 flex items-center gap-1.5" aria-hidden>
              <span className="block h-1.5 w-16 bg-gold-deep" style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }} />
              <span className="block h-1.5 w-10 bg-brand-500" style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }} />
              <span className="block h-1.5 w-6 bg-brand-800" style={{ clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%)" }} />
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
                className="cut-corners group lantern-lift cursor-pointer overflow-hidden border-2 border-brand-800 bg-[#fefdf7] transition-all hover:-translate-y-2 hover:border-gold-deep"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="cut-corners-sm absolute right-2.5 top-2.5 bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-brand-950 shadow-[0_4px_14px_-4px_rgba(232,160,32,0.6)]">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-700 via-gold to-brand-700" />
                </div>
                <div className="border-t-2 border-dashed border-[#e3d9bd] p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#22301f]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-700">{tk(p.price)} <span className="text-xs font-medium text-[#75705f] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="cut-corners-sm absolute -top-5 right-2 bg-gradient-to-r from-brand-700 to-brand-900 px-5 py-2 text-sm font-black tracking-wide text-gold-soft shadow-[0_8px_20px_-8px_rgba(18,85,57,0.6)] ring-1 ring-gold/60">-45% TODAY</span>
        </div>
      </div>

      {/* zigzag chevron divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-12 w-full">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,26 L60,44 L120,26 L180,44 L240,26 L300,44 L360,26 L420,44 L480,26 L540,44 L600,26 L660,44 L720,26 L780,44 L840,26 L900,44 L960,26 L1020,44 L1080,26 L1140,44 L1200,26 L1260,44 L1320,26 L1380,44 L1440,26 L1440,48 L0,48 Z" fill="#166747" opacity="0.9" />
          <path d="M0,26 L60,44 L120,26 L180,44 L240,26 L300,44 L360,26 L420,44 L480,26 L540,44 L600,26 L660,44 L720,26 L780,44 L840,26 L900,44 L960,26 L1020,44 L1080,26 L1140,44 L1200,26 L1260,44 L1320,26 L1380,44 L1440,26" fill="none" stroke="#e8a020" strokeWidth="3" />
        </svg>
      </div>
    </section>
  );
}
