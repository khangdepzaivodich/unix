import type React from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { InventorySidebar } from "@/components/inventory/inventory-sidebar";
import { InventoryHeader } from "@/components/inventory/inventory-header";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ProtectedRoute requiredPermissions={["manage_inventory"]}>
    <div className="flex h-screen bg-gray-50">
      <InventorySidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <InventoryHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
    // </ProtectedRoute>
  );
}
