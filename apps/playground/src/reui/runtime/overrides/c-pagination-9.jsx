import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious, } from "../../adapters/data";
export default function Pattern() {
    return (_jsx(Pagination, { className: "w-full max-w-xs reui-pagination-nine", style: { width: "100%", maxWidth: 320, minWidth: 0 }, styles: { item: { minWidth: 0, maxWidth: "100%" } }, children: _jsxs(PaginationContent, { className: "w-full justify-between", children: [_jsx(PaginationItem, { children: _jsxs("span", { className: "text-muted-foreground text-xs", children: ["Page ", _jsx("span", { className: "text-foreground font-medium", children: "1" }), " of", " ", _jsx("span", { className: "text-foreground font-medium", children: "10" })] }) }), _jsxs(PaginationItem, { className: "flex gap-1", children: [_jsx(PaginationPrevious, { href: "#" }), _jsx(PaginationNext, { href: "#" })] })] }) }));
}
