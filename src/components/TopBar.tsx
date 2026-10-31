export default function TopBar() {
  return (
    <div className="relative overflow-hidden border-b-2 border-brand-800 bg-brand-600 px-4 py-2.5 text-center text-xs font-bold tracking-wide text-white sm:text-sm">
      {/* drifting signal-dust flecks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(15,23,42, 0.35)_1px,transparent_1.5px)] [background-size:20px_20px]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand-500/30 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand-500/30 blur-2xl" />
      <p className="relative">
        🎉 Eid Mega Sale — Extra 10% off with code{" "}
        <b className="rounded-sm border border-white/60 bg-white px-3 py-0.5 font-black tracking-wide text-[#c2410c] shadow-[2px_2px_0_#431407]">
          GADZONE10
        </b>{" "}
        &nbsp;|&nbsp; Free delivery on orders over ৳2,000
      </p>
    </div>
  );
}
