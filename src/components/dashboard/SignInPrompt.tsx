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
    <div className="mx-auto max-w-md rounded-lg bg-[#faf6ee] p-8 text-center shadow-sm ring-1 ring-[#2a2545]">
      <p className="text-4xl" aria-hidden="true">👋</p>
      <h1 className="mt-3 text-2xl font-black text-[#92400e]">{title}</h1>
      <p className="mt-2 text-sm text-[#7d7896]">{text}</p>
      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-[#faf6ee] py-3 font-bold text-[#7d7896] shadow-sm transition hover:bg-[#faf6ee]"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#faf6ee] text-base font-black shadow">G</span>
        Continue with Google
      </button>
      <Link href="/" className="mt-4 inline-block text-sm font-bold text-brand-600">← Back to shop</Link>
    </div>
  );
}
