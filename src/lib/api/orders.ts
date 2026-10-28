import "server-only";

import type {
  IOrder,
  IOrderListItem,
  IOrdersQuery,
  IPaginated,
  OrderStatus,
  TransitionsMap,
} from "@/types/models";

import { apiFetch, apiGet } from "./client";

const orderPath = (id: string) => `/api/orders/${encodeURIComponent(id)}`;

export function getOrders(query: IOrdersQuery): Promise<IPaginated<IOrderListItem>> {
  const params = new URLSearchParams({
    sort: query.sort,
    page: String(query.page),
    limit: String(query.limit),
  });
  if (query.status.length) params.set("status", query.status.join(","));
  if (query.q) params.set("q", query.q);

  return apiGet(`/api/orders?${params}`, {
    cache: "no-store",
    next: { tags: ["orders"] },
  });
}

export async function getRecentOrders(limit = 5): Promise<IOrderListItem[]> {
  const { data } = await apiGet<IPaginated<IOrderListItem>>(`/api/orders?sort=-createdAt&page=1&limit=${limit}`, {
    next: { revalidate: 30, tags: ["orders"] },
  });
  return data;
}

export function getTransitions(): Promise<TransitionsMap> {
  return apiGet("/api/transitions", { cache: "force-cache" });
}

export async function getOrder(id: string): Promise<IOrder | null> {
  const response = await apiFetch(orderPath(id), {
    cache: "force-cache",
    next: { tags: [`order-${id}`] },
  });

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Failed to fetch order ${id}: ${response.status}`);
  }

  return response.json();
}

export function patchOrderStatus(id: string, status: OrderStatus): Promise<Response> {
  return apiFetch(orderPath(id), {
    method: "PATCH",
    body: JSON.stringify({ status }),
    cache: "no-store",
  });
}

export function postOrderNote(id: string, text: string): Promise<Response> {
  return apiFetch(`${orderPath(id)}/notes`, {
    method: "POST",
    body: JSON.stringify({ text }),
    cache: "no-store",
  });
}
