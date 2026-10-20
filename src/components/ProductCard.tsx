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
      className="pop-lift group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white"
    >
      {/* halftone ticket strip along the card's top edge */}
      <div aria-hidden className="halftone flex items-center gap-2 border-b-2 border-[#211a12] bg-brand-100 px-5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full border border-[#211a12] bg-brand-500" />
        <span className="h-2.5 w-2.5 rounded-full border border-[#211a12] bg-gold" />
        <span className="h-2.5 w-2.5 rounded-full border border-[#211a12] bg-popblue" />
        <span className="ml-1 text-[10px] font-black uppercase tracking-[0.22em] text-brand-800">GadZone pick</span>
      </div>
      <div className="relative p-3">
        <div className="relative cursor-pointer overflow-hidden rounded-xl border-2 border-[#211a12]" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 -rotate-6 rounded-lg border-2 border-[#211a12] bg-popblue px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-[3px_3px_0_0_#211a12]">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="starburst absolute -right-2 -top-2 flex h-16 w-16 items-center justify-center bg-gold p-4 text-center text-[11px] font-black leading-tight text-white">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5 px-5 pb-4 pt-1 text-left">
        <span className="rounded-full border-2 border-[#211a12] bg-brand-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-800 shadow-[2px_2px_0_0_#211a12]">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-[#211a12] hover:text-gold-deep" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-[#7a6a58]">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit border px-2.5 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "rounded-full border-[#211a12] bg-brand-100 text-brand-800" : "rounded-full border-[#7a6a58] bg-[#f6ecd4] text-[#7a6a58]"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[#7a6a58]">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-brand-800">{tk(p.price)}</span>
          <span className="text-xs font-bold text-[#7a6a58] line-through">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-[#211a12] bg-brand-500 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-[#211a12] shadow-[4px_4px_0_0_#211a12] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#211a12] active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-[#211a12] bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-[#211a12] transition hover:bg-gold-soft active:scale-[0.98]"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
