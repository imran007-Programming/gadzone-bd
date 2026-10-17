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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-[#1c1210] bg-white shadow-[5px_5px_0_0_#1c1210] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[8px_8px_0_0_#1c1210]"
    >
      <div className="relative border-b-2 border-[#1c1210]/10 bg-gradient-to-b from-brand-100 via-amber-50 to-white p-3">
        <div className="relative cursor-pointer overflow-hidden rounded-lg border border-[#1c1210]/10" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-md bg-amber-400 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-brand-950 shadow-md shadow-slate-900/20">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-md bg-[#1c1210] px-2.5 py-1 text-[11px] font-black text-amber-300 shadow-md shadow-slate-950/30">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5 px-5 pb-4 pt-1 text-left">
        <span className="rounded-md bg-brand-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-800 ring-1 ring-brand-300">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-slate-900 hover:text-brand-800" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-slate-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-md px-2.5 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "bg-brand-50 text-brand-800 ring-1 ring-brand-200" : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
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
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-[#1c1210] bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[3px_3px_0_0_#1c1210] transition hover:from-brand-700 hover:to-brand-600 hover:shadow-[4px_4px_0_0_#1c1210] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_0_#1c1210]"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex w-full items-center justify-center rounded-xl border-2 border-[#1c1210] bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-brand-800 shadow-[3px_3px_0_0_#1c1210] transition hover:bg-brand-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0_0_#1c1210]"
        >
          View →
        </button>
      </div>
      {/* ember base rule */}
      <div aria-hidden className="h-1.5 bg-gradient-to-r from-brand-700 via-amber-400 to-brand-700" />
    </motion.div>
  );
}
