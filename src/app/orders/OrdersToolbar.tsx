"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { ORDER_STATUSES, type OrderStatus } from "@/types/models";

export function OrdersToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlQuery = searchParams.get("q") ?? "";
  const [q, setQ] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);

  // Keep input in sync with URL (back/forward navigation).
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setQ(urlQuery);
  }

  const selected = (searchParams.get("status") ?? "").split(",").filter(Boolean) as OrderStatus[];

  const navigate = (patch: Record<string, string | undefined>, mode: "push" | "replace" = "push") => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    params.delete("page"); // any filter change resets pagination
    const qs = params.toString();
    const href = qs ? `${pathname}?${qs}` : pathname;
    startTransition(() => (mode === "push" ? router.push(href) : router.replace(href)));
  };

  // Debounced search → URL.
  useEffect(() => {
    if (q.trim() === urlQuery) return;
    const timer = setTimeout(() => navigate({ q: q.trim() || undefined }, "replace"), 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const toggleStatus = (status: OrderStatus) => {
    const next = selected.includes(status) ? selected.filter((s) => s !== status) : [...selected, status];
    navigate({ status: next.length ? next.join(",") : undefined });
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {ORDER_STATUSES.map((status) => {
          const active = selected.includes(status);
          return (
            <button
              key={status}
              type="button"
              onClick={() => toggleStatus(status)}
              aria-pressed={active}
              className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors ${
                active
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        {isPending && <span className="text-xs text-slate-400">Loading…</span>}
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by customer…"
          className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-indigo-500 md:w-64"
        />
      </div>
    </div>
  );
}
