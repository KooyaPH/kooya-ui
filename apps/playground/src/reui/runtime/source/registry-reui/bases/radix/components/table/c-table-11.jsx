import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const products = [
    {
        name: "Ergonomic Desk Chair",
        sku: "FRN-001",
        category: "Furniture",
        price: "$549.00",
        stock: 124,
        stockStatus: "In Stock",
        stockVariant: "success-light",
    },
    {
        name: "Wireless Noise-Canceling Headphones",
        sku: "AUD-042",
        category: "Audio",
        price: "$349.99",
        stock: 8,
        stockStatus: "Low Stock",
        stockVariant: "warning-light",
    },
    {
        name: '4K Ultra HD Monitor 32"',
        sku: "DSP-019",
        category: "Displays",
        price: "$799.00",
        stock: 0,
        stockStatus: "Out of Stock",
        stockVariant: "destructive-light",
    },
    {
        name: "Mechanical Keyboard RGB",
        sku: "INP-087",
        category: "Input",
        price: "$179.99",
        stock: 56,
        stockStatus: "In Stock",
        stockVariant: "success-light",
    },
    {
        name: "USB-C Docking Station",
        sku: "ACC-033",
        category: "Accessories",
        price: "$249.00",
        stock: 3,
        stockStatus: "Low Stock",
        stockVariant: "warning-light",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-2xl flex-col", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Product" }), _jsx(TableHead, { children: "Category" }), _jsx(TableHead, { children: "Stock" }), _jsx(TableHead, { className: "text-right", children: "Price" }), _jsx(TableHead, { className: "w-10" })] }) }), _jsx(TableBody, { children: products.map((product) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-muted flex size-9 shrink-0 items-center justify-center rounded-sm", children: _jsx(IconPlaceholder, { lucide: "PackageIcon", tabler: "IconPackage", hugeicons: "Package01Icon", phosphor: "PackageIcon", remixicon: "RiBox3Line", className: "text-muted-foreground size-4", "aria-hidden": "true" }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: product.name }), _jsx("span", { className: "text-muted-foreground truncate font-mono text-xs", children: product.sku })] })] }) }), _jsx(TableCell, { className: "text-muted-foreground text-sm", children: product.category }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: product.stockVariant, size: "sm", children: product.stockStatus }), _jsxs("span", { className: "text-muted-foreground text-xs", children: ["(", product.stock, ")"] })] }) }), _jsx(TableCell, { className: "text-right text-sm font-medium", children: product.price }), _jsx(TableCell, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "icon", className: "size-8", children: [_jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine" }), _jsx("span", { className: "sr-only", children: "Open menu" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { children: "Edit" }), _jsx(DropdownMenuItem, { children: "Restock" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { variant: "destructive", children: "Archive" })] })] }) })] }, product.sku))) })] }) }));
}
