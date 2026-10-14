import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "cn";
import { Button } from "../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../adapters/icons.tsx";
function Pagination({ className, ...props }) {
    return (_jsx("nav", { role: "navigation", "aria-label": "pagination", "data-slot": "pagination", className: cn("cn-pagination mx-auto flex w-full justify-center", className), ...props }));
}
function PaginationContent({ className, ...props }) {
    return (_jsx("ul", { "data-slot": "pagination-content", className: cn("cn-pagination-content flex items-center", className), ...props }));
}
function PaginationItem({ ...props }) {
    return _jsx("li", { "data-slot": "pagination-item", ...props });
}
function PaginationLink({ className, isActive, size = "icon", ...props }) {
    return (_jsx(Button, { asChild: true, variant: isActive ? "outline" : "ghost", size: size, className: cn("cn-pagination-link", className), children: _jsx("a", { "aria-current": isActive ? "page" : undefined, "data-slot": "pagination-link", "data-active": isActive, ...props }) }));
}
function PaginationPrevious({ className, text = "Previous", ...props }) {
    return (_jsxs(PaginationLink, { "aria-label": "Go to previous page", size: "default", className: cn("cn-pagination-previous", className), ...props, children: [_jsx(IconPlaceholder, { lucide: "ChevronLeftIcon", tabler: "IconChevronLeft", hugeicons: "ArrowLeft01Icon", phosphor: "CaretLeftIcon", remixicon: "RiArrowLeftSLine", "data-icon": "inline-start", className: "cn-rtl-flip" }), _jsx("span", { className: "cn-pagination-previous-text hidden sm:block", children: text })] }));
}
function PaginationNext({ className, text = "Next", ...props }) {
    return (_jsxs(PaginationLink, { "aria-label": "Go to next page", size: "default", className: cn("cn-pagination-next", className), ...props, children: [_jsx("span", { className: "cn-pagination-next-text hidden sm:block", children: text }), _jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", "data-icon": "inline-end", className: "cn-rtl-flip" })] }));
}
function PaginationEllipsis({ className, ...props }) {
    return (_jsxs("span", { "aria-hidden": true, "data-slot": "pagination-ellipsis", className: cn("cn-pagination-ellipsis flex items-center justify-center", className), ...props, children: [_jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine" }), _jsx("span", { className: "sr-only", children: "More pages" })] }));
}
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, };
