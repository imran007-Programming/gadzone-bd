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
      className="ember-glow group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-brand-400/25 bg-[#221a14] transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* caramel top light */}
      <div aria-hidden className="h-[3px] bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-70" />
      <div className="relative p-3">
        <div className="relative cursor-pointer overflow-hidden rounded-xl ring-1 ring-brand-400/20" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-[0_4px_14px_-4px_rgba(184,98,28,0.8)]">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(214,61,31,0.8)]">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5 px-5 pb-4 pt-1 text-left">
        <span className="rounded-full bg-brand-400/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-300 ring-1 ring-brand-400/30">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-[#f5ead9] hover:text-brand-300" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-[#c4ab8a]">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit px-2.5 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "rounded-full bg-brand-400/10 text-brand-300 ring-1 ring-brand-400/40" : "rounded-full bg-[#2b2118] text-[#c4ab8a] ring-1 ring-brand-400/20"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[#c4ab8a]">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-brand-300">{tk(p.price)}</span>
          <span className="text-xs font-bold text-[#c4ab8a] line-through">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-400 to-brand-600 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#1a120b] shadow-[0_8px_24px_-8px_rgba(221,144,64,0.7)] transition hover:brightness-110 active:scale-[0.98]"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex w-full items-center justify-center rounded-xl border border-gold-deep/60 bg-transparent px-4 py-2 text-xs font-black uppercase tracking-wider text-gold transition hover:bg-gold/10 active:scale-[0.98]"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
