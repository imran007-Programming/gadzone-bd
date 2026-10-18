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
    <header className={`sticky top-0 z-40 border-b border-[#22304d] bg-[#0a0f1e]/85 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? "shadow-[0_12px_40px_-12px_rgba(34, 211, 238,0.25)]" : "shadow-none"}`}>
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="flex items-center gap-1">
            <button onClick={onMenuOpen} className="rounded-full p-2 text-xl text-[#3a4453] transition hover:bg-[#f4eddc] hover:text-brand-600" aria-label="Open menu">☰</button>
          </div>
          <a href="#" className="flex items-center justify-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-300 to-brand-600 text-xl font-black text-white shadow-[0_8px_24px_-8px_rgba(34, 211, 238,0.4)] ring-1 ring-brand-300/50">G</span>
            <span className="leading-none"><span className="block text-lg font-black tracking-tight text-[#eaf0fa] sm:text-xl">Gad<span className="text-brand-600">Zone</span> BD</span>
            <span className="hidden text-[11px] font-medium text-[#93a0b8] sm:block">Gadgets in Bangladesh</span></span>
          </a>
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            {session?.user ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-[#f4eddc] sm:pr-3" aria-label="My dashboard">
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-black text-white">
                      {(session.user.name ?? session.user.email ?? "G").slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  <span className="hidden max-w-28 truncate text-sm font-bold text-[#eaf0fa] md:inline">{session.user.name ?? "My Account"}</span>
                </Link>
                <Link href="/dashboard" className="hidden rounded-full px-3 py-1.5 text-xs font-bold text-[#6f6a5c] hover:bg-[#f4eddc] md:inline-flex">Dashboard</Link>
                {session.user.role === "admin" && (
                  <Link href="/admin" className="hidden rounded-full bg-gradient-to-r from-brand-400 to-brand-600 px-3 py-1.5 text-xs font-black text-white shadow-[0_4px_16px_-4px_rgba(34, 211, 238,0.4)] md:inline-flex">Admin</Link>
                )}
                <button onClick={() => signOut({ callbackUrl: "/" })} className="hidden rounded-full px-3 py-1.5 text-xs font-bold text-[#6f6a5c] hover:bg-[#f4eddc] md:inline-flex">Sign out</button>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="rounded-full p-2 text-lg text-[#3a4453] hover:bg-[#f4eddc] md:hidden" aria-label="Sign out">↪</button>
              </>
            ) : (
              <button onClick={onAccountOpen} className="rounded-full bg-gradient-to-r from-brand-400 to-brand-600 px-5 py-2 text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(34, 211, 238,0.4)] transition hover:brightness-110 active:scale-[0.98]">Sign in</button>
            )}
            <span className="hidden rounded-full bg-[#101a30] px-3 py-1.5 text-xs font-bold text-brand-600 ring-1 ring-[#22304d] md:inline-flex">bKash ✓</span>
            <span className="hidden rounded-full bg-[#101a30] px-3 py-1.5 text-xs font-bold text-brand-600 ring-1 ring-[#22304d] md:inline-flex">COD ✓</span>
            <motion.button whileTap={{ scale: 0.94 }} onClick={onCartOpen} className="relative rounded-full bg-[#101a30] px-3 py-2.5 text-sm font-bold text-[#eaf0fa] shadow-sm ring-1 ring-brand-400/40 transition hover:bg-[#f4eddc] hover:ring-brand-400/70 active:scale-[0.98] sm:px-4">
              <span className="hidden sm:inline">🛒 Cart</span>
              <span className="sm:hidden">🛒</span>
              {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-black text-white ring-2 ring-[#0a0f1e]">{cartCount}</span>}
            </motion.button>
          </div>
        </div>
        <form
          className="mt-3 flex items-center gap-2 rounded-full border border-[#22304d] bg-[#101a30] p-1.5 pl-2 shadow-[0_8px_28px_-12px_rgba(34, 211, 238,0.35)] transition focus-within:border-brand-400/60 focus-within:shadow-[0_8px_28px_-8px_rgba(34, 211, 238,0.5)]"
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search for products"
            className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm text-[#eaf0fa] outline-none placeholder:text-[#93a0b8]"
            aria-label="Search for products"
          />
          <button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-base text-white shadow-[0_6px_18px_-6px_rgba(34, 211, 238,0.45)] transition hover:brightness-110 active:scale-[0.95]" aria-label="Search">🔍</button>
        </form>
      </div>
      <nav className="mt-3 border-t border-[#22304d]">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 py-2.5 sm:px-6">
          {CATEGORIES.map((c) => (
            <motion.button whileTap={{ scale: 0.96 }} key={c} onClick={() => { onCategoryChange(c); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 border ${category === c ? "border-brand-300/60 bg-gradient-to-r from-brand-400 to-brand-600 text-white shadow-[0_6px_20px_-6px_rgba(34, 211, 238,0.4)]" : "border-transparent text-[#93a0b8] hover:border-[#22304d] hover:bg-[#101a30] hover:text-brand-600"}`}>{c}</motion.button>
          ))}
        </div>
      </nav>
    </header>
  );
}
