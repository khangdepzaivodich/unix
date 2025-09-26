"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Gift,
  Percent,
  Calendar,
  Copy,
  Check,
  Star,
  Users,
} from "lucide-react";

export default function VoucherPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [voucherCode, setVoucherCode] = useState("");

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const activeVouchers = [
    {
      id: 1,
      code: "WELCOME50",
      title: "Chào mừng thành viên mới",
      description: "Giảm 50.000₫ cho đơn hàng đầu tiên từ 300.000₫",
      discount: "50.000₫",
      minOrder: "300.000₫",
      expiry: "31/03/2024",
      type: "new-member",
      used: 1250,
      limit: 5000,
    },
    {
      id: 2,
      code: "SALE20",
      title: "Giảm giá 20%",
      description: "Giảm 20% tối đa 200.000₫ cho tất cả sản phẩm",
      discount: "20%",
      minOrder: "500.000₫",
      expiry: "28/02/2024",
      type: "percentage",
      used: 3200,
      limit: 10000,
    },
    {
      id: 3,
      code: "FREESHIP",
      title: "Miễn phí vận chuyển",
      description: "Miễn phí ship toàn quốc cho mọi đơn hàng",
      discount: "Free Ship",
      minOrder: "0₫",
      expiry: "15/04/2024",
      type: "shipping",
      used: 8500,
      limit: 15000,
    },
    {
      id: 4,
      code: "VIP100",
      title: "Ưu đãi VIP",
      description: "Giảm 100.000₫ dành riêng cho thành viên VIP",
      discount: "100.000₫",
      minOrder: "1.000.000₫",
      expiry: "30/06/2024",
      type: "vip",
      used: 450,
      limit: 1000,
    },
  ];

  const expiredVouchers = [
    {
      code: "NEWYEAR2024",
      title: "Tết Nguyên Đán 2024",
      description: "Giảm 30% tối đa 300.000₫",
      expiry: "15/02/2024",
    },
    {
      code: "VALENTINE",
      title: "Valentine's Day",
      description: "Giảm 14% cho các sản phẩm thời trang",
      expiry: "14/02/2024",
    },
  ];

  const getVoucherIcon = (type: string) => {
    switch (type) {
      case "new-member":
        return <Users className="h-5 w-5" />;
      case "percentage":
        return <Percent className="h-5 w-5" />;
      case "shipping":
        return <Gift className="h-5 w-5" />;
      case "vip":
        return <Star className="h-5 w-5" />;
      default:
        return <Gift className="h-5 w-5" />;
    }
  };

  const getVoucherColor = (type: string) => {
    switch (type) {
      case "new-member":
        return "bg-blue-500";
      case "percentage":
        return "bg-green-500";
      case "shipping":
        return "bg-purple-500";
      case "vip":
        return "bg-yellow-500";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <Badge className="mb-4">MÃ GIẢM GIÁ</Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Voucher <span className="text-primary">Ưu Đãi</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Khám phá những mã giảm giá hấp dẫn và tiết kiệm chi phí mua sắm. Cập
          nhật liên tục các chương trình khuyến mãi đặc biệt dành riêng cho bạn.
        </p>
      </div>

      {/* Voucher Input */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-center">Nhập Mã Voucher</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex max-w-md mx-auto gap-2">
            <Input
              placeholder="Nhập mã voucher của bạn"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="uppercase"
            />
            <Button>Áp dụng</Button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Nhập mã voucher để kiểm tra tính hợp lệ và điều kiện áp dụng
          </p>
        </CardContent>
      </Card>

      {/* Active Vouchers */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Mã Giảm Giá Đang Có Hiệu Lực
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {activeVouchers.map((voucher) => (
            <Card key={voucher.id} className="relative overflow-hidden">
              <div
                className={`absolute top-0 left-0 w-2 h-full ${getVoucherColor(
                  voucher.type
                )}`}
              ></div>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg ${getVoucherColor(
                        voucher.type
                      )} text-white`}
                    >
                      {getVoucherIcon(voucher.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{voucher.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {voucher.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {voucher.discount}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Đơn tối thiểu: {voucher.minOrder}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">HSD: {voucher.expiry}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Đã dùng: {voucher.used.toLocaleString()}/
                      {voucher.limit.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getVoucherColor(
                      voucher.type
                    )}`}
                    style={{
                      width: `${(voucher.used / voucher.limit) * 100}%`,
                    }}
                  ></div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <code className="flex-1 font-mono font-bold text-lg">
                    {voucher.code}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyCode(voucher.code)}
                    className="flex items-center gap-1"
                  >
                    {copiedCode === voucher.code ? (
                      <>
                        <Check className="h-4 w-4" />
                        Đã copy
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-16" />

      {/* Expired Vouchers */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Mã Giảm Giá Đã Hết Hạn
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {expiredVouchers.map((voucher, index) => (
            <Card key={index} className="opacity-60">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold">{voucher.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {voucher.description}
                    </p>
                  </div>
                  <Badge variant="secondary">Hết hạn</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <code className="font-mono font-bold text-muted-foreground">
                    {voucher.code}
                  </code>
                  <span className="text-sm text-muted-foreground">
                    HSD: {voucher.expiry}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How to Use */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Cách Sử Dụng Voucher
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Chọn sản phẩm",
              description: "Thêm sản phẩm yêu thích vào giỏ hàng",
            },
            {
              step: "2",
              title: "Vào giỏ hàng",
              description: "Kiểm tra sản phẩm và số lượng",
            },
            {
              step: "3",
              title: "Nhập mã voucher",
              description: "Nhập mã vào ô 'Mã giảm giá' và nhấn áp dụng",
            },
            {
              step: "4",
              title: "Hoàn tất thanh toán",
              description: "Kiểm tra giá đã giảm và thanh toán",
            },
          ].map((step, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Điều Kiện Sử Dụng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>• Mỗi voucher chỉ được sử dụng một lần cho mỗi tài khoản</p>
          <p>• Không áp dụng đồng thời nhiều voucher cho một đơn hàng</p>
          <p>• Voucher không có giá trị quy đổi thành tiền mặt</p>
          <p>
            • FashionStore có quyền thay đổi điều kiện mà không cần báo trước
          </p>
          <p>• Voucher không áp dụng cho sản phẩm đã giảm giá trên 50%</p>
          <p>• Liên hệ CSKH nếu gặp vấn đề khi sử dụng voucher</p>
        </CardContent>
      </Card>
    </div>
  );
}
