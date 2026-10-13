import type { Product } from "@/data/products";

export const tk = (n: number) => `৳${n.toLocaleString("en-IN")}`;
export const discountPct = (p: Product) => Math.round((1 - p.price / p.oldPrice) * 100);
