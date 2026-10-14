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
    <section id="flash" className="relative overflow-hidden bg-[#041816] py-14 text-white sm:py-16">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-500/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                <span className="text-teal-400">Trending</span> New Arrivals
              </h2>
              <span className="mt-2.5 block h-1 w-16 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400" aria-hidden />
              <p className="mt-2.5 text-sm leading-relaxed text-teal-100/80">Fresh picks, latest tech — handpicked for you.</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-wide">
              <span className="text-teal-200/80">Ends in</span>
              {[hh, mm].map((v, i) => <span key={i} className="rounded-lg bg-teal-600 px-3.5 py-2 text-lg font-black tabular-nums text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-500">{v}</span>)}
              <motion.span
                animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-lg bg-teal-600 px-3.5 py-2 text-lg font-black tabular-nums text-white shadow-lg shadow-teal-600/30 ring-1 ring-teal-500"
              >
                {ss}
              </motion.span>
            </div>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">{products.map((p, i) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} delay={(i % 4) * 0.06} />)}</div>
      </div>
    </section>
  );
}
