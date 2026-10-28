import Link from "next/link";

import { getOrders } from "@/lib/api/orders";

import { OrderDetails } from "./_components/OrderDetails";

const PRERENDER_COUNT = 20;

export async function generateStaticParams() {
  const { data } = await getOrders({ status: [], q: "", sort: "-createdAt", page: 1, limit: PRERENDER_COUNT });
  return data.map(({ id }) => ({ id }));
}

export default async function OrderPage({ params }: PageProps<"/orders/[id]">) {
  const { id } = await params;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-9 md:px-6 md:py-12">
      <Link href="/orders" className="text-sm text-slate-500 hover:text-slate-900">
        ← Back to orders
      </Link>
      <OrderDetails id={id} />
    </main>
  );
}
