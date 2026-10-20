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

// Forge heat: amber, crimson and teal glows rising over the warm cream.
const GLOWS = [
  { left: "4%", top: "10%", size: 150, delay: "0s", dur: "11s", c: "rgba(249,115,22, 0.30)" },
  { left: "72%", top: "4%", size: 200, delay: "-4s", dur: "13s", c: "rgba(13,148,136, 0.22)" },
  { left: "44%", top: "44%", size: 120, delay: "-7s", dur: "10s", c: "rgba(220,38,38, 0.18)" },
  { left: "86%", top: "50%", size: 110, delay: "-2s", dur: "12s", c: "rgba(234,88,12, 0.24)" },
];

// Rising embers: warm sparks lifting through the hero.
const DOTS = [
  { left: "8%", delay: "0s", dur: "11s", s: 7, c: "#f59e0b" },
  { left: "21%", delay: "-3s", dur: "12s", s: 5, c: "#dc2626" },
  { left: "36%", delay: "-6s", dur: "11.5s", s: 8, c: "#ea580c" },
  { left: "53%", delay: "-2s", dur: "12.5s", s: 6, c: "#dc2626" },
  { left: "68%", delay: "-7.5s", dur: "11.2s", s: 7, c: "#f59e0b" },
  { left: "82%", delay: "-4.5s", dur: "12.2s", s: 5, c: "#0d9488" },
  { left: "93%", delay: "-1s", dur: "10.6s", s: 6, c: "#ea580c" },
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
          borderRadius: 9999,
          background: c,
          opacity: 0.85,
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
      {/* forge grain texture + warm gradient washes + rising embers */}
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fef3c7]/70 via-gold-soft/30 to-transparent" />

      {/* forge sun: a tilted rotating ray-disc of amber → crimson → teal */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-16 z-0 hidden opacity-90 sm:block">
        <div className="relative h-[560px] w-[560px] rotate-[-18deg]">
          <div className="pop-spin absolute inset-0 rounded-full bg-[conic-gradient(from_210deg,#f59e0b,#dc2626,#0d9488,#f59e0b)] opacity-80 blur-2xl" />
          <div className="absolute inset-16 rounded-full border-[3px] border-dashed border-[#431407]/50" />
          <div className="absolute inset-32 rounded-full border-2 border-[#431407] bg-gradient-to-br from-brand-300/70 via-gold/40 to-popblue/50 blur-xl" />
        </div>
      </div>

      {/* drifting aurora washes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="pop-drift absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* rising motes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {DOTS.map((r, i) => (
          <Dot key={i} {...r} />
        ))}
      </div>

      {/* 4-banner carousel in a frosted glass frame with an aurora top edge */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="pop-lift overflow-hidden bg-[#fffdf8]">
            <div aria-hidden className="pop-stripes h-4 border-b-2 border-[#431407]" />
            <div className="overflow-hidden p-2">
              <div className="overflow-hidden rounded-lg border-2 border-[#431407]">
                <BannerCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* forge ticker: infinite marquee of the shop's own promises */}
      <div aria-hidden className="relative z-10 mt-8 -rotate-1 border-y-2 border-[#431407] bg-[#431407] py-2.5">
        <div className="overflow-hidden">
          <div className="pop-ticker flex w-max items-center gap-8 pr-8">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.22em] text-[#fff8f0]">
                {t} <span className="text-gold">✦</span>
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
              <div key={s.l} className="pop-lift relative overflow-hidden bg-[#fffdf8] p-4 pb-3 text-center">
                <span className="block text-2xl font-black tracking-tight text-brand-700">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7c5f46]">{s.l}</span>
                <span aria-hidden className="mx-auto mt-3 block h-1.5 w-16 border border-[#431407] bg-gradient-to-r from-brand-600 via-gold to-popblue" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="inline-block rounded-lg border-2 border-[#431407] bg-gradient-to-r from-brand-600 via-gold to-popblue px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-white shadow-[0_16px_38px_-14px_rgba(124,58,237,0.55)]">Handpicked for you</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#431407]">Featured <span className="bg-gradient-to-r from-brand-700 to-popblue-deep bg-clip-text text-transparent">Picks</span></h2>
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
                className="pop-lift group cursor-pointer overflow-hidden bg-[#fffdf8]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden border-b-2 border-[#431407]">
                    <ProductImage product={p} />
                  </div>
                  <span className="starburst absolute -right-1 -top-1 flex h-16 w-16 items-center justify-center p-4 text-center text-[11px] font-black leading-tight">-{discountPct(p)}%</span>
                  <span aria-hidden className="pop-stripes absolute inset-x-0 bottom-0 h-2 border-t-2 border-[#431407]" />
                </div>
                <div className="p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#431407]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-700">{tk(p.price)} <span className="text-xs font-medium text-[#7c5f46] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="starburst pop-bob absolute -top-9 right-2 flex h-28 w-28 items-center justify-center p-6 text-center text-[13px] font-black leading-tight">-45%<br />TODAY</span>
        </div>
      </div>

      {/* stripe divider into the page */}
      <div aria-hidden className="zigzag absolute bottom-0 left-0 w-full opacity-90" />
    </section>
  );
}
