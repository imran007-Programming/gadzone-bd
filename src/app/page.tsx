"use client";

import { useEffect, useMemo, useState } from "react";
import { PRODUCTS, FLASH_IDS, BESTSELLER_IDS, type Product } from "@/data/products";
import { discountPct } from "@/lib/format";
import type { CartItem, SortKey, PayMethod, CheckoutForm, Countdown } from "@/types";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FlashDeals from "@/components/FlashDeals";
import BestSellers from "@/components/BestSellers";
import ShopSection from "@/components/ShopSection";
import WhyShop from "@/components/WhyShop";
import FaqSection from "@/components/FaqSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import QuickViewModal from "@/components/QuickViewModal";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import Toast from "@/components/Toast";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sort, setSort] = useState<SortKey>("featured");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [qvQty, setQvQty] = useState(1);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState<number>(0);
  const [promoMsg, setPromoMsg] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [payMethod, setPayMethod] = useState<PayMethod>("COD");
  const [form, setForm] = useState<CheckoutForm>({ name: "", phone: "", address: "" });
  const [orderId, setOrderId] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [toast, setToast] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [countdown, setCountdown] = useState<Countdown>({ hh: "00", mm: "00", ss: "00" });
  const [loaded, setLoaded] = useState(false);

  // Flash deal countdown: ends midnight (computed inside effect only)
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      d.setHours(24, 0, 0, 0);
      const remain = Math.max(0, d.getTime() - Date.now());
      setCountdown({
        hh: String(Math.floor(remain / 3600000)).padStart(2, "0"),
        mm: String(Math.floor((remain % 3600000) / 60000)).padStart(2, "0"),
        ss: String(Math.floor((remain % 60000) / 1000)).padStart(2, "0"),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  // Cart persistence (client-only localStorage load; intentional setState-in-effect)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try { const saved = localStorage.getItem("gadzone-cart"); if (saved) setCart(JSON.parse(saved)); } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */
  useEffect(() => { if (loaded) localStorage.setItem("gadzone-cart", JSON.stringify(cart)); }, [cart, loaded]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  const addToCart = (id: number, qty = 1) => {
    setCart((c) => {
      const found = c.find((i) => i.id === id);
      if (found) return c.map((i) => (i.id === id ? { ...i, qty: Math.min(99, i.qty + qty) } : i));
      return [...c, { id, qty }];
    });
    showToast("✅ Added to cart!");
  };
  const setQty = (id: number, qty: number) => {
    if (qty <= 0) setCart((c) => c.filter((i) => i.id !== id));
    else setCart((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)));
  };
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartDetailed = cart.map((i) => ({ ...PRODUCTS.find((p) => p.id === i.id)!, qty: i.qty })).filter((i) => i.id);
  const subtotal = cartDetailed.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = Math.round(subtotal * promoApplied);
  const delivery = cartDetailed.length === 0 ? 0 : subtotal - discountAmt >= 2000 ? 0 : district === "Dhaka" ? 60 : 120;
  const total = subtotal - discountAmt + delivery;

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) =>
      (category === "All" || p.category === category) &&
      p.price <= maxPrice &&
      (p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "discount") list = [...list].sort((a, b) => discountPct(b) - discountPct(a));
    return list;
  }, [query, category, maxPrice, sort]);

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (code === "GADZONE10") { setPromoApplied(0.10); setPromoMsg("✅ GADZONE10 applied — 10% off!"); }
    else if (code === "WELCOME15") { setPromoApplied(0.15); setPromoMsg("✅ WELCOME15 applied — 15% off!"); }
    else { setPromoApplied(0); setPromoMsg("❌ Invalid promo code. Try GADZONE10."); }
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) { showToast("⚠️ Please fill all fields"); return; }
    setOrderId("GZ" + Math.floor(100000 + Math.random() * 900000));
    setOrderPlaced(true);
    setCart([]);
    setPromoApplied(0); setPromo(""); setPromoMsg("");
  };

  const flash = FLASH_IDS.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);
  const best = BESTSELLER_IDS.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);

  const handleQuickView = (p: Product) => { setQuickView(p); setQvQty(1); };
  const handleQuickViewAdd = (id: number, qty: number, buyNow?: boolean) => {
    addToCart(id, qty);
    setQuickView(null);
    if (buyNow) setCartOpen(true);
  };
  const handleResetFilters = () => { setCategory("All"); setMaxPrice(5000); setQuery(""); setSort("featured"); };
  const handleSubscribe = (e: React.FormEvent) => { e.preventDefault(); if (email.includes("@")) setSubscribed(true); };
  const handleFormChange = (field: keyof CheckoutForm, value: string) => setForm((f) => ({ ...f, [field]: value }));
  const handleContinueShopping = () => { setCheckoutOpen(false); setOrderPlaced(false); setForm({ name: "", phone: "", address: "" }); };
  const handleCheckout = () => { setCartOpen(false); setCheckoutOpen(true); };

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-900">
      <TopBar />
      <Header query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <Hero onQuickView={handleQuickView} />
      <CategoryGrid category={category} onCategoryChange={setCategory} />
      <FlashDeals products={flash} countdown={countdown} onQuickView={handleQuickView} onAddToCart={(id) => addToCart(id)} />
      <BestSellers products={best} onQuickView={handleQuickView} onAddToCart={(id) => addToCart(id)} />
      <ShopSection filtered={filtered} category={category} sort={sort} onSortChange={setSort} maxPrice={maxPrice} onMaxPriceChange={setMaxPrice} onReset={handleResetFilters} onQuickView={handleQuickView} onAddToCart={(id) => addToCart(id)} />
      <WhyShop />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2">
        <FaqSection openFaq={openFaq} onToggleFaq={setOpenFaq} />
        <Newsletter email={email} onEmailChange={setEmail} subscribed={subscribed} onSubscribe={handleSubscribe} />
      </section>
      <Footer onCategoryChange={setCategory} />
      <QuickViewModal product={quickView} qty={qvQty} onQtyChange={setQvQty} onClose={() => setQuickView(null)} onAddToCart={handleQuickViewAdd} district={district} />
      <CartDrawer open={cartOpen} cartDetailed={cartDetailed} cartCount={cartCount} promo={promo} promoMsg={promoMsg} subtotal={subtotal} discountAmt={discountAmt} delivery={delivery} total={total} district={district} onClose={() => setCartOpen(false)} onQtyChange={setQty} onPromoChange={setPromo} onApplyPromo={applyPromo} onCheckout={handleCheckout} />
      <CheckoutModal open={checkoutOpen} orderPlaced={orderPlaced} orderId={orderId} form={form} district={district} payMethod={payMethod} subtotal={subtotal} discountAmt={discountAmt} delivery={delivery} total={total} onClose={() => setCheckoutOpen(false)} onFormChange={handleFormChange} onDistrictChange={setDistrict} onPayMethodChange={setPayMethod} onPlaceOrder={placeOrder} onContinueShopping={handleContinueShopping} />
      <Toast message={toast} />
    </div>
  );
}
