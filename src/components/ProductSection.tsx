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
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
      <SectionHeader accent={accent} rest={rest} subtitle={subtitle} />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} delay={(i % 4) * 0.05} />
        ))}
      </div>
    </section>
  );
}
