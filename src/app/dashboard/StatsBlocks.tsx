import { getStats } from "@/lib/stats";
import { ORDER_STATUSES } from "@/types/models";

const money = new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 });

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-400",
  paid: "bg-sky-500",
  shipped: "bg-indigo-500",
  delivered: "bg-emerald-500",
  cancelled: "bg-slate-400",
};

export async function KpiCards() {
  const stats = await getStats();
  const totalByStatus = Object.values(stats.byStatus).reduce((sum, n) => sum + n, 0) || 1;

  const kpis = [
    { label: "Revenue", value: `${money.format(stats.revenue)} ${stats.currency}` },
    { label: "Orders", value: money.format(stats.ordersCount) },
    { label: "Average order", value: `${money.format(stats.avgOrderValue)} ${stats.currency}` },
  ];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="flex flex-1 flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-sm text-slate-500">{kpi.label}</span>
            <span className="text-2xl font-semibold tracking-tight">{kpi.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <span className="text-sm text-slate-500">By status</span>
        <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
          {ORDER_STATUSES.map((status) => (
            <div
              key={status}
              className={STATUS_COLORS[status]}
              style={{ width: `${(stats.byStatus[status] / totalByStatus) * 100}%` }}
            />
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
        <span className="text-xs text-slate-400">Generated at {new Date(stats.generatedAt).toLocaleTimeString("uk-UA")}</span>
      </div>
    </section>
  );
}
