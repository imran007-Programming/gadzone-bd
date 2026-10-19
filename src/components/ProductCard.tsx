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
      className="rounded-3xl neon-lift group relative flex h-full flex-col overflow-hidden border-2 border-brand-800 bg-[#1c1f45] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-deep"
    >
      {/* neon coral top edge */}
      <div aria-hidden className="h-1.5 bg-gradient-to-r from-brand-700 via-gold to-brand-700" />
      <div className="relative p-3">
        <div className="rounded-xl relative cursor-pointer overflow-hidden ring-2 ring-brand-800/20" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="rounded-xl absolute left-3 top-3 bg-gradient-to-r from-brand-600 to-brand-800 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-[0_4px_14px_-4px_rgba(30,122,88,0.55)]">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="rounded-xl absolute right-3 top-3 bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-brand-950 shadow-[0_4px_14px_-4px_rgba(255,107,74,0.6)]">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5 px-5 pb-4 pt-1 text-left">
        <span className="rounded-xl border border-gold-deep/50 bg-gold/15 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold-deep">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-[#eef0ff] hover:text-brand-600" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-[#a7abc9]">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit px-2.5 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "rounded-xl border border-brand-600/40 bg-brand-600/10 text-brand-700" : "rounded-xl border border-[#343a70] bg-[#1c1f45] text-[#a7abc9]"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[#a7abc9]">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-brand-700">{tk(p.price)}</span>
          <span className="text-xs font-bold text-[#a7abc9] line-through">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="rounded-xl flex w-full items-center justify-center gap-1.5 bg-gradient-to-r from-brand-600 to-brand-800 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_8px_24px_-8px_rgba(18,85,57,0.5)] transition hover:brightness-110 active:scale-[0.98]"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="rounded-xl flex w-full items-center justify-center border-2 border-gold-deep/60 bg-transparent px-4 py-2 text-xs font-black uppercase tracking-wider text-gold-deep transition hover:bg-gold/15 active:scale-[0.98]"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
