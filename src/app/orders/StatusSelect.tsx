"use client";

import { useOptimistic, useState, useTransition } from "react";

import type { IStatusSelectProps, OrderStatus } from "@/types/models";

import { updateOrderStatus } from "./actions";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-800 border-amber-200",
  paid: "bg-sky-50 text-sky-800 border-sky-200",
  shipped: "bg-indigo-50 text-indigo-800 border-indigo-200",
  delivered: "bg-emerald-50 text-emerald-800 border-emerald-200",
  cancelled: "bg-slate-100 text-slate-500 border-slate-200",
};

export function StatusSelect({ id, status, transitions }: IStatusSelectProps) {
  const [optimistic, setOptimistic] = useOptimistic(status);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const allowed = transitions[optimistic] ?? [];

  const change = (next: OrderStatus) => {
    setError(null);
    startTransition(async () => {
      setOptimistic(next); // 1. show immediately
      const result = await updateOrderStatus(id, next); // 2. Server Action
      if (!result.ok) setError(result.error); // 3. on failure props are old → auto rollback
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <select
        value={optimistic}
        disabled={isPending || allowed.length === 0}
        onChange={(e) => change(e.target.value as OrderStatus)}
        className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize disabled:cursor-not-allowed ${
          STATUS_STYLES[optimistic]
        } ${isPending ? "opacity-60" : ""}`}
      >
        <option value={optimistic}>{optimistic}</option>
        {allowed.map((s) => (
          <option key={s} value={s}>
            → {s}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
