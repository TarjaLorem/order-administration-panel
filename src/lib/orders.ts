import "server-only";

import type { IOrderListItem, IOrdersQuery, IPaginated, OrderStatus, TransitionsMap } from "@/types/models";

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

if (!API_URL) {
  throw new Error("Missing API_URL in environment variables");
}

export function authHeaders(): HeadersInit {
  return API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}`, "X-API-Token": API_TOKEN } : {};
}

export async function getOrders(query: IOrdersQuery): Promise<IPaginated<IOrderListItem>> {
  const params = new URLSearchParams({
    sort: query.sort,
    page: String(query.page),
    limit: String(query.limit),
  });
  if (query.status.length) params.set("status", query.status.join(","));
  if (query.q) params.set("q", query.q);

  const response = await fetch(`${API_URL}/api/orders?${params}`, {
    headers: authHeaders(),
    cache: "no-store",
    next: { tags: ["orders"] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.status}`);
  }

  return response.json();
}

export async function getTransitions(): Promise<TransitionsMap> {
  const response = await fetch(`${API_URL}/api/transitions`, {
    headers: authHeaders(),
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch transitions: ${response.status}`);
  }

  return response.json();
}

export async function patchOrderStatus(id: string, status: OrderStatus): Promise<Response> {
  return fetch(`${API_URL}/api/orders/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
    cache: "no-store",
  });
}
