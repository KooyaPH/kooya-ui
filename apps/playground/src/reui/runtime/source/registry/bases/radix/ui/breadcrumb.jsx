import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "cn";
import { Slot } from "radix-ui";
import { IconPlaceholder } from "../../../../../../adapters/icons.tsx";
function Breadcrumb({ className, ...props }) {
    return (_jsx("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", className: cn("cn-breadcrumb", className), ...props }));
}
function BreadcrumbList({ className, ...props }) {
    return (_jsx("ol", { "data-slot": "breadcrumb-list", className: cn("cn-breadcrumb-list flex flex-wrap items-center wrap-break-word", className), ...props }));
}
function BreadcrumbItem({ className, ...props }) {
    return (_jsx("li", { "data-slot": "breadcrumb-item", className: cn("cn-breadcrumb-item inline-flex items-center", className), ...props }));
}
function BreadcrumbLink({ asChild, className, ...props }) {
    const Comp = asChild ? Slot.Root : "a";
    return (_jsx(Comp, { "data-slot": "breadcrumb-link", className: cn("cn-breadcrumb-link", className), ...props }));
}
function BreadcrumbPage({ className, ...props }) {
    return (_jsx("span", { "data-slot": "breadcrumb-page", role: "link", "aria-disabled": "true", "aria-current": "page", className: cn("cn-breadcrumb-page", className), ...props }));
}
function BreadcrumbSeparator({ children, className, ...props }) {
    return (_jsx("li", { "data-slot": "breadcrumb-separator", role: "presentation", "aria-hidden": "true", className: cn("cn-breadcrumb-separator", className), ...props, children: children ?? (_jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", className: "cn-rtl-flip" })) }));
}
function BreadcrumbEllipsis({ className, ...props }) {
    return (_jsxs("span", { "data-slot": "breadcrumb-ellipsis", role: "presentation", "aria-hidden": "true", className: cn("cn-breadcrumb-ellipsis flex items-center justify-center", className), ...props, children: [_jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine" }), _jsx("span", { className: "sr-only", children: "More" })] }));
}
export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis, };
