"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function WhyShop() {
  return (
    <section className="relative overflow-hidden border-y border-[#e3efec] bg-gradient-to-b from-[#fcffff] to-[#f2faf9] py-16 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-500/12 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-brand-400/10 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-800">Why Us</span>
          <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-[#12262b] sm:text-4xl">Why Shop With GadZone BD?</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { e: "💵", t: "Cash on Delivery", d: "Product hate peye payment korun. No advance needed." },
            { e: "🚚", t: "Fast Delivery", d: "Dhaka-te 24–48h, baire 2–4 din. 64 zela coverage." },
            { e: "🛡️", t: "Warranty", d: "Sob product-e 7 din replacement + service warranty." },
            { e: "↩️", t: "Easy Return", d: "Problem hole 7 diner moddhe easy return / exchange." },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-[#e3efec] bg-[#fcffff] p-6 text-center shadow-[0_12px_36px_-12px_rgba(18,38,43,0.2)] backdrop-blur-sm transition-all hover:border-brand-400/40 hover:shadow-[0_16px_44px_-12px_rgba(15,118,110,0.35)] sm:p-7"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-400/15 text-3xl shadow-[0_0_24px_rgba(15,118,110,0.25)] ring-1 ring-brand-400/40">{f.e}</span><h3 className="mt-4 text-[15px] font-bold tracking-tight text-[#12262b]">{f.t}</h3><p className="mt-1.5 text-sm leading-relaxed text-[#52707a]">{f.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
