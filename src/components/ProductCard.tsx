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
      className="group relative flex h-full flex-col overflow-hidden border-2 border-stone-950 bg-white shadow-[5px_5px_0_0_#14532d] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[8px_8px_0_0_#14532d]"
    >
      {/* matcha top rule */}
      <div aria-hidden className="absolute inset-x-0 top-0 z-10 h-1.5 bg-gradient-to-r from-amber-400 via-orange-600 to-amber-400" />
      <div className="relative border-b-2 border-stone-950/10 bg-gradient-to-b from-orange-50 via-orange-50/60 to-white">
        <div className="relative cursor-pointer overflow-hidden" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 border-2 border-stone-950 bg-amber-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-stone-950">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 bg-orange-700 px-2.5 py-1 text-[11px] font-black text-white">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1.5 px-5 pb-5 pt-2 text-center">
        <span className="bg-orange-700 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-slate-900 hover:text-orange-900" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-slate-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit px-3 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "bg-orange-50 text-orange-900 ring-1 ring-orange-300" : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-slate-500">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-slate-900">{tk(p.price)}</span>
          <span className="bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700 line-through decoration-orange-400">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex items-center justify-center gap-1.5 border-2 border-stone-950 bg-orange-600 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[3px_3px_0_0_#14532d] transition hover:bg-orange-700 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex items-center justify-center border-2 border-stone-950 bg-white px-4 py-3 text-xs font-black uppercase tracking-wider text-orange-900 shadow-[3px_3px_0_0_#14532d] transition hover:bg-orange-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
