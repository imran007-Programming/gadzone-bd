"use client";

import { CATEGORIES } from "@/data/products";

type FooterProps = {
  onCategoryChange: (category: string) => void;
};

export default function Footer({ onCategoryChange }: FooterProps) {
  return (
    <footer className="bg-navy text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-black text-white">Gad<span className="text-brand">Zone</span> BD</p>
          <p className="mt-2 text-sm">Gadgets in Bangladesh — original products, best price, Cash on Delivery.</p>
          <p className="mt-3 text-sm">📍 Dhaka, Bangladesh<br />📞 +880 1700-000000<br />✉️ hello@gadzonebd.example</p>
        </div>
        <div><h3 className="font-bold text-white">Shop</h3><ul className="mt-3 space-y-2 text-sm">{CATEGORIES.filter((c) => c !== "All").map((c) => <li key={c}><button onClick={() => { onCategoryChange(c); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-brand">{c}</button></li>)}</ul></div>
        <div><h3 className="font-bold text-white">Help</h3><ul className="mt-3 space-y-2 text-sm"><li>Track Order</li><li>Delivery Info</li><li>Return Policy</li><li>Warranty</li><li>Contact Us</li></ul></div>
        <div><h3 className="font-bold text-white">We Accept</h3><div className="mt-3 flex flex-wrap gap-2">{["bKash", "Nagad", "Rocket", "Visa", "Mastercard", "COD"].map((p) => <span key={p} className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold">{p}</span>)}</div><p className="mt-4 text-xs text-gray-400">100% secure payments</p></div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs">© 2026 GadZone BD — All rights reserved. Made with ❤️ in Bangladesh.</div>
    </footer>
  );
}
