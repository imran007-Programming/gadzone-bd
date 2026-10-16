"use client";

import type { FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DISTRICTS } from "@/data/products";
import type { CheckoutForm, PayMethod } from "@/types";
import { tk } from "@/lib/format";

type CheckoutModalProps = {
  open: boolean;
  orderPlaced: boolean;
  orderId: string;
  form: CheckoutForm;
  district: string;
  payMethod: PayMethod;
  subtotal: number;
  discountAmt: number;
  delivery: number;
  total: number;
  onClose: () => void;
  onFormChange: (field: keyof CheckoutForm, value: string) => void;
  onDistrictChange: (district: string) => void;
  onPayMethodChange: (method: PayMethod) => void;
  onPlaceOrder: (e: FormEvent) => void;
  onContinueShopping: () => void;
};

export default function CheckoutModal({ open, orderPlaced, orderId, form, district, payMethod, subtotal, discountAmt, delivery, total, onClose, onFormChange, onDistrictChange, onPayMethodChange, onPlaceOrder, onContinueShopping }: CheckoutModalProps) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            {orderPlaced ? (
              <div className="py-6 text-center">
                <span className="text-6xl">🎉</span>
                <h3 className="mt-3 text-2xl font-black">Order Placed Successfully!</h3>
                <p className="mt-2 text-gray-600">Dhonnobad, {form.name}! Apnar order confirm hoyeche.</p>
                <div className="mx-auto mt-4 max-w-xs rounded-3xl bg-rose-50 p-4 ring-1 ring-rose-100"><p className="text-sm text-gray-500">Order ID</p><p className="text-2xl font-black text-rose-700">{orderId}</p><p className="mt-1 text-sm">Payment: {payMethod === "COD" ? "Cash on Delivery" : payMethod} · Delivery to {district}</p></div>
                <p className="mt-3 text-sm text-gray-500">Amra shighroi phone-e confirm korbo. Tracking link SMS-e pathano hobe.</p>
                <button onClick={onContinueShopping} className="mt-5 rounded-full bg-rose-600 px-8 py-3 font-bold text-white shadow-lg shadow-rose-600/30 transition hover:bg-rose-700 active:scale-[0.98]">Continue Shopping</button>
              </div>
            ) : (
              <form onSubmit={onPlaceOrder}>
                <div className="flex items-start justify-between"><h3 className="text-xl font-black">Checkout 🧾</h3><button type="button" onClick={onClose} className="text-2xl text-gray-400">×</button></div>
                <label className="mt-4 block text-sm font-bold">Full Name *</label>
                <input required value={form.name} onChange={(e) => onFormChange("name", e.target.value)} placeholder="e.g. Imran Hasan" className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition focus:border-rose-600 focus:ring-2 focus:ring-rose-600/20" />
                <label className="mt-3 block text-sm font-bold">Phone Number *</label>
                <input required type="tel" value={form.phone} onChange={(e) => onFormChange("phone", e.target.value)} placeholder="01XXXXXXXXX" className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition focus:border-rose-600 focus:ring-2 focus:ring-rose-600/20" />
                <label className="mt-3 block text-sm font-bold">District *</label>
                <select value={district} onChange={(e) => onDistrictChange(e.target.value)} className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition focus:border-rose-600 focus:ring-2 focus:ring-rose-600/20">{DISTRICTS.map((d) => <option key={d}>{d}</option>)}</select>
                <label className="mt-3 block text-sm font-bold">Full Address *</label>
                <textarea required value={form.address} onChange={(e) => onFormChange("address", e.target.value)} placeholder="House, road, area…" rows={2} className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition focus:border-rose-600 focus:ring-2 focus:ring-rose-600/20" />
                <p className="mt-4 text-sm font-bold">Payment Method</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {([["COD", "💵 Cash on Delivery"], ["bKash", "📱 bKash"], ["Nagad", "🟠 Nagad"], ["Card", "💳 Card"]] as [PayMethod, string][]).map(([v, label]) => (
                    <label key={v} className={`cursor-pointer rounded-2xl border px-3 py-2.5 text-sm font-semibold transition ${payMethod === v ? "border-rose-600 bg-rose-50 text-rose-600 shadow-sm ring-1 ring-rose-200" : "border-slate-200 hover:border-rose-300"}`}>
                      <input type="radio" name="pay" checked={payMethod === v} onChange={() => onPayMethodChange(v)} className="mr-2 accent-rose-600" />{label}
                    </label>
                  ))}
                </div>
                {payMethod !== "COD" && <p className="mt-2 rounded-lg bg-blue-50 p-2.5 text-xs text-blue-700">Demo checkout — {payMethod} payment is simulated. No real money is charged.</p>}
                <div className="mt-4 space-y-1 rounded-2xl bg-slate-50 p-4 text-sm ring-1 ring-slate-100">
                  <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">{tk(subtotal)}</span></div>
                  {discountAmt > 0 && <div className="flex justify-between text-rose-600"><span>Promo discount</span><span>−{tk(discountAmt)}</span></div>}
                  <div className="flex justify-between"><span>Delivery</span><span className="font-bold">{delivery === 0 ? "FREE" : tk(delivery)}</span></div>
                  <div className="flex justify-between border-t pt-2 text-base font-black"><span>Total</span><span className="text-rose-600">{tk(total)}</span></div>
                </div>
                <motion.button whileTap={{ scale: 0.98 }} type="submit" className="mt-4 w-full rounded-full bg-rose-600 py-3.5 font-bold text-white shadow-lg shadow-rose-600/30 transition hover:bg-rose-700 active:scale-[0.99]">Place Order • {tk(total)} →</motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
