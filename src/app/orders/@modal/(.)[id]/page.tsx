import { Suspense } from "react";

import { OrderDetails } from "@/app/orders/[id]/_components/OrderDetails";
import { OrderModal } from "@/components/OrderModal";

export default async function OrderModalPage({ params }: PageProps<"/orders/[id]">) {
  const { id } = await params;

  return (
    <OrderModal fullPageHref={`/orders/${id}`}>
      <Suspense fallback={<p className="py-12 text-center text-sm text-slate-500">Loading order…</p>}>
        <OrderDetails id={id} />
      </Suspense>
    </OrderModal>
  );
}
