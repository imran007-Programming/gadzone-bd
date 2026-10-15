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
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border-2 border-emerald-950/10 bg-white shadow-[0_14px_36px_-22px_rgba(5,150,105,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-600/50 hover:shadow-[0_26px_54px_-20px_rgba(5,150,105,0.6)]"
    >
      <div className="relative bg-gradient-to-b from-emerald-100 via-emerald-50/60 to-white">
        <div className="relative cursor-pointer overflow-hidden" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-md bg-emerald-950 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-lime-300 shadow-md">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-2.5 py-1.5 text-[11px] font-black text-neutral-950 shadow-lg shadow-emerald-950/30 ring-1 ring-white/60">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1.5 px-5 pb-5 pt-2 text-center">
        <span className="rounded-md bg-emerald-950/[0.04] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-emerald-800 ring-1 ring-emerald-600/25">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-neutral-900 hover:text-emerald-700" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-neutral-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-sm px-3 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-neutral-500">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-neutral-900">{tk(p.price)}</span>
          <span className="rounded-sm bg-emerald-600/10 px-2.5 py-1 text-xs font-bold text-emerald-700 line-through decoration-emerald-400">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-[0_10px_25px_-10px_rgba(5,150,105,0.7)] transition hover:bg-emerald-700 active:bg-emerald-800"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex items-center justify-center rounded-full border-2 border-emerald-600/30 bg-white px-4 py-3 text-xs font-black uppercase tracking-wider text-emerald-700 transition hover:border-emerald-600 hover:bg-emerald-50 active:bg-emerald-100"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
