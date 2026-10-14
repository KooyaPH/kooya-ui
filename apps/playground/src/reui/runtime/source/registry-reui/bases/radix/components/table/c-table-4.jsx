import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const products = [
    { id: "1", name: "Wireless Mouse", price: "$29.99" },
    { id: "2", name: "Mechanical Keyboard", price: "$129.99" },
    { id: "3", name: "USB-C Hub", price: "$49.99" },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-lg flex-col", children: _jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Product" }), _jsx(TableHead, { children: "Price" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: products.map((product) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: product.name }), _jsx(TableCell, { children: product.price }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "icon", className: "size-8", children: [_jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine" }), _jsx("span", { className: "sr-only", children: "Open menu" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { children: "Edit" }), _jsx(DropdownMenuItem, { children: "Duplicate" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { variant: "destructive", children: "Delete" })] })] }) })] }, product.id))) })] }) }) }) }));
}
