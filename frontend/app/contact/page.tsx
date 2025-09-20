"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Địa chỉ cửa hàng",
      details: ["123 Phố Thời Trang, Quận Hoàn Kiếm", "Hà Nội, Việt Nam"],
    },
    {
      icon: Phone,
      title: "Số điện thoại",
      details: ["Hotline: 1900 1234", "Zalo: 0987 654 321"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@fashionstore.vn", "support@fashionstore.vn"],
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      details: ["Thứ 2 - Thứ 6: 8:00 - 22:00", "Thứ 7 - CN: 9:00 - 21:00"],
    },
  ];

  const faqs = [
    {
      question: "Làm thế nào để tôi theo dõi đơn hàng?",
      answer:
        "Bạn có thể theo dõi đơn hàng bằng cách đăng nhập vào tài khoản và vào mục 'Đơn hàng của tôi'.",
    },
    {
      question: "Chính sách đổi trả như thế nào?",
      answer:
        "Chúng tôi hỗ trợ đổi trả trong vòng 30 ngày kể từ ngày mua hàng với điều kiện sản phẩm còn nguyên tem mác.",
    },
    {
      question: "Có hỗ trợ giao hàng toàn quốc không?",
      answer:
        "Có, chúng tôi giao hàng toàn quốc với phí ship từ 30.000đ. Miễn phí ship cho đơn hàng trên 500.000đ.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <Badge className="mb-4">LIÊN HỆ</Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Chúng Tôi Luôn <span className="text-primary">Lắng Nghe</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Có câu hỏi, góp ý hay cần hỗ trợ? Đừng ngần ngại liên hệ với chúng
          tôi. Đội ngũ FashionStore luôn sẵn sàng hỗ trợ bạn 24/7.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Gửi tin nhắn cho chúng tôi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 focus:ring-ring/50"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              <div>
                <Label htmlFor="subject">Chủ đề *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              <div>
                <Label htmlFor="message">Nội dung *</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          {contactInfo.map((info, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-16" />

      {/* FAQ Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Câu Hỏi Thường Gặp</h2>
          <p className="text-muted-foreground">
            Những câu hỏi phổ biến từ khách hàng và câu trả lời từ chúng tôi
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <Card className="mx-auto w-[60%]">
        <CardHeader>
          <CardTitle className="text-center text-xl">Vị trí cửa hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center h-full w-full">
              {/* <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" /> */}
              {/* <p className="text-muted-foreground">
                Bản đồ Google Maps sẽ được hiển thị ở đây
              </p> */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6505251921226!2d106.67960847485665!3d10.761393989386459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b91dddf0b%3A0x1ab004c91f448812!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1758353056756!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              {/* <p className="text-sm text-muted-foreground mt-2">
                123 Phố Thời Trang, Quận Hoàn Kiếm, Hà Nội
              </p> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
