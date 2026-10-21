"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { PRODUCTS, FLASH_IDS, type Product } from "@/data/products";
import { discountPct } from "@/lib/format";
import { addOrder } from "@/lib/orders";
import type { CartItem, SortKey, PayMethod, CheckoutForm, Countdown, StoredOrder } from "@/types";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FlashDeals from "@/components/FlashDeals";
import ProductSection from "@/components/ProductSection";
import BottomNav from "@/components/BottomNav";
import MobileMenu from "@/components/MobileMenu";
import AccountModal from "@/components/AccountModal";
import HelpSheet from "@/components/HelpSheet";
import ShopSection from "@/components/ShopSection";
import WhyShop from "@/components/WhyShop";
import FaqSection from "@/components/FaqSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import Toast from "@/components/Toast";

export default function HomeClient() {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sort, setSort] = useState<SortKey>("featured");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
    const newOrderId = "GZ" + Math.floor(100000 + Math.random() * 900000);
    // Demo persistence: save the order to this browser's localStorage so the
    // Customer/Admin dashboards can list it. No backend / database involved.
    const order: StoredOrder = {
      id: newOrderId,
      date: new Date().toISOString(),
      items: cartDetailed.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      total,
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      district,
      payment: payMethod === "COD" ? "Cash on Delivery" : payMethod,
      status: "Processing",
      email: session?.user?.email ?? "guest",
    };
    addOrder(order);
    setOrderId(newOrderId);
    setOrderPlaced(true);
    setCart([]);
    setPromoApplied(0); setPromo(""); setPromoMsg("");
  };

  const flash = FLASH_IDS.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);
  const audioProducts = PRODUCTS.filter((p) => p.category === "Audio & Wearables");
  const watchProducts = PRODUCTS.filter((p) => /watch|tracker|band/i.test(p.name));
  const smartHomeProducts = PRODUCTS.filter((p) => p.category === "Smart Home");

  const handleQuickView = (p: Product) => { setSelectedProduct(p); };
  const handleQuickViewAdd = (id: number, qty: number, buyNow?: boolean) => {
    addToCart(id, qty);
    if (buyNow) setCartOpen(true);
  };
  const handleBackToShop = () => { setSelectedProduct(null); setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 50); };
  const handleHome = () => { setSelectedProduct(null); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50); };
  const handlePdpCategory = (cat: string) => { setCategory(cat); setSelectedProduct(null); setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 50); };
  const handleResetFilters = () => { setCategory("All"); setMaxPrice(5000); setQuery(""); setSort("featured"); };
  const handleSubscribe = (e: React.FormEvent) => { e.preventDefault(); if (email.includes("@")) setSubscribed(true); };
  const handleFormChange = (field: keyof CheckoutForm, value: string) => setForm((f) => ({ ...f, [field]: value }));
  const handleContinueShopping = () => { setCheckoutOpen(false); setOrderPlaced(false); setForm({ name: "", phone: "", address: "" }); };
  const handleCheckout = () => { setCartOpen(false); setCheckoutOpen(true); };

  return (
    <div className="min-h-screen bg-[#fef6f0] pb-20 font-sans text-[#a39e93] md:pb-0">
      <TopBar />
      <Header query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} onMenuOpen={() => setMenuOpen(true)} onAccountOpen={() => setAccountOpen(true)} />
      {selectedProduct ? (
        <ProductDetails
          key={selectedProduct.id}
          product={selectedProduct}
          district={district}
          onBack={handleBackToShop}
          onHome={handleHome}
          onCategory={handlePdpCategory}
          onSelectProduct={handleQuickView}
          onAddToCart={handleQuickViewAdd}
        />
      ) : (
        <>
          <Hero onQuickView={handleQuickView} />
          <CategoryGrid category={category} onCategoryChange={setCategory} />
          <FlashDeals products={flash} countdown={countdown} onQuickView={handleQuickView} onAddToCart={(id) => addToCart(id)} />
          <ProductSection accent="Trending" rest="Audio Products" subtitle="Explore earbuds, headphones & speakers picked for better sound." products={audioProducts} onQuickView={handleQuickView} onAddToCart={(id) => addToCart(id)} />
          <ProductSection accent="Trending" rest="Smartwatches" subtitle="Stay connected, track your day & find the right watch for you." products={watchProducts} onQuickView={handleQuickView} onAddToCart={(id) => addToCart(id)} />
          <ProductSection accent="Smart Home" rest="Gadgets" subtitle="Useful home tech designed to make everyday living easier." products={smartHomeProducts} onQuickView={handleQuickView} onAddToCart={(id) => addToCart(id)} />
          <ShopSection filtered={filtered} category={category} sort={sort} onSortChange={setSort} maxPrice={maxPrice} onMaxPriceChange={setMaxPrice} onReset={handleResetFilters} onQuickView={handleQuickView} onAddToCart={(id) => addToCart(id)} />
          <WhyShop />
          <section id="faq" className="mx-auto grid max-w-7xl scroll-mt-32 gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12">
            <FaqSection openFaq={openFaq} onToggleFaq={setOpenFaq} />
            <Newsletter email={email} onEmailChange={setEmail} subscribed={subscribed} onSubscribe={handleSubscribe} />
          </section>
        </>
      )}
      <Footer onCategoryChange={setCategory} />
      <BottomNav cartCount={cartCount} onCartOpen={() => setCartOpen(true)} onMenuOpen={() => setMenuOpen(true)} onAccountOpen={() => setAccountOpen(true)} onHelpOpen={() => setHelpOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} category={category} onCategoryChange={setCategory} />
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
      <HelpSheet open={helpOpen} onClose={() => setHelpOpen(false)} onViewAllFaq={() => { setHelpOpen(false); document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }); }} />
      <CartDrawer open={cartOpen} cartDetailed={cartDetailed} cartCount={cartCount} promo={promo} promoMsg={promoMsg} subtotal={subtotal} discountAmt={discountAmt} delivery={delivery} total={total} district={district} onClose={() => setCartOpen(false)} onQtyChange={setQty} onPromoChange={setPromo} onApplyPromo={applyPromo} onCheckout={handleCheckout} />
      <CheckoutModal open={checkoutOpen} orderPlaced={orderPlaced} orderId={orderId} form={form} district={district} payMethod={payMethod} subtotal={subtotal} discountAmt={discountAmt} delivery={delivery} total={total} onClose={() => setCheckoutOpen(false)} onFormChange={handleFormChange} onDistrictChange={setDistrict} onPayMethodChange={setPayMethod} onPlaceOrder={placeOrder} onContinueShopping={handleContinueShopping} />
      <Toast message={toast} />
    </div>
  );
}
