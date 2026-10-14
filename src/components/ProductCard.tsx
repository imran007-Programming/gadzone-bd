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
      whileHover={reduce ? undefined : { y: -6, scale: 1.01 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/80 transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10 hover:ring-violet-300/60"
    >
      <div className="relative bg-slate-50 px-3 pb-8 pt-3">
        <div className="relative cursor-pointer overflow-hidden rounded-2xl ring-1 ring-slate-100" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-full bg-slate-950 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md ring-1 ring-white/10">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-slate-950 shadow-md ring-1 ring-amber-300/50">-{discountPct(p)}%</span>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="absolute bottom-2 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-white text-lg shadow-xl shadow-slate-900/15 ring-1 ring-slate-200 transition-all hover:scale-105 hover:bg-violet-600 hover:text-white hover:ring-violet-600 active:scale-95"
        >
          🛒
        </motion.button>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1.5 px-4 pb-5 pt-2 text-center">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-violet-600">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-slate-900 hover:text-violet-600" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-slate-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${p.stock === "In Stock" ? "bg-violet-50 text-violet-700 ring-1 ring-violet-100" : "bg-amber-50 text-amber-700 ring-1 ring-amber-100"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-slate-500">{p.desc}</p>
        <div className="mt-auto flex items-end gap-2 pt-2.5">
          <span className="text-xl font-extrabold tracking-tight text-violet-600">{tk(p.price)}</span>
          <span className="text-sm font-medium text-slate-400 line-through">{tk(p.oldPrice)}</span>
        </div>
        <button onClick={() => onQuickView(p)} className="mt-2.5 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:border-violet-600 hover:bg-violet-50 hover:text-violet-700 active:scale-[0.98]">
          View details
        </button>
      </div>
    </motion.div>
  );
}
