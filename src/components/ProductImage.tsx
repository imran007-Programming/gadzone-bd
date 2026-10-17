"use client";

import { useState } from "react";
import type { Product } from "@/data/products";

export default function ProductImage({ product, big = false }: { product: Product; big?: boolean }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className={`flex w-full items-center justify-center bg-gradient-to-br from-emerald-100 via-emerald-50 to-emerald-100 ${big ? "h-80" : "h-48"}`}>
        <span className="text-6xl">🔌</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={product.img} alt={product.name} loading="lazy" onError={() => setErr(true)}
      className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${big ? "h-80" : "h-48"}`} />
  );
}
