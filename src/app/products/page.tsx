import { getProducts } from "@/lib/products";

export const dynamic = "force-static";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-9 md:px-6 md:py-12">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h1 className="m-0 text-3xl leading-tight font-semibold tracking-tight">Products</h1>
          <p className="m-0 text-slate-600">Static catalog generated at build time</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700">
          Total: <strong>{products.length}</strong>
        </div>
      </header>

      <section className="flex flex-wrap gap-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="flex min-w-[260px] flex-1 basis-[260px] flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2.5">
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-800">
                {product.category}
              </span>

              <strong className="text-lg text-slate-900">{product.price.toFixed(2)} UAH</strong>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="m-0 text-lg leading-snug font-medium">{product.name}</h2>
              <p className="m-0 text-sm text-slate-500">SKU: {product.sku}</p>
            </div>

            <div className="mt-auto border-t border-slate-100 pt-2 text-xs text-slate-600">
              ID: {product.id}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
