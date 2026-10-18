export default function TopBar() {
  return (
    <div
      className="border-b-2 border-brand-800 px-4 py-2.5 text-center text-xs font-bold tracking-wide text-brand-50 sm:text-sm"
      style={{
        backgroundColor: "#371a05",
        backgroundImage:
          "repeating-linear-gradient(-45deg, rgba(237,183,108,0.14) 0px, rgba(237,183,108,0.14) 6px, transparent 6px, transparent 14px)",
      }}
    >
      🎉 Eid Mega Sale — Extra 10% off with code <b className="rounded-md bg-brand-300 px-2.5 py-0.5 font-black text-brand-950">GADZONE10</b> &nbsp;|&nbsp; Free delivery on orders over ৳2,000
    </div>
  );
}
