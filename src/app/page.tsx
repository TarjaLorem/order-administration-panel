import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Order Admin Panel</h1>
      <p style={{ marginBottom: 16 }}>Open the products list:</p>
      <Link href="/products">/products</Link>
    </main>
  );
}
