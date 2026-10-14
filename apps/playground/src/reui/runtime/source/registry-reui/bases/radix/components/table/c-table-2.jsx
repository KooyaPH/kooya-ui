import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
const invoices = [
    { invoice: "INV001", status: "Paid", amount: "$250.00" },
    { invoice: "INV002", status: "Pending", amount: "$150.00" },
    { invoice: "INV003", status: "Unpaid", amount: "$350.00" },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-lg flex-col", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Invoice" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "text-right", children: "Amount" })] }) }), _jsx(TableBody, { children: invoices.map((invoice) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: invoice.invoice }), _jsx(TableCell, { children: invoice.status }), _jsx(TableCell, { className: "text-right", children: invoice.amount })] }, invoice.invoice))) }), _jsx(TableFooter, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { colSpan: 2, children: "Total" }), _jsx(TableCell, { className: "text-right font-bold", children: "$750.00" })] }) })] }) }));
}
