import { notFound } from "next/navigation";

import { getOrder, getTransitions } from "@/lib/api/orders";
import { isOrderId } from "@/lib/validation";
import type { IOrderDetailsProps } from "@/types/props";

import { CustomerCard } from "./CustomerCard";
import { OrderHeader } from "./OrderHeader";
import { OrderItems } from "./OrderItems";
import { OrderNotes } from "./OrderNotes";
import { StatusHistory } from "./StatusHistory";

export async function OrderDetails({ id }: IOrderDetailsProps) {
  if (!isOrderId(id)) notFound();

  const [order, transitions] = await Promise.all([getOrder(id), getTransitions()]);
  if (!order) notFound();

  return (
    <div className="flex flex-col gap-6">
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
    </div>
  );
}
