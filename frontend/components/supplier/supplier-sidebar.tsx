"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Package,
  Truck,
  BarChart3,
  Home,
  Settings,
  AlertCircle,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/supplier", icon: Home },
  { name: "My Products", href: "/supplier/products", icon: Package },
  { name: "Supply Orders", href: "/supplier/orders", icon: Truck },
  { name: "Inventory Status", href: "/supplier/inventory", icon: AlertCircle },
  { name: "Analytics", href: "/supplier/analytics", icon: BarChart3 },
  { name: "Settings", href: "/supplier/settings", icon: Settings },
];

export function SupplierSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-sm border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">Supplier Portal</h2>
        <p className="text-sm text-gray-500">Manage your supplies</p>
      </div>
      <nav className="px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-green-50 text-green-700 border-r-2 border-green-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
