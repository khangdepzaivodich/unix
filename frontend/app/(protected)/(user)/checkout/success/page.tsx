"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, Truck, Mail } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const [orderNumber] = useState(
    () => "ORD" + Math.random().toString(36).substr(2, 9).toUpperCase()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Đặt hàng thành công!</h1>
          <p className="text-muted-foreground">
            Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Thông tin đơn hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Mã đơn hàng:</span>
              <span className="font-mono text-primary">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Ngày đặt:</span>
              <span>{new Date().toLocaleDateString("vi-VN")}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Trạng thái:</span>
              <span className="text-green-600 font-medium">Đã xác nhận</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium mb-1">Email xác nhận</h3>
              <p className="text-sm text-muted-foreground">
                Chúng tôi đã gửi email xác nhận đến bạn
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Package className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium mb-1">Đóng gói</h3>
              <p className="text-sm text-muted-foreground">
                Đơn hàng sẽ được đóng gói trong 24h
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium mb-1">Giao hàng</h3>
              <p className="text-sm text-muted-foreground">
                Dự kiến giao trong 3-5 ngày
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/account">Theo dõi đơn hàng</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
