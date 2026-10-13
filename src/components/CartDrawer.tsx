"use client";

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
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-4"><h3 className="text-lg font-black">🛒 Your Cart ({cartCount})</h3><button onClick={onClose} className="text-2xl text-gray-400">×</button></div>
        <div className="flex-1 overflow-y-auto p-4">
          {cartDetailed.length === 0 ? (
            <p className="mt-10 text-center text-gray-500">Your cart is empty 🛍️<br /><button onClick={onClose} className="mt-3 font-bold text-emerald-600">Continue Shopping →</button></p>
          ) : cartDetailed.map((i) => (
            <div key={i.id} className="mb-3 flex gap-3 rounded-3xl border border-slate-200 p-3">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl"><ProductImage product={i} /></div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{i.name}</p>
                <p className="text-sm font-extrabold text-emerald-600">{tk(i.price)}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex items-center rounded-full border"><button onClick={() => onQtyChange(i.id, i.qty - 1)} className="px-2.5 py-0.5">−</button><span className="w-6 text-center text-sm font-bold">{i.qty}</span><button onClick={() => onQtyChange(i.id, i.qty + 1)} className="px-2.5 py-0.5">+</button></div>
                  <span className="text-sm font-bold">= {tk(i.price * i.qty)}</span>
                  <button onClick={() => onQtyChange(i.id, 0)} className="ml-auto text-red-500 text-sm">🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartDetailed.length > 0 && (
          <div className="border-t p-4">
            <div className="mb-3 flex gap-2"><input value={promo} onChange={(e) => onPromoChange(e.target.value)} placeholder="Promo code (try GADZONE10)" className="flex-1 rounded-full border px-4 py-2 text-sm outline-none focus:border-emerald-600" /><button onClick={onApplyPromo} className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">Apply</button></div>
            {promoMsg && <p className="mb-2 text-xs font-semibold">{promoMsg}</p>}
            <div className="space-y-1 text-sm"><div className="flex justify-between"><span>Subtotal</span><span className="font-bold">{tk(subtotal)}</span></div>
            {discountAmt > 0 && <div className="flex justify-between text-green-600"><span>Promo discount</span><span className="font-bold">−{tk(discountAmt)}</span></div>}
            <div className="flex justify-between"><span>Delivery ({district})</span><span className="font-bold">{delivery === 0 ? "FREE 🎉" : tk(delivery)}</span></div>
            <div className="flex justify-between border-t pt-2 text-base font-black"><span>Total</span><span className="text-emerald-600">{tk(total)}</span></div></div>
            {subtotal - discountAmt < 2000 && <p className="mt-2 rounded-lg bg-emerald-50 p-2 text-center text-xs font-semibold text-emerald-700">Add {tk(2000 - (subtotal - discountAmt))} more for FREE delivery! 🚚</p>}
            <button onClick={onCheckout} className="mt-3 w-full rounded-full bg-emerald-600 py-3 font-bold text-white hover:bg-emerald-700">Proceed to Checkout →</button>
          </div>
        )}
      </div>
    </div>
  );
}
