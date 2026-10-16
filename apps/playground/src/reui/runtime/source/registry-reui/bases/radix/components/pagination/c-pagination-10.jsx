import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "../../../../../../../adapters/data.tsx";
export default function Pattern() {
    return (_jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { href: "#" }) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", isActive: true, children: "1" }) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", children: "2" }) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", children: "3" }) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", children: "4" }) }), _jsx(PaginationItem, { children: _jsx(PaginationEllipsis, {}) }), _jsx(PaginationItem, { children: _jsx(PaginationNext, { href: "#" }) })] }) }));
}
