import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "../../../../../../../adapters/utility.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Breadcrumb, { children: _jsxs(BreadcrumbList, { children: [_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "#", children: "Dashboard" }) }), _jsx(BreadcrumbSeparator, { children: _jsx(IconPlaceholder, { lucide: "ChevronsRightIcon", tabler: "IconChevronsRight", hugeicons: "ArrowRightDoubleIcon", phosphor: "CaretDoubleRightIcon", remixicon: "RiArrowRightDoubleLine" }) }), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "#", children: "Resources" }) }), _jsx(BreadcrumbSeparator, { children: _jsx(IconPlaceholder, { lucide: "ChevronsRightIcon", tabler: "IconChevronsRight", hugeicons: "ArrowRightDoubleIcon", phosphor: "CaretDoubleRightIcon", remixicon: "RiArrowRightDoubleLine" }) }), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbPage, { children: "Documentation" }) })] }) }));
}
