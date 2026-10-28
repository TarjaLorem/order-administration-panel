import { Card } from "@/components/Card";
import { formatMoney } from "@/lib/format";
import type { IOrderItemsProps } from "@/types/props";

export function OrderItems({ items, total, currency }: IOrderItemsProps) {
  return (
    <Card title="Items">
      <ul className="flex flex-col divide-y divide-slate-100">
        {items.map((item) => (
          <li key={item.productId} className="flex items-center justify-between gap-4 py-3">
            <div className="flex flex-col">
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-slate-500">
                {formatMoney(item.price, currency)} × {item.qty}
              </span>
            </div>
            <span className="font-medium whitespace-nowrap">{formatMoney(item.price * item.qty, currency)}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-lg">
        <span className="font-medium">Total</span>
        <strong>{formatMoney(total, currency)}</strong>
      </div>
    </Card>
  );
}
