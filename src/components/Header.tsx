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
  onMenuOpen: () => void;
  onAccountOpen: () => void;
};

export default function Header({ query, onQueryChange, category, onCategoryChange, cartCount, onCartOpen, onMenuOpen, onAccountOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-slate-900/5" : "shadow-sm"}`}>
      <div className="mx-auto max-w-7xl px-4 pt-3">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="flex items-center gap-1">
            <button onClick={onMenuOpen} className="rounded-full p-2 text-xl text-slate-800 hover:bg-slate-100" aria-label="Open menu">☰</button>
          </div>
          <a href="#" className="flex items-center justify-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-black text-white shadow-md shadow-emerald-600/30">G</span>
            <span className="leading-none"><span className="block text-lg font-black tracking-tight text-slate-900 sm:text-xl">Gad<span className="text-emerald-600">Zone</span> BD</span>
            <span className="hidden text-[11px] font-medium text-slate-500 sm:block">Gadgets in Bangladesh</span></span>
          </a>
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <button onClick={onAccountOpen} className="rounded-full p-2 text-xl text-slate-800 hover:bg-slate-100" aria-label="My account">👤</button>
            <span className="hidden rounded-full bg-pink-50 px-3 py-1.5 text-xs font-bold text-pink-600 md:inline-flex">bKash ✓</span>
            <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 md:inline-flex">COD ✓</span>
            <motion.button whileTap={{ scale: 0.94 }} onClick={onCartOpen} className="relative rounded-full bg-slate-950 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 sm:px-4">
              <span className="hidden sm:inline">🛒 Cart</span>
              <span className="sm:hidden">🛒</span>
              {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-950 ring-2 ring-white">{cartCount}</span>}
            </motion.button>
          </div>
        </div>
        <form
          className="mt-3 flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20"
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search for products"
            className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm outline-none placeholder:text-slate-400"
            aria-label="Search for products"
          />
          <button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-base text-white shadow transition hover:bg-emerald-700" aria-label="Search">🔍</button>
        </form>
      </div>
      <nav className="mt-3 border-t border-slate-100">
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
