import Link from "next/link";

import type { IPageLinkProps, IPaginationProps } from "@/types/props";

import { ordersHref } from "../search-params";

const ENABLED = "rounded-lg border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-100";
const DISABLED = "rounded-lg border border-slate-100 px-3 py-1.5 text-slate-300";

function PageLink({ page, label, enabled, params }: IPageLinkProps) {
  if (!enabled) return <span className={DISABLED}>{label}</span>;

  return (
    <Link href={ordersHref(params, { page: String(page) })} className={ENABLED}>
      {label}
    </Link>
  );
}

export function Pagination({ page, totalPages, params }: IPaginationProps) {
  return (
    <nav className="flex items-center justify-between gap-3 text-sm">
      <span className="text-slate-600">
        Page {page} of {Math.max(1, totalPages)}
      </span>
      <div className="flex gap-2">
        <PageLink page={page - 1} label="← Prev" enabled={page > 1} params={params} />
        <PageLink page={page + 1} label="Next →" enabled={page < totalPages} params={params} />
      </div>
    </nav>
  );
}
