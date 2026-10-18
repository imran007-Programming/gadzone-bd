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
    <footer id="contact" className="relative overflow-hidden bg-[#f4ead2] text-brand-100/70">
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-brand-500/15 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-brand-400/10 blur-[90px]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="text-2xl font-black tracking-tight text-[#2f2417]">Gad<span className="text-brand-600">Zone</span> BD</p>
        <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[#7d6a4f]">
          Discover original gadgets, smart devices, audio products, mobile accessories and electronics at competitive prices with nationwide delivery across Bangladesh.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-[#e3d2ab] bg-[#ffffff] p-4 shadow-[0_10px_30px_-12px_rgba(240, 158, 18,0.25)]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-500/15 text-xl ring-1 ring-brand-400/30">💬</span>
            <div>
              <p className="text-xs text-[#7d6a4f]">WhatsApp</p>
              <p className="font-bold text-[#2f2417]">+880 1700-000000</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[#e3d2ab] bg-[#ffffff] p-4 shadow-[0_10px_30px_-12px_rgba(240, 158, 18,0.25)]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-500/15 text-xl ring-1 ring-brand-400/30">📞</span>
            <div>
              <p className="text-xs text-[#7d6a4f]">Customer Care</p>
              <p className="font-bold text-[#2f2417]">+880 1700-000000</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">Explore</p>
            <h3 className="mt-1.5 text-lg font-black tracking-tight text-[#2f2417]">GadZone BD</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <button onClick={() => scrollTo(link.target)} className="transition hover:text-brand-600">› {link.label}</button>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-[#7d6a4f]">Categories</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {CATEGORIES.filter((c) => c !== "All").map((c) => (
                <button key={c} onClick={() => { onCategoryChange(c); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="rounded-full bg-[#f4eddc] px-3 py-1.5 text-xs font-semibold ring-1 ring-[#e3d2ab] transition hover:bg-brand-600 hover:text-white">{c}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">Support</p>
            <h3 className="mt-1.5 text-lg font-black tracking-tight text-[#2f2417]">Customer Care</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {SUPPORT_LINKS.map((link) => (
                <li key={link}>
                  <button onClick={() => scrollTo("faq")} className="transition hover:text-brand-600">› {link}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">Get in Touch</p>
            <h3 className="mt-1.5 text-lg font-black tracking-tight text-[#2f2417]">We&apos;re Here to Help</h3>
            <div className="mt-3 rounded-2xl border border-[#e3d2ab] bg-[#ffffff] p-5 shadow-[0_10px_30px_-12px_rgba(240, 158, 18,0.25)]">
              <p className="text-xs text-[#7d6a4f]">Warranty Support</p>
              <p className="mt-1 font-bold text-[#2f2417]">📞 +880 1700-000000</p>
              <p className="mt-1 text-sm">✉️ hello@gadzonebd.example</p>
              <p className="mt-1 text-sm">📍 Dhaka, Bangladesh</p>
            </div>
            <p className="mt-4 text-sm font-bold text-[#2f2417]">We Accept</p>
            <div className="mt-2 flex flex-wrap gap-2">{["bKash", "Nagad", "Rocket", "Visa", "Mastercard", "COD"].map((p) => <span key={p} className="rounded-full bg-[#f4eddc] px-3 py-1.5 text-xs font-bold ring-1 ring-[#e3d2ab]">{p}</span>)}</div>
            <p className="mt-3 text-xs text-[#7d6a4f]">100% secure payments</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#e3d2ab] py-5 text-center text-xs text-[#7d6a4f]">© 2026 GadZone BD — All rights reserved. Made with ❤️ in Bangladesh.</div>
    </footer>
  );
}
