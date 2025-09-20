import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Truck,
  Clock,
  MapPin,
  Package,
  Shield,
  CreditCard,
} from "lucide-react";

export default function ShippingPage() {
  const shippingMethods = [
    {
      icon: Truck,
      name: "Giao hàng tiêu chuẩn",
      time: "5-7 ngày làm việc",
      cost: "30.000₫",
      description:
        "Phù hợp cho các đơn hàng thông thường, giao hàng an toàn và đáng tin cậy.",
    },
    {
      icon: Package,
      name: "Giao hàng nhanh",
      time: "2-3 ngày làm việc",
      cost: "50.000₫",
      description:
        "Dành cho khách hàng cần nhận hàng gấp, ưu tiên xử lý và vận chuyển.",
    },
    {
      icon: Clock,
      name: "Giao hàng trong ngày",
      time: "Trong vòng 24h",
      cost: "100.000₫",
      description: "Chỉ áp dụng tại Hà Nội và TP.HCM, đặt hàng trước 14h.",
    },
  ];

  const regions = [
    { name: "Hà Nội & TP.HCM", time: "1-2 ngày", cost: "30.000₫" },
    { name: "Các tỉnh thành lớn", time: "2-3 ngày", cost: "35.000₫" },
    { name: "Các tỉnh miền núi", time: "3-5 ngày", cost: "45.000₫" },
    { name: "Các đảo xa", time: "5-7 ngày", cost: "60.000₫" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <Badge className="mb-4">CHÍNH SÁCH GIAO HÀNG</Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Giao Hàng <span className="text-primary">Toàn Quốc</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          FashionStore cam kết mang đến dịch vụ giao hàng nhanh chóng, an toàn
          và tiện lợi nhất. Chúng tôi hợp tác với các đơn vị vận chuyển uy tín
          để đảm bảo sản phẩm đến tay bạn trong tình trạng hoàn hảo.
        </p>
      </div>

      {/* Shipping Methods */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Phương Thức Giao Hàng
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {shippingMethods.map((method, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-8">
                <div className="flex items-center justify-center mb-4">
                  <method.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{method.name}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-2xl font-bold text-primary">
                    {method.cost}
                  </p>
                  <p className="text-muted-foreground">{method.time}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Free Shipping */}
      <Card className="mb-16 bg-primary/5 border-primary/20">
        <CardContent className="pt-8 text-center">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Miễn Phí Giao Hàng</h3>
          <p className="text-lg mb-4">
            <span className="font-bold text-primary">MIỄN PHÍ</span> giao hàng
            toàn quốc cho đơn hàng từ{" "}
            <span className="font-bold">500.000₫</span>
          </p>
          <p className="text-muted-foreground">
            Áp dụng cho tất cả các phương thức giao hàng tiêu chuẩn và nhanh
          </p>
        </CardContent>
      </Card>

      {/* Regional Shipping */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Thời Gian Giao Hàng Theo Khu Vực
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {regions.map((region, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">{region.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {region.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{region.cost}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-16" />

      {/* Shipping Process */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Quy Trình Giao Hàng
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Xác nhận đơn hàng",
              description:
                "Chúng tôi xác nhận đơn hàng và thông tin giao hàng trong vòng 2 giờ",
            },
            {
              step: "2",
              title: "Đóng gói sản phẩm",
              description:
                "Sản phẩm được đóng gói cẩn thận với vật liệu bảo vệ chất lượng cao",
            },
            {
              step: "3",
              title: "Vận chuyển",
              description:
                "Đơn hàng được giao cho đối tác vận chuyển và bắt đầu hành trình",
            },
            {
              step: "4",
              title: "Giao hàng",
              description:
                "Nhận hàng tại địa chỉ và kiểm tra sản phẩm trước khi thanh toán",
            },
          ].map((process, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="font-semibold mb-2">{process.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {process.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment & Shipping Info */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Thanh Toán Khi Nhận Hàng (COD)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>• Kiểm tra sản phẩm trước khi thanh toán</p>
            <p>• Chỉ thanh toán khi hài lòng với sản phẩm</p>
            <p>• Phí COD: 20.000₫ cho đơn hàng dưới 300.000₫</p>
            <p>• Miễn phí COD cho đơn hàng từ 300.000₫</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Đóng Gói & Bảo Vệ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>• Sử dụng hộp carton chuyên dụng</p>
            <p>• Bọc nilon chống thấm nước</p>
            <p>• Giấy gói và túi zip bảo vệ sản phẩm</p>
            <p>• Tem fragile cho các sản phẩm dễ vỡ</p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Support */}
      <Card className="text-center">
        <CardContent className="pt-8">
          <h3 className="text-2xl font-bold mb-4">Cần Hỗ Trợ Thêm?</h3>
          <p className="text-muted-foreground mb-6">
            Liên hệ với đội ngũ chăm sóc khách hàng để được hỗ trợ về vận chuyển
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:19001234"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Gọi Hotline: 1900 1234
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Gửi Tin Nhắn
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
