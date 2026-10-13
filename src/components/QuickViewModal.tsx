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
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid sm:grid-cols-2">
              <div className="relative"><ProductImage product={product} big /><span className="absolute left-3 top-3 rounded-full bg-amber-400 text-slate-950 px-2.5 py-1 text-xs font-bold text-white">-{discountPct(product)}% OFF</span></div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2"><h3 className="text-xl font-black">{product.name}</h3><button onClick={onClose} className="text-2xl leading-none text-gray-400 hover:text-slate-900">×</button></div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{product.category}</p>
                <div className="mt-2 flex items-center gap-1.5"><Stars rating={product.rating} /><span className="text-sm text-gray-500">{product.rating} ({product.reviews.toLocaleString()} reviews)</span></div>
                <p className="mt-3 text-sm text-gray-600">{product.desc}</p>
                <ul className="mt-3 space-y-1">{product.specs.map((s) => <li key={s} className="text-sm text-gray-600">✓ {s}</li>)}</ul>
                <div className="mt-4 flex items-end gap-2"><span className="text-2xl font-extrabold text-emerald-600">{tk(product.price)}</span><span className="text-gray-400 line-through">{tk(product.oldPrice)}</span><span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-bold text-green-700">You save {tk(product.oldPrice - product.price)}</span></div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm font-bold">Qty:</span>
                  <div className="flex items-center rounded-full border"><button onClick={() => onQtyChange(Math.max(1, qty - 1))} className="px-3 py-1.5 text-lg">−</button><span className="w-8 text-center font-bold">{qty}</span><button onClick={() => onQtyChange(qty + 1)} className="px-3 py-1.5 text-lg">+</button></div>
                </div>
                <div className="mt-5 flex gap-2">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={() => onAddToCart(product.id, qty)} className="flex-1 rounded-full bg-emerald-600 py-3 font-bold text-white hover:bg-emerald-700">Add to Cart — কার্টে যোগ করুন</motion.button>
                  <motion.button whileTap={{ scale: 0.97 }} onClick={() => onAddToCart(product.id, qty, true)} className="rounded-full bg-slate-950 px-5 py-3 font-bold text-white">Buy Now</motion.button>
                </div>
                <p className="mt-3 text-xs text-gray-500">🚚 {district === "Dhaka" ? "Inside Dhaka: ৳60" : "Outside Dhaka: ৳120"} · Free over ৳2,000 · 7-day replacement warranty</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
