"use client";

import type { FormEvent } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

type NewsletterProps = {
  email: string;
  onEmailChange: (value: string) => void;
  subscribed: boolean;
  onSubscribe: (e: FormEvent) => void;
};

export default function Newsletter({ email, onEmailChange, subscribed, onSubscribe }: NewsletterProps) {
  return (
    <Reveal>
      <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-950 p-8 text-white shadow-xl shadow-slate-950/25 sm:p-10">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-400/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="relative">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">Newsletter</span>
          <h2 className="mt-2 text-2xl font-black leading-tight tracking-tight sm:text-[1.75rem]">Get Exclusive Deals 🎁</h2>
          <p className="mt-2.5 text-sm leading-relaxed text-emerald-50/90">Newsletter-e join korun — notun product, flash sale ar secret discount code age paben.</p>
          {subscribed ? (
            <p className="mt-5 rounded-2xl bg-white/15 p-4 font-bold text-white ring-1 ring-white/25">✅ Subscribed! Welcome to GadZone BD family.</p>
          ) : (
            <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={onSubscribe}>
              <input type="email" required value={email} onChange={(e) => onEmailChange(e.target.value)} placeholder="Your email address" className="flex-1 rounded-full bg-white/10 px-5 py-3.5 text-sm text-white outline-none ring-1 ring-white/20 placeholder:text-emerald-100/70 transition focus:bg-white/15 focus:ring-2 focus:ring-white/60" />
              <motion.button whileTap={{ scale: 0.96 }} className="rounded-full bg-white px-6 py-3 font-bold text-slate-900 shadow-lg transition hover:bg-emerald-50 active:scale-[0.98]">Subscribe</motion.button>
            </form>
          )}
          <p className="mt-3.5 text-xs text-emerald-100/80">No spam, only deals. Unsubscribe anytime.</p>
        </div>
      </div>
    </Reveal>
  );
}
