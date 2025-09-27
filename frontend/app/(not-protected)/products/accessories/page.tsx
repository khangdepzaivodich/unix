"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products.json";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Watch, Gem, TrendingUp, Star } from "lucide-react";

export default function AccessoriesPage() {
  const [sortBy, setSortBy] = useState<
    "featured" | "price-low" | "price-high" | "name"
  >("featured");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter accessories products
  const allAccessoriesProducts = products.filter(
    (product) => product.category === "men" || product.tags?.includes("men")
  );
  const accessoriesProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.category === "accessories" ||
        product.tags?.includes("accessories")
    );

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.subcategory === selectedCategory
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return b.rating - a.rating;
      }
    });
  }, [sortBy, selectedCategory]);

  const categories = [
    { id: "all", name: "Tất cả", count: allAccessoriesProducts.length },
    {
      id: "bags",
      name: "Túi xách",
      count: allAccessoriesProducts.filter((p) => p.subcategory === "bags")
        .length,
    },
    {
      id: "watches",
      name: "Đồng hồ",
      count: allAccessoriesProducts.filter((p) => p.subcategory === "watches")
        .length,
    },
    {
      id: "jewelry",
      name: "Trang sức",
      count: allAccessoriesProducts.filter((p) => p.subcategory === "jewelry")
        .length,
    },
    {
      id: "sunglasses",
      name: "Kính mát",
      count: allAccessoriesProducts.filter(
        (p) => p.subcategory === "sunglasses"
      ).length,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-600 px-4 py-2 rounded-full mb-4">
          <Gem className="h-4 w-4" />
          <span className="font-medium">PHỤ KIỆN THỜI TRANG</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hoàn Thiện <span className="text-amber-600">Phong Cách</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Bộ sưu tập phụ kiện cao cấp để tôn lên vẻ đẹp và cá tính riêng của bạn
        </p>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Watch className="h-8 w-8 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold">{accessoriesProducts.length}</h3>
            <p className="text-sm text-muted-foreground">Phụ kiện</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold">
              {
                accessoriesProducts.filter(
                  (p) => p.originalPrice && p.originalPrice > p.price
                ).length
              }
            </h3>
            <p className="text-sm text-muted-foreground">Đang sale</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold">
              {accessoriesProducts.length > 0
                ? (
                    accessoriesProducts.reduce((sum, p) => sum + p.rating, 0) /
                    accessoriesProducts.length
                  ).toFixed(1)
                : "0"}
            </h3>
            <p className="text-sm text-muted-foreground">Đánh giá TB</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Badge className="h-8 w-8 bg-amber-500 text-white rounded-full flex items-center justify-center">
                NEW
              </Badge>
            </div>
            <h3 className="text-2xl font-bold">
              {
                accessoriesProducts.filter((p) => p.tags?.includes("new"))
                  .length
              }
            </h3>
            <p className="text-sm text-muted-foreground">Sản phẩm mới</p>
          </CardContent>
        </Card>
      </div> */}

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.name}
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Phụ kiện thời trang</h2>
          <p className="text-muted-foreground">
            {accessoriesProducts.length} sản phẩm được tìm thấy
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "featured" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("featured")}
          >
            Nổi bật
          </Button>
          <Button
            variant={sortBy === "price-low" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("price-low")}
          >
            Giá thấp
          </Button>
          <Button
            variant={sortBy === "price-high" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("price-high")}
          >
            Giá cao
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
      {accessoriesProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accessoriesProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">
            Không tìm thấy sản phẩm nào
          </h3>
          <p className="text-muted-foreground mb-6">
            Thử thay đổi bộ lọc hoặc tìm kiếm khác
          </p>
          <Button onClick={() => setSelectedCategory("all")}>
            Xem tất cả phụ kiện
          </Button>
        </div>
      )}

      {/* Newsletter Section */}
      <Separator className="my-12" />
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Xu hướng phụ kiện mới nhất</h3>
        <p className="text-muted-foreground mb-6">
          Đăng ký để nhận thông tin về các bộ sưu tập phụ kiện và ưu đãi đặc
          biệt
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
