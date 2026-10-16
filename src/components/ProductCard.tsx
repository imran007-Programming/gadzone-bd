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
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-teal-900/10 ring-1 ring-teal-100/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-teal-900/15"
    >
      <div className="relative bg-gradient-to-b from-teal-50 via-teal-50/60 to-white">
        <div className="relative cursor-pointer overflow-hidden" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-full bg-teal-500 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md shadow-teal-500/40">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-teal-600 px-2.5 py-1 text-[11px] font-black text-white shadow-lg shadow-teal-600/40">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1.5 px-5 pb-5 pt-2 text-center">
        <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-teal-700 ring-1 ring-teal-200">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-slate-900 hover:text-teal-700" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-slate-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "bg-teal-50 text-teal-700 ring-1 ring-teal-200" : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-slate-500">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-slate-900">{tk(p.price)}</span>
          <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-600 line-through decoration-teal-400">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex items-center justify-center gap-1.5 rounded-full bg-teal-500 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-teal-500/40 transition hover:bg-teal-600 active:scale-[0.98]"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex items-center justify-center rounded-full bg-white px-4 py-3 text-xs font-black uppercase tracking-wider text-teal-700 ring-1 ring-teal-200 transition hover:bg-teal-50 active:scale-[0.98]"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
