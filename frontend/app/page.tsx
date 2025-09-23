import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/data";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                Bộ sưu tập mới 2024
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                Thời trang hiện đại cho{" "}
                <span className="text-primary">phong cách</span> của bạn
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Khám phá những xu hướng thời trang mới nhất với chất lượng cao
                cấp và giá cả hợp lý. Tự tin thể hiện phong cách riêng của bạn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Mua sắm ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">Tìm hiểu thêm</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/modern-fashion-model-wearing-stylish-clothing.jpg"
                  alt="Fashion Model"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-lg shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Chất lượng đảm bảo</p>
                    <p className="text-xs text-muted-foreground">
                      100% hàng chính hãng
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Giao hàng miễn phí</h3>
              <p className="text-sm text-muted-foreground">
                Miễn phí giao hàng cho đơn hàng trên 500k
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Thanh toán an toàn</h3>
              <p className="text-sm text-muted-foreground">
                Bảo mật thông tin 100% với SSL
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <RotateCcw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Đổi trả dễ dàng</h3>
              <p className="text-sm text-muted-foreground">
                Đổi trả trong vòng 30 ngày
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Hỗ trợ 24/7</h3>
              <p className="text-sm text-muted-foreground">
                Tư vấn và hỗ trợ mọi lúc
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Sản phẩm nổi bật
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Khám phá những sản phẩm được yêu thích nhất với chất lượng cao cấp
              và thiết kế thời thượng
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/products">
                Xem tất cả sản phẩm
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Danh mục sản phẩm
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Tìm kiếm theo danh mục để dễ dàng chọn lựa sản phẩm phù hợp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/products/nam" className="group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/men-s-fashion-clothing-collection.jpg"
                  alt="Thời trang Nam"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Thời trang Nam</h3>
                  <p className="text-sm opacity-90">
                    Phong cách lịch lãm, hiện đại
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/products/nu" className="group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/women-s-fashion-clothing-collection.jpg"
                  alt="Thời trang Nữ"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Thời trang Nữ</h3>
                  <p className="text-sm opacity-90">Thanh lịch, quyến rũ</p>
                </div>
              </div>
            </Link>

            <Link href="/products/phu-kien" className="group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/fashion-accessories-collection-bags-watches.jpg"
                  alt="Phụ kiện"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Phụ kiện</h3>
                  <p className="text-sm opacity-90">Hoàn thiện phong cách</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
              Đăng ký nhận tin tức
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Nhận thông tin về sản phẩm mới, ưu đãi đặc biệt và xu hướng thời
              trang mới nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background"
              />
              <Button size="lg">Đăng ký</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
