"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/data/products";
import { tk, discountPct } from "@/lib/format";
import ProductImage from "./ProductImage";
import Stars from "./Stars";

type ProductCardProps = {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (id: number) => void;
  delay?: number;
};

export default function ProductCard({ product: p, onQuickView, onAddToCart, delay = 0 }: ProductCardProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      whileHover={reduce ? undefined : { y: -5 }}
      className="ember-glow group relative flex h-full flex-col overflow-hidden rounded-[26px] border-2 border-brand-400/30 bg-[#ffffff] transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* delta waterline */}
      <div aria-hidden className="rounded-t-[22px] bg-white pt-2.5">
        <div className="h-[3px] bg-gradient-to-r from-brand-700 via-brand-400 to-brand-700" />
        <div className="mt-[3px] h-[2px] bg-gradient-to-r from-transparent via-brand-400/70 to-transparent" />
      </div>
      <div className="relative p-3">
        <div className="relative cursor-pointer overflow-hidden rounded-[18px] ring-2 ring-brand-400/25" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-[0_4px_14px_-4px_rgba(13,101,86,0.8)]">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(192,127,13,0.8)]">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5 px-5 pb-4 pt-1 text-left">
        <span className="rounded-full bg-gradient-to-r from-gold-deep/15 to-brand-400/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-600 ring-1 ring-gold-deep/40">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-[#14332e] hover:text-brand-300" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-[#55756f]">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit px-2.5 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "rounded-full bg-brand-500/12 text-brand-600 ring-1 ring-brand-500/45" : "rounded-full bg-[#e8f3f1] text-[#55756f] ring-1 ring-brand-400/20"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[#55756f]">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-brand-300">{tk(p.price)}</span>
          <span className="text-xs font-bold text-[#55756f] line-through">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-brand-500 to-brand-700 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_10px_26px_-10px_rgba(22,160,135,0.85)] ring-1 ring-brand-800/40 transition hover:brightness-110 active:scale-[0.98]"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex w-full items-center justify-center rounded-full border-2 border-dashed border-gold-deep/70 bg-gold-soft/40 px-4 py-2 text-xs font-black uppercase tracking-wider text-gold-deep transition hover:bg-gold/15 active:scale-[0.98]"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
