export default function TopBar() {
  return (
    <div className="relative overflow-hidden border-b border-brand-400/20 bg-gradient-to-r from-[#052e2a] via-[#ffffff] to-[#052e2a] px-4 py-2.5 text-center text-xs font-bold tracking-wide text-[#07302b] sm:text-sm">
      {/* roast glow dust: drifting caramel sparks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(238,203,150,0.35)_1px,transparent_1.5px)] [background-size:20px_20px]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-gold/25 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand-400/25 blur-2xl" />
      <p className="relative">
        🎉 Eid Mega Sale — Extra 10% off with code{" "}
        <b className="rounded-full bg-gradient-to-r from-gold-deep to-gold px-3 py-0.5 font-black tracking-wide text-white shadow-[0_0_16px_rgba(245, 158, 11,0.7)] ring-1 ring-gold-soft/70">
          GADZONE10
        </b>{" "}
        &nbsp;|&nbsp; Free delivery on orders over ৳2,000
      </p>
    </div>
  );
}
