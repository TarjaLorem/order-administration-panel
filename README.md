# Order Administration Panel

Next.js 16 · TypeScript · Tailwind. `npm run dev` → `/dashboard`.

## Component trees

`[S]` server, `[C]` client. Client only where browser state is needed.

```
/dashboard
DashboardPage [S]
├─ Suspense › KpiCards [S]
├─ Suspense › RevenueChart [S]
└─ Suspense › RecentOrders [S]
```
Read-only, so there's no client JS. Separate Suspense blocks keep the slow `/stats` from blocking the rest.

```
/orders
OrdersPage [S]
├─ OrdersToolbar [C]        search/filter input → URL
├─ OrdersTable [S]
│  ├─ SortHeader [S]        <Link>
│  └─ StatusSelect [C]      useOptimistic
└─ Pagination [S]           <Link>
@modal/(.)[id]
└─ OrderModal [C]           <dialog>, router.back()
   └─ OrderDetails [S]
```
State lives in the URL, so the server renders the table. Only typing, optimistic status and the dialog run on the client.

```
/orders/[id]
OrderPage [S]
└─ OrderDetails [S]
   ├─ OrderHeader [S] › StatusSelect [C]
   ├─ OrderItems [S]
   ├─ OrderNotes [C]        optimistic list + form share state
   ├─ CustomerCard [S]
   └─ StatusHistory [S]
error.tsx [C]               required by Next
```

## Rendering

| Page | Mode | Invalidation | Why |
|---|---|---|---|
| `/products` | Static | build only | not edited here |
| `/dashboard` | ISR 30s | time + `updateTag("orders")` | slightly stale is OK, own edits show instantly |
| `/orders` | Dynamic | per request + `updateTag("orders")` | depends on searchParams |
| `/orders/[id]` | SSG ×20 + on demand | `updateTag("order-${id}")` | changes only via this panel's actions |
| modal | Dynamic | same tag as details | interception is per navigation |

## Cache tags

```
updateOrderStatus → "orders"      → getOrders, getRecentOrders, getStats
                  → "order-${id}" → getOrder
addOrderNote      → "order-${id}" → getOrder
untagged (force-cache): getTransitions, getProducts
```

## next build

```
┌ ○ /_not-found
├ ○ /dashboard          30s
├ ƒ /orders
├ ƒ /orders/(.)[id]
├   /orders/[id]
│ ├ ● /orders/1150 … [+19 more]
└ ○ /products
```

## FAIL_RATE=1

The API returns 500 → *"Server error — changes were not saved."*

- **Status:** the badge switches instantly, rolls back to the real status, and a red error appears under it.
- **Note:** the note appears faded ("Saving…"), then disappears. The text goes back into the textarea and a red alert appears under the form.
