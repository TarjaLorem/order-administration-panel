import { Card } from "@/components/Card";
import { formatMoney, formatShortDateTime } from "@/lib/format";
import { getRecentOrders } from "@/lib/orders";
import Link from "next/link";

const viewAll = (
  <Link href="/orders" className="text-sm text-indigo-600 hover:underline">
    View all
  </Link>
);

export async function RecentOrders() {
  const orders = await getRecentOrders(5);

  return (
    <Card title="Recent orders" action={viewAll} className="lg:flex-1">
      <ul className="flex flex-col divide-y divide-slate-100">
        {orders.map((order) => (
          <li key={order.id} className="flex items-center justify-between gap-3 py-2.5">
            <div className="flex flex-col">
              <Link href={`/orders/${order.id}`} className="text-sm font-medium hover:text-indigo-600 hover:underline">
                #{order.id} · {order.customer.name}
              </Link>
              <span className="text-xs text-slate-500">{formatShortDateTime(order.createdAt)}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium whitespace-nowrap">{formatMoney(order.total, order.currency)}</span>
              <span className="text-xs text-slate-500 capitalize">{order.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
