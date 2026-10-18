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

const BUNTING = ["#f09e12", "#c96a3b", "#6f9a52", "#f5b32e", "#a85d0c", "#d17907"];

export default function Hero({ onQuickView }: HeroProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? { initial: false } : {};
  return (
    <section className="relative overflow-hidden">
      {/* marigold courtyard: big sun disc + drifting sunbeams over warm cream */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#faf4e6] via-[#f7edd7] to-[#faf4e6]" />
      <div
        aria-hidden
        className="sun-drift pointer-events-none absolute -top-32 right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,179,46,0.55),rgba(240,158,18,0.18)_60%,transparent_72%)] blur-[10px]"
      />
      <div
        aria-hidden
        className="sun-drift pointer-events-none absolute -top-24 left-[-8rem] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,106,59,0.28),transparent_70%)] blur-[20px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:repeating-linear-gradient(115deg,rgba(209,121,7,0.05)_0_3px,transparent_3px_34px)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(209,121,7,0.35)_1px,transparent_1.6px)] [background-size:46px_46px]"
      />

      {/* bunting pennant garland across the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden sm:block">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="block h-16 w-full">
          <path d="M0,0 Q720,44 1440,0" fill="none" stroke="#a85d0c" strokeWidth="2.5" opacity="0.55" />
        </svg>
        <div className="absolute inset-x-0 top-0 mx-auto flex max-w-6xl justify-between px-10">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="bunting-sway block h-0 w-0 border-x-[13px] border-t-[22px] border-x-transparent"
              style={{
                borderTopColor: BUNTING[i % BUNTING.length],
                animationDelay: `${-i * 0.45}s`,
                marginTop: `${6 + Math.sin((i / 13) * Math.PI) * 10}px`,
                filter: "drop-shadow(0 3px 3px rgba(168,93,12,0.25))",
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
              <div key={s.l} className="paper-lift relative overflow-hidden rounded-3xl border-2 border-[#e3d2ab] bg-[#fffdf6] p-4">
                <span aria-hidden className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-brand-400 to-brand-700" />
                <span className="block pl-3 text-2xl font-black tracking-tight text-[#2f2417]">{s.v}</span>
                <span className="mt-1 block pl-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7d6a4f]">{s.l}</span>
                <span aria-hidden className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-400/20 blur-2xl" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative mt-12">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-brand-700">Handpicked for you</p>
            <h2 className="mt-1.5 text-3xl font-black tracking-tight text-[#2f2417]">Featured <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">Picks</span></h2>
            <span className="mt-3 block h-1.5 w-32 rounded-full bg-gradient-to-r from-brand-400 to-brand-700 shadow-[0_4px_12px_-2px_rgba(240,158,18,0.5)]" aria-hidden />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[4]].map((p, i) => (
              <motion.div
                key={p.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer overflow-hidden rounded-3xl border-2 border-[#e3d2ab] bg-[#fffdf6] shadow-[0_14px_36px_-16px_rgba(168,93,12,0.35)] transition-all hover:-translate-y-2 hover:border-brand-500/70 hover:shadow-[0_18px_40px_-14px_rgba(240,158,18,0.45)]"
                onClick={() => onQuickView(p)}
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <ProductImage product={p} />
                  </div>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(240,158,18,0.5)]">-{discountPct(p)}%</span>
                </div>
                <div className="border-t-2 border-dashed border-[#e3d2ab] p-3.5 text-left"><p className="truncate text-sm font-bold tracking-tight text-[#2f2417]">{p.name}</p><p className="mt-1 text-base font-extrabold tracking-tight text-brand-700">{tk(p.price)} <span className="text-xs font-medium text-[#7d6a4f] line-through">{tk(p.oldPrice)}</span></p></div>
              </motion.div>
            ))}
          </div>
          <span className="absolute -top-5 right-2 rounded-full border-2 border-dashed border-brand-700/50 bg-[#432405] px-5 py-2 text-sm font-black tracking-wide text-brand-300 shadow-[0_8px_20px_-8px_rgba(67,36,5,0.6)]">-45% TODAY</span>
        </div>
      </div>

      {/* scalloped courtyard divider into the page */}
      <div aria-hidden className="absolute bottom-0 left-0 h-10 w-full">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="block h-full w-full">
          <path d="M0,40 L0,22 Q30,22 30,32 Q30,22 60,22 L60,40 Z M60,40 L60,22 Q90,22 90,32 Q90,22 120,22 L120,40 Z M120,40 L120,22 Q150,22 150,32 Q150,22 180,22 L180,40 Z M180,40 L180,22 Q210,22 210,32 Q210,22 240,22 L240,40 Z M240,40 L240,22 Q270,22 270,32 Q270,22 300,22 L300,40 Z M300,40 L300,22 Q330,22 330,32 Q330,22 360,22 L360,40 Z M360,40 L360,22 Q390,22 390,32 Q390,22 420,22 L420,40 Z M420,40 L420,22 Q450,22 450,32 Q450,22 480,22 L480,40 Z M480,40 L480,22 Q510,22 510,32 Q510,22 540,22 L540,40 Z M540,40 L540,22 Q570,22 570,32 Q570,22 600,22 L600,40 Z M600,40 L600,22 Q630,22 630,32 Q630,22 660,22 L660,40 Z M660,40 L660,22 Q690,22 690,32 Q690,22 720,22 L720,40 Z M720,40 L720,22 Q750,22 750,32 Q750,22 780,22 L780,40 Z M780,40 L780,22 Q810,22 810,32 Q810,22 840,22 L840,40 Z M840,40 L840,22 Q870,22 870,32 Q870,22 900,22 L900,40 Z M900,40 L900,22 Q930,22 930,32 Q930,22 960,22 L960,40 Z M960,40 L960,22 Q990,22 990,32 Q990,22 1020,22 L1020,40 Z M1020,40 L1020,22 Q1050,22 1050,32 Q1050,22 1080,22 L1080,40 Z M1080,40 L1080,22 Q1110,22 1110,32 Q1110,22 1140,22 L1140,40 Z M1140,40 L1140,22 Q1170,22 1170,32 Q1170,22 1200,22 L1200,40 Z M1200,40 L1200,22 Q1230,22 1230,32 Q1230,22 1260,22 L1260,40 Z M1260,40 L1260,22 Q1290,22 1290,32 Q1290,22 1320,22 L1320,40 Z M1320,40 L1320,22 Q1350,22 1350,32 Q1350,22 1380,22 L1380,40 Z M1380,40 L1380,22 Q1410,22 1410,32 Q1410,22 1440,22 L1440,40 Z" fill="#f09e12" opacity="0.9" />
          <rect x="0" y="0" width="1440" height="22" fill="#faf4e6" />
        </svg>
      </div>
    </section>
  );
}
