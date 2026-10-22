"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

type SignInPromptProps = {
  title: string;
  text: string;
  callbackUrl: string;
};

export default function SignInPrompt({ title, text, callbackUrl }: SignInPromptProps) {
  return (
    <div className="mx-auto max-w-md rounded-lg bg-[#f2f7fb] p-8 text-center shadow-sm ring-1 ring-[#c9cffb]">
      <p className="text-4xl" aria-hidden="true">👋</p>
      <h1 className="mt-3 text-2xl font-black text-[#12233d]">{title}</h1>
      <p className="mt-2 text-sm text-[#9db3c4]">{text}</p>
      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-[#f2f7fb] py-3 font-bold text-[#9db3c4] shadow-sm transition hover:bg-[#f2f7fb]"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f2f7fb] text-base font-black shadow">G</span>
        Continue with Google
      </button>
      <Link href="/" className="mt-4 inline-block text-sm font-bold text-brand-700">← Back to shop</Link>
    </div>
  );
}
