import "server-only";

import type { IProduct } from "@/types/models";

import { apiGet } from "./client";

export async function getProducts(): Promise<IProduct[]> {
  const { data } = await apiGet<{ data: IProduct[] }>("/api/products", { cache: "force-cache" });
  return data;
}
