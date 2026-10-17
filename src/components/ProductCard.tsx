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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-900/10 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-900/15 hover:ring-emerald-300"
    >
      <div className="relative bg-gradient-to-b from-emerald-50 via-emerald-50/40 to-white p-3">
        <div className="relative cursor-pointer overflow-hidden rounded-xl" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md shadow-slate-900/20">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-black text-emerald-300 shadow-md shadow-slate-950/30">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5 px-5 pb-4 pt-1 text-left">
        <span className="rounded-md bg-emerald-700 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-slate-900 hover:text-emerald-800" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-slate-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-md px-2.5 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-slate-500">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-slate-900">{tk(p.price)}</span>
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600 line-through decoration-emerald-300">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-emerald-700/25 transition hover:bg-emerald-800 active:scale-[0.98]"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex w-full items-center justify-center rounded-xl bg-white px-4 py-2.5 text-xs font-black uppercase tracking-wider text-emerald-800 ring-2 ring-emerald-200 transition hover:bg-emerald-50 active:scale-[0.98]"
        >
          View →
        </button>
      </div>
      {/* pine base rule */}
      <div aria-hidden className="h-1 bg-gradient-to-r from-emerald-600 via-cyan-400 to-emerald-600" />
    </motion.div>
  );
}
