"use client";

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
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-2xl text-white font-black">G</span>
          <span className="leading-none"><span className="block text-xl font-black tracking-tight">Gad<span className="text-brand">Zone</span> BD</span>
          <span className="text-[11px] font-medium text-gray-500">Gadgets in Bangladesh</span></span>
        </a>
        <div className="order-3 flex w-full sm:order-2 sm:w-auto sm:flex-1 sm:max-w-xl sm:mx-4">
          <div className="relative w-full">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder="Search earbuds, watch, power bank…"
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand focus:bg-white" />
          </div>
        </div>
        <div className="order-2 ml-auto flex items-center gap-2 sm:order-3 sm:ml-0">
          <span className="hidden md:inline-flex rounded-full bg-pink-50 px-3 py-1.5 text-xs font-bold text-pink-600">bKash ✓</span>
          <span className="hidden md:inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">COD ✓</span>
          <button onClick={onCartOpen} className="relative rounded-full bg-navy px-4 py-2.5 text-sm font-bold text-white hover:bg-brand transition">
            🛒 Cart
            {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-white ring-2 ring-white">{cartCount}</span>}
          </button>
        </div>
      </div>
      <nav className="border-t">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => { onCategoryChange(c); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition ${category === c ? "bg-brand text-white" : "text-gray-600 hover:bg-orange-50 hover:text-brand"}`}>{c}</button>
          ))}
        </div>
      </nav>
    </header>
  );
}
