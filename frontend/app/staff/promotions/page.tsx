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
import { Search, MoreHorizontal, Plus, Gift } from "lucide-react";

const promotions = [
  {
    id: "PROMO-001",
    name: "Summer Sale 2024",
    type: "percentage",
    value: 30,
    status: "active",
    startDate: "2024-06-01",
    endDate: "2024-07-31",
    usageCount: 1250,
    usageLimit: 5000,
  },
  {
    id: "PROMO-002",
    name: "New Customer Welcome",
    type: "percentage",
    value: 15,
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usageCount: 890,
    usageLimit: null,
  },
  {
    id: "PROMO-003",
    name: "Flash Weekend Sale",
    type: "percentage",
    value: 50,
    status: "scheduled",
    startDate: "2024-01-20",
    endDate: "2024-01-22",
    usageCount: 0,
    usageLimit: 1000,
  },
];

export default function PromotionsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "scheduled":
        return "secondary";
      case "expired":
        return "outline";
      case "paused":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Promotions</h1>
          <p className="text-muted-foreground">
            Manage promotional campaigns and discounts
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Promotion
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search promotions..." className="pl-10" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="mr-2 h-5 w-5 text-green-500" />
            Active Promotions
          </CardTitle>
          <CardDescription>Manage your promotional campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {promotions.map((promo) => (
              <div key={promo.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{promo.name}</h3>
                      <Badge variant={getStatusColor(promo.status)}>
                        {promo.status}
                      </Badge>
                      <Badge variant="outline">{promo.value}% OFF</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <strong>Period:</strong> {promo.startDate} to{" "}
                        {promo.endDate}
                      </p>
                      <p>
                        <strong>Usage:</strong> {promo.usageCount}{" "}
                        {promo.usageLimit ? `/ ${promo.usageLimit}` : ""}
                      </p>
                      <p>
                        <strong>Code:</strong> {promo.id}
                      </p>
                    </div>
                    {promo.usageLimit && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (promo.usageCount / promo.usageLimit) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Promotion</DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>
                        {promo.status === "active" ? "Pause" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete Promotion
                      </DropdownMenuItem>
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
