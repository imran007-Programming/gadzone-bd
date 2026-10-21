"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { initials } from "./StatusPill";

export type DashboardNavItem = { id: string; label: string; icon: string };

type DashboardSidebarProps = {
  nav: DashboardNavItem[];
  active: string;
  onSelect: (id: string) => void;
  badge?: string;
  userName?: string | null;
  userEmail?: string | null;
  userImage?: string | null;
  userRole?: string | null;
};

export default function DashboardSidebar({ nav, active, onSelect, badge, userName, userEmail, userImage, userRole }: DashboardSidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-[#def0e4] bg-[#f4fbf6] p-5 text-[#10231c] lg:flex">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-xl font-black text-white">G</span>
        <span className="text-lg font-black tracking-tight">
          Gad<span className="text-brand-800">Zone</span> BD
        </span>
        {badge && <span className="rounded-full bg-[#f4fbf6] px-2 py-0.5 text-[11px] font-black text-brand-700">{badge}</span>}
      </Link>

      <nav className="mt-8 space-y-1" aria-label="Dashboard navigation">
        {nav.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                isActive ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30" : "text-[#5c7569] hover:bg-[#def0e4] hover:text-[#10231c]"
              }`}
            >
              <span className="text-lg" aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 border-t border-[#def0e4] pt-4">
        <Link href="/" className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-[#5c7569] transition hover:bg-[#def0e4] hover:text-[#10231c]">
          <span aria-hidden="true">🛍️</span> Back to Shop
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold text-[#5c7569] transition hover:bg-[#def0e4] hover:text-[#10231c]"
        >
          <span aria-hidden="true">🚪</span> Sign out
        </button>
        <div className="flex items-center gap-3 rounded-2xl bg-[#f4fbf6] px-3 py-3">
          {userImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={userImage} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
          ) : (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-base font-black text-white">
              {initials(userName, userEmail)}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{userName ?? "Account"}</p>
            <p className="truncate text-xs text-[#5c7569]">{userEmail ?? ""}</p>
            {userRole && <p className="mt-0.5 text-[11px] font-bold tracking-wide text-brand-800 uppercase">{userRole}</p>}
          </div>
        </div>
      </div>
    </aside>
  );
}
