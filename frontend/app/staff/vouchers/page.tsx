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
import { Search, MoreHorizontal, Plus, Ticket } from "lucide-react";

const vouchers = [
  {
    id: "VOUCHER-001",
    code: "WELCOME15",
    type: "percentage",
    value: 15,
    status: "active",
    issuedTo: "john@example.com",
    issuedDate: "2024-01-15",
    expiryDate: "2024-02-15",
    used: false,
    usedDate: null,
  },
  {
    id: "VOUCHER-002",
    code: "SORRY20",
    type: "percentage",
    value: 20,
    status: "used",
    issuedTo: "jane@example.com",
    issuedDate: "2024-01-10",
    expiryDate: "2024-02-10",
    used: true,
    usedDate: "2024-01-12",
  },
  {
    id: "VOUCHER-003",
    code: "BIRTHDAY25",
    type: "percentage",
    value: 25,
    status: "expired",
    issuedTo: "mike@example.com",
    issuedDate: "2024-01-01",
    expiryDate: "2024-01-10",
    used: false,
    usedDate: null,
  },
];

export default function VouchersPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "used":
        return "secondary";
      case "expired":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vouchers</h1>
          <p className="text-muted-foreground">
            Manage customer vouchers and gift codes
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Issue Voucher
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search vouchers..." className="pl-10" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Vouchers
            </CardTitle>
            <Ticket className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Used Vouchers</CardTitle>
            <Ticket className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Expired Vouchers
            </CardTitle>
            <Ticket className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Vouchers</CardTitle>
          <CardDescription>Track and manage issued vouchers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vouchers.map((voucher) => (
              <div key={voucher.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{voucher.code}</h3>
                      <Badge variant={getStatusColor(voucher.status)}>
                        {voucher.status}
                      </Badge>
                      <Badge variant="outline">{voucher.value}% OFF</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <strong>Issued to:</strong> {voucher.issuedTo}
                      </p>
                      <p>
                        <strong>Issued:</strong> {voucher.issuedDate}
                      </p>
                      <p>
                        <strong>Expires:</strong> {voucher.expiryDate}
                      </p>
                      {voucher.used && voucher.usedDate && (
                        <p>
                          <strong>Used:</strong> {voucher.usedDate}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Extend Expiry</DropdownMenuItem>
                      <DropdownMenuItem>Resend to Customer</DropdownMenuItem>
                      {!voucher.used && (
                        <DropdownMenuItem className="text-destructive">
                          Deactivate Voucher
                        </DropdownMenuItem>
                      )}
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
