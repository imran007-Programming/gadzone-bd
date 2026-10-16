"use client";

import { motion } from "framer-motion";

type BottomNavProps = {
  cartCount: number;
  onCartOpen: () => void;
  onMenuOpen: () => void;
  onAccountOpen: () => void;
  onHelpOpen: () => void;
};

export default function BottomNav({ cartCount, onCartOpen, onMenuOpen, onAccountOpen, onHelpOpen }: BottomNavProps) {
  const items = [
    { label: "My account", icon: "👤", onClick: onAccountOpen },
    { label: "Menu", icon: "☰", onClick: onMenuOpen },
    { label: "Cart", icon: "🛒", onClick: onCartOpen, badge: cartCount },
    { label: "Help", icon: "💬", onClick: onHelpOpen },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-8px_24px_rgba(2,6,23,0.10)] backdrop-blur md:hidden">
      <div className="grid grid-cols-4 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.94 }}
            onClick={item.onClick}
            className="relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold tracking-tight text-slate-700 transition-colors active:text-teal-500"
          >
            <span className="relative text-xl leading-none">
              {item.icon}
              {typeof item.badge === "number" && item.badge > 0 && (
                <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-500 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                  {item.badge}
                </span>
              )}
            </span>
            {item.label}
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
