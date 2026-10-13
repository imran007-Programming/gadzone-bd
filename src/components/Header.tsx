"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/products";

type HeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
  cartCount: number;
  onCartOpen: () => void;
};

export default function Header({ query, onQueryChange, category, onCategoryChange, cartCount, onCartOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-slate-900/5" : "shadow-sm"}`}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-2xl font-black text-white shadow-md shadow-emerald-600/30">G</span>
          <span className="leading-none"><span className="block text-xl font-black tracking-tight text-slate-900">Gad<span className="text-emerald-600">Zone</span> BD</span>
          <span className="text-[11px] font-medium text-slate-500">Gadgets in Bangladesh</span></span>
        </a>
        <div className="order-3 flex w-full sm:order-2 sm:w-auto sm:flex-1 sm:max-w-xl sm:mx-4">
          <div className="relative w-full">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder="Search earbuds, watch, power bank…"
              className="w-full rounded-2xl border border-slate-200 bg-slate-100 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20" />
          </div>
        </div>
        <div className="order-2 ml-auto flex items-center gap-2 sm:order-3 sm:ml-0">
          <span className="hidden md:inline-flex rounded-full bg-pink-50 px-3 py-1.5 text-xs font-bold text-pink-600">bKash ✓</span>
          <span className="hidden md:inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">COD ✓</span>
          <motion.button whileTap={{ scale: 0.94 }} onClick={onCartOpen} className="relative rounded-full bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700">
            🛒 Cart
            {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-950 ring-2 ring-white">{cartCount}</span>}
          </motion.button>
        </div>
      </div>
      <nav className="border-t border-slate-100">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 py-2">
          {CATEGORIES.map((c) => (
            <motion.button whileTap={{ scale: 0.96 }} key={c} onClick={() => { onCategoryChange(c); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition ${category === c ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-600"}`}>{c}</motion.button>
          ))}
        </div>
      </nav>
    </header>
  );
}
