"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function WhyShop() {
  return (
    <section className="border-y border-slate-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600">Why Us</span>
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
                className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-6 text-center shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg hover:shadow-slate-900/5 sm:p-7"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-3xl shadow-sm ring-1 ring-violet-200/70">{f.e}</span><h3 className="mt-4 text-[15px] font-bold tracking-tight text-slate-900">{f.t}</h3><p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
