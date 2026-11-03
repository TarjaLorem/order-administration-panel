"use client";

import Link from "next/link";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-md text-slate-600">
        We couldn&apos;t load this page. The service may be temporarily unavailable — please try again.
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
        <Link href="/" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-100">
          Go home
        </Link>
      </div>
    </main>
  );
}
