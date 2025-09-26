import type React from "react";
import type { Metadata } from "next";
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/contexts/cart-context";
import { AuthProvider } from "@/contexts/auth-context";
import { LanguageProvider } from "@/contexts/language-context";
import { LiveChat } from "@/components/customer-support/live-chat";
import { Suspense } from "react";
import "./globals.css";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "FashionStore - Thời trang hiện đại",
  description:
    "Cửa hàng thời trang trực tuyến hàng đầu Việt Nam với những sản phẩm chất lượng cao",
  generator: "v0.app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value || "vi";

  return (
    <html lang="vi">
      {/* <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>\ */}
      <body>
        <LanguageProvider initialLanguage={language as "vi" | "en"}>
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
