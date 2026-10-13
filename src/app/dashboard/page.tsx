"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { loadOrders } from "@/lib/orders";
import { tk } from "@/lib/format";
import type { StoredOrder } from "@/types";

const statusStyles: Record<StoredOrder["status"], string> = {
  Processing: "bg-amber-100 text-amber-800",
  Shipped: "bg-sky-100 text-sky-800",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [loaded, setLoaded] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (status === "authenticated") {
      const email = session?.user?.email?.toLowerCase() ?? "";
      setOrders(loadOrders().filter((o) => o.email.toLowerCase() === email));
      setLoaded(true);
    }
  }, [status, session]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const totalSpent = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((s, o) => s + o.total, 0);

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-black text-white">G</span>
            <span className="text-lg font-black tracking-tight">Gad<span className="text-emerald-600">Zone</span> BD</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="rounded-full px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-100">Shop</Link>
            {session?.user?.role === "admin" && (
              <Link href="/admin" className="rounded-full bg-amber-400 px-3 py-1.5 text-sm font-black text-slate-950 hover:bg-amber-300">Admin</Link>
            )}
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
            <h1 className="text-2xl font-black">My Dashboard</h1>
            <p className="mt-2 text-sm text-slate-600">Sign in with Google to view your profile and order history.</p>
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white py-3 font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-base font-black shadow">G</span>
              Continue with Google
            </button>
            <Link href="/" className="mt-4 inline-block text-sm font-bold text-emerald-600">← Back to shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center">
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt="" className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-2xl font-black text-white">
                  {(session.user.name ?? session.user.email ?? "G").slice(0, 1).toUpperCase()}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-2xl font-black">{session.user.name ?? "Welcome back"}</h1>
                <p className="truncate text-sm text-slate-500">{session.user.email}</p>
                <span className="mt-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 capitalize">{session.user.role ?? "customer"}</span>
              </div>
              <Link href="/" className="rounded-full bg-emerald-600 px-5 py-2.5 text-center text-sm font-bold text-white transition hover:bg-emerald-700">Continue Shopping</Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">Total Orders</p>
                <p className="mt-1 text-3xl font-black">{loaded ? orders.length : "—"}</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">Total Spent</p>
                <p className="mt-1 text-3xl font-black text-emerald-600">{loaded ? tk(totalSpent) : "—"}</p>
              </div>
            </div>

            <h2 className="mt-8 text-xl font-black">My Orders</h2>
            {!loaded ? (
              <p className="mt-3 text-slate-500">Loading orders…</p>
            ) : orders.length === 0 ? (
              <div className="mt-3 rounded-3xl bg-white p-8 text-center shadow-sm">
                <p className="text-4xl">📦</p>
                <p className="mt-2 font-bold">No orders yet</p>
                <p className="mt-1 text-sm text-slate-500">When you place an order while signed in, it will show up here.</p>
                <Link href="/" className="mt-4 inline-block rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white">Shop now</Link>
              </div>
            ) : (
              <div className="mt-3 space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="rounded-3xl bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-black">{o.id}</p>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[o.status]}`}>{o.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {new Date(o.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {o.payment} · Delivery to {o.district}
                    </p>
                    <ul className="mt-3 space-y-1 text-sm">
                      {o.items.map((it, i) => (
                        <li key={i} className="flex justify-between gap-3">
                          <span className="truncate">{it.name} × {it.qty}</span>
                          <span className="font-semibold">{tk(it.price * it.qty)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-sm font-bold">
                      <span>Total</span>
                      <span className="text-emerald-600">{tk(o.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
