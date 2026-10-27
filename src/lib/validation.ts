import { ORDER_STATUSES, type OrderStatus } from "@/types/models";

export const NOTE_MAX_LENGTH = 500;

export const isOrderId = (value: unknown): value is string =>
  typeof value === "string" && /^\d+$/.test(value);

export const isOrderStatus = (value: unknown): value is OrderStatus =>
  ORDER_STATUSES.includes(value as OrderStatus);

export const isNoteText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length >= 1 && value.trim().length <= NOTE_MAX_LENGTH;
