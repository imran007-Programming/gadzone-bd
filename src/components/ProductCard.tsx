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
      whileHover={reduce ? undefined : { y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border-t-4 border-orange-600 bg-white shadow-[0_14px_38px_-20px_rgba(0,0,0,0.35)] ring-1 ring-stone-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-22px_rgba(234,88,12,0.45)] hover:ring-2 hover:ring-orange-600"
    >
      <div className="relative bg-gradient-to-b from-orange-100/60 via-amber-50/50 to-white px-4 pb-4 pt-4">
        <div className="relative cursor-pointer overflow-hidden rounded-md ring-1 ring-stone-950/10" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-sm bg-stone-900 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-amber-400 shadow-md">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-sm bg-orange-600 px-2.5 py-1.5 text-[11px] font-black text-white shadow-lg shadow-orange-950/30">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1.5 px-5 pb-5 pt-2 text-center">
        <span className="rounded-sm bg-orange-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-orange-800 ring-1 ring-orange-200">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-stone-900 hover:text-orange-700" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-stone-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-sm px-3 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "bg-orange-50 text-orange-700 ring-1 ring-orange-200" : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-stone-500">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-stone-900">{tk(p.price)}</span>
          <span className="rounded-sm bg-orange-600/10 px-2.5 py-1 text-xs font-bold text-orange-700 line-through decoration-orange-400">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 border-t-2 border-stone-100">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex items-center justify-center gap-1.5 bg-stone-900 px-4 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-orange-700 active:bg-orange-800"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex items-center justify-center bg-orange-600 px-4 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-orange-700 active:bg-orange-800"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
