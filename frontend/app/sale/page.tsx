"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products.json";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Percent, Clock, Star, TrendingUp } from "lucide-react";

export default function SalePage() {
  const [sortBy, setSortBy] = useState<"discount" | "price" | "name">(
    "discount"
  );

  // Filter products on sale and add discount info
  const saleProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          product.originalPrice && product.originalPrice > product.price
      )
      .map((product) => ({
        ...product,
        discount: Math.round(
          ((product.originalPrice! - product.price) / product.originalPrice!) *
            100
        ),
      }))
      .sort((a, b) => {
        switch (sortBy) {
          case "discount":
            return b.discount - a.discount;
          case "price":
            return a.price - b.price;
          case "name":
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [sortBy]);

  const totalSavings = saleProducts.reduce(
    (total, product) => total + (product.originalPrice! - product.price),
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-4">
          <Percent className="h-4 w-4" />
          <span className="font-medium">KHUYẾN MÃI LỚN</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          SALE UP TO <span className="text-destructive">70%</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Cơ hội vàng sở hữu những món đồ thời trang yêu thích với giá ưu đãi
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Thời gian có hạn - Nhanh tay kẻo lỡ!</span>
        </div>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Percent className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold text-destructive">
              {saleProducts.length > 0
                ? Math.max(...saleProducts.map((p) => p.discount))
                : 0}
              %
            </h3>
            <p className="text-sm text-muted-foreground">Giảm giá tối đa</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">{saleProducts.length}</h3>
            <p className="text-sm text-muted-foreground">Sản phẩm đang sale</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold">
              {totalSavings.toLocaleString("vi-VN")}₫
            </h3>
            <p className="text-sm text-muted-foreground">Tổng tiết kiệm</p>
          </CardContent>
        </Card>
      </div> */}

      {/* Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Sản phẩm khuyến mãi</h2>
          <p className="text-muted-foreground">
            {saleProducts.length} sản phẩm đang được giảm giá
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "discount" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("discount")}
          >
            Giảm nhiều nhất
          </Button>
          <Button
            variant={sortBy === "price" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("price")}
          >
            Giá thấp nhất
          </Button>
          <Button
            variant={sortBy === "name" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("name")}
          >
            Tên A-Z
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      {saleProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <div key={product.id} className="relative">
              <Badge className="absolute top-2 left-2 z-10 bg-destructive text-destructive-foreground">
                -{product.discount}%
              </Badge>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">
            Hiện tại không có sản phẩm nào đang sale
          </h3>
          <p className="text-muted-foreground mb-6">
            Hãy quay lại sau để không bỏ lỡ những ưu đãi hấp dẫn!
          </p>
          <Button asChild>
            <a href="/products">Xem tất cả sản phẩm</a>
          </Button>
        </div>
      )}

      {/* Newsletter Section */}
      <Separator className="my-12" />
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Đừng bỏ lỡ ưu đãi!</h3>
        <p className="text-muted-foreground mb-6">
          Đăng ký nhận thông báo về các chương trình khuyến mãi mới nhất
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <Button>Đăng ký</Button>
        </div>
      </div>
    </div>
  );
}
