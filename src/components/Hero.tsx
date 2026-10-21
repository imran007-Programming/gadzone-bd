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

// Emerald drift: mint, lime and teal dew-glows over the grove field.
const GLOWS = [
  { left: "4%", top: "10%", size: 150, delay: "0s", dur: "14s", c: "rgba(5, 150, 105, 0.28)" },
  { left: "72%", top: "4%", size: 200, delay: "-4s", dur: "15s", c: "rgba(101, 163, 13, 0.16)" },
  { left: "44%", top: "44%", size: 120, delay: "-7s", dur: "13s", c: "rgba(190, 242, 100, 0.22)" },
  { left: "86%", top: "50%", size: 110, delay: "-2s", dur: "14s", c: "rgba(101, 163, 13, 0.24)" },
];

// Rising dew motes: emerald, lime and teal droplets lifting through cool air.
const DOTS = [
  { left: "8%", delay: "0s", dur: "7.2s", s: 22, c: "#059669" },
  { left: "21%", delay: "-1.4s", dur: "7.8s", s: 16, c: "#6ee7b7" },
  { left: "36%", delay: "-2.6s", dur: "7.4s", s: 24, c: "#14b8a6" },
  { left: "53%", delay: "-0.8s", dur: "8s", s: 18, c: "#a7f3d0" },
  { left: "68%", delay: "-3.2s", dur: "7.5s", s: 22, c: "#047857" },
  { left: "82%", delay: "-2s", dur: "7.9s", s: 15, c: "#34d399" },
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
          borderRadius: "8px",
          transform: "rotate(45deg)",
          background: `linear-gradient(135deg, #ffffffcc, ${c} 60%)`,
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
      {/* grove field + mint wash + rising dew motes */}
      <div aria-hidden className="halftone pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#def0e4]/70 via-popblue-soft/30 to-transparent" />

      {/* grove core: an emerald dew orb ringed by orbiting leaf
          shards and radiating dew traces, offset right */}
      <div aria-hidden className="pointer-events-none absolute -right-44 -top-36 z-0 hidden opacity-90 sm:block">
        <div className="relative h-[600px] w-[600px]">
          <div className="sun-disc absolute inset-8 rounded-full blur-2xl" />
          <div className="sun-rays pop-spin absolute inset-0" />
          {/* radiating wire traces */}
          {[0, 45, 90, 135].map((r) => (
            <span
              key={r}
              className="absolute left-1/2 top-1/2 h-1 w-[46%] origin-left bg-gradient-to-r from-gold/70 to-transparent [mask-image:repeating-linear-gradient(90deg,black_0_8px,transparent_8px_14px)]"
              style={{ transform: `rotate(${r}deg)` }}
            />
          ))}
          {/* orbiting leaf sparks */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const x = 50 + 38 * Math.cos(a);
            const y = 50 + 38 * Math.sin(a);
            return (
              <span
                key={i}
                className="pop-bob absolute h-5 w-5 bg-gold shadow-[0_0_18px_4px_rgba(101, 163, 13,0.55)] ring-2 ring-white/60"
                style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${-i * 0.8}s`, borderRadius: "6px", transform: "rotate(45deg)" }}
              />
            );
          })}
          <div className="absolute inset-44 rounded-full border-2 border-brand-200/80 bg-gradient-to-br from-brand-400 via-brand-600 to-brand-800 shadow-[0_0_90px_28px_rgba(5, 150, 105,0.35)]" />
          <div className="absolute inset-44 rounded-full border border-white/40" />
          {/* leaf ribs */}
          <div className="absolute inset-44 rounded-full border-x-8 border-brand-950/30" />
        </div>
      </div>

      {/* drifting mint haze */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        {GLOWS.map((g, i) => (
          <div
            key={i}
            className="pop-drift absolute rounded-full blur-3xl"
            style={{ left: g.left, top: g.top, width: g.size, height: g.size, background: g.c, animationDelay: g.delay, animationDuration: g.dur }}
          />
        ))}
      </div>

      {/* rising dew motes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden sm:block">
        {DOTS.map((r, i) => (
          <Dot key={i} {...r} />
        ))}
      </div>

      {/* 4-banner carousel in a sand frame with a circuit ribbon top edge */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="pop-lift overflow-hidden bg-[#f4fbf6]">
            <div aria-hidden className="pop-stripes h-4 border-b border-brand-600/20" />
            <div className="overflow-hidden p-2">
              <div className="overflow-hidden rounded-2xl ring-1 ring-brand-600/25">
                <BannerCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* grove ticker: emerald-gradient band marquee of the shop's own promises */}
      <div aria-hidden className="relative z-10 mt-8 border-y-4 border-double border-brand-deep bg-gradient-to-r from-brand-700 via-brand-600 to-popblue-deep py-2.5 shadow-[0_18px_44px_-20px_rgba(6, 95, 70,0.55)]">
        <div className="overflow-hidden">
          <div className="pop-ticker flex w-max items-center gap-8 pr-8">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.22em] text-white/95">
                {t} <span className="text-brand-200">✿</span>
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
              <div key={s.l} className="pop-lift relative overflow-hidden bg-[#f4fbf6] p-4 pb-3 text-center">
                <span className="block text-2xl font-black tracking-tight text-brand-700">{s.v}</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#5c7569]">{s.l}</span>
                <span aria-hidden className="mx-auto mt-3 block h-1.5 w-16 rounded-full bg-gradient-to-r from-brand-600 via-gold to-popblue" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="inline-block rounded-full bg-gradient-to-r from-brand-600 via-gold to-popblue px-4 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-white shadow-[0_16px_38px_-14px_rgba(5, 150, 105,0.6)]">Handpicked for you</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#10231c]">Featured <span className="bg-gradient-to-r from-brand-700 to-popblue-deep bg-clip-text text-transparent">Picks</span></h2>
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
                className="pop-lift group cursor-pointer overflow-hidden bg-[#f4fbf6]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden border-b border-brand-600/20">
                    <ProductImage product={p} />
                  </div>
                  <span className="starburst absolute -right-1 -top-1 flex h-16 w-16 items-center justify-center p-4 text-center text-[11px] font-black leading-tight">-{discountPct(p)}%</span>
                  <span aria-hidden className="pop-stripes absolute inset-x-0 bottom-0 h-2 border-t border-brand-600/20" />
                </div>
                <div className="p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#10231c]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-700">{tk(p.price)} <span className="text-xs font-medium text-[#5c7569] line-through">{tk(p.oldPrice)}</span></p></div>
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
