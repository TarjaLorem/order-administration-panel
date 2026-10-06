import "server-only";

import type { IProduct } from "@/types/models";

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

if (!API_URL) {
  throw new Error("Missing API_URL in environment variables");
}

export async function getProducts(): Promise<IProduct[]> {
  const response = await fetch(`${API_URL}/api/products`, {
    method: "GET",
    headers: {
      ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}`, "X-API-Token": API_TOKEN } : {}),
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const payload = (await response.json()) as { data: IProduct[] };
  return payload.data;
}
