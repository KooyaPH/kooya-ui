import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Pagination, PaginationContent, PaginationItem, PaginationLink, } from "../../adapters/data";
import { IconPlaceholder } from "../../adapters/icons";
export default function Pattern() {
    return (_jsx(Pagination, { className: "w-full max-w-xs reui-pagination-seven", style: { width: "100%", maxWidth: 320, minWidth: 0 }, styles: { item: { minWidth: 0, maxWidth: "100%" } }, children: _jsxs(PaginationContent, { className: "w-full justify-between", children: [_jsx(PaginationItem, { children: _jsxs(PaginationLink, { href: "#", size: "default", className: "gap-2", children: [_jsx(IconPlaceholder, { lucide: "ArrowLeftIcon", tabler: "IconArrowLeft", hugeicons: "ArrowLeft02Icon", phosphor: "ArrowLeftIcon", remixicon: "RiArrowLeftLine", className: "size-4" }), "Previous"] }) }), _jsx(PaginationItem, { children: _jsxs(PaginationLink, { href: "#", size: "default", className: "gap-2", children: ["Next", _jsx(IconPlaceholder, { lucide: "ArrowRightIcon", tabler: "IconArrowRight", hugeicons: "ArrowRight02Icon", phosphor: "ArrowRightIcon", remixicon: "RiArrowRightLine", className: "size-4" })] }) })] }) }));
}
