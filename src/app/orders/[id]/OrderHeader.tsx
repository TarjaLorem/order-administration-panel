import { formatDateTime } from "@/lib/format";
import type { IOrderHeaderProps } from "@/types/models";

import { StatusSelect } from "../StatusSelect";

export function OrderHeader({ order, transitions }: IOrderHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Order #{order.id}</h1>
        <p className="text-sm text-slate-500">
          Created {formatDateTime(order.createdAt)} · Updated {formatDateTime(order.updatedAt)}
        </p>
      </div>
      <StatusSelect id={order.id} status={order.status} transitions={transitions} />
    </header>
  );
}
