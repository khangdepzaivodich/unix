"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Package,
  Warehouse,
  BarChart3,
  Home,
  Settings,
  Tags,
  AlertTriangle,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/inventory", icon: Home },
  { name: "Stock Management", href: "/inventory/stock", icon: Package },
  { name: "Warehouse", href: "/inventory/warehouse", icon: Warehouse },
  { name: "Categories", href: "/inventory/categories", icon: Tags },
  { name: "Low Stock Alerts", href: "/inventory/alerts", icon: AlertTriangle },
  { name: "Reports", href: "/inventory/reports", icon: BarChart3 },
  { name: "Settings", href: "/inventory/settings", icon: Settings },
];

export function InventorySidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-sm border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Inventory Manager
        </h2>
        <p className="text-sm text-gray-500">Stock & Warehouse Control</p>
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
                  ? "bg-purple-50 text-purple-700 border-r-2 border-purple-700"
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
