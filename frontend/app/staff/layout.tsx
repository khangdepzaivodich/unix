import type React from "react";
import { ProtectedRoute } from "@/components/protected-route";
import { StaffSidebar } from "@/components/staff/staff-sidebar";
import { StaffHeader } from "@/components/staff/staff-header";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ProtectedRoute
    //   requiredPermissions={[
    //     "manage_orders",
    //     "manage_promotions",
    //     "manage_notifications",
    //   ]}
    // >
    <div className="flex h-screen bg-gray-50">
      <StaffSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <StaffHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
    // </ProtectedRoute>
  );
}
