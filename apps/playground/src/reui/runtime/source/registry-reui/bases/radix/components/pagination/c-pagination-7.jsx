import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, } from "../../../../../../../adapters/data.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Pagination, { className: "w-full max-w-xs", children: _jsxs(PaginationContent, { className: "w-full justify-between", children: [_jsx(PaginationItem, { children: _jsxs(PaginationLink, { href: "#", size: "default", className: "gap-2", children: [_jsx(IconPlaceholder, { lucide: "ArrowLeftIcon", tabler: "IconArrowLeft", hugeicons: "ArrowLeft02Icon", phosphor: "ArrowLeftIcon", remixicon: "RiArrowLeftLine", className: "size-4" }), "Previous"] }) }), _jsx(PaginationItem, { children: _jsxs(PaginationLink, { href: "#", size: "default", className: "gap-2", children: ["Next", _jsx(IconPlaceholder, { lucide: "ArrowRightIcon", tabler: "IconArrowRight", hugeicons: "ArrowRight02Icon", phosphor: "ArrowRightIcon", remixicon: "RiArrowRightLine", className: "size-4" })] }) })] }) }));
}
