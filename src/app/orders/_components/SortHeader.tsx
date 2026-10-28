import Link from "next/link";

import type { ISortHeaderProps } from "@/types/props";

import { nextSort, ordersHref } from "../search-params";

export function SortHeader({ field, label, sort, params }: ISortHeaderProps) {
  const { isActive, isDesc, next } = nextSort(sort, field);
  const arrow = isActive ? (isDesc ? "↓" : "↑") : "↕";

  return (
    <Link
      href={ordersHref(params, { sort: next, page: undefined })}
      className="inline-flex items-center gap-1 hover:text-slate-900"
    >
      {label}
      <span className="text-xs">{arrow}</span>
    </Link>
  );
}
