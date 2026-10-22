"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { PRODUCTS } from "@/data/products";
import { loadOrders, saveOrders } from "@/lib/orders";
import { tk } from "@/lib/format";
import type { OrderStatus, StoredOrder } from "@/types";
import DashboardSidebar, { type DashboardNavItem } from "@/components/dashboard/DashboardSidebar";
import MobileTabs from "@/components/dashboard/MobileTabs";
import StatCard from "@/components/dashboard/StatCard";
import OrderCard from "@/components/dashboard/OrderCard";
import EmptyState from "@/components/dashboard/EmptyState";
import FilterPills from "@/components/dashboard/FilterPills";
import SignInPrompt from "@/components/dashboard/SignInPrompt";
import WeeklyChart from "@/components/dashboard/WeeklyChart";
import { initials } from "@/components/dashboard/StatusPill";
import Reveal from "@/components/Reveal";

type AdminTab = "overview" | "orders" | "products" | "customers";
type StatusFilter = "All" | OrderStatus;

const NAV: DashboardNavItem[] = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "orders", label: "Orders", icon: "📦" },
  { id: "products", label: "Products", icon: "🛍️" },
  { id: "customers", label: "Customers", icon: "👥" },
];

const STATUS_OPTIONS: StatusFilter[] = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

const STOCK_STYLES: Record<string, string> = {
  "In Stock": "bg-brand-100 text-brand-700",
  "Low Stock": "bg-brand-100 text-brand-700",
  "Only a few left": "bg-red-100 text-red-700",
};

type CustomerRow = { name: string; email: string; orders: number; spent: number };

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState<AdminTab>("overview");
  const [orderSearch, setOrderSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [productSearch, setProductSearch] = useState("");
  const [showAddNote, setShowAddNote] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      setOrders(loadOrders());
      setLoaded(true);
    }
  }, [status, session]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const updateStatus = (id: string, next: OrderStatus) => {
    const nextOrders = orders.map((o) => (o.id === id ? { ...o, status: next } : o));
    setOrders(nextOrders);
    saveOrders(nextOrders);
  };

  const revenue = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);
  const customers = useMemo<CustomerRow[]>(() => {
    const map = new Map<string, CustomerRow>();
    for (const o of orders) {
      const email = o.email.toLowerCase();
      if (!email || email === "guest") continue;
      const existing = map.get(email) ?? { name: o.name, email: o.email, orders: 0, spent: 0 };
      existing.orders += 1;
      if (o.status !== "Cancelled") existing.spent += o.total;
      map.set(email, existing);
    }
    return [...map.values()].sort((a, b) => b.spent - a.spent);
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const q = orderSearch.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesStatus = statusFilter === "All" || o.status === statusFilter;
      const matchesSearch =
        !q || o.id.toLowerCase().includes(q) || o.name.toLowerCase().includes(q) || o.email.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [orders, orderSearch, statusFilter]);

  const filteredProducts = useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [productSearch]);

  const lowStock = PRODUCTS.filter((p) => p.stock === "Low Stock" || p.stock === "Only a few left").slice(0, 5);
  const recentOrders = [...orders].slice(0, 5);
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { All: orders.length };
    for (const o of orders) counts[o.status] = (counts[o.status] ?? 0) + 1;
    return counts;
  }, [orders]);

  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="min-h-screen bg-[#fdf8f0] font-sans text-[#c2521f] lg:flex">
      <DashboardSidebar
        nav={NAV}
        active={tab}
        onSelect={(id) => setTab(id as AdminTab)}
        badge="Admin"
        userName={session?.user?.name}
        userEmail={session?.user?.email}
        userImage={session?.user?.image}
        userRole="admin"
      />

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-[#e3d2b8] bg-[#fdf8f0]/90 backdrop-blur lg:static">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
            <Link href="/" className="flex shrink-0 items-center gap-2 lg:hidden">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-xl font-black text-white">G</span>
              <span className="text-base font-black tracking-tight">Gad<span className="text-brand-700">Zone</span> BD</span>
            </Link>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 truncate text-sm font-bold text-[#2e2117] sm:text-base">
                Admin Dashboard
                <span className="rounded-full bg-[#fdf8f0] px-2 py-0.5 text-[11px] font-black text-brand-700">ADMIN</span>
              </p>
              <p className="hidden text-xs text-[#c2521f] sm:block">Manage orders, products and customers.</p>
            </div>
            {session?.user && (
              <>
                <Link href="/dashboard" className="hidden shrink-0 rounded-full px-3 py-2 text-sm font-bold text-[#c2521f] hover:bg-[#fdf8f0] sm:block">My Dashboard</Link>
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-brand-200" />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fdf8f0] font-black text-[#2e2117]">
                    {initials(session.user.name, session.user.email)}
                  </span>
                )}
              </>
            )}
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">
          {status === "loading" ? (
            <p className="py-16 text-center text-[#c2521f]">Checking your session…</p>
          ) : !session?.user ? (
            <SignInPrompt
              title="Admin Dashboard"
              text="Sign in with Google to continue. Only admin accounts can view this page."
              callbackUrl="/admin"
            />
          ) : !isAdmin ? (
            <div className="mx-auto max-w-md rounded-lg bg-[#fdf8f0] p-8 text-center shadow-sm ring-1 ring-[#e3d2b8]">
              <p className="text-4xl" aria-hidden="true">🔒</p>
              <h1 className="mt-2 text-2xl font-black text-[#2e2117]">Access denied — admin only</h1>
              <p className="mt-2 text-sm text-[#c2521f]">You are signed in as {session.user.email}, but this account does not have admin access.</p>
              <Link href="/" className="mt-5 inline-block rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600">Back to Shop</Link>
            </div>
          ) : (
            <>
              <MobileTabs nav={NAV} active={tab} onSelect={(id) => setTab(id as AdminTab)} />

              <Reveal>
                <p className="mt-4 rounded-lg bg-brand-50 p-3 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
                  Demo data — orders are stored in this browser only (localStorage). A real database is needed for multi-device / multi-user orders.
                </p>
              </Reveal>

              {tab === "overview" && (
                <div className="space-y-6 pt-5">
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard label="Total Revenue" value={loaded ? tk(revenue) : "—"} icon="💰" sub="Excludes cancelled orders" delay={0.05} />
                    <StatCard label="Total Orders" value={loaded ? String(orders.length) : "—"} icon="📦" sub="All time, this browser" accent="bg-brand-100 text-brand-700" delay={0.1} />
                    <StatCard label="Total Products" value={String(PRODUCTS.length)} icon="🛍️" sub="In the catalogue" accent="bg-brand-100 text-brand-700" delay={0.15} />
                    <StatCard label="Total Customers" value={loaded ? String(customers.length) : "—"} icon="👥" sub="Distinct signed-in emails" accent="bg-brand-100 text-brand-700" delay={0.2} />
                  </div>

                  <div className="grid gap-6 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                      <WeeklyChart orders={orders} />
                    </div>
                    <section className="rounded-lg bg-[#fdf8f0] p-5 shadow-sm ring-1 ring-[#e3d2b8] lg:col-span-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-black text-[#2e2117]">Low-stock products</h3>
                        <button onClick={() => setTab("products")} className="text-sm font-bold text-brand-700 hover:text-brand-700">View all →</button>
                      </div>
                      {lowStock.length === 0 ? (
                        <p className="mt-4 text-sm text-[#c2521f]">All products are well stocked. 🎉</p>
                      ) : (
                        <ul className="mt-4 space-y-3">
                          {lowStock.map((p) => (
                            <li key={p.id} className="flex items-center justify-between gap-3">
                              <span className="min-w-0 truncate text-sm font-semibold text-[#c2521f]">{p.name}</span>
                              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${STOCK_STYLES[p.stock] ?? "bg-[#fdf8f0] text-[#a3421a]"}`}>{p.stock}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  </div>

                  <section>
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="text-lg font-black text-[#2e2117]">Recent Orders</h2>
                      <button onClick={() => setTab("orders")} className="text-sm font-bold text-brand-700 hover:text-brand-700">View all →</button>
                    </div>
                    {!loaded ? (
                      <p className="text-sm text-[#c2521f]">Loading orders…</p>
                    ) : recentOrders.length === 0 ? (
                      <EmptyState icon="📦" title="No orders yet" text="Place a test order from the shop to see it here." actionLabel="Go to shop" actionHref="/" />
                    ) : (
                      <div className="space-y-3">
                        {recentOrders.map((o) => (
                          <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#fdf8f0] p-4 shadow-sm ring-1 ring-[#e3d2b8]">
                            <div className="min-w-0">
                              <p className="font-black text-[#2e2117]">{o.id}</p>
                              <p className="truncate text-sm text-[#c2521f]">{o.name} · {o.email}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-black text-brand-700">{tk(o.total)}</span>
                              <span className="rounded-full bg-[#fdf8f0] px-3 py-1 text-xs font-bold text-[#c2521f]">{o.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                </div>
              )}

              {tab === "orders" && (
                <div className="space-y-5 pt-5">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h1 className="text-2xl font-black text-[#2e2117]">Orders</h1>
                      <p className="mt-1 text-sm text-[#c2521f]">{filteredOrders.length} order{filteredOrders.length === 1 ? "" : "s"} shown</p>
                    </div>
                    {(orderSearch.trim() || statusFilter !== "All") && (
                      <button onClick={() => { setOrderSearch(""); setStatusFilter("All"); }} className="rounded-full bg-[#fdf8f0] px-4 py-2 text-sm font-bold text-[#c2521f] ring-1 ring-[#e3d2b8] hover:bg-[#fdf8f0]">Clear filters ✕</button>
                    )}
                  </div>

                  <label className="relative block max-w-md">
                    <span className="sr-only">Search orders</span>
                    <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#c2521f]" aria-hidden="true">🔍</span>
                    <input
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      placeholder="Search by order id, name or email…"
                      className="w-full rounded-full border border-[#e3d2b8] bg-[#fdf8f0] py-2.5 pr-3 pl-9 text-sm outline-none focus:border-brand-400"
                    />
                  </label>

                  <FilterPills options={STATUS_OPTIONS} value={statusFilter} onChange={(v) => setStatusFilter(v as StatusFilter)} counts={statusCounts} />

                  {!loaded ? (
                    <p className="text-sm text-[#c2521f]">Loading orders…</p>
                  ) : filteredOrders.length === 0 ? (
                    <EmptyState icon="🔍" title={orders.length === 0 ? "No orders yet" : "No orders match your filters"} text={orders.length === 0 ? "Place a test order from the shop to see it here." : "Try a different search or status filter."} actionLabel={orders.length === 0 ? "Go to shop" : undefined} actionHref={orders.length === 0 ? "/" : undefined} />
                  ) : (
                    <div className="space-y-4">
                      {filteredOrders.map((o) => (
                        <OrderCard key={o.id} order={o} showCustomer statusEditable onStatusChange={updateStatus} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === "products" && (
                <div className="space-y-5 pt-5">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h1 className="text-2xl font-black text-[#2e2117]">Products</h1>
                      <p className="mt-1 text-sm text-[#c2521f]">{filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"} in the catalogue</p>
                    </div>
                    <button onClick={() => setShowAddNote((v) => !v)} className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600">+ Add Product</button>
                  </div>

                  {showAddNote && (
                    <p className="rounded-lg bg-brand-50 p-4 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
                      Adding products is not wired up yet — there is no backend to save a new product. The catalogue below is read-only for now.
                    </p>
                  )}

                  <label className="relative block max-w-md">
                    <span className="sr-only">Search products</span>
                    <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#c2521f]" aria-hidden="true">🔍</span>
                    <input
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search by product name or category…"
                      className="w-full rounded-full border border-[#e3d2b8] bg-[#fdf8f0] py-2.5 pr-3 pl-9 text-sm outline-none focus:border-brand-400"
                    />
                  </label>

                  {filteredProducts.length === 0 ? (
                    <EmptyState icon="🔍" title="No products found" text="Try a different search term." />
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredProducts.map((p) => (
                        <article key={p.id} className="overflow-hidden rounded-lg bg-[#fdf8f0] shadow-sm ring-1 ring-[#e3d2b8] transition hover:shadow-md">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.img} alt={p.name} loading="lazy" className="h-40 w-full object-cover" />
                          <div className="p-4">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="min-w-0 font-black text-[#2e2117]">{p.name}</h3>
                              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${STOCK_STYLES[p.stock] ?? "bg-[#fdf8f0] text-[#a3421a]"}`}>{p.stock}</span>
                            </div>
                            <p className="mt-1 text-xs font-semibold tracking-wide text-[#c2521f] uppercase">{p.category}</p>
                            <div className="mt-3 flex items-center justify-between">
                              <p className="font-black text-brand-700">{tk(p.price)} <span className="text-xs font-semibold text-[#c2521f] line-through">{tk(p.oldPrice)}</span></p>
                              <p className="text-sm font-bold text-[#c2521f]">⭐ {p.rating} <span className="font-normal text-[#c2521f]">({p.reviews})</span></p>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === "customers" && (
                <div className="space-y-5 pt-5">
                  <h1 className="text-2xl font-black text-[#2e2117]">Customers</h1>
                  <p className="text-sm text-[#c2521f]">Derived from orders placed in this browser. Guest checkouts are not listed here.</p>
                  {!loaded ? (
                    <p className="text-sm text-[#c2521f]">Loading customers…</p>
                  ) : customers.length === 0 ? (
                    <EmptyState icon="👥" title="No customers yet" text="When a signed-in customer places an order, they will appear here." actionLabel="Go to shop" actionHref="/" />
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {customers.map((c) => (
                        <article key={c.email} className="rounded-lg bg-[#fdf8f0] p-5 shadow-sm ring-1 ring-[#e3d2b8]">
                          <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-500 text-base font-black text-white">
                              {initials(c.name, c.email)}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate font-black text-[#2e2117]">{c.name}</p>
                              <p className="truncate text-sm text-[#c2521f]">{c.email}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between border-t border-[#fcd34d] pt-3 text-sm">
                            <span className="font-semibold text-[#c2521f]">{c.orders} order{c.orders === 1 ? "" : "s"}</span>
                            <span className="font-black text-brand-700">{tk(c.spent)}</span>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
