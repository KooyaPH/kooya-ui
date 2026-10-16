import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "../../../../../../../adapters/utility.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Frame, { children: _jsx(FramePanel, { className: "gap-2 px-3! py-2!", children: _jsx(Breadcrumb, { children: _jsxs(BreadcrumbList, { children: [_jsx(BreadcrumbItem, { children: _jsxs(BreadcrumbLink, { href: "#", className: "flex items-center gap-1.5", children: [_jsx(IconPlaceholder, { lucide: "HouseIcon", tabler: "IconHome", hugeicons: "Home03Icon", phosphor: "HouseIcon", remixicon: "RiHome5Line", className: "size-4", "aria-hidden": "true" }), "Home"] }) }), _jsx(BreadcrumbSeparator, {}), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "#", children: "Products" }) }), _jsx(BreadcrumbSeparator, {}), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbPage, { className: "font-semibold", children: "Checkout" }) })] }) }) }) }));
}
