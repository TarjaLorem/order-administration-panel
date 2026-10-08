export interface IPaginated<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type ActionResult = { ok: true } | { ok: false; error: string };

export type SearchParams = Record<string, string | string[] | undefined>;
