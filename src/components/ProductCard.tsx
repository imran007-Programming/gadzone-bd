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
      className="group relative flex h-full flex-col overflow-visible rounded-3xl bg-slate-100 shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative bg-white px-3 pb-7 pt-3">
        <div className="relative cursor-pointer overflow-hidden rounded-2xl" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-full bg-slate-950 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-slate-950 shadow">-{discountPct(p)}%</span>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="absolute bottom-1.5 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-white text-lg shadow-lg ring-1 ring-slate-200 transition hover:bg-emerald-600 hover:text-white"
        >
          🛒
        </motion.button>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1 px-3 pb-4 pt-1 text-center">
        <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">{p.category}</span>
        <h3 className="cursor-pointer text-sm font-bold leading-snug text-slate-900 hover:text-emerald-600 sm:text-[15px]" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1.5"><Stars rating={p.rating} /><span className="text-xs text-slate-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${p.stock === "In Stock" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] text-slate-500">{p.desc}</p>
        <div className="mt-auto flex items-end gap-2 pt-2">
          <span className="text-lg font-extrabold text-emerald-600 sm:text-xl">{tk(p.price)}</span>
          <span className="text-sm text-slate-400 line-through">{tk(p.oldPrice)}</span>
        </div>
        <button onClick={() => onQuickView(p)} className="mt-2 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-600">
          View details
        </button>
      </div>
    </motion.div>
  );
}
