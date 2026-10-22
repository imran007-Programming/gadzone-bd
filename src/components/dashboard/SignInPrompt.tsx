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
    <div className="mx-auto max-w-md rounded-lg bg-[#0d1024] p-8 text-center shadow-sm ring-1 ring-[#232b55]">
      <p className="text-4xl" aria-hidden="true">👋</p>
      <h1 className="mt-3 text-2xl font-black text-[#2e1065]">{title}</h1>
      <p className="mt-2 text-sm text-[#8b93bd]">{text}</p>
      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-[#0d1024] py-3 font-bold text-[#8b93bd] shadow-sm transition hover:bg-[#0d1024]"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0d1024] text-base font-black shadow">G</span>
        Continue with Google
      </button>
      <Link href="/" className="mt-4 inline-block text-sm font-bold text-brand-400">← Back to shop</Link>
    </div>
  );
}
