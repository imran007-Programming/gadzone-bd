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

const PETALS = ["#e8558a", "#b84d7d", "#a0205a", "#f27da3", "#b02d5c", "#d43d72"];

// Deterministic falling-petal positions (client component, but stable across renders).
const FALLING = [
  { left: "4%", size: 16, delay: "0s", dur: "13s" },
  { left: "12%", size: 11, delay: "-4s", dur: "16s" },
  { left: "21%", size: 19, delay: "-8s", dur: "14s" },
  { left: "33%", size: 12, delay: "-2s", dur: "18s" },
  { left: "47%", size: 17, delay: "-11s", dur: "15s" },
  { left: "59%", size: 10, delay: "-6s", dur: "17s" },
  { left: "70%", size: 18, delay: "-1s", dur: "13.5s" },
  { left: "82%", size: 13, delay: "-9s", dur: "16.5s" },
  { left: "91%", size: 16, delay: "-5.5s", dur: "14.5s" },
  { left: "96%", size: 11, delay: "-12s", dur: "15.5s" },
];

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* rose garden: soft bloom glows + falling petals over blush cream */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fdf6f8] via-[#fbeef2] to-[#fdf6f8]" />
      <div
        aria-hidden
        className="petal-drift pointer-events-none absolute -top-28 right-[-4rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(242,125,163,0.5),rgba(232,85,138,0.16)_60%,transparent_72%)] blur-[12px]"
      />
      <div
        aria-hidden
        className="petal-drift pointer-events-none absolute -top-20 left-[-6rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(192,76,126,0.26),transparent_70%)] blur-[20px]"
        style={{ animationDelay: "-9s" }}
      />
      <div
        aria-hidden
        className="petal-drift pointer-events-none absolute bottom-[-6rem] left-1/3 h-[16rem] w-[16rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(247,169,198,0.35),transparent_70%)] blur-[18px]"
        style={{ animationDelay: "-4s" }}
      />

      {/* falling petal shower */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {FALLING.map((p, i) => (
          <span
            key={i}
            className="petal-fall absolute top-0 block"
            style={{
              left: p.left,
              width: p.size,
              height: p.size * 1.25,
              animationDelay: p.delay,
              animationDuration: p.dur,
              background: PETALS[i % PETALS.length],
              borderRadius: "62% 38% 55% 45% / 55% 60% 40% 45%",
              opacity: 0.7,
              filter: "drop-shadow(0 2px 3px rgba(176,45,92,0.2))",
            }}
          />
        ))}
      </div>

      {/* flowering vine garland across the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden sm:block">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="block h-[4.5rem] w-full">
          <path d="M-20,6 C 360,64 1080,64 1460,6" fill="none" stroke="#b02d5c" strokeWidth="3" opacity="0.45" />
          <path d="M-20,10 C 360,70 1080,70 1460,10" fill="none" stroke="#d43d72" strokeWidth="1.5" opacity="0.25" />
        </svg>
        <div className="absolute inset-x-0 top-0 mx-auto flex max-w-6xl justify-between px-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="petal-sway block"
              style={{
                width: 26,
                height: 20,
                background: PETALS[i % PETALS.length],
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                animationDelay: `${-i * 0.5}s`,
                marginTop: `${8 + Math.sin((i / 11) * Math.PI) * 22}px`,
                opacity: 0.85,
                boxShadow: "inset -3px -3px 0 rgba(66,14,32,0.12), 0 4px 6px rgba(176,45,92,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      {/* 4-banner carousel (image-only slides) */}
      <div className="relative">
        <BannerCarousel />
      </div>

      {/* Stats + featured picks, kept from the previous hero */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-10 md:pb-28">
        <motion.div variants={container} initial="hidden" animate="show" {...anim}>
          <motion.div variants={item} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { v: "500+", l: "Products" },
              { v: "64", l: "Districts Delivery" },
              { v: "50K+", l: "Happy Customers" },
              { v: "COD", l: "Available" },
            ].map((s) => (
              <div key={s.l} className="paper-lift relative overflow-hidden rounded-3xl border-2 border-[#f0d3df] bg-[#fffbfc] p-4">
                <span aria-hidden className="absolute -right-5 -top-5 h-20 w-16 rotate-12 rounded-[60%_40%_55%_45%/55%_60%_40%_45%] bg-gradient-to-br from-brand-300 to-brand-600 opacity-40" />
                <span aria-hidden className="absolute right-2 top-3 h-4 w-4 rounded-full bg-brand-400/50" />
                <span className="block pl-3 text-2xl font-black tracking-tight text-[#34202a]">{s.v}</span>
                <span className="mt-1 block pl-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#8a6a71]">{s.l}</span>
                <span aria-hidden className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-brand-400/15 blur-2xl" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-700">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#34202a]">Featured <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 block h-1.5 w-32 rounded-full bg-gradient-to-r from-brand-400 to-brand-700 shadow-[0_4px_12px_-2px_rgba(232,85,138,0.5)]" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer overflow-hidden rounded-3xl border-2 border-[#f0d3df] bg-[#fffbfc] shadow-[0_14px_36px_-16px_rgba(176,45,92,0.35)] transition-all hover:-translate-y-2 hover:border-brand-500/70 hover:shadow-[0_18px_40px_-14px_rgba(232,85,138,0.45)]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(232,85,138,0.5)]">-{discountPct(p)}%</span>
                </div>
                <div className="border-t-2 border-dashed border-[#f0d3df] p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#34202a]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-700">{tk(p.price)} <span className="text-xs font-medium text-[#8a6a71] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rounded-full border-2 border-dashed border-brand-700/50 bg-[#420e20] px-5 py-2 text-sm font-black tracking-wide text-brand-300 shadow-[0_8px_20px_-8px_rgba(66,14,32,0.6)]">-45% TODAY</span>
        </div>
      </div>

      {/* petal wave divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-12 w-full">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,48 C 120,10 240,10 360,34 C 480,58 600,58 720,34 C 840,10 960,10 1080,34 C 1200,58 1320,58 1440,34 L1440,48 Z" fill="#e8558a" opacity="0.28" />
          <path d="M0,48 C 160,22 320,22 480,40 C 640,58 800,58 960,40 C 1120,22 1280,22 1440,40 L1440,48 Z" fill="#e8558a" opacity="0.85" />
          <rect x="0" y="0" width="1440" height="18" fill="#fdf6f8" />
        </svg>
      </div>
    </section>
  );
}
