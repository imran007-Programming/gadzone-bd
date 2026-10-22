export default function TopBar() {
  return (
    <div className="relative overflow-hidden border-b border-brand-400/30 bg-gradient-to-r from-[#0c3a52] via-[#0f2c46] to-[#2e1065] px-4 py-2.5 text-center text-xs font-bold tracking-wide text-ink sm:text-sm">
      {/* drifting plankton flecks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(56,213,245,0.4)_1px,transparent_1.5px)] [background-size:20px_20px]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-popblue-400/25 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand-400/25 blur-2xl" />
      <p className="relative">
        🎉 Eid Mega Sale — Extra 10% off with code{" "}
        <b className="rounded-md border border-popblue-300/60 bg-gradient-to-r from-popblue-500 to-popblue-400 px-3 py-0.5 font-black tracking-wide text-[#0c1a02] shadow-[0_0_18px_-4px_rgba(163,230,53,0.8)]">
          GADZONE10
        </b>{" "}
        &nbsp;|&nbsp; Free delivery on orders over ৳2,000
      </p>
    </div>
  );
}
