import Link from "next/link";

import { getOrders, getTransitions } from "@/lib/orders";
import {
  ORDER_STATUSES,
  type OrderSort,
  type OrderSortField,
  type OrderStatus,
  type SearchParams,
} from "@/types/models";

import { OrdersToolbar } from "./OrdersToolbar";
import { StatusSelect } from "./StatusSelect";

const SORT_FIELDS: OrderSortField[] = ["createdAt", "total", "updatedAt"];
const LIMIT = 20;

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function parseQuery(sp: SearchParams) {
  const status = first(sp.status)
    .split(",")
    .filter((s): s is OrderStatus => ORDER_STATUSES.includes(s as OrderStatus));

  const rawSort = first(sp.sort);
  const sortField = rawSort.replace(/^-/, "") as OrderSortField;
  const sort: OrderSort = SORT_FIELDS.includes(sortField) ? (rawSort as OrderSort) : "-createdAt";

  const page = Math.max(1, Number.parseInt(first(sp.page), 10) || 1);
  const q = first(sp.q).trim();

  return { status, q, sort, page, limit: LIMIT };
}

function buildHref(sp: SearchParams, patch: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(sp)) {
    const v = first(value);
    if (v) params.set(key, v);
  }
  for (const [key, value] of Object.entries(patch)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  const qs = params.toString();
  return qs ? `/orders?${qs}` : "/orders";
}

const dateFormat = new Intl.DateTimeFormat("uk-UA", { dateStyle: "short", timeStyle: "short" });
const moneyFormat = new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 2 });

export default async function OrdersPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const query = parseQuery(sp);
  const [orders, transitions] = await Promise.all([getOrders(query), getTransitions()]);

  const sortHeader = (field: OrderSortField, label: string) => {
    const isActive = query.sort.replace(/^-/, "") === field;
    const isDesc = query.sort.startsWith("-");
    const next = isActive && isDesc ? field : `-${field}`;
    return (
      <Link href={buildHref(sp, { sort: next, page: undefined })} className="inline-flex items-center gap-1 hover:text-slate-900">
        {label}
        <span className="text-xs">{isActive ? (isDesc ? "↓" : "↑") : "↕"}</span>
      </Link>
    );
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-9 md:px-6 md:py-12">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
          <p className="text-slate-600">Rendered on every request</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700">
          Found: <strong>{orders.total}</strong>
        </div>
      </header>

      <OrdersToolbar />

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">{sortHeader("total", "Total")}</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">{sortHeader("createdAt", "Created")}</th>
              <th className="px-4 py-3 font-medium">{sortHeader("updatedAt", "Updated")}</th>
            </tr>
          </thead>
          <tbody>
            {orders.data.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  No orders match the filters
                </td>
              </tr>
            )}
            {orders.data.map((order) => (
              <tr key={order.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span>{order.customer.name}</span>
                    <span className="text-xs text-slate-500">{order.customer.email}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{order.itemsCount}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {moneyFormat.format(order.total)} {order.currency}
                </td>
                <td className="px-4 py-3">
                  <StatusSelect id={order.id} status={order.status} transitions={transitions} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-slate-600">{dateFormat.format(new Date(order.createdAt))}</td>
                <td className="px-4 py-3 whitespace-nowrap text-slate-600">{dateFormat.format(new Date(order.updatedAt))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="flex items-center justify-between gap-3 text-sm">
        <span className="text-slate-600">
          Page {orders.page} of {Math.max(1, orders.totalPages)}
        </span>
        <div className="flex gap-2">
          {orders.page > 1 ? (
            <Link
              href={buildHref(sp, { page: String(orders.page - 1) })}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-100"
            >
              ← Prev
            </Link>
          ) : (
            <span className="rounded-lg border border-slate-100 px-3 py-1.5 text-slate-300">← Prev</span>
          )}
          {orders.page < orders.totalPages ? (
            <Link
              href={buildHref(sp, { page: String(orders.page + 1) })}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-100"
            >
              Next →
            </Link>
          ) : (
            <span className="rounded-lg border border-slate-100 px-3 py-1.5 text-slate-300">Next →</span>
          )}
        </div>
      </nav>
    </main>
  );
}
