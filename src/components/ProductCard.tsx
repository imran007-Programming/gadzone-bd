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
    <div key={p.id} className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-2 hover:ring-emerald-600/40">
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onQuickView(p)}>
        <ProductImage product={p} />
        <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-slate-950 shadow">-{discountPct(p)}%</span>
        {p.badge && <span className="absolute right-3 top-3 rounded-full bg-slate-950 px-2.5 py-1 text-xs font-bold text-white shadow">{p.badge}</span>}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">{p.category}</span>
        <h3 className="cursor-pointer text-[15px] font-bold leading-snug text-slate-900 hover:text-emerald-600" onClick={() => onQuickView(p)}>{p.name}</h3>
        <div className="flex items-center gap-1.5"><Stars rating={p.rating} /><span className="text-xs text-slate-500">{p.rating} ({p.reviews.toLocaleString()})</span></div>
        <span className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${p.stock === "In Stock" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}</span>
        <p className="line-clamp-2 text-[13px] text-slate-500">{p.desc}</p>
        <div className="mt-auto flex items-end gap-2 pt-2">
          <span className="text-xl font-extrabold text-slate-900">{tk(p.price)}</span>
          <span className="text-sm text-slate-400 line-through">{tk(p.oldPrice)}</span>
          <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">Save {tk(p.oldPrice - p.price)}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={() => onAddToCart(p.id)} className="flex-1 rounded-full bg-emerald-600 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700">Add to Cart</button>
          <button onClick={() => onQuickView(p)} className="rounded-full border border-slate-200 px-3.5 text-sm font-semibold hover:border-emerald-600 hover:text-emerald-600">👁️</button>
        </div>
      </div>
    </div>
  );
}
