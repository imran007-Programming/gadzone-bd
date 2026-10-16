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
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-neutral-950 bg-white shadow-[5px_5px_0_#eab308] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[7px_7px_0_#eab308]"
    >
      <div className="relative bg-gradient-to-b from-yellow-100 via-yellow-50/60 to-white">
        <div className="relative cursor-pointer overflow-hidden" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-md border-2 border-neutral-950 bg-yellow-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-neutral-950 shadow-md">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-lg border-2 border-yellow-400 bg-neutral-950 px-2.5 py-1 text-[11px] font-black text-yellow-400 shadow-lg">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1.5 px-5 pb-5 pt-2 text-center">
        <span className="rounded-md border-2 border-neutral-950 bg-yellow-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-neutral-950">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-neutral-900 hover:text-yellow-700" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-neutral-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-sm px-3 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300" : "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-300"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-neutral-500">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-neutral-950">{tk(p.price)}</span>
          <span className="rounded-sm bg-yellow-400/20 px-2.5 py-1 text-xs font-bold text-yellow-700 line-through decoration-yellow-600">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex items-center justify-center gap-1.5 rounded-lg border-2 border-neutral-950 bg-yellow-400 px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-950 shadow-[3px_3px_0_#09090b] transition hover:bg-yellow-300 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex items-center justify-center rounded-lg border-2 border-neutral-950 bg-white px-4 py-3 text-xs font-black uppercase tracking-wider text-neutral-950 shadow-[3px_3px_0_#09090b] transition hover:bg-yellow-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
