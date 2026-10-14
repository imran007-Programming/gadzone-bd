"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/data/products";
import { tk, discountPct } from "@/lib/format";
import ProductImage from "./ProductImage";
import Stars from "./Stars";

type QuickViewModalProps = {
  product: Product | null;
  qty: number;
  onQtyChange: (qty: number) => void;
  onClose: () => void;
  onAddToCart: (id: number, qty: number, buyNow?: boolean) => void;
  district: string;
};

export default function QuickViewModal({ product, qty, onQtyChange, onClose, onAddToCart, district }: QuickViewModalProps) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 overflow-y-auto">
              <div className="grid sm:grid-cols-2">
                <div className="relative"><ProductImage product={product} big /><span className="absolute left-0 top-3 -skew-x-6 rounded-r-md bg-orange-600 px-3 py-1 text-xs font-black text-white shadow-md">-{discountPct(product)}% OFF</span></div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-2"><h3 className="text-xl font-black tracking-tight">{product.name}</h3><button onClick={onClose} className="text-2xl leading-none text-gray-400 hover:text-slate-900">×</button></div>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-orange-600">{product.category}</p>
                  <div className="mt-2 flex items-center gap-1.5"><Stars rating={product.rating} /><span className="text-sm text-gray-500">{product.rating} ({product.reviews.toLocaleString()} reviews)</span></div>
                  <p className="mt-3 text-sm text-gray-600">{product.desc}</p>
                  <ul className="mt-3 space-y-1">{product.specs.map((s) => <li key={s} className="text-sm text-gray-600">✓ {s}</li>)}</ul>
                  <div className="mt-4 flex items-end gap-2"><span className="text-2xl font-extrabold tracking-tight text-orange-600">{tk(product.price)}</span><span className="text-gray-400 line-through">{tk(product.oldPrice)}</span><span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-bold text-green-700 ring-1 ring-green-100">You save {tk(product.oldPrice - product.price)}</span></div>
                  <p className="mt-3 text-xs text-gray-500">🚚 {district === "Dhaka" ? "Inside Dhaka: ৳60" : "Outside Dhaka: ৳120"} · Free over ৳2,000 · 7-day replacement warranty</p>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 flex items-center gap-3 border-t border-slate-100 bg-white p-3 sm:p-4">
              <div className="flex shrink-0 items-center rounded-full border border-slate-200 bg-slate-50">
                <button onClick={() => onQtyChange(Math.max(1, qty - 1))} className="px-3 py-2 text-lg" aria-label="Decrease quantity">−</button>
                <span className="w-8 text-center font-bold">{qty}</span>
                <button onClick={() => onQtyChange(qty + 1)} className="px-3 py-2 text-lg" aria-label="Increase quantity">+</button>
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => onAddToCart(product.id, qty)} className="flex-1 rounded-full bg-orange-600 py-3 font-bold text-white shadow-md shadow-orange-600/25 transition hover:bg-orange-700 active:scale-[0.99]">Add To Cart</motion.button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => onAddToCart(product.id, qty, true)} className="shrink-0 rounded-lg bg-[#1c0a00] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700 active:scale-[0.98]">Buy Now</motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
