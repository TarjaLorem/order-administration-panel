import "server-only";

import type { IStats } from "@/types/models";

import { apiGet } from "./client";

export function getStats(): Promise<IStats> {
  return apiGet("/api/stats", {
    next: { revalidate: 30, tags: ["orders", "stats"] },
  });
}
