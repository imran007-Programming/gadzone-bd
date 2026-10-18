export default function TopBar() {
  return (
    <div className="relative overflow-hidden border-b border-brand-700 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700 px-4 py-2.5 text-center text-xs font-bold tracking-wide text-white sm:text-sm">
      {/* rose garden: white starfield dot texture + soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.28)_1px,transparent_1.5px)] [background-size:20px_20px]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-[#ffffff]/15 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-[#ffffff]/10 blur-2xl" />
      <p className="relative">
        🎉 Eid Mega Sale — Extra 10% off with code{" "}
        <b className="rounded-full bg-[#420e20] px-3 py-0.5 font-black tracking-wide text-brand-300 shadow-[0_0_16px_rgba(232,85,138,0.55)] ring-1 ring-brand-400/60">
          GADZONE10
        </b>{" "}
        &nbsp;|&nbsp; Free delivery on orders over ৳2,000
      </p>
    </div>
  );
}
