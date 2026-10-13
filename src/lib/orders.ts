import type { StoredOrder } from "@/types";

export const ORDERS_KEY = "gadzone-orders";

/** Demo persistence: orders live in this browser's localStorage only. */
export function loadOrders(): StoredOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as StoredOrder[]) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: StoredOrder[]) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    /* storage full/blocked — dashboards fall back to empty */
  }
}

export function addOrder(order: StoredOrder) {
  saveOrders([order, ...loadOrders()]);
}
