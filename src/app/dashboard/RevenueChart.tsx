import { getStats } from "@/lib/stats";

const money = new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 });
const day = new Intl.DateTimeFormat("uk-UA", { day: "2-digit", month: "2-digit" });

// Pure server-rendered bar chart — no chart library in the client bundle.
export async function RevenueChart() {
  const { revenueByDay, currency } = await getStats();
  const max = Math.max(...revenueByDay.map((d) => d.revenue), 1);

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-[2]">
      <h2 className="text-lg font-semibold">Revenue, last 14 days</h2>
      <div className="flex h-56 items-end gap-1.5">
        {revenueByDay.map((d) => (
          <div key={d.date} className="group flex h-full flex-1 flex-col items-center justify-end gap-1">
            <span className="text-[10px] text-slate-500 opacity-0 transition group-hover:opacity-100">
              {money.format(d.revenue)}
            </span>
            <div
              className="w-full rounded-t-md bg-indigo-500 transition group-hover:bg-indigo-600"
              style={{ height: `${(d.revenue / max) * 100}%` }}
              title={`${d.date}: ${money.format(d.revenue)} ${currency}, ${d.orders} orders`}
            />
            <span className="text-[10px] text-slate-400">{day.format(new Date(d.date))}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
