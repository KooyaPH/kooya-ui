import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "cn";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "../../../../../../../adapters/data.tsx";
export default function Pattern() {
    return (_jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { href: "#", className: "rounded-full" }) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", className: "rounded-full", children: "1" }) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", isActive: true, className: cn("rounded-full"), children: "2" }) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", className: "rounded-full", children: "3" }) }), _jsx(PaginationItem, { children: _jsx(PaginationNext, { href: "#", className: "rounded-full" }) })] }) }));
}
