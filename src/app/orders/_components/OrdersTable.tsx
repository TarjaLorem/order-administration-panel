import Link from "next/link";

import { CARD_SURFACE } from "@/components/Card";
import { formatMoney, formatShortDateTime } from "@/lib/format";
import type { IOrdersTableProps } from "@/types/props";

import { SortHeader } from "./SortHeader";
import { StatusSelect } from "./StatusSelect";

const TH = "px-4 py-3 font-medium";
const TD = "px-4 py-3";

export function OrdersTable({ orders, transitions, sort, params }: IOrdersTableProps) {
  const sortable = { sort, params };

  return (
    <div className={`overflow-x-auto ${CARD_SURFACE}`}>
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
          <tr>
            <th className={TH}>#</th>
            <th className={TH}>Customer</th>
            <th className={TH}>Items</th>
            <th className={TH}>
              <SortHeader field="total" label="Total" {...sortable} />
            </th>
            <th className={TH}>Status</th>
            <th className={TH}>
              <SortHeader field="createdAt" label="Created" {...sortable} />
            </th>
            <th className={TH}>
              <SortHeader field="updatedAt" label="Updated" {...sortable} />
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                No orders match the filters
              </td>
            </tr>
          )}

          {orders.map((order) => (
            <tr key={order.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
              <td className={`${TD} font-medium`}>
                <Link href={`/orders/${order.id}`} className="text-indigo-600 hover:underline">
                  {order.id}
                </Link>
              </td>
              <td className={TD}>
                <div className="flex flex-col">
                  <span>{order.customer.name}</span>
                  <span className="text-xs text-slate-500">{order.customer.email}</span>
                </div>
              </td>
              <td className={TD}>{order.itemsCount}</td>
              <td className={`${TD} whitespace-nowrap`}>{formatMoney(order.total, order.currency)}</td>
              <td className={TD}>
                <StatusSelect id={order.id} status={order.status} transitions={transitions} />
              </td>
              <td className={`${TD} whitespace-nowrap text-slate-600`}>{formatShortDateTime(order.createdAt)}</td>
              <td className={`${TD} whitespace-nowrap text-slate-600`}>{formatShortDateTime(order.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
