"use client";

import Link from "next/link";

export default function OrderError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Couldn&apos;t load this order</h1>
      <p className="max-w-md text-slate-600">
        The orders service is not responding right now. Check that the API is running and try again.
      </p>
      {error.digest && <code className="text-xs text-slate-400">Error ID: {error.digest}</code>}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Try again
        </button>
        <Link href="/orders" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-100">
          Back to orders
        </Link>
      </div>
    </main>
  );
}
