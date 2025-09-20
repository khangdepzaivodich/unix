import type { UserRole, Permission, Role } from "./types";

// Define roles and their permissions
export const ROLES: Record<UserRole, Role> = {
  customer: {
    id: "customer",
    name: "Khách hàng",
    description: "Khách hàng thông thường",
    permissions: [],
    color: "bg-blue-500",
  },
  admin: {
    id: "admin",
    name: "Quản trị viên",
    description: "Toàn quyền quản lý hệ thống",
    permissions: [
      "products.view",
      "products.create",
      "products.edit",
      "products.delete",
      "orders.view",
      "orders.edit",
      "orders.cancel",
      "orders.process",
      "users.view",
      "users.create",
      "users.edit",
      "users.delete",
      "inventory.view",
      "inventory.edit",
      "inventory.reports",
      "analytics.view",
      "analytics.export",
      "support.view",
      "support.respond",
      "promotions.view",
      "promotions.create",
      "promotions.edit",
      "suppliers.view",
      "suppliers.manage",
    ],
    color: "bg-red-500",
  },
  staff_operations: {
    id: "staff_operations",
    name: "Nhân viên vận hành",
    description: "Xử lý đơn hàng và sự kiện",
    permissions: [
      "orders.view",
      "orders.edit",
      "orders.process",
      "promotions.view",
      "promotions.create",
      "promotions.edit",
      "products.view",
    ],
    color: "bg-green-500",
  },
  staff_customer_service: {
    id: "staff_customer_service",
    name: "Nhân viên CSKH",
    description: "Chăm sóc khách hàng",
    permissions: [
      "orders.view",
      "support.view",
      "support.respond",
      "users.view",
    ],
    color: "bg-purple-500",
  },
  staff_inventory: {
    id: "staff_inventory",
    name: "Nhân viên kiểm kho",
    description: "Quản lý kho hàng",
    permissions: [
      "inventory.view",
      "inventory.edit",
      "inventory.reports",
      "products.view",
      "products.edit",
      "suppliers.view",
    ],
    color: "bg-orange-500",
  },
  staff_manager: {
    id: "staff_manager",
    name: "Nhân viên quản lý",
    description: "Quản lý nhân sự và thống kê",
    permissions: [
      "users.view",
      "users.edit",
      "analytics.view",
      "analytics.export",
      "support.view",
      "suppliers.view",
      "suppliers.manage",
      "orders.view",
    ],
    color: "bg-indigo-500",
  },
  supplier: {
    id: "supplier",
    name: "Nhà cung cấp",
    description: "Cung cấp sản phẩm",
    permissions: ["products.view", "inventory.view"],
    color: "bg-yellow-500",
  },
};

// Permission checker functions
export function hasPermission(
  userPermissions: Permission[],
  requiredPermission: Permission
): boolean {
  return userPermissions.includes(requiredPermission);
}

export function hasAnyPermission(
  userPermissions: Permission[],
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
}

export function hasAllPermissions(
  userPermissions: Permission[],
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );
}

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const routePermissions: Record<string, Permission[]> = {
    "/admin": ["users.view", "analytics.view"],
    "/admin/products": ["products.view"],
    "/admin/orders": ["orders.view"],
    "/admin/users": ["users.view"],
    "/admin/inventory": ["inventory.view"],
    "/admin/analytics": ["analytics.view"],
    "/admin/support": ["support.view"],
    "/admin/promotions": ["promotions.view"],
    "/admin/suppliers": ["suppliers.view"],
    "/staff/operations": ["orders.view", "promotions.view"],
    "/staff/customer-service": ["support.view"],
    "/staff/inventory": ["inventory.view"],
    "/staff/manager": ["users.view", "analytics.view"],
    "/supplier": ["products.view", "inventory.view"],
  };

  const requiredPermissions = routePermissions[route];
  if (!requiredPermissions) return true;

  const userPermissions = ROLES[userRole].permissions;
  return hasAnyPermission(userPermissions, requiredPermissions);
}

// Get user role display info
export function getRoleInfo(role: UserRole) {
  return ROLES[role];
}

// Check if user can perform action on resource
export function canPerformAction(
  userRole: UserRole,
  action: "create" | "read" | "update" | "delete",
  resource: string
): boolean {
  const permission = `${resource}.${
    action === "read" ? "view" : action
  }` as Permission;
  return hasPermission(ROLES[userRole].permissions, permission);
}
