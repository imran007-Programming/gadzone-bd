export default function TopBar() {
  return (
    <div className="relative overflow-hidden border-b-2 border-[#e8d6ba] bg-gradient-to-r from-brand-200 via-brand-100 to-brand-200 px-4 py-2.5 text-center text-xs font-bold tracking-wide text-[#2e1065] sm:text-sm">
      {/* firefly haze: rising spark dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(34, 211, 238, 0.35)_1px,transparent_1.5px)] [background-size:20px_20px]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-gold/25 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-12 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand-500/25 blur-2xl" />
      <p className="relative">
        🎉 Eid Mega Sale — Extra 10% off with code{" "}
        <b className="rounded-md border-2 border-[#e8d6ba] bg-gradient-to-r from-gold-deep to-gold px-3 py-0.5 font-black tracking-wide text-[#2e1065] shadow-[0_10px_26px_-12px_rgba(34, 211, 238, 0.45)]">
          GADZONE10
        </b>{" "}
        &nbsp;|&nbsp; Free delivery on orders over ৳2,000
      </p>
    </div>
  );
}
