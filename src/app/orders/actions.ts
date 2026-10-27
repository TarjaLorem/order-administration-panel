"use server";

import { updateTag } from "next/cache";

import { callApi, fail } from "@/lib/api-errors";
import { patchOrderStatus, postOrderNote } from "@/lib/orders";
import { isNoteText, isOrderId, isOrderStatus, NOTE_MAX_LENGTH } from "@/lib/validation";
import type { ActionResult } from "@/types/models";


export async function updateOrderStatus(id: unknown, status: unknown): Promise<ActionResult> {
  if (!isOrderId(id)) return fail("Invalid order id.");
  if (!isOrderStatus(status)) return fail("Invalid status.");

  const result = await callApi(() => patchOrderStatus(id, status));

  if (result.ok) {
    updateTag("orders");
    updateTag(`order-${id}`);
  }
  return result;
}

export async function addOrderNote(id: unknown, text: unknown): Promise<ActionResult> {
  if (!isOrderId(id)) return fail("Invalid order id.");
  if (!isNoteText(text)) return fail(`Note must be 1–${NOTE_MAX_LENGTH} characters.`);

  const result = await callApi(() => postOrderNote(id, text.trim()));

  if (result.ok) {
    updateTag(`order-${id}`);
  }
  return result;
}
