"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/auth-context";
import { getUserOrders, formatPrice } from "@/lib/data";
import type { Order } from "@/lib/types";
import Link from "next/link";

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (user) {
      const userOrders = getUserOrders(user.id);
      setOrders(userOrders);
      setFilteredOrders(userOrders);
    }
  }, [user]);

  useEffect(() => {
    let filtered = orders;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchQuery, statusFilter]);

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Package className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "processing":
        return "default";
      case "shipped":
        return "default";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang xử lý";
      case "shipped":
        return "Đang giao";
      case "delivered":
        return "Đã giao";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const ordersByStatus = {
    all: filteredOrders,
    pending: filteredOrders.filter((order) => order.status === "pending"),
    processing: filteredOrders.filter((order) => order.status === "processing"),
    shipped: filteredOrders.filter((order) => order.status === "shipped"),
    delivered: filteredOrders.filter((order) => order.status === "delivered"),
    cancelled: filteredOrders.filter((order) => order.status === "cancelled"),
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Đơn hàng của tôi</h1>
          <p className="text-muted-foreground">
            Theo dõi và quản lý các đơn hàng của bạn
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo mã đơn hàng hoặc tên sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="pending">Chờ xử lý</SelectItem>
              <SelectItem value="processing">Đang xử lý</SelectItem>
              <SelectItem value="shipped">Đang giao</SelectItem>
              <SelectItem value="delivered">Đã giao</SelectItem>
              <SelectItem value="cancelled">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">
              Tất cả ({ordersByStatus.all.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Chờ xử lý ({ordersByStatus.pending.length})
            </TabsTrigger>
            <TabsTrigger value="processing">
              Đang xử lý ({ordersByStatus.processing.length})
            </TabsTrigger>
            <TabsTrigger value="shipped">
              Đang giao ({ordersByStatus.shipped.length})
            </TabsTrigger>
            <TabsTrigger value="delivered">
              Đã giao ({ordersByStatus.delivered.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Đã hủy ({ordersByStatus.cancelled.length})
            </TabsTrigger>
          </TabsList>

          {Object.entries(ordersByStatus).map(([status, statusOrders]) => (
            <TabsContent key={status} value={status}>
              {statusOrders.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      {status === "all"
                        ? "Bạn chưa có đơn hàng nào"
                        : `Không có đơn hàng ${getStatusText(
                            status as Order["status"]
                          ).toLowerCase()}`}
                    </p>
                    <Button asChild>
                      <Link href="/products">Bắt đầu mua sắm</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {statusOrders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              Đơn hàng #{order.id}
                            </CardTitle>
                            <CardDescription>
                              Đặt ngày{" "}
                              {new Date(order.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={getStatusColor(order.status)}
                              className="flex items-center gap-1"
                            >
                              {getStatusIcon(order.status)}
                              {getStatusText(order.status)}
                            </Badge>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/orders/${order.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                Chi tiết
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Order Items */}
                          <div className="space-y-2">
                            {order.items.slice(0, 2).map((item) => (
                              <div
                                key={`${item.productId}-${item.size}-${item.color}`}
                                className="flex items-center gap-3"
                              >
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <p className="font-medium text-sm">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {item.size} • {item.color} • SL:{" "}
                                    {item.quantity}
                                  </p>
                                </div>
                                <p className="font-medium text-sm">
                                  {formatPrice(item.price * item.quantity)}
                                </p>
                              </div>
                            ))}
                            {order.items.length > 2 && (
                              <p className="text-sm text-muted-foreground">
                                và {order.items.length - 2} sản phẩm khác...
                              </p>
                            )}
                          </div>

                          {/* Order Summary */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {order.items.length} sản phẩm
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Giao đến: {order.shippingAddress.name}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">
                                Tổng cộng
                              </p>
                              <p className="text-lg font-bold text-primary">
                                {formatPrice(order.total)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
