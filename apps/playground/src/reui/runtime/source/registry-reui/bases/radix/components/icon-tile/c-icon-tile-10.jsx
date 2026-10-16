import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconTile } from "../../reui/icon-tile.jsx";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex w-full max-w-sm items-center justify-center", children: _jsxs(Item, { variant: "outline", children: [_jsx(ItemMedia, { children: _jsx(IconTile, { variant: "elevated", size: "sm", "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File01Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine" }) }) }), _jsxs(ItemContent, { children: [_jsx(ItemTitle, { children: "Quarterly report" }), _jsx(ItemDescription, { children: "Updated 2 hours ago by Anna" })] })] }) }));
}
