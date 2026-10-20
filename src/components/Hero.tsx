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

// Pop glow blobs: yellow, pink and blue ink blooming over the paper.
const GLOWS = [
  { left: "4%", top: "10%", size: 140, delay: "0s", dur: "10s", c: "rgba(245,163,0, 0.25)" },
  { left: "74%", top: "4%", size: 190, delay: "-4s", dur: "12s", c: "rgba(240,68,124, 0.18)" },
  { left: "44%", top: "44%", size: 110, delay: "-7s", dur: "9s", c: "rgba(42,168,242, 0.18)" },
  { left: "86%", top: "50%", size: 100, delay: "-2s", dur: "11s", c: "rgba(245,163,0, 0.2)" },
];

// Falling pop dots: comic confetti tumbling down through the hero.
const DOTS = [
  { left: "8%", delay: "0s", dur: "11s", s: 12, c: "#f5a300" },
  { left: "21%", delay: "-3s", dur: "12s", s: 9, c: "#f0447c" },
  { left: "36%", delay: "-6s", dur: "11.5s", s: 14, c: "#2aa8f2" },
  { left: "53%", delay: "-2s", dur: "12.5s", s: 10, c: "#c2275b" },
  { left: "68%", delay: "-7.5s", dur: "11.2s", s: 13, c: "#f5a300" },
  { left: "82%", delay: "-4.5s", dur: "12.2s", s: 9, c: "#f0447c" },
  { left: "93%", delay: "-1s", dur: "10.6s", s: 11, c: "#2aa8f2" },
];

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
          borderRadius: 9999,
          background: c,
          border: "2px solid #211a12",
          opacity: 0.9,
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
      {/* halftone pop: dotted paper with ink glow blobs and falling pop dots */}
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fff8e1]/70 via-transparent to-transparent" />

      {/* rotating starburst medallion */}
      <div aria-hidden className="pointer-events-none absolute -right-36 -top-36 z-0 hidden opacity-30 sm:block">
        <div className="pop-spin relative h-[440px] w-[440px]">
          <div className="starburst absolute inset-0 bg-brand-500" />
          <div className="starburst absolute inset-8 bg-gold" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-black text-[#211a12]">★</span>
          </div>
        </div>
      </div>

      {/* drifting pop glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="pop-drift absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* falling pop dots */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {DOTS.map((r, i) => (
          <Dot key={i} {...r} />
        ))}
      </div>

      {/* 4-banner carousel (image-only slides) in a thick ink frame */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="pop-lift rounded-2xl bg-[#211a12] p-2.5">
            <div className="overflow-hidden rounded-xl border-2 border-[#211a12]">
              <BannerCarousel />
            </div>
          </div>
        </div>
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
              <div key={s.l} className="pop-lift relative overflow-hidden rounded-2xl bg-white p-4 pb-3 text-center">
                <span className="block text-2xl font-black tracking-tight text-brand-800">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7a6a58]">{s.l}</span>
                <span aria-hidden className="mx-auto mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-brand-500 via-gold to-popblue" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="inline-block -rotate-1 rounded-lg border-2 border-[#211a12] bg-gold px-3 py-1 text-xs font-black uppercase tracking-[0.28em] text-white shadow-[3px_3px_0_0_#211a12]">Handpicked for you</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#211a12]">Featured <span className="bg-gradient-to-r from-brand-700 to-gold-deep bg-clip-text text-transparent">Picks</span></h2>
            <span className="zigzag mt-3 block w-44" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="pop-lift group cursor-pointer overflow-hidden rounded-2xl bg-white"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden border-b-2 border-[#211a12]">
                    <ProductImage product={p} />
                  </div>
                  <span className="starburst absolute -right-1 -top-1 flex h-16 w-16 items-center justify-center bg-gold p-4 text-center text-[11px] font-black leading-tight text-white">-{discountPct(p)}%</span>
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-brand-500 via-gold to-popblue" />
                </div>
                <div className="p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#211a12]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-800">{tk(p.price)} <span className="text-xs font-medium text-[#7a6a58] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="starburst pop-bob absolute -top-9 right-2 flex h-28 w-28 items-center justify-center bg-brand-500 p-6 text-center text-[13px] font-black leading-tight text-[#211a12]">-45%<br />TODAY</span>
        </div>
      </div>

      {/* zigzag divider into the page */}
      <div aria-hidden className="zigzag absolute bottom-0 left-0 w-full opacity-90" />
    </section>
  );
}
