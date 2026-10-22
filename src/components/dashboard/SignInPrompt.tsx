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
    <div className="mx-auto max-w-md rounded-lg bg-[#2b1a10] p-8 text-center shadow-sm ring-1 ring-[#1e40af]">
      <p className="text-4xl" aria-hidden="true">👋</p>
      <h1 className="mt-3 text-2xl font-black text-[#fbf3e6]">{title}</h1>
      <p className="mt-2 text-sm text-[#a68b74]">{text}</p>
      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-[#2b1a10] py-3 font-bold text-[#a68b74] shadow-sm transition hover:bg-[#2b1a10]"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2b1a10] text-base font-black shadow">G</span>
        Continue with Google
      </button>
      <Link href="/" className="mt-4 inline-block text-sm font-bold text-brand-700">← Back to shop</Link>
    </div>
  );
}
