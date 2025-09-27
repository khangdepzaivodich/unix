import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Filter, AlertTriangle } from "lucide-react";

const errorOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    total: 299.99,
    issue: "Payment Failed",
    priority: "high",
    date: "2024-01-15",
    description: "Credit card payment was declined by bank",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: 159.99,
    issue: "Address Invalid",
    priority: "medium",
    date: "2024-01-14",
    description: "Shipping address could not be verified",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    total: 89.99,
    issue: "Stock Issue",
    priority: "high",
    date: "2024-01-13",
    description: "Product out of stock after order placement",
  },
];

export default function ErrorOrdersPage() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Error Orders</h1>
          <p className="text-muted-foreground">
            Manage and resolve order issues
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search error orders..." className="pl-10" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
            Orders Requiring Attention
          </CardTitle>
          <CardDescription>
            Resolve these issues to complete order processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {errorOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{order.id}</h3>
                      <Badge variant={getPriorityColor(order.priority)}>
                        {order.priority} priority
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <strong>Customer:</strong> {order.customer} (
                        {order.email})
                      </p>
                      <p>
                        <strong>Total:</strong> ${order.total}
                      </p>
                      <p>
                        <strong>Date:</strong> {order.date}
                      </p>
                      <p>
                        <strong>Issue:</strong> {order.issue}
                      </p>
                    </div>
                    <p className="text-sm">{order.description}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Resolve Issue</DropdownMenuItem>
                      <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                      <DropdownMenuItem>Refund Order</DropdownMenuItem>
                      <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                      <DropdownMenuItem>Escalate to Manager</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
