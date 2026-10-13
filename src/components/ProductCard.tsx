"use client";

import type { Product } from "@/data/products";
import { tk, discountPct } from "@/lib/format";
import ProductImage from "./ProductImage";
import Stars from "./Stars";

type ProductCardProps = {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (id: number) => void;
};

export default function ProductCard({ product: p, onQuickView, onAddToCart }: ProductCardProps) {
  return (
    <div key={p.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-xl hover:-translate-y-1">
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onQuickView(p)}>
        <ProductImage product={p} />
        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">-{discountPct(p)}%</span>
        {p.badge && <span className="absolute right-3 top-3 rounded-full bg-navy px-2.5 py-1 text-xs font-bold text-white">{p.badge}</span>}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-brand">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug text-navy hover:text-brand" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1.5"><Stars rating={p.rating} /><span className="text-xs text-gray-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-full px-2 py-0.5 text-[11px] font-semibold ${p.stock === "In Stock" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] text-gray-500">{p.desc}</p>
        <div className="mt-auto flex items-end gap-2 pt-2">
          <span className="text-lg font-extrabold text-brand">{tk(p.price)}</span>
          <span className="text-sm text-gray-400 line-through">{tk(p.oldPrice)}</span>
        </div>
        <div className="mt-2 flex gap-2">
          <button onClick={() => onAddToCart(p.id)} className="flex-1 rounded-full bg-brand py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark">Add to Cart</button>
          <button onClick={() => onQuickView(p)} className="rounded-full border border-gray-200 px-3.5 text-sm font-semibold hover:border-brand hover:text-brand">👁️</button>
        </div>
      </div>
    </div>
  );
}
