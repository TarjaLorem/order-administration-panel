import Link from "next/link";
import { notFound } from "next/navigation";

import { getOrder, getOrders, getTransitions } from "@/lib/orders";
import { isOrderId } from "@/lib/validation";

import { CustomerCard } from "./CustomerCard";
import { OrderHeader } from "./OrderHeader";
import { OrderItems } from "./OrderItems";
import { OrderNotes } from "./OrderNotes";
import { StatusHistory } from "./StatusHistory";

const PRERENDER_COUNT = 20;

export async function generateStaticParams() {
  const { data } = await getOrders({ status: [], q: "", sort: "-createdAt", page: 1, limit: PRERENDER_COUNT });
  return data.map(({ id }) => ({ id }));
}

export default async function OrderPage({ params }: PageProps<"/orders/[id]">) {
  const { id } = await params;
  if (!isOrderId(id)) notFound();

  const [order, transitions] = await Promise.all([getOrder(id), getTransitions()]);
  if (!order) notFound();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-9 md:px-6 md:py-12">
      <Link href="/orders" className="text-sm text-slate-500 hover:text-slate-900">
        ← Back to orders
      </Link>

      <OrderHeader order={order} transitions={transitions} />

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-col gap-6 lg:flex-[2]">
          <OrderItems items={order.items} total={order.total} currency={order.currency} />
          <OrderNotes orderId={order.id} notes={order.notes} />
        </div>

        <div className="flex flex-col gap-6 lg:flex-1">
          <CustomerCard customer={order.customer} />
          <StatusHistory history={order.history} />
        </div>
      </div>
    </main>
  );
}
