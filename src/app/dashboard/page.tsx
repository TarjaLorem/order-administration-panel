import { Suspense } from "react";

import { RecentOrders } from "./RecentOrders";
import { RevenueChart } from "./RevenueChart";
import { KpiSkeleton, RecentOrdersSkeleton, RevenueChartSkeleton } from "./Skeletons";
import { KpiCards } from "./StatsBlocks";

// ISR: metrics may lag up to 30s. Status changes call updateTag("orders") → fresh immediately.
export const revalidate = 30;

export default function DashboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-9 md:px-6 md:py-12">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-slate-600">Metrics refresh every 30 seconds</p>
      </header>

      {/* Slow /api/stats (~1.5s) streams in without blocking the rest of the page */}
      <Suspense fallback={<KpiSkeleton />}>
        <KpiCards />
      </Suspense>

      <div className="flex flex-col gap-6 lg:flex-row">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<RecentOrdersSkeleton />}>
          <RecentOrders />
        </Suspense>
      </div>
    </main>
  );
}
