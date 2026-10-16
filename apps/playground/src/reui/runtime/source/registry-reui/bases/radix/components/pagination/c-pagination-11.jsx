import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, } from "../../../../../../../adapters/data.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Pagination, { children: _jsxs(PaginationContent, { className: "rounded-md gap-0 overflow-hidden border", children: [_jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", size: "icon", "aria-label": "Go to previous page", className: "border-border rounded-none border-0 border-e", children: _jsx(IconPlaceholder, { lucide: "ChevronLeftIcon", tabler: "IconChevronLeft", hugeicons: "ArrowLeft01Icon", phosphor: "CaretLeftIcon", remixicon: "RiArrowLeftSLine" }) }) }), 
                /* Page numbers */
                Array.from({ length: 4 }).map((_, index) => (_jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", isActive: index === 2, className: "data-[active=true]:bg-muted border-border rounded-none border-0 border-e", children: index + 1 }) }, index))), _jsx(PaginationItem, { className: "border-border border-0 border-e", children: _jsx(PaginationEllipsis, {}) }), _jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", size: "icon", "aria-label": "Go to next page", className: "rounded-none border-0", children: _jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine" }) }) })] }) }));
}
