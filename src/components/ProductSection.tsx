"use client";

import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";

type ProductSectionProps = {
  accent: string;
  rest: string;
  subtitle: string;
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (id: number) => void;
};

export default function ProductSection({ accent, rest, subtitle, products, onQuickView, onAddToCart }: ProductSectionProps) {
  if (products.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
      <SectionHeader accent={accent} rest={rest} subtitle={subtitle} />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} delay={(i % 4) * 0.05} />
        ))}
      </div>
    </section>
  );
}
