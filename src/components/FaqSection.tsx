"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const FAQS = [
  { q: "Cash on Delivery ki available?", a: "Ha! Puro Bangladesh-e Cash on Delivery available. Product hate peye tarpor payment korben." },
  { q: "Delivery koto din lage?", a: "Dhakar vitore 24–48 ghonta, Dhakar baire 2–4 working days. Sob order-e tracking deya hoy." },
  { q: "Warranty ache?", a: "Ha, sob product-e minimum 7 diner replacement warranty ache. Kichu product-e 6–12 masher service warranty ache." },
  { q: "Return / exchange kora jabe?", a: "Product-e problem thakle delivery-r 7 diner moddhe easy return ba exchange kora jabe." },
  { q: "bKash / Nagad diye payment kora jabe?", a: "Ha — bKash, Nagad, Card ebong Cash on Delivery — sob payment method accepted." },
];

type FaqSectionProps = {
  openFaq: number | null;
  onToggleFaq: (index: number | null) => void;
};

export default function FaqSection({ openFaq, onToggleFaq }: FaqSectionProps) {
  const reduce = useReducedMotion();
  return (
    <Reveal>
      <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Need Help?</span>
      <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-[#f5ead9] sm:text-[2rem]">❓ Frequently Asked Questions</h2>
      <div className="mt-5 space-y-3">
        {FAQS.map((f, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-[#4a3524] bg-[#221a14] shadow-sm backdrop-blur-sm">
            <button onClick={() => onToggleFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[15px] font-bold tracking-tight text-[#f5ead9] transition hover:bg-[#221a14] sm:px-6">{f.q}<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-400/15 text-base text-brand-600">{openFaq === i ? "−" : "+"}</span></button>
            <AnimatePresence initial={false}>
              {openFaq === i && (
                <motion.div
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="bg-[#221a14] px-5 pb-4 pt-1 text-sm leading-relaxed text-[#c4ab8a] sm:px-6">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
