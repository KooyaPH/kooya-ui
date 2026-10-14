import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsxs(Button, { variant: "outline", "aria-label": "Files", children: [_jsx(IconPlaceholder, { lucide: "FileIcon", tabler: "IconFile", hugeicons: "FileEmpty02Icon", phosphor: "FileIcon", remixicon: "RiFileLine", "aria-hidden": "true" }), "Files"] }), _jsxs(Button, { variant: "outline", disabled: true, "aria-label": "Folder", children: [_jsx(IconPlaceholder, { lucide: "FolderIcon", tabler: "IconFolder", hugeicons: "FolderIcon", phosphor: "FolderIcon", remixicon: "RiFolderLine", "aria-hidden": "true" }), "Folder"] }), _jsxs(Button, { variant: "outline", "aria-label": "Trash", children: [_jsx(IconPlaceholder, { lucide: "TrashIcon", tabler: "IconTrash", hugeicons: "DeleteIcon", phosphor: "TrashIcon", remixicon: "RiDeleteBinLine", "aria-hidden": "true" }), "Trash"] })] }));
}
