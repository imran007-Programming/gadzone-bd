"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { PRODUCTS } from "@/data/products";
import { loadOrders, saveOrders } from "@/lib/orders";
import { tk } from "@/lib/format";
import type { OrderStatus, StoredOrder } from "@/types";

const STATUSES: OrderStatus[] = ["Processing", "Shipped", "Delivered", "Cancelled"];

const statusStyles: Record<OrderStatus, string> = {
  Processing: "bg-amber-100 text-amber-800",
  Shipped: "bg-sky-100 text-sky-800",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [loaded, setLoaded] = useState(false);

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
  const customers = new Set(orders.map((o) => o.email.toLowerCase()).filter((e) => e !== "guest")).size;

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-black text-white">G</span>
            <span className="text-lg font-black tracking-tight">Gad<span className="text-emerald-600">Zone</span> BD <span className="rounded-full bg-amber-400 px-2 py-0.5 text-xs font-black text-slate-950">Admin</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="rounded-full px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-100">My Dashboard</Link>
            <Link href="/" className="rounded-full px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-100">Shop</Link>
            {session && (
              <button onClick={() => signOut({ callbackUrl: "/" })} className="rounded-full px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-100">Sign out</button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {status === "loading" ? (
          <p className="text-center text-slate-500">Checking your session…</p>
        ) : !session?.user ? (
          <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-black">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-slate-600">Sign in with Google to continue. Only admin accounts can view this page.</p>
            <button
              onClick={() => signIn("google", { callbackUrl: "/admin" })}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white py-3 font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-base font-black shadow">G</span>
              Continue with Google
            </button>
            <Link href="/" className="mt-4 inline-block text-sm font-bold text-emerald-600">← Back to shop</Link>
          </div>
        ) : session.user.role !== "admin" ? (
          <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
            <p className="text-4xl">🔒</p>
            <h1 className="mt-2 text-2xl font-black">Access denied — admin only</h1>
            <p className="mt-2 text-sm text-slate-600">You are signed in as {session.user.email}, but this account does not have admin access.</p>
            <Link href="/" className="mt-5 inline-block rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white">Back to Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl font-black">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-slate-500">Signed in as {session.user.email}</p>
              </div>
              <p className="max-w-md rounded-2xl bg-amber-50 p-3 text-xs font-semibold text-amber-800">
                Demo data — orders are stored in this browser only (localStorage). A real database is needed for multi-device / multi-user orders.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "Total Products", value: String(PRODUCTS.length) },
                { label: "Total Orders", value: loaded ? String(orders.length) : "—" },
                { label: "Total Revenue", value: loaded ? tk(revenue) : "—" },
                { label: "Total Customers", value: loaded ? String(customers) : "—" },
              ].map((s) => (
                <div key={s.label} className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">{s.label}</p>
                  <p className="mt-1 text-3xl font-black">{s.value}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-8 text-xl font-black">Orders</h2>
            {!loaded ? (
              <p className="mt-3 text-slate-500">Loading orders…</p>
            ) : orders.length === 0 ? (
              <p className="mt-3 rounded-3xl bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
                No orders yet in this browser. Place a test order from the shop to see it here.
              </p>
            ) : (
              <div className="mt-3 overflow-x-auto rounded-3xl bg-white shadow-sm">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                      <th className="px-4 py-3">Order</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Items</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-4 py-3">Payment</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-slate-50 last:border-0">
                        <td className="px-4 py-3">
                          <p className="font-bold">{o.id}</p>
                          <p className="text-xs text-slate-500">{new Date(o.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-semibold">{o.name}</p>
                          <p className="text-xs text-slate-500">{o.email}</p>
                        </td>
                        <td className="px-4 py-3">{o.items.reduce((s, it) => s + it.qty, 0)} item(s)</td>
                        <td className="px-4 py-3 font-bold">{tk(o.total)}</td>
                        <td className="px-4 py-3">{o.payment}</td>
                        <td className="px-4 py-3">
                          <select
                            value={o.status}
                            onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                            className={`rounded-full px-2 py-1 text-xs font-bold outline-none ${statusStyles[o.status]}`}
                            aria-label={`Status for order ${o.id}`}
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <h2 className="mt-8 text-xl font-black">Products</h2>
            <div className="mt-3 overflow-x-auto rounded-3xl bg-white shadow-sm">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((p) => (
                    <tr key={p.id} className="border-b border-slate-50 last:border-0">
                      <td className="px-4 py-3 font-semibold">{p.name}</td>
                      <td className="px-4 py-3 text-slate-600">{p.category}</td>
                      <td className="px-4 py-3 font-bold">{tk(p.price)}</td>
                      <td className="px-4 py-3">{p.stock}</td>
                      <td className="px-4 py-3">⭐ {p.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
