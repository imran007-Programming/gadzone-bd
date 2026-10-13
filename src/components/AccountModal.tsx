"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type AccountModalProps = {
  open: boolean;
  onClose: () => void;
};

const pillInput =
  "w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20";

export default function AccountModal({ open, onClose }: AccountModalProps) {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [done, setDone] = useState(false);

  const close = () => {
    onClose();
    setDone(false);
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
            className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-2xl font-black text-slate-900">{mode === "login" ? "Login" : "Register"}</h3>
              <button onClick={close} className="text-2xl leading-none text-slate-400 hover:text-slate-900" aria-label="Close account dialog">×</button>
            </div>

            <div className="mt-4 flex rounded-full bg-slate-100 p-1">
              {(["login", "register"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setDone(false);
                  }}
                  className={`flex-1 rounded-full py-2 text-sm font-bold capitalize transition ${mode === m ? "bg-emerald-600 text-white shadow" : "text-slate-600"}`}
                >
                  {m === "login" ? "Log In" : "Register"}
                </button>
              ))}
            </div>

            {done ? (
              <p className="mt-6 rounded-2xl bg-emerald-50 p-4 text-center text-sm font-semibold text-emerald-700">
                Demo only — no account was created or signed in.
              </p>
            ) : mode === "login" ? (
              <form
                className="mt-5 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
              >
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-800">
                    Username or email address <span className="text-red-500">*</span>
                  </label>
                  <input required type="text" placeholder="Your username or email" className={pillInput} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-800">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input required type="password" placeholder="Your password" className={pillInput} />
                </div>
                <button type="submit" className="w-full rounded-full bg-emerald-600 py-3 font-bold text-white transition hover:bg-emerald-700">
                  Log In
                </button>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <input type="checkbox" className="h-4 w-4 accent-emerald-600" /> Remember me
                  </label>
                  <button type="button" className="font-semibold text-emerald-600">Lost your password?</button>
                </div>
              </form>
            ) : (
              <form
                className="mt-5 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
              >
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-800">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input required type="email" placeholder="Your email address" className={pillInput} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-800">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input required type="password" placeholder="Choose a password" className={pillInput} />
                </div>
                <p className="text-sm text-slate-500">
                  Registering lets you check your order status and history. Your details stay private and are only used to run your account.
                </p>
                <button type="submit" className="w-full rounded-full bg-emerald-600 py-3 font-bold text-white transition hover:bg-emerald-700">
                  Register
                </button>
              </form>
            )}

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-sm font-bold text-slate-900">OR</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>
            <p className="text-center text-sm text-slate-500">
              {mode === "login" ? "New here? Switch to Register above to create an account." : "Already have an account? Switch to Log In above."}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
