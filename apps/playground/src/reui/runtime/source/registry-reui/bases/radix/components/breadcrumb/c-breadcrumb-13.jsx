import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "../../../../../../../adapters/utility.tsx";
const BulletSeparator = () => {
    return (_jsx("span", { className: "bg-foreground/30 inline-flex h-0.5 w-2 shrink-0 rounded-full" }));
};
export default function Pattern() {
    return (_jsx(Breadcrumb, { children: _jsxs(BreadcrumbList, { children: [_jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "#", children: "Home" }) }), _jsx(BreadcrumbSeparator, { className: "flex items-center", children: _jsx(BulletSeparator, {}) }), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbLink, { href: "#", children: "Components" }) }), _jsx(BreadcrumbSeparator, { className: "flex items-center", children: _jsx(BulletSeparator, {}) }), _jsx(BreadcrumbItem, { children: _jsx(BreadcrumbPage, { children: "Breadcrumb" }) })] }) }));
}
