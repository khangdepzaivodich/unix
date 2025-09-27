import React from "react";
import { LanguageProvider } from "@/contexts/language-context";
import { cookies } from "next/headers";
import { CartProvider } from "@/contexts/cart-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value || "vi";
  return (
    <>
      {" "}
      <LanguageProvider initialLanguage={language as "vi" | "en"}>
        <CartProvider>
          <Header />
          {children} <Footer />
        </CartProvider>
      </LanguageProvider>
    </>
  );
}
