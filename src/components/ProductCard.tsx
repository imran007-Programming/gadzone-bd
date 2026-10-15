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
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_14px_38px_-20px_rgba(13,148,136,0.4)] ring-1 ring-teal-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-22px_rgba(13,148,136,0.5)] hover:ring-2 hover:ring-teal-300"
    >
      <div className="relative bg-gradient-to-b from-teal-100/70 via-emerald-50/60 to-white px-4 pb-10 pt-4">
        <div className="relative cursor-pointer overflow-hidden rounded-[1.25rem] ring-1 ring-teal-950/10" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-full bg-teal-950 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-300 shadow-md">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-teal-600 px-2.5 py-1.5 text-[11px] font-black text-white shadow-lg shadow-teal-900/25 ring-2 ring-white/80">-{discountPct(p)}%</span>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="absolute bottom-1 left-1/2 flex h-12 w-12 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-teal-600 text-lg text-white shadow-xl shadow-teal-700/40 ring-4 ring-white transition-all hover:scale-105 hover:bg-teal-700 active:scale-95"
        >
          🛒
        </motion.button>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1.5 px-5 pb-5 pt-8 text-center">
        <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-teal-700 ring-1 ring-teal-100">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-slate-900 hover:text-teal-700" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-slate-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "bg-teal-50 text-teal-700 ring-1 ring-teal-200" : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-slate-500">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-teal-800">{tk(p.price)}</span>
          <span className="rounded-full bg-teal-600/10 px-2.5 py-1 text-xs font-bold text-teal-700 line-through decoration-teal-400">{tk(p.oldPrice)}</span>
        </div>
        <button onClick={() => onQuickView(p)} className="mt-3 w-full rounded-full bg-teal-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-teal-600/30 transition hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-600/40 active:translate-y-0 active:shadow-md">
          View details
        </button>
      </div>
    </motion.div>
  );
}
