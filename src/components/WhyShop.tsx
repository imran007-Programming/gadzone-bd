export default function WhyShop() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Why Us</span>
          <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Why Shop With GadZone BD?</h2>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { e: "💵", t: "Cash on Delivery", d: "Product hate peye payment korun. No advance needed." },
            { e: "🚚", t: "Fast Delivery", d: "Dhaka-te 24–48h, baire 2–4 din. 64 zela coverage." },
            { e: "🛡️", t: "Warranty", d: "Sob product-e 7 din replacement + service warranty." },
            { e: "↩️", t: "Easy Return", d: "Problem hole 7 diner moddhe easy return / exchange." },
          ].map((f) => (
            <div key={f.t} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">{f.e}</span><h3 className="mt-4 font-bold text-slate-900">{f.t}</h3><p className="mt-1 text-sm text-slate-500">{f.d}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}
