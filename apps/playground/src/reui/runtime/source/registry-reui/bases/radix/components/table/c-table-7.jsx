import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
const orders = [
    {
        id: "#3210",
        customer: "Olivia Martin",
        email: "olivia@example.com",
        avatar: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
        amount: "$1,999.00",
        status: "Paid",
        statusVariant: "success",
        date: "Feb 1, 2025",
    },
    {
        id: "#3209",
        customer: "Jackson Lee",
        email: "jackson@example.com",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        amount: "$39.00",
        status: "Pending",
        statusVariant: "warning",
        date: "Jan 28, 2025",
    },
    {
        id: "#3208",
        customer: "Isabella Nguyen",
        email: "isabella@example.com",
        avatar: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
        amount: "$299.00",
        status: "Paid",
        statusVariant: "success",
        date: "Jan 25, 2025",
    },
    {
        id: "#3207",
        customer: "William Kim",
        email: "will@example.com",
        avatar: "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
        amount: "$99.00",
        status: "Refunded",
        statusVariant: "destructive-light",
        date: "Jan 22, 2025",
    },
    {
        id: "#3206",
        customer: "Sofia Davis",
        email: "sofia@example.com",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        amount: "$2,500.00",
        status: "Paid",
        statusVariant: "success",
        date: "Jan 18, 2025",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-2xl flex-col", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Order" }), _jsx(TableHead, { children: "Customer" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "text-right", children: "Amount" })] }) }), _jsx(TableBody, { children: orders.map((order) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-mono text-sm", children: order.id }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: order.avatar, alt: order.customer }), _jsx(AvatarFallback, { children: order.customer
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("") })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: order.customer }), _jsx("span", { className: "text-muted-foreground text-xs", children: order.date })] })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: order.statusVariant, size: "sm", children: order.status }) }), _jsx(TableCell, { className: "text-right text-sm font-medium", children: order.amount })] }, order.id))) })] }) }));
}
