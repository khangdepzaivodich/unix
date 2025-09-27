import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, AlertCircle, TrendingUp } from "lucide-react";

export default function SupplierDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Supplier Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor your supply operations and inventory
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Products
            </CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <Truck className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">2 urgent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Items
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,500</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Supply Orders</CardTitle>
            <CardDescription>Latest orders from the store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "SO-001",
                  product: "Summer Dress",
                  quantity: 50,
                  status: "pending",
                  priority: "high",
                },
                {
                  id: "SO-002",
                  product: "Casual Shirt",
                  quantity: 30,
                  status: "processing",
                  priority: "medium",
                },
                {
                  id: "SO-003",
                  product: "Denim Jeans",
                  quantity: 25,
                  status: "shipped",
                  priority: "low",
                },
              ].map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.product} - Qty: {order.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        order.status === "pending"
                          ? "destructive"
                          : order.status === "processing"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                    <Badge variant="outline">{order.priority}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Alerts</CardTitle>
            <CardDescription>
              Items requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  product: "Classic T-Shirt",
                  stock: 5,
                  threshold: 20,
                  status: "critical",
                },
                {
                  product: "Leather Jacket",
                  stock: 12,
                  threshold: 25,
                  status: "low",
                },
                {
                  product: "Running Shoes",
                  stock: 18,
                  threshold: 30,
                  status: "low",
                },
              ].map((item) => (
                <div
                  key={item.product}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{item.product}</p>
                    <p className="text-sm text-muted-foreground">
                      Stock: {item.stock} / Threshold: {item.threshold}
                    </p>
                  </div>
                  <Badge
                    variant={
                      item.status === "critical" ? "destructive" : "secondary"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
