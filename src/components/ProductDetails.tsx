"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PRODUCTS, type Product } from "@/data/products";
import { tk, discountPct } from "@/lib/format";
import ProductCard from "./ProductCard";
import Stars from "./Stars";

type ProductDetailsProps = {
  product: Product;
  district: string;
  onBack: () => void;
  onHome: () => void;
  onCategory: (category: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (id: number, qty: number, buyNow?: boolean) => void;
};

const GALLERY_VIEWS = [
  { label: "Front", position: "50% 50%", zoom: "scale-100" },
  { label: "Detail", position: "50% 30%", zoom: "scale-125" },
  { label: "Angle", position: "50% 70%", zoom: "scale-110" },
] as const;

const COLOURS = ["Black", "White", "Silver"];
const OPTIONS = ["Standard", "With Accessories"];
const TABS = ["Description", "Additional Information", "Shipping & Delivery"] as const;

export default function ProductDetails({
  product: p,
  district,
  onBack,
  onHome,
  onCategory,
  onSelectProduct,
  onAddToCart,
}: ProductDetailsProps) {
  const reduce = useReducedMotion();
  const [view, setView] = useState(0);
  const [colour, setColour] = useState("Black");
  const [option, setOption] = useState("Standard");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Description");
  const [imgErr, setImgErr] = useState(false);

  // Parent remounts this component per product (key={product.id}), so local
  // state already starts fresh. The effect only syncs scroll position.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [p.id]);

  const related = useMemo(
    () => PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4),
    [p.id, p.category]
  );

  const activeView = GALLERY_VIEWS[view];

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mx-auto max-w-7xl px-4 pb-44 pt-4 md:pb-28"
    >
      {/* Breadcrumb + back */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button onClick={onBack} className="rounded-full border border-[#f4e4c6] bg-[#fffdfb] px-3 py-1.5 font-semibold text-[#8a6f5c] shadow-sm transition hover:border-brand-400/50 hover:text-brand-800">
          ← Back
        </button>
        <button onClick={onHome} className="text-[#8a6f5c] hover:text-brand-800">Home</button>
        <span className="text-[#8a6f5c]">/</span>
        <button onClick={() => onCategory(p.category)} className="text-[#8a6f5c] hover:text-brand-800">{p.category}</button>
        <span className="text-[#8a6f5c]">/</span>
        <span className="max-w-56 truncate font-semibold text-[#2b1d14] sm:max-w-none">{p.name}</span>
      </div>

      <div className="mt-5 grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden rounded-[2rem] border border-[#f4e4c6] bg-[#fffdfb] shadow-[0_20px_50px_-16px_rgba(33,26,18,0.25)]">
            {imgErr ? (
              <div className="flex h-80 items-center justify-center bg-gradient-to-br from-brand-100 via-brand-50 to-brand-100 sm:h-96">
                <span className="text-6xl">🔌</span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.img}
                alt={p.name}
                onError={() => setImgErr(true)}
                style={{ objectPosition: activeView.position }}
                className={`h-80 w-full object-cover transition-transform duration-500 sm:h-96 ${activeView.zoom}`}
              />
            )}
            {p.badge && (
              <span className="absolute left-0 top-4 -skew-x-6 rounded-r-md bg-[#7c2d12] px-3 py-1 text-xs font-black uppercase tracking-wide text-white shadow">
                {p.badge}
              </span>
            )}
            {discountPct(p) > 0 && (
              <span className="absolute right-0 top-4 skew-x-6 rounded-l-md bg-brand-700 px-3 py-1 text-xs font-black text-white shadow">
                -{discountPct(p)}% OFF
              </span>
            )}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {GALLERY_VIEWS.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setView(i)}
                aria-label={`View ${v.label}`}
                className={`overflow-hidden rounded-2xl bg-[#fffdfb] shadow-sm ring-2 transition ${view === i ? "ring-brand-400" : "ring-[#f4e4c6] hover:ring-brand-400/40"}`}
              >
                {imgErr ? (
                  <div className="flex h-20 items-center justify-center bg-gradient-to-br from-brand-100 via-brand-50 to-brand-100"><span className="text-2xl">🔌</span></div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.img}
                    alt={`${p.name} — ${v.label} view`}
                    style={{ objectPosition: v.position }}
                    className={`h-20 w-full object-cover ${v.zoom}`}
                  />
                )}
                <span className="block py-1 text-center text-[11px] font-semibold text-[#8a6f5c]">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Info column */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-800">{p.category}</p>
          <h1 className="mt-1 text-2xl font-black leading-tight tracking-tight text-[#2b1d14] sm:text-3xl">{p.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Stars rating={p.rating} />
            <span className="text-sm text-[#8a6f5c]">{p.rating} ({p.reviews.toLocaleString()} reviews)</span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-brand-400/30 ${p.stock === "In Stock" ? "bg-brand-400/10 text-brand-800" : "bg-brand-400/10 text-brand-800"}`}>
              {p.stock === "In Stock" ? "● In Stock" : "⚠ " + p.stock}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-end gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-brand-800">{tk(p.price)}</span>
            <span className="text-lg text-[#8a6f5c] line-through">{tk(p.oldPrice)}</span>
            <span className="rounded-full bg-brand-400/10 px-3 py-1 text-xs font-bold text-brand-800 ring-1 ring-brand-400/30">You save {tk(p.oldPrice - p.price)}</span>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-[#8a6f5c]">{p.desc}</p>

          <ul className="mt-4 space-y-1.5">
            {p.specs.map((s) => (
              <li key={s} className="text-sm text-[#8a6f5c]">✓ {s}</li>
            ))}
          </ul>

          {/* Variant selectors (demo only) */}
          <div className="mt-6 space-y-4">
            <div>
              <p className="mb-2 text-sm font-bold text-[#2b1d14]">Colour: <span className="font-medium text-[#8a6f5c]">{colour}</span></p>
              <div className="flex flex-wrap gap-2">
                {COLOURS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColour(c)}
                    aria-pressed={colour === c}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${colour === c ? "border-brand-400/60 bg-brand-400/10 text-brand-700 ring-1 ring-brand-400/40" : "border-[#f4e4c6] bg-[#fffdfb] text-[#8a6f5c] hover:border-brand-400/50"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-bold text-[#2b1d14]">Option: <span className="font-medium text-[#8a6f5c]">{option}</span></p>
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map((o) => (
                  <button
                    key={o}
                    onClick={() => setOption(o)}
                    aria-pressed={option === o}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${option === o ? "border-brand-400/60 bg-brand-400/10 text-brand-700 ring-1 ring-brand-400/40" : "border-[#f4e4c6] bg-[#fffdfb] text-[#8a6f5c] hover:border-brand-400/50"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity + actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-[#f4e4c6] bg-[#fffdfb] text-[#2b1d14]">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-lg" aria-label="Decrease quantity">−</button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(Math.min(99, qty + 1))} className="px-4 py-3 text-lg" aria-label="Increase quantity">+</button>
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => onAddToCart(p.id, qty)} className="rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-7 py-3 font-bold text-white shadow-[0_8px_24px_-8px_rgba(180,83,42,0.4)] transition hover:brightness-110">
              Add To Cart
            </motion.button>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => onAddToCart(p.id, qty, true)} className="rounded-full bg-[#fffdfb] px-7 py-3 font-bold text-[#2b1d14] transition ring-1 ring-brand-400/40 hover:bg-[#f3e2c9]">
              Buy Now
            </motion.button>
          </div>

          {/* Delivery box */}
          <div className="mt-6 rounded-2xl border border-[#f4e4c6] bg-[#fffdfb] p-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#2b1d14]">🚚 Delivery & Returns</h2>
            <ul className="mt-2 space-y-1.5 text-sm text-[#8a6f5c]">
              <li>Cash on Delivery available across Bangladesh.</li>
              <li>{district === "Dhaka" ? "Inside Dhaka: ৳60" : "Outside Dhaka: ৳120"} · Free delivery on orders over ৳2,000.</li>
              <li>Fast dispatch — Inside Dhaka 1–3 days, outside Dhaka 2–4 days.</li>
              <li>7-day easy return on unused products in original packaging.</li>
              <li>Warranty support on every GadZone BD order.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 rounded-2xl border border-[#f4e4c6] bg-[#fffdfb] p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap gap-2 border-b border-[#f4e4c6] pb-3" role="tablist" aria-label="Product information">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${tab === t ? "bg-gradient-to-r from-brand-500 to-brand-700 text-white" : "bg-[#fffdfb] text-[#8a6f5c] hover:bg-brand-400/10 hover:text-brand-800"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="pt-4 text-[15px] leading-relaxed text-[#8a6f5c]"
          >
            {tab === "Description" && (
              <div className="space-y-3">
                <p>{p.desc}</p>
                <p>
                  Every GadZone BD order is checked before dispatch, so your {p.name.toLowerCase()} arrives in
                  good condition and ready to use. The specs above cover the key details — if you need help
                  choosing the right option, message our support team before ordering and we will guide you.
                </p>
                <p>
                  This product is covered by our 7-day easy return policy on unused items in original
                  packaging, plus warranty support from GadZone BD.
                </p>
              </div>
            )}
            {tab === "Additional Information" && (
              <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                <div className="flex justify-between border-b border-[#f4e4c6] py-2"><dt className="font-semibold text-[#2b1d14]">Category</dt><dd>{p.category}</dd></div>
                <div className="flex justify-between border-b border-[#f4e4c6] py-2"><dt className="font-semibold text-[#2b1d14]">Availability</dt><dd>{p.stock}</dd></div>
                <div className="flex justify-between border-b border-[#f4e4c6] py-2"><dt className="font-semibold text-[#2b1d14]">Rating</dt><dd>{p.rating} / 5 ({p.reviews.toLocaleString()} reviews)</dd></div>
                <div className="flex justify-between border-b border-[#f4e4c6] py-2"><dt className="font-semibold text-[#2b1d14]">In the box</dt><dd>Product + quick-start guide</dd></div>
                <div className="flex justify-between border-b border-[#f4e4c6] py-2"><dt className="font-semibold text-[#2b1d14]">Payment</dt><dd>COD, bKash, Nagad, Card</dd></div>
                <div className="flex justify-between border-b border-[#f4e4c6] py-2"><dt className="font-semibold text-[#2b1d14]">Warranty</dt><dd>7-day easy return + warranty support</dd></div>
              </dl>
            )}
            {tab === "Shipping & Delivery" && (
              <div className="space-y-3">
                <p>We deliver to all 64 districts of Bangladesh with Cash on Delivery.</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>Inside Dhaka: ৳60 — delivery in 1–3 working days.</li>
                  <li>Outside Dhaka: ৳120 — delivery in 2–4 working days.</li>
                  <li>Free delivery on orders over ৳2,000 (after any promo discount).</li>
                  <li>Please check your product at delivery time and keep the packaging until you have tested it.</li>
                </ul>
                <p>For returns or delivery questions, contact GadZone BD support from the Help section.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-800">You may also like</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-[#2b1d14]">Related Products</h2>
            </div>
            <button onClick={() => onCategory(p.category)} className="rounded-full border border-[#f4e4c6] bg-[#fffdfb] px-4 py-2 text-sm font-semibold text-[#8a6f5c] transition hover:border-brand-400/50 hover:text-brand-800">
              All {p.category} →
            </button>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((r, i) => (
              <ProductCard key={r.id} product={r} onQuickView={onSelectProduct} onAddToCart={(id) => onAddToCart(id, 1)} delay={i * 0.05} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-16 z-40 border-t border-[#f4e4c6] bg-[#fffdfb]/95 shadow-[0_-8px_24px_rgba(0,0,0,0.4)] backdrop-blur md:bottom-0">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          {imgErr ? (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 via-brand-50 to-brand-100"><span className="text-xl">🔌</span></div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.img} alt="" aria-hidden className="h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-[#f4e4c6]" onError={() => setImgErr(true)} />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-[#2b1d14]">{p.name}</p>
            <p className="text-sm font-extrabold text-brand-800">{tk(p.price)} <span className="text-xs font-medium text-[#8a6f5c] line-through">{tk(p.oldPrice)}</span></p>
          </div>
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => onAddToCart(p.id, qty)} className="shrink-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110 sm:px-6">
            Add to Cart
          </motion.button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => onAddToCart(p.id, qty, true)} className="hidden shrink-0 rounded-full bg-[#fffdfb] px-5 py-2.5 text-sm font-bold text-[#2b1d14] transition ring-1 ring-brand-400/40 hover:bg-[#f3e2c9] sm:block">
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
