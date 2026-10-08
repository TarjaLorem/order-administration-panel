import Link from "next/link";

import { getRecentOrders } from "@/lib/orders";

const money = new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 });
const date = new Intl.DateTimeFormat("uk-UA", { dateStyle: "short", timeStyle: "short" });

export async function RecentOrders() {
  const orders = await getRecentOrders(5);

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-1">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent orders</h2>
        <Link href="/orders" className="text-sm text-indigo-600 hover:underline">
          View all
        </Link>
      </div>

      <ul className="flex flex-col divide-y divide-slate-100">
        {orders.map((order) => (
          <li key={order.id} className="flex items-center justify-between gap-3 py-2.5">
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                #{order.id} · {order.customer.name}
              </span>
              <span className="text-xs text-slate-500">{date.format(new Date(order.createdAt))}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium whitespace-nowrap">
                {money.format(order.total)} {order.currency}
              </span>
              <span className="text-xs text-slate-500 capitalize">{order.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
