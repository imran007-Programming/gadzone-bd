"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type HelpSheetProps = {
  open: boolean;
  onClose: () => void;
  onViewAllFaq: () => void;
};

const QUICK_FAQS = [
  { q: "Cash on Delivery ki available?", a: "Ha! Puro Bangladesh-e Cash on Delivery available. Product hate peye tarpor payment korben." },
  { q: "Delivery koto din lage?", a: "Dhakar vitore 24–48 ghonta, Dhakar baire 2–4 working days." },
  { q: "Warranty ache?", a: "Ha, sob product-e minimum 7 diner replacement warranty ache." },
];

export default function HelpSheet({ open, onClose, onViewAllFaq }: HelpSheetProps) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { y: "100%" }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" />
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-black text-slate-900">How can we help?</h3>
              <button onClick={onClose} className="text-2xl leading-none text-slate-400 hover:text-slate-900" aria-label="Close help sheet">×</button>
            </div>
            <div className="mt-4 space-y-3">
              {QUICK_FAQS.map((f) => (
                <div key={f.q} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                  <p className="font-bold text-slate-900">{f.q}</p>
                  <p className="mt-1 text-sm text-slate-500">{f.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-green-50 p-4 ring-1 ring-green-100">
              <p className="font-bold text-slate-900">Still need help?</p>
              <p className="mt-1 text-sm text-slate-600">📞 +880 1700-000000<br />✉️ hello@gadzonebd.example</p>
            </div>
            <button
              onClick={onViewAllFaq}
              className="mt-4 w-full rounded-full bg-green-600 py-3 font-bold text-white shadow-lg shadow-green-600/30 transition hover:bg-green-700 active:scale-[0.99]"
            >
              View all FAQs
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
