"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CATEGORIES } from "@/data/products";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  category: string;
  onCategoryChange: (category: string) => void;
};

const MENU_LINKS: { label: string; target: string | "top" }[] = [
  { label: "About Us", target: "top" },
  { label: "Shop", target: "shop" },
  { label: "Track Order", target: "shop" },
  { label: "FAQ", target: "faq" },
  { label: "Contact", target: "contact" },
];

export default function MobileMenu({ open, onClose, category, onCategoryChange }: MobileMenuProps) {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<"categories" | "menu">("categories");

  const scrollTo = (target: string | "top") => {
    if (target === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.aside
            initial={reduce ? { opacity: 0 } : { x: "-100%" }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { x: "-100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="absolute left-0 top-0 flex h-full w-4/5 max-w-xs flex-col rounded-r-3xl border-r border-[#bfe3dc] bg-[#f6fbfa] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#bfe3dc] px-5 py-4">
              <span className="text-lg font-black text-[#0e2a30]">
                Gad<span className="text-brand-700">Zone</span> BD
              </span>
              <button onClick={onClose} className="rounded-full px-2 text-2xl text-[#0e2a30] transition hover:bg-[#bfe3dc] hover:text-brand-600" aria-label="Close menu">×</button>
            </div>
            <div className="flex border-b border-[#bfe3dc]">
              {(["categories", "menu"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors ${tab === t ? "border-b-2 border-brand-400 bg-brand-400/10 text-brand-200" : "text-[#0e2a30] hover:text-[#0e2a30]"}`}
                >
                  {t === "categories" ? "Categories" : "Menu"}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto">
              {tab === "categories" ? (
                <ul className="divide-y divide-[#bfe3dc]/15">
                  {CATEGORIES.map((c) => (
                    <li key={c}>
                      <button
                        onClick={() => {
                          onCategoryChange(c);
                          document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                          onClose();
                        }}
                        className={`flex w-full items-center justify-between px-5 py-4 text-left text-[15px] font-semibold transition hover:bg-[#bfe3dc] ${category === c ? "text-brand-700 hover:text-brand-700" : "text-[#0e2a30] hover:text-[#0e2a30]"}`}
                      >
                        {c === "All" ? "All Products" : c}
                        <span className="text-[#0e2a30]">›</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="divide-y divide-[#bfe3dc]/15">
                  {MENU_LINKS.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => scrollTo(link.target)}
                        className="flex w-full items-center justify-between px-5 py-4 text-left text-[15px] font-semibold text-[#0e2a30] transition hover:bg-[#bfe3dc] hover:text-[#0e2a30]"
                      >
                        {link.label}
                        <span className="text-[#0e2a30]">›</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
