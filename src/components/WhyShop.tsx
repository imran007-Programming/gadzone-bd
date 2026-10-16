"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function WhyShop() {
  return (
    <section className="border-y border-rose-100 bg-gradient-to-b from-white to-rose-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-700">Why Us</span>
          <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">Why Shop With GadZone BD?</h2>
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
                className="rounded-2xl border border-rose-100 bg-rose-50/60 p-6 text-center shadow-sm ring-1 ring-rose-100/60 transition-all hover:shadow-lg hover:shadow-zinc-900/10 sm:p-7"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-3xl shadow-sm ring-1 ring-rose-300/70">{f.e}</span><h3 className="mt-4 text-[15px] font-bold tracking-tight text-slate-900">{f.t}</h3><p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
