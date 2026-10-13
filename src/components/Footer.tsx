"use client";

import { CATEGORIES } from "@/data/products";

type FooterProps = {
  onCategoryChange: (category: string) => void;
};

const EXPLORE_LINKS: { label: string; target: string | "top" }[] = [
  { label: "About Us", target: "top" },
  { label: "Shop by Brand", target: "shop" },
  { label: "Blog", target: "shop" },
  { label: "Contact Us", target: "contact" },
  { label: "Reviews", target: "shop" },
];

const SUPPORT_LINKS = ["Return & Warranty", "Shipping & Delivery", "EMI Facility", "Terms & Conditions", "Privacy Policy"];

export default function Footer({ onCategoryChange }: FooterProps) {
  const scrollTo = (target: string | "top") => {
    if (target === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer id="contact" className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-2xl font-black text-white">Gad<span className="text-violet-500">Zone</span> BD</p>
        <p className="mt-2 max-w-xl text-sm text-slate-400">
          Discover original gadgets, smart devices, audio products, mobile accessories and electronics at competitive prices with nationwide delivery across Bangladesh.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600/20 text-xl">💬</span>
            <div>
              <p className="text-xs text-slate-400">WhatsApp</p>
              <p className="font-bold text-white">+880 1700-000000</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600/20 text-xl">📞</span>
            <div>
              <p className="text-xs text-slate-400">Customer Care</p>
              <p className="font-bold text-white">+880 1700-000000</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Explore</p>
            <h3 className="mt-1 text-lg font-black text-white">GadZone BD</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <button onClick={() => scrollTo(link.target)} className="hover:text-violet-400">› {link.label}</button>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-slate-400">Categories</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {CATEGORIES.filter((c) => c !== "All").map((c) => (
                <button key={c} onClick={() => { onCategoryChange(c); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold hover:bg-violet-600 hover:text-white">{c}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Support</p>
            <h3 className="mt-1 text-lg font-black text-white">Customer Care</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {SUPPORT_LINKS.map((link) => (
                <li key={link}>
                  <button onClick={() => scrollTo("faq")} className="hover:text-violet-400">› {link}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Get in Touch</p>
            <h3 className="mt-1 text-lg font-black text-white">We&apos;re Here to Help</h3>
            <div className="mt-3 rounded-2xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">Warranty Support</p>
              <p className="mt-1 font-bold text-white">📞 +880 1700-000000</p>
              <p className="mt-1 text-sm">✉️ hello@gadzonebd.example</p>
              <p className="mt-1 text-sm">📍 Dhaka, Bangladesh</p>
            </div>
            <p className="mt-4 text-sm font-bold text-white">We Accept</p>
            <div className="mt-2 flex flex-wrap gap-2">{["bKash", "Nagad", "Rocket", "Visa", "Mastercard", "COD"].map((p) => <span key={p} className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold">{p}</span>)}</div>
            <p className="mt-3 text-xs text-slate-400">100% secure payments</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs">© 2026 GadZone BD — All rights reserved. Made with ❤️ in Bangladesh.</div>
    </footer>
  );
}
