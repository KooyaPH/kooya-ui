import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "../../../../../../../adapters/utility.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Breadcrumb, { children: _jsxs(BreadcrumbList, { children: [_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { asChild: true, children: _jsxs(Button, { size: "icon", variant: "outline", children: [_jsx(IconPlaceholder, { lucide: "HouseIcon", tabler: "IconHome", hugeicons: "Home03Icon", phosphor: "HouseIcon", remixicon: "RiHome5Line", className: "size-4" }), _jsx("span", { className: "sr-only", children: "Home" })] }) }) }), _jsx(BreadcrumbSeparator, {}), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "#", children: "Help Center" }) }), _jsx(BreadcrumbSeparator, {}), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbPage, { children: "Getting Started" }) })] }) }));
}
