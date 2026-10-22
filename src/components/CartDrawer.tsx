"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CartDetailed } from "@/types";
import { tk } from "@/lib/format";
import ProductImage from "./ProductImage";

type CartDrawerProps = {
  open: boolean;
  cartDetailed: CartDetailed[];
  cartCount: number;
  promo: string;
  promoMsg: string;
  subtotal: number;
  discountAmt: number;
  delivery: number;
  total: number;
  district: string;
  onClose: () => void;
  onQtyChange: (id: number, qty: number) => void;
  onPromoChange: (value: string) => void;
  onApplyPromo: () => void;
  onCheckout: () => void;
};

export default function CartDrawer({ open, cartDetailed, cartCount, promo, promoMsg, subtotal, discountAmt, delivery, total, district, onClose, onQtyChange, onPromoChange, onApplyPromo, onCheckout }: CartDrawerProps) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[#4a2c17] bg-[#1b1f3b] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#4a2c17] px-5 py-4"><h3 className="text-lg font-black tracking-tight text-[#22d3ee]">🛒 Your Cart ({cartCount})</h3><button onClick={onClose} className="rounded-full px-2 text-2xl text-[#e9d8c4] transition hover:bg-[#4a2c17] hover:text-brand-400">×</button></div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {cartDetailed.length === 0 ? (
                <p className="mt-10 text-center text-[#e9d8c4]">Your cart is empty 🛍️<br /><button onClick={onClose} className="mt-3 font-bold text-brand-400">Continue Shopping →</button></p>
              ) : cartDetailed.map((i) => (
                <div key={i.id} className="mb-3 flex gap-3 rounded-lg border border-[#4a2c17] bg-[#4a2c17] p-3 shadow-sm">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md ring-1 ring-[#4a2c17]"><ProductImage product={i} /></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold tracking-tight text-[#22d3ee]">{i.name}</p>
                    <p className="text-sm font-extrabold text-brand-400">{tk(i.price)}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex items-center rounded-full border border-[#4a2c17] bg-[#4a2c17] text-[#e9d8c4]"><button onClick={() => onQtyChange(i.id, i.qty - 1)} className="px-2.5 py-0.5">−</button><span className="w-6 text-center text-sm font-bold">{i.qty}</span><button onClick={() => onQtyChange(i.id, i.qty + 1)} className="px-2.5 py-0.5">+</button></div>
                      <span className="text-sm font-bold text-[#22d3ee]">= {tk(i.price * i.qty)}</span>
                      <button onClick={() => onQtyChange(i.id, 0)} className="ml-auto text-red-500 text-sm">🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cartDetailed.length > 0 && (
              <div className="border-t border-[#4a2c17] bg-[#4a2c17] p-4 sm:p-5">
                <div className="mb-3 flex gap-2"><input value={promo} onChange={(e) => onPromoChange(e.target.value)} placeholder="Promo code (try GADZONE10)" className="flex-1 rounded-full border border-[#4a2c17] bg-[#4a2c17] px-4 py-2.5 text-sm text-[#22d3ee] shadow-sm outline-none transition placeholder:text-[#64748b] focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30" /><button onClick={onApplyPromo} className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-5 py-2.5 text-sm font-bold text-brand-950 shadow-sm transition hover:brightness-110 active:scale-[0.98]">Apply</button></div>
                {promoMsg && <p className="mb-2 text-xs font-semibold text-[#e9d8c4]">{promoMsg}</p>}
                <div className="space-y-1 text-sm text-[#e9d8c4]"><div className="flex justify-between"><span>Subtotal</span><span className="font-bold">{tk(subtotal)}</span></div>
                {discountAmt > 0 && <div className="flex justify-between text-brand-400"><span>Promo discount</span><span className="font-bold">−{tk(discountAmt)}</span></div>}
                <div className="flex justify-between"><span>Delivery ({district})</span><span className="font-bold">{delivery === 0 ? "FREE 🎉" : tk(delivery)}</span></div>
                <div className="flex justify-between border-t border-[#4a2c17] pt-2 text-base font-black text-[#22d3ee]"><span>Total</span><span className="text-brand-400">{tk(total)}</span></div></div>
                {subtotal - discountAmt < 2000 && <p className="mt-2 rounded-md bg-brand-400/10 p-2.5 text-center text-xs font-semibold text-brand-400 ring-1 ring-brand-400/30">Add {tk(2000 - (subtotal - discountAmt))} more for FREE delivery! 🚚</p>}
                <motion.button whileTap={{ scale: 0.98 }} onClick={onCheckout} className="mt-3 w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 py-3 font-bold text-brand-950 shadow-[0_10px_28px_-8px_rgba(124, 58, 237, 0.4)] transition hover:brightness-110 active:scale-[0.99]">Proceed to Checkout →</motion.button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
