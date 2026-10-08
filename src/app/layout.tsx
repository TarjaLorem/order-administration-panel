import type { ReactNode } from "react";
import "./globals.css";

import { SiteHeader } from "@/components/SiteHeader";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
