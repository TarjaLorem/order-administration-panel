import "server-only";

import type { IStats } from "@/types/models";

import { authHeaders } from "./orders";

const API_URL = process.env.API_URL;

// Metrics may lag up to 30s; `orders` tag lets a status change refresh them immediately.
export async function getStats(): Promise<IStats> {
  const response = await fetch(`${API_URL}/api/stats`, {
    headers: authHeaders(),
    next: { revalidate: 30, tags: ["orders", "stats"] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.status}`);
  }

  return response.json();
}
