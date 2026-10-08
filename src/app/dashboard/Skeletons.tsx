import type { CSSProperties, ReactNode } from "react";

const CHART_BAR_HEIGHTS = [35, 20, 55, 45, 30, 65, 80, 60, 75, 85, 25, 70, 90, 88];

function Bone({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return <div className={`rounded-md bg-slate-200 ${className}`} style={style} />;
}

function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      aria-hidden
      className={`flex animate-pulse flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function KpiSkeleton() {
  return (
    <section className="flex flex-col gap-4" aria-busy="true" aria-label="Loading metrics">
      <div className="flex flex-col gap-4 md:flex-row">
        {[0, 1, 2].map((i) => (
          <Card key={i} className="flex-1 gap-2">
            <Bone className="h-4 w-24" />
            <Bone className="h-7 w-40" />
          </Card>
        ))}
      </div>

      <Card className="gap-3">
        <Bone className="h-4 w-20" />
        <Bone className="h-3 w-full rounded-full" />
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Bone className="h-2.5 w-2.5 rounded-full" />
              <Bone className="h-4 w-16" />
            </div>
          ))}
        </div>
        <Bone className="h-3 w-32" />
      </Card>
    </section>
  );
}

export function RevenueChartSkeleton() {
  return (
    <Card className="gap-4 lg:flex-[2]">
      <Bone className="h-6 w-48" />
      <div className="flex h-56 items-end gap-1.5">
        {CHART_BAR_HEIGHTS.map((height, i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
            <Bone className="w-full rounded-t-md rounded-b-none" style={{ height: `${height}%` }} />
            <Bone className="h-2.5 w-6" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function RecentOrdersSkeleton() {
  return (
    <Card className="gap-4 lg:flex-1">
      <div className="flex items-center justify-between">
        <Bone className="h-6 w-36" />
        <Bone className="h-4 w-14" />
      </div>
      <ul className="flex flex-col divide-y divide-slate-100">
        {[0, 1, 2, 3, 4].map((i) => (
          <li key={i} className="flex items-center justify-between gap-3 py-2.5">
            <div className="flex flex-col gap-1.5">
              <Bone className="h-4 w-40" />
              <Bone className="h-3 w-24" />
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <Bone className="h-4 w-20" />
              <Bone className="h-3 w-12" />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
