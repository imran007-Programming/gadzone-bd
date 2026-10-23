"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

type AccountModalProps = {
  open: boolean;
  onClose: () => void;
};

const SETUP_MSG =
  "Google login setup baki — Google Cloud Console theke Client ID / Secret niye .env.local e bosate hobe.";

export default function AccountModal({ open, onClose }: AccountModalProps) {
  const reduce = useReducedMotion();
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const close = () => {
    onClose();
    setError("");
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await signIn("google", { redirect: false, callbackUrl: "/dashboard" });
      if (res?.error) {
        setError(SETUP_MSG);
      } else if (res?.url) {
        window.location.href = res.url;
      }
    } catch {
      setError(SETUP_MSG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
          onClick={close}
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-[#e7e5e4] bg-white p-6 shadow-2xl sm:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-2xl font-black text-[#1c1917]">My Account</h3>
              <button onClick={close} className="text-2xl leading-none text-[#1c1917] hover:text-[#1c1917]" aria-label="Close account dialog">×</button>
            </div>

            {status === "loading" ? (
              <p className="mt-6 text-center text-sm text-[#1c1917]">Checking your session…</p>
            ) : session?.user ? (
              <div className="mt-5">
                <div className="flex items-center gap-3 rounded-lg bg-white p-4 ring-1 ring-[#e7e5e4]">
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt="" className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-black text-white">
                      {(session.user.name ?? session.user.email ?? "G").slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-bold text-[#1c1917]">{session.user.name ?? "Signed in"}</p>
                    <p className="truncate text-sm text-[#1c1917]">{session.user.email}</p>
                    <span className="mt-1 inline-block rounded-full bg-brand-400/15 px-2.5 py-0.5 text-xs font-bold text-brand-700 ring-1 ring-brand-400/30 capitalize">{session.user.role ?? "customer"}</span>
                  </div>
                </div>
                <Link href="/dashboard" onClick={close} className="mt-4 block rounded-full bg-gradient-to-r from-brand-500 to-brand-700 py-3 text-center font-bold text-white shadow-[0_8px_24px_-8px_rgba(249, 115, 22, 0.4)] transition hover:brightness-110 active:scale-[0.99]">
                  Go to My Dashboard
                </Link>
                {session.user.role === "admin" && (
                  <Link href="/admin" onClick={close} className="mt-3 block rounded-full bg-white py-3 text-center font-black text-brand-600 shadow-sm ring-1 ring-brand-400/40 transition hover:bg-white active:scale-[0.99]">
                    Go to Admin Dashboard
                  </Link>
                )}
                <button onClick={() => signOut({ callbackUrl: "/" })} className="mt-3 w-full rounded-full border border-[#e7e5e4] py-3 font-bold text-[#1c1917] shadow-sm transition hover:bg-white active:scale-[0.99]">
                  Sign out
                </button>
              </div>
            ) : (
              <div className="mt-5">
                <p className="text-sm text-[#1c1917]">
                  Sign in with Google to track your orders and view your dashboard. No password needed.
                </p>
                <button
                  onClick={handleGoogle}
                  disabled={loading}
                  className="mt-4 flex w-full items-center justify-center gap-3 rounded-full border border-[#e7e5e4] bg-white py-3 font-bold text-[#1c1917] shadow-sm ring-1 ring-[#e7e5e4] transition hover:bg-white active:scale-[0.99] disabled:opacity-60"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-base font-black text-[#1c1917] shadow">G</span>
                  {loading ? "Connecting to Google…" : "Continue with Google"}
                </button>
                {error && (
                  <p className="mt-4 rounded-lg bg-brand-400/10 p-4 text-center text-sm font-semibold text-brand-700 ring-1 ring-brand-400/30">{error}</p>
                )}
                <p className="mt-4 text-center text-xs text-[#1c1917]">
                  By continuing you agree to use your Google profile only for sign-in on this store.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
