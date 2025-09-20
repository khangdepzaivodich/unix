import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { LanguageProvider } from "@/contexts/language-context";
import { LiveChat } from "@/components/customer-support/live-chat";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "FashionStore - Thời trang hiện đại",
  description:
    "Cửa hàng thời trang trực tuyến hàng đầu Việt Nam với những sản phẩm chất lượng cao",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
              </Suspense>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
        <Analytics />
        <LiveChat />
      </body>
    </html>
  );
}
