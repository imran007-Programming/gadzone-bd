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
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-xl shadow-stone-900/10 ring-1 ring-rose-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-rose-900/20 hover:ring-rose-200"
    >
      {/* wine top rule */}
      <div aria-hidden className="absolute inset-x-0 top-0 z-10 h-1.5 bg-gradient-to-r from-amber-200 via-rose-700 to-amber-200" />
      <div className="relative bg-gradient-to-b from-rose-50 via-rose-50/50 to-white p-3">
        <div className="relative cursor-pointer overflow-hidden rounded-3xl" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-full bg-amber-200 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-rose-950 shadow-md shadow-stone-900/20">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-rose-700 px-3 py-1.5 text-[11px] font-black text-white shadow-md shadow-rose-950/30">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1.5 px-5 pb-5 pt-1 text-center">
        <span className="rounded-full bg-rose-700 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-stone-900 hover:text-rose-800" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-stone-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "bg-rose-50 text-rose-800 ring-1 ring-rose-200" : "bg-stone-100 text-stone-600 ring-1 ring-stone-200"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-stone-500">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-stone-900">{tk(p.price)}</span>
          <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600 line-through decoration-rose-300">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex items-center justify-center gap-1.5 rounded-full bg-rose-700 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-rose-700/30 transition hover:bg-rose-800 active:scale-[0.98]"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex items-center justify-center rounded-full bg-white px-4 py-3 text-xs font-black uppercase tracking-wider text-rose-800 ring-2 ring-rose-200 transition hover:bg-rose-50 active:scale-[0.98]"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
