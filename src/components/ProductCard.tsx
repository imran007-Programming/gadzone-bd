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
      className="lagoon-glow group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-brand-700/20 bg-[#ffffff] transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* petal trail: a dotted orchid bloom running along the card's top edge */}
      <div aria-hidden className="flex items-center gap-1.5 rounded-t-[21px] bg-white px-5 pt-3">
        {["#9553c4", "#b37cd9", "#ec4c8c", "#b37cd9", "#9553c4"].map((c, i) => (
          <span key={i} className="inline-block" style={{ width: 9 - Math.abs(i - 2) * 1.5, height: 11 - Math.abs(i - 2) * 2, borderRadius: "62% 6% 62% 6%", background: `linear-gradient(135deg, ${c}, ${c}77)` }} />
        ))}
        <span className="ml-1 h-[3px] flex-1 rounded-full bg-gradient-to-r from-brand-600 via-gold to-transparent opacity-70" />
      </div>
      <div className="relative p-3">
        <div className="relative cursor-pointer overflow-hidden rounded-xl ring-2 ring-brand-700/25" onClick={() => onQuickView(p)}>
          <ProductImage product={p} />
          {p.badge === "New" && (
            <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-[0_4px_14px_-4px_rgba(101,47,134,0.8)]">New</span>
          )}
          {discountPct(p) > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-gold-deep to-gold px-2.5 py-1 text-[11px] font-black text-white shadow-[0_4px_14px_-4px_rgba(194,52,112,0.8)]">-{discountPct(p)}%</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5 px-5 pb-4 pt-1 text-left">
        <span className="rounded-full bg-gradient-to-r from-gold-deep/15 to-brand-400/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-600 ring-1 ring-gold-deep/40">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug tracking-tight text-[#2a1c33] hover:text-brand-300" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1"><Stars rating={p.rating} /><span className="text-xs font-medium text-[#7c6a7f]">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit px-2.5 py-1 text-[11px] font-bold ${p.stock === "In Stock" ? "rounded-full bg-brand-500/12 text-brand-600 ring-1 ring-brand-500/45" : "rounded-full bg-[#f0e6ef] text-[#7c6a7f] ring-1 ring-brand-400/20"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[#7c6a7f]">{p.desc}</p>
        <div className="mt-auto flex w-full items-end justify-between gap-2 pt-2.5">
          <span className="text-[22px] font-black tracking-tight text-brand-300">{tk(p.price)}</span>
          <span className="text-xs font-bold text-[#7c6a7f] line-through">{tk(p.oldPrice)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 pb-5">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(p.id)}
          aria-label={`Add ${p.name} to cart`}
          className="flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-brand-500 to-brand-700 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_10px_26px_-10px_rgba(124,58,166,0.85)] ring-1 ring-brand-800/40 transition hover:brightness-110 active:scale-[0.98]"
        >
          🛒 Add
        </motion.button>
        <button
          onClick={() => onQuickView(p)}
          className="flex w-full items-center justify-center rounded-full border-2 border-dashed border-gold-deep/70 bg-gold-soft/40 px-4 py-2 text-xs font-black uppercase tracking-wider text-gold-deep transition hover:bg-gold/15 active:scale-[0.98]"
        >
          View →
        </button>
      </div>
    </motion.div>
  );
}
