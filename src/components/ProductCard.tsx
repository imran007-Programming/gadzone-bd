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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_0_-6px_rgba(153,59,20,0.4)] ring-1 ring-brand-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_0_-6px_rgba(153,59,20,0.5)] hover:ring-brand-300"
    >
      <div className="relative bg-gradient-to-b from-brand-100/70 via-white to-white p-3">
        <div className="relative cursor-pointer overflow-hidden rounded-xl ring-1 ring-brand-100" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-md bg-brand-900 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md shadow-brand-950/30">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 -rotate-3 rounded-md bg-brand-600 px-2.5 py-1 text-[11px] font-black text-white shadow-md shadow-brand-700/30">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5 px-5 pb-4 pt-1 text-left">
        <span className="rounded-md bg-brand-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-800 ring-1 ring-brand-200">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-slate-900 hover:text-brand-700" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-slate-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-md px-2.5 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "bg-brand-50 text-brand-700 ring-1 ring-brand-200" : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-slate-500">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-brand-700">{tk(p.price)}</span>
          <span className="text-xs font-bold text-slate-400 line-through">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_4px_0_0_#7d3317] transition hover:bg-brand-700 active:translate-y-1 active:shadow-none"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex w-full items-center justify-center rounded-xl bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-brand-700 ring-1 ring-brand-300 transition hover:bg-brand-50 active:scale-[0.98]"
        >
          View →
        </button>
      </div>
      {/* ember base dash */}
      <div aria-hidden className="h-1.5 bg-[repeating-linear-gradient(-45deg,#bd4c16_0,#bd4c16_10px,#993b14_10px,#993b14_20px)]" />
    </motion.div>
  );
}
