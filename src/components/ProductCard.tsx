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
      whileHover={reduce ? undefined : { y: -5 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e3d2ab] bg-[#ffffff] shadow-[0_14px_44px_-14px_rgba(2,8,26,0.6)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400/60 hover:shadow-[0_0_30px_-8px_rgba(240,158,18,0.5)]"
    >
      {/* neon aurora top edge */}
      <div aria-hidden className="h-1 bg-gradient-to-r from-brand-500 via-[#c96a3b] to-[#6f9a52] opacity-80" />
      <div className="relative p-3">
        <div className="relative cursor-pointer overflow-hidden rounded-xl ring-1 ring-[#e3d2ab]" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-brand-600 to-brand-800 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-[0_4px_14px_-4px_rgba(240, 158, 18,0.45)]">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(240, 158, 18,0.45)]">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5 px-5 pb-4 pt-1 text-left">
        <span className="rounded-full border border-brand-400/30 bg-brand-400/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-600">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-[#2f2417] hover:text-brand-600" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-[#7d6a4f]">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-full border px-2.5 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "border-emerald-600/30 bg-emerald-600/10 text-emerald-700" : "border-[#d6c194] bg-[#ffffff] text-[#7d6a4f]"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[#7d6a4f]">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-brand-600">{tk(p.price)}</span>
          <span className="text-xs font-bold text-[#7d6a4f] line-through">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_8px_24px_-8px_rgba(240, 158, 18,0.4)] transition hover:brightness-110 active:scale-[0.98]"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex w-full items-center justify-center rounded-full border border-[#d6c194] bg-[#ffffff] px-4 py-2 text-xs font-black uppercase tracking-wider text-brand-600 transition hover:border-brand-400/50 hover:bg-brand-400/10 active:scale-[0.98]"
        >
          View →
        </button>
      </div>
      {/* price row keeps its spacing; neon edge lives at the top */}
    </motion.div>
  );
}
