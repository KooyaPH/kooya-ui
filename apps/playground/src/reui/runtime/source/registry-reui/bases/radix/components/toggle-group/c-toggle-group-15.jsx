import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToggleGroup, ToggleGroupItem, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(ToggleGroup, { type: "single", defaultValue: "asc", variant: "outline", size: "sm", children: [_jsxs(ToggleGroupItem, { value: "asc", "aria-label": "Sort ascending", children: [_jsx(IconPlaceholder, { lucide: "ArrowUpIcon", tabler: "IconArrowUp", hugeicons: "ArrowUp02Icon", phosphor: "ArrowUpIcon", remixicon: "RiArrowUpLine" }), "Ascending"] }), _jsxs(ToggleGroupItem, { value: "desc", "aria-label": "Sort descending", children: [_jsx(IconPlaceholder, { lucide: "ArrowDownIcon", tabler: "IconArrowDown", hugeicons: "ArrowDown02Icon", phosphor: "ArrowDownIcon", remixicon: "RiArrowDownLine" }), "Descending"] })] }) }));
}
