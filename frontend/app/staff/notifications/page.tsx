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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Megaphone, Send } from "lucide-react";

const notifications = [
  {
    id: "NOTIF-001",
    title: "Summer Sale Started",
    message: "Get up to 50% off on all summer collection items!",
    type: "promotion",
    status: "sent",
    sentDate: "2024-01-15",
    recipients: 1250,
    openRate: "24.5%",
  },
  {
    id: "NOTIF-002",
    title: "New Arrivals Alert",
    message: "Check out our latest fashion arrivals this week.",
    type: "product",
    status: "scheduled",
    scheduledDate: "2024-01-20",
    recipients: 890,
    openRate: null,
  },
  {
    id: "NOTIF-003",
    title: "Order Shipped",
    message: "Your order #ORD-001 has been shipped and is on its way.",
    type: "order",
    status: "sent",
    sentDate: "2024-01-14",
    recipients: 1,
    openRate: "100%",
  },
];

export default function NotificationsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "default";
      case "scheduled":
        return "secondary";
      case "draft":
        return "outline";
      default:
        return "default";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "promotion":
        return "bg-green-100 text-green-800";
      case "product":
        return "bg-blue-100 text-blue-800";
      case "order":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Send notifications and announcements to customers
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Notification
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Send className="mr-2 h-5 w-5 text-blue-500" />
              Send New Notification
            </CardTitle>
            <CardDescription>
              Create and send notifications to customers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Notification title..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your notification message..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select className="w-full p-2 border rounded-md">
                <option value="promotion">Promotion</option>
                <option value="product">Product</option>
                <option value="order">Order Update</option>
                <option value="general">General</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1">
                <Send className="mr-2 h-4 w-4" />
                Send Now
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Stats</CardTitle>
            <CardDescription>
              Performance metrics for your notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Sent
                </span>
                <span className="font-medium">2,140</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Average Open Rate
                </span>
                <span className="font-medium">28.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Scheduled</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  This Month
                </span>
                <span className="font-medium">156</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Megaphone className="mr-2 h-5 w-5 text-orange-500" />
            Recent Notifications
          </CardTitle>
          <CardDescription>
            Track your sent and scheduled notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <Badge variant={getStatusColor(notification.status)}>
                        {notification.status}
                      </Badge>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getTypeColor(
                          notification.type
                        )}`}
                      >
                        {notification.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      <p>
                        <strong>Recipients:</strong> {notification.recipients}
                      </p>
                      {notification.sentDate && (
                        <p>
                          <strong>Sent:</strong> {notification.sentDate}
                        </p>
                      )}
                      {notification.scheduledDate && (
                        <p>
                          <strong>Scheduled:</strong>{" "}
                          {notification.scheduledDate}
                        </p>
                      )}
                      {notification.openRate && (
                        <p>
                          <strong>Open Rate:</strong> {notification.openRate}
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
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      {notification.status === "scheduled" && (
                        <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive">
                        Delete
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
