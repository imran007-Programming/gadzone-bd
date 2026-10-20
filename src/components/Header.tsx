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
    <header className={`sticky top-0 z-40 border-b-2 border-[#2a1a2e]/15 bg-[#fdf7ef]/90 backdrop-blur-xl transition-shadow duration-300 ${scrolled ? "shadow-[0_10px_30px_-12px_rgba(194,65,12,0.5)]" : "shadow-none"}`}>
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="flex items-center gap-1">
            <button onClick={onMenuOpen} className="rounded-full p-2 text-xl text-[#7a5c52] transition hover:bg-[#f3e0cb] hover:text-brand-700" aria-label="Open menu">☰</button>
          </div>
          <a href="#" className="flex items-center justify-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#2a1a2e] bg-gradient-to-br from-brand-400 via-brand-600 to-brand-800 text-xl font-black text-white shadow-[0_14px_34px_-14px_rgba(194,65,12,0.5)]">G</span>
            <span className="leading-none"><span className="block text-lg font-black tracking-tight text-[#2a1a2e] sm:text-xl">Gad<span className="text-brand-700">Zone</span> BD</span>
            <span className="hidden text-[11px] font-medium text-[#7a5c52] sm:block">Gadgets in Bangladesh</span></span>
          </a>
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            {session?.user ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-[#f3e0cb] sm:pr-3" aria-label="My dashboard">
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-black text-[#2a1a2e]">
                      {(session.user.name ?? session.user.email ?? "G").slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  <span className="hidden max-w-28 truncate text-sm font-bold text-[#2a1a2e] md:inline">{session.user.name ?? "My Account"}</span>
                </Link>
                <Link href="/dashboard" className="hidden rounded-full px-3 py-1.5 text-xs font-bold text-[#7a5c52] hover:bg-[#f3e0cb] md:inline-flex">Dashboard</Link>
                {session.user.role === "admin" && (
                  <Link href="/admin" className="hidden rounded-lg border-2 border-[#2a1a2e] bg-gradient-to-r from-gold-deep to-gold px-3 py-1.5 text-xs font-black text-white shadow-[0_10px_26px_-12px_rgba(194,65,12,0.45)] md:inline-flex">Admin</Link>
                )}
                <button onClick={() => signOut({ callbackUrl: "/" })} className="hidden rounded-full px-3 py-1.5 text-xs font-bold text-[#7a5c52] hover:bg-[#f3e0cb] md:inline-flex">Sign out</button>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="rounded-full p-2 text-lg text-[#7a5c52] hover:bg-[#f3e0cb] md:hidden" aria-label="Sign out">↪</button>
              </>
            ) : (
              <button onClick={onAccountOpen} className="rounded-lg border-2 border-[#2a1a2e] bg-gradient-to-r from-brand-500 to-brand-700 px-5 py-2 text-sm font-bold text-white shadow-[0_14px_34px_-14px_rgba(194,65,12,0.5)] transition hover:brightness-110 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">Sign in</button>
            )}
            <span className="hidden rounded-full bg-[#f3e0cb] px-3 py-1.5 text-xs font-bold text-brand-700 ring-1 ring-brand-400/30 md:inline-flex">bKash ✓</span>
            <span className="hidden rounded-full bg-[#f3e0cb] px-3 py-1.5 text-xs font-bold text-brand-700 ring-1 ring-brand-400/30 md:inline-flex">COD ✓</span>
            <motion.button whileTap={{ scale: 0.94 }} onClick={onCartOpen} className="relative rounded-xl border-2 border-[#2a1a2e] bg-[#f3e0cb] px-3 py-2.5 text-sm font-bold text-[#2a1a2e] shadow-[0_14px_34px_-14px_rgba(194,65,12,0.5)] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none sm:px-4">
              <span className="hidden sm:inline">🛒 Cart</span>
              <span className="sm:hidden">🛒</span>
              {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-gold-deep to-gold text-xs font-black text-white ring-2 ring-[#fdf7ef]">{cartCount}</span>}
            </motion.button>
          </div>
        </div>
        <form
          className="mt-3 flex items-center gap-2 rounded-2xl border-2 border-[#2a1a2e]/20 bg-[#ffffff] p-1.5 pl-2 shadow-[0_12px_30px_-12px_rgba(194,65,12,0.4)] transition focus-within:border-brand-600/60 focus-within:shadow-[0_16px_38px_-14px_rgba(194,65,12,0.45)]"
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search for products"
            className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm text-[#2a1a2e] outline-none placeholder:text-[#7a5c52]"
            aria-label="Search for products"
          />
          <button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#2a1a2e] bg-gradient-to-br from-gold-deep to-gold text-base text-white shadow-[0_14px_34px_-14px_rgba(194,65,12,0.5)] transition hover:brightness-110 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none" aria-label="Search">🔍</button>
        </form>
      </div>
      <nav className="mt-3 border-t border-brand-400/15">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 py-2.5 sm:px-6">
          {CATEGORIES.map((c) => (
            <motion.button whileTap={{ scale: 0.96 }} key={c} onClick={() => { onCategoryChange(c); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 border ${category === c ? "border-transparent bg-gradient-to-r from-brand-400 to-brand-600 text-[#2a1a2e] shadow-[0_6px_20px_-6px_rgba(194,65,12,0.7)]" : "border-transparent text-[#7a5c52] hover:bg-[#f3e0cb] hover:text-brand-700"}`}>{c}</motion.button>
          ))}
        </div>
      </nav>
    </header>
  );
}
