"use client";

import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

type BestSellersProps = {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (id: number) => void;
};

export default function BestSellers({ products, onQuickView, onAddToCart }: BestSellersProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-2xl font-black">🏆 Best Sellers</h2>
      <p className="text-sm text-gray-500">Customers der sobcheye pochonder products</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.map((p) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} />)}</div>
    </section>
  );
}
