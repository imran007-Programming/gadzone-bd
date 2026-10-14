"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
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
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-slate-900/10" : "shadow-none"}`}>
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="flex items-center gap-1">
            <button onClick={onMenuOpen} className="rounded-full p-2 text-xl text-slate-800 transition hover:bg-teal-50 hover:text-teal-700" aria-label="Open menu">☰</button>
          </div>
          <a href="#" className="flex items-center justify-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-xl font-black text-white shadow-md shadow-teal-600/30 ring-2 ring-white">G</span>
            <span className="leading-none"><span className="block text-lg font-black tracking-tight text-slate-900 sm:text-xl">Gad<span className="text-teal-600">Zone</span> BD</span>
            <span className="hidden text-[11px] font-medium text-slate-500 sm:block">Gadgets in Bangladesh</span></span>
          </a>
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            {session?.user ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-slate-100 sm:pr-3" aria-label="My dashboard">
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-sm font-black text-white">
                      {(session.user.name ?? session.user.email ?? "G").slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  <span className="hidden max-w-28 truncate text-sm font-bold text-slate-800 md:inline">{session.user.name ?? "My Account"}</span>
                </Link>
                <Link href="/dashboard" className="hidden rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 md:inline-flex">Dashboard</Link>
                {session.user.role === "admin" && (
                  <Link href="/admin" className="hidden rounded-md bg-teal-600 px-3 py-1.5 text-xs font-black text-white hover:bg-teal-500 md:inline-flex">Admin</Link>
                )}
                <button onClick={() => signOut({ callbackUrl: "/" })} className="hidden rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 md:inline-flex">Sign out</button>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="rounded-full p-2 text-lg text-slate-800 hover:bg-slate-100 md:hidden" aria-label="Sign out">↪</button>
              </>
            ) : (
              <button onClick={onAccountOpen} className="rounded-full bg-teal-600 px-4 py-2 text-sm font-bold text-white shadow-sm shadow-teal-600/30 transition hover:bg-teal-700 active:scale-[0.98]">Sign in</button>
            )}
            <span className="hidden rounded-full bg-pink-50 px-3 py-1.5 text-xs font-bold text-pink-600 ring-1 ring-pink-100 md:inline-flex">bKash ✓</span>
            <span className="hidden rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700 ring-1 ring-teal-100 md:inline-flex">COD ✓</span>
            <motion.button whileTap={{ scale: 0.94 }} onClick={onCartOpen} className="relative rounded-xl bg-[#052e2b] px-3 py-2.5 text-sm font-bold text-white shadow-sm shadow-teal-950/30 transition hover:bg-teal-700 active:scale-[0.98] sm:px-4">
              <span className="hidden sm:inline">🛒 Cart</span>
              <span className="sm:hidden">🛒</span>
              {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white ring-2 ring-white">{cartCount}</span>}
            </motion.button>
          </div>
        </div>
        <form
          className="mt-3 flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-md shadow-slate-900/5 transition focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-600/15"
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
          <button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-base text-white shadow-md shadow-teal-600/30 transition hover:bg-teal-700 active:scale-95" aria-label="Search">🔍</button>
        </form>
      </div>
      <nav className="mt-3 border-t border-slate-100">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 py-2.5 sm:px-6">
          {CATEGORIES.map((c) => (
            <motion.button whileTap={{ scale: 0.96 }} key={c} onClick={() => { onCategoryChange(c); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${category === c ? "bg-teal-600 text-white shadow-md shadow-teal-600/30 ring-1 ring-teal-600" : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"}`}>{c}</motion.button>
          ))}
        </div>
      </nav>
    </header>
  );
}
