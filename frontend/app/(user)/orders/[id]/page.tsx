"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  MapPin,
  Phone,
  User,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { getOrderById, formatPrice } from "@/lib/data";
import type { Order } from "@/lib/types";
import Link from "next/link";

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      router.push("/login");
    }
  }, [isLoading, router]);

  useEffect(() => {
    if (user) {
      const orderData = getOrderById(params.id);
      if (orderData && orderData.userId === user.id) {
        setOrder(orderData);
      } else {
        router.push("/orders");
      }
    }
  }, [user, params.id, router]);

  const copyOrderId = async () => {
    if (order) {
      await navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Package className="h-5 w-5" />;
      case "processing":
        return <Package className="h-5 w-5" />;
      case "shipped":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5" />;
      case "cancelled":
        return <XCircle className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
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

  const getStatusSteps = (currentStatus: Order["status"]) => {
    const steps = [
      { key: "pending", label: "Chờ xử lý", icon: Package },
      { key: "processing", label: "Đang xử lý", icon: Package },
      { key: "shipped", label: "Đang giao", icon: Truck },
      { key: "delivered", label: "Đã giao", icon: CheckCircle },
    ];

    const statusOrder = ["pending", "processing", "shipped", "delivered"];
    const currentIndex = statusOrder.indexOf(currentStatus);

    return steps.map((step, index) => ({
      ...step,
      completed: currentStatus === "cancelled" ? false : index <= currentIndex,
      active: index === currentIndex && currentStatus !== "cancelled",
    }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  if (!user || !order) {
    return null;
  }

  const statusSteps = getStatusSteps(order.status);
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 30000; // 30k shipping fee
  const discount = subtotal - order.total + shipping; // Calculate discount

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại đơn hàng
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Chi tiết đơn hàng</h1>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground">#{order.id}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyOrderId}
                  className="h-6 w-6 p-0"
                >
                  {copied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
            <Badge
              variant={getStatusColor(order.status)}
              className="flex items-center gap-2 text-sm px-3 py-1"
            >
              {getStatusIcon(order.status)}
              {getStatusText(order.status)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline */}
            {order.status !== "cancelled" && (
              <Card>
                <CardHeader>
                  <CardTitle>Trạng thái đơn hàng</CardTitle>
                  <CardDescription>
                    Theo dõi tiến trình xử lý đơn hàng của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    {statusSteps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div
                          key={step.key}
                          className="flex flex-col items-center flex-1"
                        >
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                              step.completed
                                ? "bg-primary border-primary text-primary-foreground"
                                : step.active
                                ? "border-primary text-primary"
                                : "border-muted-foreground text-muted-foreground"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <p
                            className={`text-xs mt-2 text-center ${
                              step.completed || step.active
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {step.label}
                          </p>
                          {index < statusSteps.length - 1 && (
                            <div
                              className={`absolute h-0.5 w-full mt-5 ${
                                step.completed ? "bg-primary" : "bg-muted"
                              }`}
                              style={{
                                left: `${
                                  (100 / statusSteps.length) * (index + 0.5)
                                }%`,
                                width: `${100 / statusSteps.length}%`,
                                zIndex: -1,
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Sản phẩm đã đặt</CardTitle>
                <CardDescription>{order.items.length} sản phẩm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.size} • {item.color}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(item.price)}</p>
                        <p className="text-sm text-muted-foreground">
                          Tổng: {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Địa chỉ giao hàng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {order.shippingAddress.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{order.shippingAddress.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p>{order.shippingAddress.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.shippingAddress.ward},{" "}
                        {order.shippingAddress.district},{" "}
                        {order.shippingAddress.city}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-primary">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Ngày đặt hàng</p>
                  <p className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mã đơn hàng</p>
                  <p className="font-medium font-mono">#{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Phương thức thanh toán
                  </p>
                  <p className="font-medium">Thanh toán khi nhận hàng</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            {order.status === "pending" && (
              <Card>
                <CardHeader>
                  <CardTitle>Thao tác</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="w-full">
                    Hủy đơn hàng
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
