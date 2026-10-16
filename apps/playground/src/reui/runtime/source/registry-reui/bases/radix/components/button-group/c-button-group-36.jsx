import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsx(Button, { variant: "outline", size: "icon", className: cn("bg-muted"), "aria-label": "List view", children: _jsx(IconPlaceholder, { lucide: "ListIcon", tabler: "IconList", hugeicons: "Menu01Icon", phosphor: "ListIcon", remixicon: "RiListUnordered", "aria-hidden": "true" }) }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Grid view", children: _jsx(IconPlaceholder, { lucide: "LayoutGridIcon", tabler: "IconLayoutGrid", hugeicons: "GridViewIcon", phosphor: "SquaresFourIcon", remixicon: "RiGalleryView2", "aria-hidden": "true" }) }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Table view", children: _jsx(IconPlaceholder, { lucide: "TableIcon", tabler: "IconTable", hugeicons: "GridTableIcon", phosphor: "GridNineIcon", remixicon: "RiTable2", "aria-hidden": "true" }) })] }));
}
