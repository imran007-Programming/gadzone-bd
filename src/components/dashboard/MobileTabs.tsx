"use client";

import type { DashboardNavItem } from "./DashboardSidebar";

type MobileTabsProps = {
  nav: DashboardNavItem[];
  active: string;
  onSelect: (id: string) => void;
};

export default function MobileTabs({ nav, active, onSelect }: MobileTabsProps) {
  return (
    <div className="sticky top-0 z-10 -mx-4 overflow-x-auto bg-[#faf6ef]/95 px-4 py-3 backdrop-blur lg:hidden">
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
                isActive ? "bg-[#232b38] text-white shadow-sm" : "bg-white text-[#55606f] ring-1 ring-[#e9dcc3]"
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
