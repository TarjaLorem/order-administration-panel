import { Card } from "@/components/Card";
import type { ICustomerCardProps } from "@/types/props";

export function CustomerCard({ customer }: ICustomerCardProps) {
  return (
    <Card title="Customer">
      <div className="flex flex-col gap-1">
        <span className="font-medium">{customer.name}</span>
        <a href={`mailto:${customer.email}`} className="text-sm text-indigo-600 hover:underline">
          {customer.email}
        </a>
        <span className="text-xs text-slate-400">ID: {customer.id}</span>
      </div>
    </Card>
  );
}
