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
    <div className="flex flex-col justify-center rounded-3xl bg-navy p-8 text-white">
      <h2 className="text-2xl font-black">Get Exclusive Deals 🎁</h2>
      <p className="mt-2 text-sm text-gray-300">Newsletter-e join korun — notun product, flash sale ar secret discount code age paben.</p>
      {subscribed ? (
        <p className="mt-5 rounded-xl bg-green-500/20 p-4 font-bold text-green-300">✅ Subscribed! Welcome to GadZone BD family.</p>
      ) : (
        <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={onSubscribe}>
          <input type="email" required value={email} onChange={(e) => onEmailChange(e.target.value)} placeholder="Your email address" className="flex-1 rounded-full bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-brand" />
          <button className="rounded-full bg-brand px-6 py-3 font-bold hover:bg-brand-dark">Subscribe</button>
        </form>
      )}
      <p className="mt-3 text-xs text-gray-400">No spam, only deals. Unsubscribe anytime.</p>
    </div>
  );
}
