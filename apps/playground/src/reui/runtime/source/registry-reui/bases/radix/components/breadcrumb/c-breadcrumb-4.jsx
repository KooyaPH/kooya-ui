import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "../../../../../../../adapters/utility.tsx";
export default function Pattern() {
    return (_jsx(Breadcrumb, { children: _jsxs(BreadcrumbList, { children: [_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "#", children: "Home" }) }), _jsx(BreadcrumbSeparator, { children: "/" }), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "#", children: "Components" }) }), _jsx(BreadcrumbSeparator, { children: "/" }), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbPage, { children: "Breadcrumb" }) })] }) }));
}
