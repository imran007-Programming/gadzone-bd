"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { loadOrders } from "@/lib/orders";
import { tk } from "@/lib/format";
import type { StoredOrder } from "@/types";
import DashboardSidebar, { type DashboardNavItem } from "@/components/dashboard/DashboardSidebar";
import MobileTabs from "@/components/dashboard/MobileTabs";
import StatCard from "@/components/dashboard/StatCard";
import OrderCard from "@/components/dashboard/OrderCard";
import EmptyState from "@/components/dashboard/EmptyState";
import FilterPills from "@/components/dashboard/FilterPills";
import SignInPrompt from "@/components/dashboard/SignInPrompt";
import { initials, StatusPill } from "@/components/dashboard/StatusPill";
import Reveal from "@/components/Reveal";

type CustomerTab = "overview" | "orders" | "profile";
type StatusFilter = "All" | StoredOrder["status"];

const NAV: DashboardNavItem[] = [
  { id: "overview", label: "Overview", icon: "🏠" },
  { id: "orders", label: "My Orders", icon: "📦" },
  { id: "profile", label: "Profile", icon: "👤" },
];

const STATUS_OPTIONS: StatusFilter[] = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState<CustomerTab>("overview");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (status === "authenticated") {
      const email = session?.user?.email?.toLowerCase() ?? "";
      setOrders(loadOrders().filter((o) => o.email.toLowerCase() === email));
      setLoaded(true);
    }
  }, [status, session]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const firstName = (session?.user?.name ?? "").split(" ")[0] || "there";

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesStatus = statusFilter === "All" || o.status === statusFilter;
      const matchesSearch =
        !q || o.id.toLowerCase().includes(q) || o.items.some((it) => it.name.toLowerCase().includes(q)) || o.name.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  const totalSpent = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);
  const processing = orders.filter((o) => o.status === "Processing").length;
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const recent = [...orders].slice(0, 3);
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { All: orders.length };
    for (const o of orders) counts[o.status] = (counts[o.status] ?? 0) + 1;
    return counts;
  }, [orders]);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.trim()) setTab("orders");
  };

  return (
    <div className="min-h-screen bg-[#42221b] font-sans text-[#f43f5e] lg:flex">
      <DashboardSidebar
        nav={NAV}
        active={tab}
        onSelect={(id) => setTab(id as CustomerTab)}
        userName={session?.user?.name}
        userEmail={session?.user?.email}
        userImage={session?.user?.image}
        userRole={session?.user?.role ?? "customer"}
      />

      <div className="min-w-0 flex-1">
        {/* Top header */}
        <header className="sticky top-0 z-20 border-b border-[#42221b] bg-[#42221b]/90 backdrop-blur lg:static">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
            <Link href="/" className="flex shrink-0 items-center gap-2 lg:hidden">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-xl font-black text-white">G</span>
              <span className="text-base font-black tracking-tight">Gad<span className="text-brand-400">Zone</span> BD</span>
            </Link>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-[#92400e] sm:text-base">Hello, {session?.user?.name ?? "Guest"} 👋</p>
              <p className="hidden text-xs text-[#f43f5e] sm:block">Track your orders and manage your account.</p>
            </div>
            {session?.user && (
              <>
                <label className="relative hidden w-56 shrink-0 sm:block md:w-72">
                  <span className="sr-only">Search orders</span>
                  <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#f43f5e]" aria-hidden="true">🔍</span>
                  <input
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search orders by id or item…"
                    className="w-full rounded-full border border-[#42221b] bg-[#42221b] py-2 pr-3 pl-9 text-sm outline-none focus:border-brand-400 focus:bg-[#42221b]"
                  />
                </label>
                <Link href="/" className="relative shrink-0 rounded-full bg-[#42221b] px-4 py-2 text-sm font-bold text-[#92400e] transition hover:bg-[#42221b]">
                  🛒 <span className="hidden sm:inline">Cart</span>
                </Link>
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt="" className="hidden h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-brand-100 sm:block" />
                ) : (
                  <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 font-black text-white sm:flex">
                    {initials(session.user.name, session.user.email)}
                  </span>
                )}
              </>
            )}
          </div>
          {/* Mobile search */}
          {session?.user && (
            <div className="px-4 pb-3 sm:hidden">
              <label className="relative block">
                <span className="sr-only">Search orders</span>
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#f43f5e]" aria-hidden="true">🔍</span>
                <input
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search orders by id or item…"
                  className="w-full rounded-full border border-[#42221b] bg-[#42221b] py-2 pr-3 pl-9 text-sm outline-none focus:border-brand-400 focus:bg-[#42221b]"
                />
              </label>
            </div>
          )}
        </header>

        <main className="mx-auto max-w-5xl px-4 py-6">
          {status === "loading" ? (
            <p className="py-16 text-center text-[#f43f5e]">Checking your session…</p>
          ) : !session?.user ? (
            <SignInPrompt
              title="My Dashboard"
              text="Sign in with Google to view your profile and order history."
              callbackUrl="/dashboard"
            />
          ) : (
            <>
              <MobileTabs nav={NAV} active={tab} onSelect={(id) => setTab(id as CustomerTab)} />

              {tab === "overview" && (
                <div className="space-y-6 pt-4">
                  <Reveal>
                    <section className="overflow-hidden rounded-lg bg-gradient-to-r from-brand-700 via-brand-600 to-brand-800 p-6 text-white shadow-lg sm:p-8">
                      <p className="text-sm font-bold text-brand-100">Welcome back, {firstName} 👋</p>
                      <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Everything about your orders, in one place.</h1>
                      <p className="mt-2 max-w-lg text-sm text-white/90">
                        {orders.length === 0
                          ? "You have no orders yet — explore the shop and find your next gadget."
                          : `You have ${orders.length} order${orders.length === 1 ? "" : "s"} with us. ${processing > 0 ? `${processing} still processing.` : "Nothing is waiting to ship right now."}`}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        <Link href="/" className="rounded-full bg-[#42221b] px-5 py-2.5 text-sm font-black text-brand-700 transition hover:bg-brand-50">Shop Now →</Link>
                        <button onClick={() => setTab("orders")} className="rounded-full bg-[#42221b]/15 px-5 py-2.5 text-sm font-bold text-white ring-1 ring-white/30 transition hover:bg-[#42221b]/25">Track Order</button>
                      </div>
                    </section>
                  </Reveal>

                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard label="Total Orders" value={loaded ? String(orders.length) : "—"} icon="📦" sub="All time" delay={0.05} />
                    <StatCard label="Total Spent" value={loaded ? tk(totalSpent) : "—"} icon="💳" sub="Excludes cancelled" accent="bg-brand-100 text-brand-700" delay={0.1} />
                    <StatCard label="Processing" value={loaded ? String(processing) : "—"} icon="⏳" sub="Being prepared" accent="bg-brand-100 text-brand-700" delay={0.15} />
                    <StatCard label="Delivered" value={loaded ? String(delivered) : "—"} icon="✅" sub="Arrived safely" delay={0.2} />
                  </div>

                  <section>
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="text-lg font-black text-[#92400e]">Recent Orders</h2>
                      <button onClick={() => setTab("orders")} className="text-sm font-bold text-brand-400 hover:text-brand-300">View all →</button>
                    </div>
                    {!loaded ? (
                      <p className="text-sm text-[#f43f5e]">Loading orders…</p>
                    ) : recent.length === 0 ? (
                      <EmptyState icon="📦" title="No orders yet" text="When you place an order while signed in, it will show up here." actionLabel="Shop now" actionHref="/" />
                    ) : (
                      <div className="space-y-3">
                        {recent.map((o) => (
                          <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#42221b] p-4 shadow-sm ring-1 ring-[#42221b]">
                            <div className="min-w-0">
                              <p className="font-black text-[#92400e]">{o.id}</p>
                              <p className="truncate text-sm text-[#f43f5e]">{o.items.map((it) => `${it.name} × ${it.qty}`).join(" · ")}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-black text-brand-400">{tk(o.total)}</span>
                              <StatusPill status={o.status} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>

                  <section>
                    <h2 className="mb-3 text-lg font-black text-[#92400e]">Quick actions</h2>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Link href="/" className="rounded-lg bg-[#42221b] p-5 shadow-sm ring-1 ring-[#42221b] transition hover:shadow-md">
                        <p className="text-2xl" aria-hidden="true">🛍️</p>
                        <p className="mt-2 font-black text-[#92400e]">Shop Now</p>
                        <p className="text-sm text-[#f43f5e]">Browse deals and new arrivals.</p>
                      </Link>
                      <button onClick={() => setTab("orders")} className="rounded-lg bg-[#42221b] p-5 text-left shadow-sm ring-1 ring-[#42221b] transition hover:shadow-md">
                        <p className="text-2xl" aria-hidden="true">🚚</p>
                        <p className="mt-2 font-black text-[#92400e]">Track Order</p>
                        <p className="text-sm text-[#f43f5e]">See the status of every order.</p>
                      </button>
                      <Link href="/#faq" className="rounded-lg bg-[#42221b] p-5 shadow-sm ring-1 ring-[#42221b] transition hover:shadow-md">
                        <p className="text-2xl" aria-hidden="true">💬</p>
                        <p className="mt-2 font-black text-[#92400e]">Support</p>
                        <p className="text-sm text-[#f43f5e]">Answers to common questions.</p>
                      </Link>
                    </div>
                  </section>
                </div>
              )}

              {tab === "orders" && (
                <div className="space-y-5 pt-4">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h1 className="text-2xl font-black text-[#92400e]">My Orders</h1>
                      <p className="mt-1 text-sm text-[#f43f5e]">{filtered.length} order{filtered.length === 1 ? "" : "s"} shown</p>
                    </div>
                    {(search.trim() || statusFilter !== "All") && (
                      <button
                        onClick={() => { setSearch(""); setStatusFilter("All"); }}
                        className="rounded-full bg-[#42221b] px-4 py-2 text-sm font-bold text-[#f43f5e] ring-1 ring-[#42221b] hover:bg-[#42221b]"
                      >
                        Clear filters ✕
                      </button>
                    )}
                  </div>

                  <FilterPills options={STATUS_OPTIONS} value={statusFilter} onChange={(v) => setStatusFilter(v as StatusFilter)} counts={statusCounts} />

                  {!loaded ? (
                    <p className="text-sm text-[#f43f5e]">Loading orders…</p>
                  ) : filtered.length === 0 ? (
                    <EmptyState
                      icon="🔍"
                      title={orders.length === 0 ? "No orders yet" : "No orders match your filters"}
                      text={orders.length === 0 ? "When you place an order while signed in, it will show up here." : "Try a different search or status filter."}
                      actionLabel={orders.length === 0 ? "Shop now" : undefined}
                      actionHref={orders.length === 0 ? "/" : undefined}
                    />
                  ) : (
                    <div className="space-y-4">
                      {filtered.map((o) => (
                        <OrderCard key={o.id} order={o} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === "profile" && (
                <div className="space-y-5 pt-4">
                  <h1 className="text-2xl font-black text-[#92400e]">Profile</h1>
                  <Reveal>
                    <section className="flex flex-col items-start gap-4 rounded-lg bg-[#42221b] p-6 shadow-sm ring-1 ring-[#42221b] sm:flex-row sm:items-center">
                      {session.user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={session.user.image} alt="" className="h-20 w-20 rounded-full object-cover ring-4 ring-brand-100" />
                      ) : (
                        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-3xl font-black text-white">
                          {initials(session.user.name, session.user.email)}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <h2 className="truncate text-xl font-black text-[#92400e]">{session.user.name ?? "GadZone customer"}</h2>
                        <p className="truncate text-sm text-[#f43f5e]">{session.user.email}</p>
                        <span className="mt-2 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700 capitalize">{session.user.role ?? "customer"}</span>
                      </div>
                      <Link href="/" className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600">Continue Shopping</Link>
                    </section>
                  </Reveal>

                  <section className="rounded-lg bg-[#42221b] p-6 shadow-sm ring-1 ring-[#42221b]">
                    <h2 className="font-black text-[#92400e]">Account info</h2>
                    <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                      <div><dt className="font-semibold text-[#f43f5e]">Full name</dt><dd className="mt-0.5 font-bold text-[#f43f5e]">{session.user.name ?? "—"}</dd></div>
                      <div><dt className="font-semibold text-[#f43f5e]">Email</dt><dd className="mt-0.5 truncate font-bold text-[#f43f5e]">{session.user.email ?? "—"}</dd></div>
                      <div><dt className="font-semibold text-[#f43f5e]">Role</dt><dd className="mt-0.5 font-bold text-[#f43f5e] capitalize">{session.user.role ?? "customer"}</dd></div>
                      <div><dt className="font-semibold text-[#f43f5e]">Mbloom since</dt><dd className="mt-0.5 font-bold text-[#f43f5e]">Google account</dd></div>
                    </dl>
                  </section>

                  <section className="rounded-lg bg-brand-50 p-5 ring-1 ring-brand-100">
                    <h2 className="font-black text-[#f43f5e]">🔒 Signed in with Google</h2>
                    <p className="mt-1 text-sm text-[#f43f5e]">Your account is protected by your Google sign-in. GadZone BD never sees or stores your Google password.</p>
                  </section>

                  <section className="rounded-lg bg-brand-50 p-5 ring-1 ring-brand-100">
                    <h2 className="font-black text-brand-400">✏️ Profile editing</h2>
                    <p className="mt-1 text-sm text-brand-300">Profile edits are not available yet — there is no backend connected to save changes. Your name, email and photo come from your Google account for now.</p>
                  </section>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
