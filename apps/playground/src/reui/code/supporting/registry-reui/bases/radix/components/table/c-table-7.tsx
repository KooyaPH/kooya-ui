import { Badge } from "../../../../../../../adapters/structured.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../../../adapters/data.tsx"

const orders = [
  {
    id: "#3210",
    customer: "Olivia Martin",
    email: "olivia@example.com",
    avatar:
      "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
    amount: "$1,999.00",
    status: "Paid",
    statusVariant: "success" as const,
    date: "Feb 1, 2025",
  },
  {
    id: "#3209",
    customer: "Jackson Lee",
    email: "jackson@example.com",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    amount: "$39.00",
    status: "Pending",
    statusVariant: "warning" as const,
    date: "Jan 28, 2025",
  },
  {
    id: "#3208",
    customer: "Isabella Nguyen",
    email: "isabella@example.com",
    avatar:
      "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
    amount: "$299.00",
    status: "Paid",
    statusVariant: "success" as const,
    date: "Jan 25, 2025",
  },
  {
    id: "#3207",
    customer: "William Kim",
    email: "will@example.com",
    avatar:
      "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
    amount: "$99.00",
    status: "Refunded",
    statusVariant: "destructive-light" as const,
    date: "Jan 22, 2025",
  },
  {
    id: "#3206",
    customer: "Sofia Davis",
    email: "sofia@example.com",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    amount: "$2,500.00",
    status: "Paid",
    statusVariant: "success" as const,
    date: "Jan 18, 2025",
  },
]

export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-sm">{order.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarImage src={order.avatar} alt={order.customer} />
                    <AvatarFallback>
                      {order.customer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {order.customer}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {order.date}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={order.statusVariant} size="sm">
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-sm font-medium">
                {order.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
