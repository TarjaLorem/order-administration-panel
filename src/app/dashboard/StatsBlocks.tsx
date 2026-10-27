import { Card } from "@/components/Card";
import { formatMoney, formatNumber, formatTime } from "@/lib/format";
import { getStats } from "@/lib/stats";
import { ORDER_STATUSES, type OrderStatus } from "@/types/models";

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-amber-400",
  paid: "bg-sky-500",
  shipped: "bg-indigo-500",
  delivered: "bg-emerald-500",
  cancelled: "bg-slate-400",
};

export async function KpiCards() {
  const stats = await getStats();
  const statusTotal = Object.values(stats.byStatus).reduce((sum, count) => sum + count, 0) || 1;
  const statusShare = (status: OrderStatus) => `${(stats.byStatus[status] / statusTotal) * 100}%`;

  const kpis = [
    { label: "Revenue", value: formatMoney(stats.revenue, stats.currency) },
    { label: "Orders", value: formatNumber(stats.ordersCount) },
    { label: "Average order", value: formatMoney(stats.avgOrderValue, stats.currency) },
  ];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="flex-1 !gap-1">
            <span className="text-sm text-slate-500">{kpi.label}</span>
            <span className="text-2xl font-semibold tracking-tight">{kpi.value}</span>
          </Card>
        ))}
      </div>

      <Card className="!gap-3">
        <span className="text-sm text-slate-500">By status</span>

        <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
          {ORDER_STATUSES.map((status) => (
            <div key={status} className={STATUS_COLORS[status]} style={{ width: statusShare(status) }} />
          ))}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {ORDER_STATUSES.map((status) => (
            <span key={status} className="flex items-center gap-2 capitalize">
              <span className={`h-2.5 w-2.5 rounded-full ${STATUS_COLORS[status]}`} />
              {status}
              <strong>{stats.byStatus[status] ?? 0}</strong>
            </span>
          ))}
        </div>

        <span className="text-xs text-slate-400">Generated at {formatTime(stats.generatedAt)}</span>
      </Card>
    </section>
  );
}
