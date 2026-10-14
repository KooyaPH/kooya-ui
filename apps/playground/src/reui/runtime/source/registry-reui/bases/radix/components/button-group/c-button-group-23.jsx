import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupSeparator, } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { className: "**:data-[slot=button]:border-0", children: [_jsxs(Button, { "aria-label": "Files", children: [_jsx(IconPlaceholder, { lucide: "FileIcon", tabler: "IconFile", hugeicons: "FileEmpty02Icon", phosphor: "FileIcon", remixicon: "RiFileLine", "aria-hidden": "true" }), "Files"] }), _jsx(ButtonGroupSeparator, { className: "bg-primary/72" }), _jsxs(Button, { "aria-label": "Folder", children: [_jsx(IconPlaceholder, { lucide: "FolderIcon", tabler: "IconFolder", hugeicons: "FolderIcon", phosphor: "FolderIcon", remixicon: "RiFolderLine", "aria-hidden": "true" }), "Folder"] }), _jsx(ButtonGroupSeparator, { className: "bg-primary/72" }), _jsxs(Button, { "aria-label": "Trash", children: [_jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine", "aria-hidden": "true" }), "Media"] })] }));
}
