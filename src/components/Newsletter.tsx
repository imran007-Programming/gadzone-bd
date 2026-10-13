"use client";

import type { FormEvent } from "react";

type NewsletterProps = {
  email: string;
  onEmailChange: (value: string) => void;
  subscribed: boolean;
  onSubscribe: (e: FormEvent) => void;
};

export default function Newsletter({ email, onEmailChange, subscribed, onSubscribe }: NewsletterProps) {
  return (
    <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/30 blur-3xl" />
      <div className="relative">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Newsletter</span>
        <h2 className="mt-1 text-2xl font-black tracking-tight">Get Exclusive Deals 🎁</h2>
        <p className="mt-2 text-sm text-slate-300">Newsletter-e join korun — notun product, flash sale ar secret discount code age paben.</p>
        {subscribed ? (
          <p className="mt-5 rounded-2xl bg-emerald-500/20 p-4 font-bold text-emerald-300">✅ Subscribed! Welcome to GadZone BD family.</p>
        ) : (
          <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={onSubscribe}>
            <input type="email" required value={email} onChange={(e) => onEmailChange(e.target.value)} placeholder="Your email address" className="flex-1 rounded-full bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500" />
            <button className="rounded-full bg-emerald-600 px-6 py-3 font-bold transition hover:bg-emerald-700">Subscribe</button>
          </form>
        )}
        <p className="mt-3 text-xs text-slate-400">No spam, only deals. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}
