import { getOrders, getTransitions } from "@/lib/api/orders";

import { OrdersTable } from "./_components/OrdersTable";
import { OrdersToolbar } from "./_components/OrdersToolbar";
import { Pagination } from "./_components/Pagination";
import { parseOrdersQuery, toUrlSearchParams } from "./search-params";

export default async function OrdersPage({ searchParams }: PageProps<"/orders">) {
  const params = toUrlSearchParams(await searchParams);
  const query = parseOrdersQuery(params);
  const [orders, transitions] = await Promise.all([getOrders(query), getTransitions()]);

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
      <OrdersTable orders={orders.data} transitions={transitions} sort={query.sort} params={params} />
      <Pagination page={orders.page} totalPages={orders.totalPages} params={params} />
    </main>
  );
}
