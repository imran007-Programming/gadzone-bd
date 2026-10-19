export default function TopBar() {
  return (
    <div className="relative overflow-hidden border-b-2 border-brand-950 bg-gradient-to-r from-brand-950 via-brand-800 to-brand-950 px-4 py-2.5 text-center text-xs font-bold tracking-wide text-white sm:text-sm">
      {/* twilight comet field: drifting violet sparks + ember glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(212,189,248,0.35)_1px,transparent_1.5px)] [background-size:20px_20px]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-gold/30 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand-400/30 blur-2xl" />
      <p className="relative">
        🎉 Eid Mega Sale — Extra 10% off with code{" "}
        <b className="rounded-xl bg-gradient-to-r from-gold-deep to-gold px-3 py-0.5 font-black tracking-wide text-white shadow-[0_0_16px_rgba(255,111,60,0.7)] ring-1 ring-gold-soft/70">
          GADZONE10
        </b>{" "}
        &nbsp;|&nbsp; Free delivery on orders over ৳2,000
      </p>
    </div>
  );
}
