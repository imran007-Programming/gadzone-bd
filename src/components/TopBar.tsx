export default function TopBar() {
  return (
    <div className="relative overflow-hidden border-b border-brand-400/30 bg-gradient-to-r from-brand-600 via-popblue-600 to-gold-600 px-4 py-2.5 text-center text-xs font-bold tracking-wide text-white sm:text-sm">
      {/* drifting firefly flecks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(234, 88, 12, 0.4)_1px,transparent_1.5px)] [background-size:20px_20px]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-popblue-400/25 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand-400/25 blur-2xl" />
      <p className="relative">
        🎉 Eid Mega Sale — Extra 10% off with code{" "}
        <b className="rounded-md border border-popblue-300/60 bg-gradient-to-r from-popblue-600 to-popblue-500 px-3 py-0.5 font-black tracking-wide text-white shadow-[0_0_18px_-4px_rgba(217, 249, 157,0.8)]">
          GADZONE10
        </b>{" "}
        &nbsp;|&nbsp; Free delivery on orders over ৳2,000
      </p>
    </div>
  );
}
