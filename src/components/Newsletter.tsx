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
      <div className="relative flex flex-col justify-center overflow-hidden rounded-lg bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-8 text-white shadow-xl shadow-brand-900/30 sm:p-10">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#eaf7ef]/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-brand-500/30 blur-3xl" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1.5px)] [background-size:22px_22px]"
        />
        <div className="relative">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-100">Newsletter</span>
          <h2 className="mt-2 text-2xl font-black leading-tight tracking-tight sm:text-[1.75rem]">Get Exclusive Deals 🎁</h2>
          <p className="mt-2.5 text-sm leading-relaxed text-white/90">Newsletter-e join korun — notun product, flash sale ar secret discount code age paben.</p>
          {subscribed ? (
            <p className="mt-5 rounded-lg bg-[#eaf7ef]/15 p-4 font-bold text-white ring-1 ring-white/25">✅ Subscribed! Welcome to GadZone BD family.</p>
          ) : (
            <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={onSubscribe}>
              <input type="email" required value={email} onChange={(e) => onEmailChange(e.target.value)} placeholder="Your email address" className="flex-1 rounded-full bg-[#04241a] px-5 py-3.5 text-sm text-[#eaf7ef] outline-none ring-1 ring-white/40 placeholder:text-[#8ea89b] transition focus:ring-2 focus:ring-white/80" />
              <motion.button whileTap={{ scale: 0.96 }} className="rounded-full bg-[#022c22] px-6 py-3 font-bold text-[#a3e635] shadow-lg ring-1 ring-[#a3e635]/40 transition hover:bg-[#04241a] active:scale-[0.98]">Subscribe</motion.button>
            </form>
          )}
          <p className="mt-3.5 text-xs text-white/80">No spam, only deals. Unsubscribe anytime.</p>
        </div>
      </div>
    </Reveal>
  );
}
