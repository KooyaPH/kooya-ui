import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
const items = [
    { id: "1", name: "Item Alpha", quantity: 1, price: "$10.00" },
    { id: "2", name: "Item Beta", quantity: 2, price: "$20.00" },
    { id: "3", name: "Item Gamma", quantity: 1, price: "$30.00" },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-lg flex-col", children: _jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Item" }), _jsx(TableHead, { children: "Quantity" }), _jsx(TableHead, { className: "text-right", children: "Price" })] }) }), _jsx(TableBody, { children: items.map((item) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: item.name }), _jsx(TableCell, { children: _jsx(Input, { type: "number", defaultValue: item.quantity, className: "h-8 w-20", min: "0" }) }), _jsx(TableCell, { className: "text-right", children: item.price })] }, item.id))) })] }) }) }) }));
}
