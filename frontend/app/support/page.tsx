import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Mail, Clock, Search } from "lucide-react";

export default function SupportPage() {
  const faqs = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'My Orders' section.",
      category: "Orders",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all items in original condition with tags attached.",
      category: "Returns",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.",
      category: "Shipping",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping costs vary by location.",
      category: "Shipping",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Customer Support</h1>
        <p className="text-xl text-muted-foreground">
          We're here to help you with any questions or concerns
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="text-center">
            <MessageCircle className="h-12 w-12 mx-auto text-blue-500" />
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>
              Get instant help from our support team
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Badge variant="outline" className="mb-4">
              <Clock className="h-3 w-3 mr-1" />
              Available 24/7
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Phone className="h-12 w-12 mx-auto text-green-500" />
            <CardTitle>Phone Support</CardTitle>
            <CardDescription>
              Speak directly with our support team
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="font-medium mb-2">1-800-FASHION</p>
            <p className="text-sm text-muted-foreground mb-4">
              Mon-Fri: 9AM-6PM EST
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Mail className="h-12 w-12 mx-auto text-purple-500" />
            <CardTitle>Email Support</CardTitle>
            <CardDescription>Send us a detailed message</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="font-medium mb-2">support@fashionstore.com</p>
            <p className="text-sm text-muted-foreground mb-4">
              Response within 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
            <CardDescription>
              Send us a message and we'll get back to you soon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Please describe your issue..."
                rows={4}
              />
            </div>
            <Button className="w-full">Send Message</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search FAQs..." className="pl-10" />
              </div> */}
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{faq.question}</h3>
                      <Badge variant="outline" className="text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
