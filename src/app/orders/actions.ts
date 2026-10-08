"use server";

import { updateTag } from "next/cache";

import { patchOrderStatus } from "@/lib/orders";
import { ORDER_STATUSES, type ActionResult, type OrderStatus } from "@/types/models";

export async function updateOrderStatus(id: unknown, status: unknown): Promise<ActionResult> {

  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    return { ok: false, error: "Invalid order id" };
  }
  if (typeof status !== "string" || !ORDER_STATUSES.includes(status as OrderStatus)) {
    return { ok: false, error: "Invalid status" };
  }

  try {
    const response = await patchOrderStatus(id, status as OrderStatus);

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      return { ok: false, error: body?.error ?? `Request failed (${response.status})` };
    }
  } catch {
    return { ok: false, error: "API is unavailable" };
  }

  updateTag("orders");
  updateTag(`order-${id}`);
  return { ok: true };
}
