import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ToggleGroup, ToggleGroupItem, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(ToggleGroup, { type: "single", defaultValue: "list", variant: "outline", children: [_jsx(ToggleGroupItem, { value: "list", "aria-label": "List view", children: _jsx(IconPlaceholder, { lucide: "ListIcon", tabler: "IconList", hugeicons: "Menu01Icon", phosphor: "ListIcon", remixicon: "RiListUnordered" }) }), _jsx(ToggleGroupItem, { value: "grid", "aria-label": "Grid view", children: _jsx(IconPlaceholder, { lucide: "LayoutGridIcon", tabler: "IconLayoutGrid", hugeicons: "GridViewIcon", phosphor: "SquaresFourIcon", remixicon: "RiGalleryView2" }) }), _jsx(ToggleGroupItem, { value: "kanban", "aria-label": "Kanban view", children: _jsx(IconPlaceholder, { lucide: "Columns2Icon", tabler: "IconColumns2", hugeicons: "LayoutTwoColumnIcon", phosphor: "SquareSplitHorizontalIcon", remixicon: "RiLayoutColumnLine" }) })] }) }));
}
