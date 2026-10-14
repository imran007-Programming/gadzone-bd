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
      <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl bg-[#032726] p-8 text-white shadow-2xl shadow-teal-950/40 ring-1 ring-teal-200/15 sm:p-10">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-500/30 blur-3xl" />
        <div className="relative">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Newsletter</span>
          <h2 className="mt-2 text-2xl font-black leading-tight tracking-tight sm:text-[1.75rem]">Get Exclusive Deals 🎁</h2>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-300">Newsletter-e join korun — notun product, flash sale ar secret discount code age paben.</p>
          {subscribed ? (
            <p className="mt-5 rounded-2xl bg-teal-500/20 p-4 font-bold text-teal-300 ring-1 ring-teal-400/30">✅ Subscribed! Welcome to GadZone BD family.</p>
          ) : (
            <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={onSubscribe}>
              <input type="email" required value={email} onChange={(e) => onEmailChange(e.target.value)} placeholder="Your email address" className="flex-1 rounded-full bg-white/10 px-5 py-3.5 text-sm text-white outline-none ring-1 ring-white/15 placeholder:text-slate-400 transition focus:bg-white/15 focus:ring-2 focus:ring-teal-400" />
              <motion.button whileTap={{ scale: 0.96 }} className="rounded-full bg-teal-600 px-6 py-3 font-bold shadow-lg shadow-teal-600/30 transition hover:bg-teal-500 active:scale-[0.98]">Subscribe</motion.button>
            </form>
          )}
          <p className="mt-3.5 text-xs text-slate-400/90">No spam, only deals. Unsubscribe anytime.</p>
        </div>
      </div>
    </Reveal>
  );
}
