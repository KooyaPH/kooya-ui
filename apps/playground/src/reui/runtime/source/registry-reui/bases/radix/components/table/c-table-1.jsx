import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-lg flex-col", children: _jsxs(Table, { children: [_jsx(TableCaption, { children: "A list of your recent invoices." }), _jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[100px]", children: "Invoice" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Method" }), _jsx(TableHead, { className: "text-right", children: "Amount" })] }) }), _jsx(TableBody, { children: invoices.map((invoice) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "text-sm font-medium", children: invoice.invoice }), _jsx(TableCell, { className: "text-sm", children: invoice.paymentStatus }), _jsx(TableCell, { className: "text-sm", children: invoice.paymentMethod }), _jsx(TableCell, { className: "text-right text-sm", children: invoice.totalAmount })] }, invoice.invoice))) })] }) }));
}
