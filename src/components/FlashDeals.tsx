"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/data/products";
import type { Countdown } from "@/types";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

type FlashDealsProps = {
  products: Product[];
  countdown: Countdown;
  onQuickView: (product: Product) => void;
  onAddToCart: (id: number) => void;
};

export default function FlashDeals({ products, countdown, onQuickView, onAddToCart }: FlashDealsProps) {
  const { hh, mm, ss } = countdown;
  const reduce = useReducedMotion();
  return (
    <section id="flash" className="relative overflow-hidden bg-[#16294a] py-14 text-[#12233d] sm:py-16">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-400/20 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-600/20 blur-[100px]" />
      {/* delta rain-fleck dots */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(22,165,163, 0.14)_1px,transparent_1.5px)] [background-size:30px_30px]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                <span className="text-brand-700">Trending</span> New Arrivals
              </h2>
              <span className="mt-2.5 block h-1 w-16 rounded-full bg-gradient-to-r from-brand-600 via-gold to-popblue" aria-hidden />
              <p className="mt-2.5 text-sm leading-relaxed text-[#9db3c4]">Fresh picks, latest tech — handpicked for you.</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-wide">
              <span className="text-brand-700/80">Ends in</span>
              {[hh, mm].map((v, i) => <span key={i} className="rounded-lg bg-gradient-to-b from-brand-700 to-brand-900 px-3.5 py-2 text-lg font-black tabular-nums text-[#ecfbf9] shadow-[0_0_18px_rgba(22,165,163, 0.5)] ring-1 ring-brand-200/50">{v}</span>)}
              <motion.span
                animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-lg bg-gradient-to-b from-brand-700 to-brand-900 px-3.5 py-2 text-lg font-black tabular-nums text-[#ecfbf9] shadow-[0_0_22px_rgba(22,165,163, 0.6)] ring-2 ring-brand-200/60"
              >
                {ss}
              </motion.span>
            </div>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">{products.map((p, i) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} delay={(i % 4) * 0.06} />)}</div>
      </div>
      {/* volt waterline accent strip along the base */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-brand-500 via-gold to-popblue" />
    </section>
  );
}
