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
      className="pop-lift group relative flex h-full flex-col overflow-hidden bg-paper"
    >
      {/* warm glow peeking from the card's top edge */}
      <div aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-b-full bg-gradient-to-b from-brand-200/60 via-popblue-200/30 to-transparent blur-sm" />
      <div className="relative p-3">
        <div className="relative cursor-pointer overflow-hidden rounded-xl ring-2 ring-brand-200" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-md bg-gold-700 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-[0_0_18px_-4px_rgba(194,65,12, 0.8)] ring-1 ring-white/60">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="starburst absolute -right-2 -top-2 flex h-16 w-16 items-center justify-center p-4 text-center text-[11px] font-black leading-tight">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5 px-5 pb-4 pt-1 text-left">
        <span className="rounded-full bg-brand-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-700 ring-1 ring-brand-200">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-ink hover:text-brand-700" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-mute">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit px-2.5 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "rounded-full bg-gold-soft text-gold-deep ring-1 ring-gold/30" : "rounded-full bg-brand-100 text-brand-800 ring-1 ring-brand-200"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-mute">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-brand-700">{tk(p.price)}</span>
          <span className="text-xs font-bold text-mute line-through">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-brand-700 bg-brand-600 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_14px_28px_-10px_rgba(67,56,202,0.6)] transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_20px_36px_-12px_rgba(67,56,202,0.65)] active:translate-y-0 active:scale-[0.98]"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex w-full items-center justify-center rounded-lg border border-dashed border-brand-300 bg-brand-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-brand-700 transition hover:bg-brand-100 active:scale-[0.98]"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
