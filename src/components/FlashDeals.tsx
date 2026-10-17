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
    <section id="flash" className="relative overflow-hidden bg-[#1b0e05] py-14 text-white sm:py-16">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-700/25 blur-3xl" />
      {/* kiln spark dash texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(135deg,rgba(251,179,107,0.08)_0px,rgba(251,179,107,0.08)_2px,transparent_2px,transparent_30px)]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                <span className="text-brand-400">Trending</span> New Arrivals
              </h2>
              <span className="mt-2.5 block h-1 w-16 rounded-full bg-gradient-to-r from-brand-600 to-brand-600" aria-hidden />
              <p className="mt-2.5 text-sm leading-relaxed text-brand-100/80">Fresh picks, latest tech — handpicked for you.</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-wide">
              <span className="text-brand-300/80">Ends in</span>
              {[hh, mm].map((v, i) => <span key={i} className="rounded-lg bg-brand-700 px-3.5 py-2 text-lg font-black tabular-nums text-white shadow-lg shadow-brand-700/30 ring-1 ring-brand-600">{v}</span>)}
              <motion.span
                animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-lg bg-brand-700 px-3.5 py-2 text-lg font-black tabular-nums text-white shadow-lg shadow-brand-700/30 ring-2 ring-amber-400/40"
              >
                {ss}
              </motion.span>
            </div>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">{products.map((p, i) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} delay={(i % 4) * 0.06} />)}</div>
      </div>
      {/* ember accent strip along the base */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-brand-500 via-amber-300 to-brand-500" />
    </section>
  );
}
