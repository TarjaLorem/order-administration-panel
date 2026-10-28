import {
  ORDER_STATUSES,
  type IOrdersQuery,
  type OrderSort,
  type OrderSortField,
  type OrderStatus,
  type ParamsPatch,
  type SearchParams,
} from "@/types/models";

export const ORDERS_PAGE_SIZE = 20;

const DEFAULT_SORT: OrderSort = "-createdAt";
const SORT_FIELDS: OrderSortField[] = ["createdAt", "total", "updatedAt"];

export function toUrlSearchParams(searchParams: SearchParams): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    const single = Array.isArray(value) ? value[0] : value;
    if (single) params.set(key, single);
  }
  return params;
}

export function parseOrdersQuery(params: URLSearchParams): IOrdersQuery {
  const status = (params.get("status") ?? "")
    .split(",")
    .filter((s): s is OrderStatus => ORDER_STATUSES.includes(s as OrderStatus));

  const rawSort = params.get("sort") ?? "";
  const isKnownSort = SORT_FIELDS.includes(rawSort.replace(/^-/, "") as OrderSortField);

  return {
    status,
    q: (params.get("q") ?? "").trim(),
    sort: isKnownSort ? (rawSort as OrderSort) : DEFAULT_SORT,
    page: Math.max(1, Number.parseInt(params.get("page") ?? "", 10) || 1),
    limit: ORDERS_PAGE_SIZE,
  };
}

export function ordersHref(params: URLSearchParams, patch: ParamsPatch = {}): string {
  const next = new URLSearchParams(params);
  for (const [key, value] of Object.entries(patch)) {
    if (value) next.set(key, value);
    else next.delete(key);
  }
  const qs = next.toString();
  return qs ? `/orders?${qs}` : "/orders";
}

export function nextSort(current: OrderSort, field: OrderSortField) {
  const isActive = current.replace(/^-/, "") === field;
  const isDesc = current.startsWith("-");
  return {
    isActive,
    isDesc,
    next: (isActive && isDesc ? field : `-${field}`) as OrderSort,
  };
}
