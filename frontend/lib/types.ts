export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export type UserRole =
  | "customer"
  | "admin"
  | "staff_operations"
  | "staff_customer_service"
  | "staff_inventory"
  | "staff_manager"
  | "supplier";

export type Permission =
  // Product management
  | "products.view"
  | "products.create"
  | "products.edit"
  | "products.delete"
  // Order management
  | "orders.view"
  | "orders.edit"
  | "orders.cancel"
  | "orders.process"
  // User management
  | "users.view"
  | "users.create"
  | "users.edit"
  | "users.delete"
  // Inventory management
  | "inventory.view"
  | "inventory.edit"
  | "inventory.reports"
  // Analytics
  | "analytics.view"
  | "analytics.export"
  // Customer support
  | "support.view"
  | "support.respond"
  // Promotions
  | "promotions.view"
  | "promotions.create"
  | "promotions.edit"
  // Suppliers
  | "suppliers.view"
  | "suppliers.manage";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  permissions: Permission[];
  department?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    ward: string;
  };
}

export interface Role {
  id: UserRole;
  name: string;
  description: string;
  permissions: Permission[];
  color: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  managerId?: string;
}

export interface Staff extends User {
  employeeId: string;
  department: string;
  manager?: string;
  salary?: number;
  startDate: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  products: string[];
  isActive: boolean;
  rating: number;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  sku: string;
  quantity: number;
  reservedQuantity: number;
  minStock: number;
  maxStock: number;
  location: string;
  lastUpdated: string;
  supplierId: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  type: "percentage" | "fixed" | "shipping";
  value: number;
  minOrder: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdBy: string;
}

export interface CustomerSupport {
  id: string;
  customerId: string;
  staffId?: string;
  subject: string;
  message: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: "order" | "product" | "shipping" | "payment" | "other";
  createdAt: string;
  updatedAt: string;
  responses: SupportResponse[];
}

export interface SupportResponse {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  isStaff: boolean;
  createdAt: string;
  attachments?: string[];
}
