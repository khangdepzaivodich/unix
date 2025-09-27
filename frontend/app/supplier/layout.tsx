import type React from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { SupplierSidebar } from "@/components/supplier/supplier-sidebar";
import { SupplierHeader } from "@/components/supplier/supplier-header";

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ProtectedRoute requiredPermissions={["manage_inventory"]}>
    <div className="flex h-screen bg-gray-50">
      <SupplierSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SupplierHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
    // </ProtectedRoute>
  );
}
