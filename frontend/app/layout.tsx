import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/contexts/auth-context";
import { LiveChat } from "@/components/customer-support/live-chat";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlexStyle - Thời trang hiện đại",
  description:
    "Cửa hàng thời trang trực tuyến hàng đầu Việt Nam với những sản phẩm chất lượng cao",
  generator: "v0.app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <main className="min-h-screen">{children}</main>
          </Suspense>
        </AuthProvider>
        <Analytics />
        <LiveChat />
      </body>
    </html>
  );
}
