import type { Product } from "@/data/products";

export type CartItem = { id: number; qty: number };
export type SortKey = "featured" | "low" | "high" | "rating" | "discount";
export type PayMethod = "COD" | "bKash" | "Nagad" | "Card";
export type CartDetailed = Product & { qty: number };
export type CheckoutForm = { name: string; phone: string; address: string };
export type Countdown = { hh: string; mm: string; ss: string };
