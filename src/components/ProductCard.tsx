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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-orange-950/5 ring-1 ring-orange-100 transition-shadow duration-300 hover:shadow-xl hover:shadow-orange-900/15 hover:ring-orange-300"
    >
      <div className="relative bg-gradient-to-b from-orange-50/80 to-amber-50/40 px-3 pb-8 pt-3">
        <div className="relative cursor-pointer overflow-hidden rounded-xl ring-1 ring-orange-100" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-0 top-3 -skew-x-6 rounded-r-md bg-stone-900 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white shadow-md">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-0 top-3 skew-x-6 rounded-l-md bg-orange-600 px-3 py-1 text-xs font-black tracking-wide text-white shadow-md">-{discountPct(p)}%</span>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="absolute bottom-2 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-orange-600 text-lg text-white shadow-xl shadow-orange-600/30 ring-1 ring-orange-500 transition-all hover:scale-105 hover:bg-orange-700 hover:ring-orange-700 active:scale-95"
        >
          🛒
        </motion.button>
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5 px-4 pb-5 pt-2 text-left">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-orange-600">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-stone-900 hover:text-orange-600" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-stone-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-md px-2.5 py-1 text-[11px] font-semibold ${p.stock === "In Stock" ? "bg-orange-50 text-orange-700 ring-1 ring-orange-100" : "bg-amber-50 text-amber-700 ring-1 ring-amber-100"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-stone-500">{p.desc}</p>
        <div className="mt-auto flex items-end gap-2 pt-2.5">
          <span className="text-xl font-extrabold tracking-tight text-orange-600">{tk(p.price)}</span>
          <span className="text-sm font-medium text-stone-400 line-through">{tk(p.oldPrice)}</span>
        </div>
        <button onClick={() => onQuickView(p)} className="mt-2.5 w-full rounded-lg bg-stone-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.98]">
          View details
        </button>
      </div>
    </motion.div>
  );
}
