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
      className="pop-lift group relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#f6fbfb]"
    >
      {/* hearth strip along the card's top edge */}
      <div aria-hidden className="halftone flex items-center gap-2 bg-gradient-to-r from-brand-100 to-[#cfe8e6] px-5 py-2.5 ring-1 ring-inset ring-[#b2d5d9]">
        <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        <span className="h-2.5 w-2.5 rounded-full bg-popblue" />
        <span className="ml-1 text-[10px] font-black uppercase tracking-[0.22em] text-brand-700">GadZone pick</span>
      </div>
      <div className="relative p-3">
        <div className="relative cursor-pointer overflow-hidden rounded-2xl ring-1 ring-[#b2d5d9]" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-gold-deep to-gold px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-[0_6px_16px_-6px_rgba(13,148,136,0.7)]">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="starburst absolute -right-2 -top-2 flex h-16 w-16 items-center justify-center p-4 text-center text-[11px] font-black leading-tight">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5 px-5 pb-4 pt-1 text-left">
        <span className="rounded-full bg-brand-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-700 ring-1 ring-[#b2d5d9]">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-[#0b2233] hover:text-brand-600" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-[#4f6a7a]">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit px-2.5 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "rounded-full bg-gold-soft text-gold-deep ring-1 ring-gold/30" : "rounded-full bg-[#d7ebea] text-[#4f6a7a] ring-1 ring-[#b2d5d9]"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[#4f6a7a]">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-brand-700">{tk(p.price)}</span>
          <span className="text-xs font-bold text-[#4f6a7a] line-through">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-400 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_10px_24px_-8px_rgba(13,148,136,0.65)] transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:shadow-none"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex w-full items-center justify-center rounded-full border border-dashed border-[#a9cfd4] bg-[#eef6f5] px-4 py-2 text-xs font-black uppercase tracking-wider text-brand-700 transition hover:bg-brand-100 active:scale-[0.98]"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
