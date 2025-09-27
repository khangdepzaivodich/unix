import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Warehouse,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function InventoryDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Inventory Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor stock levels and warehouse operations
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+45 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Warehouse Capacity
            </CardTitle>
            <Warehouse className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">22% available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Immediate attention needed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$156K</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Critical Stock Levels</CardTitle>
            <CardDescription>
              Items requiring immediate restocking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  product: "Classic White T-Shirt",
                  current: 5,
                  minimum: 50,
                  status: "critical",
                },
                {
                  product: "Blue Denim Jeans",
                  current: 12,
                  minimum: 30,
                  status: "low",
                },
                {
                  product: "Black Leather Jacket",
                  current: 8,
                  minimum: 20,
                  status: "low",
                },
                {
                  product: "Running Sneakers",
                  current: 3,
                  minimum: 25,
                  status: "critical",
                },
              ].map((item) => (
                <div
                  key={item.product}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{item.product}</p>
                    <p className="text-sm text-muted-foreground">
                      Current: {item.current} / Min: {item.minimum}
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

        <Card>
          <CardHeader>
            <CardTitle>Recent Stock Movements</CardTitle>
            <CardDescription>Latest inventory transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  product: "Summer Dress",
                  type: "in",
                  quantity: 100,
                  date: "2024-01-15",
                },
                {
                  product: "Casual Shirt",
                  type: "out",
                  quantity: 25,
                  date: "2024-01-15",
                },
                {
                  product: "Sports Shoes",
                  type: "in",
                  quantity: 50,
                  date: "2024-01-14",
                },
                {
                  product: "Winter Coat",
                  type: "out",
                  quantity: 15,
                  date: "2024-01-14",
                },
              ].map((movement, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {movement.type === "in" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">{movement.product}</p>
                      <p className="text-sm text-muted-foreground">
                        {movement.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        movement.type === "in"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {movement.type === "in" ? "+" : "-"}
                      {movement.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
