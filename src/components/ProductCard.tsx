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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-blue-900/15 ring-2 ring-blue-100/90 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-900/20 hover:ring-blue-200"
    >
      <div className="relative bg-gradient-to-b from-blue-50 via-blue-50/60 to-white">
        <div className="relative cursor-pointer overflow-hidden" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md shadow-blue-500/40">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-2.5 py-1 text-[11px] font-black text-white shadow-lg shadow-blue-600/40">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1.5 px-5 pb-5 pt-2 text-center">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-700 ring-1 ring-blue-200">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-slate-900 hover:text-blue-700" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-slate-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200" : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-slate-500">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-slate-900">{tk(p.price)}</span>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 line-through decoration-blue-400">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-blue-500/40 transition hover:from-blue-700 hover:to-blue-600 active:scale-[0.98]"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex items-center justify-center rounded-xl border-2 border-blue-200 bg-white px-4 py-3 text-xs font-black uppercase tracking-wider text-blue-700 transition hover:border-blue-500 hover:bg-blue-50 active:scale-[0.98]"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
