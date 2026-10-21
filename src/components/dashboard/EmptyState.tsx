"use client";

import Link from "next/link";

type EmptyStateProps = {
  icon: string;
  title: string;
  text: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
};

export default function EmptyState({ icon, title, text, actionLabel, actionHref, onAction }: EmptyStateProps) {
  return (
    <div className="rounded-2xl bg-[#fdfcf6] p-8 text-center shadow-sm ring-1 ring-[#d3e7d8]">
      <p className="text-4xl" aria-hidden="true">{icon}</p>
      <p className="mt-3 font-black text-[#1e2b25]">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-[#67776e]">{text}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="mt-4 inline-block rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600">
          {actionLabel}
        </Link>
      )}
      {actionLabel && !actionHref && onAction && (
        <button onClick={onAction} className="mt-4 inline-block rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
