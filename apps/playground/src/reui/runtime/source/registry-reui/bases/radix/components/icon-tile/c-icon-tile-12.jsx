import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconTile } from "../../reui/icon-tile.jsx";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Empty, { children: _jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { children: _jsx(IconTile, { variant: "frame", size: "xl", "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "FolderIcon", tabler: "IconFolder", hugeicons: "FolderIcon", phosphor: "FolderIcon", remixicon: "RiFolderLine" }) }) }), _jsx(EmptyTitle, { children: "No files yet" }), _jsx(EmptyDescription, { children: "Upload a file to get started. Everything you add shows up here." })] }) }) }));
}
