"use client";

import type { DashboardNavItem } from "./DashboardSidebar";

type MobileTabsProps = {
  nav: DashboardNavItem[];
  active: string;
  onSelect: (id: string) => void;
};

export default function MobileTabs({ nav, active, onSelect }: MobileTabsProps) {
  return (
    <div className="sticky top-0 z-10 -mx-4 overflow-x-auto bg-[#ffffff]/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="flex gap-2" role="tablist" aria-label="Dashboard sections">
        {nav.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(item.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold whitespace-nowrap transition ${
                isActive ? "bg-gradient-to-r from-brand-500 to-brand-700 text-[#1e0f2b] font-black shadow-[0_0_18px_-4px_rgba(236,76,140,0.7)]" : "bg-[#ffffff] text-[#8a7666] ring-1 ring-[#e7dcc6]"
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
