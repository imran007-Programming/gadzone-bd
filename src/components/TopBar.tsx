export default function TopBar() {
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-[#080d1a] px-4 py-2.5 text-center text-xs font-bold tracking-wide text-slate-200 sm:text-sm">
      {/* midnight bazaar: gold dust dot texture + glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(251,191,36,0.28)_1px,transparent_1.5px)] [background-size:20px_20px]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand-500/25 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand-400/20 blur-2xl" />
      <p className="relative">
        🎉 Eid Mega Sale — Extra 10% off with code{" "}
        <b className="rounded-full bg-gradient-to-r from-brand-300 to-brand-500 px-3 py-0.5 font-black tracking-wide text-[#0a0f1e] shadow-[0_0_16px_rgba(251,191,36,0.55)]">
          GADZONE10
        </b>{" "}
        &nbsp;|&nbsp; Free delivery on orders over ৳2,000
      </p>
    </div>
  );
}
