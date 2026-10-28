import "server-only";

import type { ActionResult, IStatusConflict } from "@/types/models";

const fail = (error: string): ActionResult => ({ ok: false, error });

const MESSAGES = {
  unavailable: "API is unavailable. Please try again.",
  serverError: "Server error — changes were not saved. Please try again.",
  notFound: "Order not found.",
  invalid: "Invalid data.",
  notAllowed: "This status change is not allowed.",
};

function conflictMessage({ current, allowed = [] }: IStatusConflict): string {
  if (!current) return MESSAGES.notAllowed;
  const next = allowed.length ? allowed.join(", ") : "none";
  return `Order is already "${current}" (maybe changed by someone else). Allowed next: ${next}.`;
}

async function readBody(response: Response): Promise<IStatusConflict> {
  return response.json().catch(() => ({ error: "" }));
}

async function toErrorMessage(response: Response): Promise<string> {
  const body = await readBody(response);

  if (response.status === 409) return conflictMessage(body);
  if (response.status === 404) return MESSAGES.notFound;
  if (response.status >= 500) return MESSAGES.serverError;
  return body.error || MESSAGES.invalid;
}

export async function callApi(request: () => Promise<Response>): Promise<ActionResult> {
  try {
    const response = await request();
    return response.ok ? { ok: true } : fail(await toErrorMessage(response));
  } catch {
    return fail(MESSAGES.unavailable);
  }
}

export { fail };
