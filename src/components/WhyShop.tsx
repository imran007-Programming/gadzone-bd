export default function WhyShop() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-2xl font-black">Why Shop With GadZone BD?</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { e: "💵", t: "Cash on Delivery", d: "Product hate peye payment korun. No advance needed." },
            { e: "🚚", t: "Fast Delivery", d: "Dhaka-te 24–48h, baire 2–4 din. 64 zela coverage." },
            { e: "🛡️", t: "Warranty", d: "Sob product-e 7 din replacement + service warranty." },
            { e: "↩️", t: "Easy Return", d: "Problem hole 7 diner moddhe easy return / exchange." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl bg-white p-6 text-center shadow-sm"><span className="text-4xl">{f.e}</span><h3 className="mt-3 font-bold">{f.t}</h3><p className="mt-1 text-sm text-gray-500">{f.d}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}
