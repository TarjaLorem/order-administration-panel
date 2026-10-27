import { Card } from "@/components/Card";
import { formatDateTime } from "@/lib/format";
import type { IStatusHistoryProps } from "@/types/models";

export function StatusHistory({ history }: IStatusHistoryProps) {
  return (
    <Card title="Status history">
      <ol className="flex flex-col gap-3 border-l-2 border-slate-200 pl-4">
        {history.map((entry) => (
          <li key={`${entry.status}-${entry.at}`} className="relative flex flex-col">
            <span className="absolute top-1.5 -left-[21px] h-2.5 w-2.5 rounded-full bg-indigo-500" />
            <span className="text-sm font-medium capitalize">{entry.status}</span>
            <span className="text-xs text-slate-500">{formatDateTime(entry.at)}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}
