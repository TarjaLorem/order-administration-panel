import Link from "next/link";

export default function OrderNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center">
      <span className="text-5xl font-semibold text-slate-300">404</span>
      <h1 className="text-2xl font-semibold">Order not found</h1>
      <p className="text-slate-600">This order doesn&apos;t exist or was removed.</p>
      <Link
        href="/orders"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Back to orders
      </Link>
    </main>
  );
}
