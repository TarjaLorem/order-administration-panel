"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { CARD_SURFACE } from "@/components/Card";
import { ORDER_STATUSES, type OrderStatus, type ParamsPatch } from "@/types/models";

import { ordersHref } from "../search-params";

export function OrdersToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlQuery = searchParams.get("q") ?? "";
  const [q, setQ] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);

  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setQ(urlQuery);
  }

  const selected = (searchParams.get("status") ?? "").split(",").filter(Boolean) as OrderStatus[];

  const navigate = (patch: ParamsPatch, mode: "push" | "replace" = "push") => {
    const href = ordersHref(new URLSearchParams(searchParams.toString()), { ...patch, page: undefined });
    startTransition(() => (mode === "push" ? router.push(href) : router.replace(href)));
  };

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
    <div
      className={`flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between ${CARD_SURFACE}`}
    >
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
