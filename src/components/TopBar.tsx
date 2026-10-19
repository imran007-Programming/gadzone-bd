export default function TopBar() {
  return (
    <div className="relative overflow-hidden border-b-2 border-gold-deep bg-gradient-to-r from-brand-800 via-brand-700 to-brand-800 px-4 py-2.5 text-center text-xs font-bold tracking-wide text-white sm:text-sm">
      {/* neon night market: drifting gold fireflies + warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(191,219,254,0.32)_1px,transparent_1.5px)] [background-size:20px_20px]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-gold/25 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-gold/15 blur-2xl" />
      <p className="relative">
        🎉 Eid Mega Sale — Extra 10% off with code{" "}
        <b className="rounded-xl bg-gradient-to-r from-gold-deep to-gold px-3 py-0.5 font-black tracking-wide text-brand-950 shadow-[0_0_16px_rgba(251,146,60,0.65)] ring-1 ring-gold-soft/60">
          GADZONE10
        </b>{" "}
        &nbsp;|&nbsp; Free delivery on orders over ৳2,000
      </p>
    </div>
  );
}
