import { Card } from "@/components/Card";
import { formatDayMonth, formatMoney, formatNumber } from "@/lib/format";
import { getStats } from "@/lib/stats";

export async function RevenueChart() {
  const { revenueByDay, currency } = await getStats();
  const maxRevenue = Math.max(...revenueByDay.map((day) => day.revenue), 1);

  return (
    <Card title="Revenue, last 14 days" className="lg:flex-[2]">
      <div className="flex h-56 items-end gap-1.5">
        {revenueByDay.map((day) => (
          <div key={day.date} className="group flex h-full flex-1 flex-col items-center justify-end gap-1">
            <span className="text-[10px] text-slate-500 opacity-0 transition group-hover:opacity-100">
              {formatNumber(day.revenue)}
            </span>
            <div
              className="w-full rounded-t-md bg-indigo-500 transition group-hover:bg-indigo-600"
              style={{ height: `${(day.revenue / maxRevenue) * 100}%` }}
              title={`${day.date}: ${formatMoney(day.revenue, currency)}, ${day.orders} orders`}
            />
            <span className="text-[10px] text-slate-400">{formatDayMonth(day.date)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
