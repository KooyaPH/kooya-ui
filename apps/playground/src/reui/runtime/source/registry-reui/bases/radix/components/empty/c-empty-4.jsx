import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Empty, { className: "border", children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { variant: "icon", children: _jsx(IconPlaceholder, { lucide: "FolderIcon", tabler: "IconFolder", hugeicons: "FolderIcon", phosphor: "FolderIcon", remixicon: "RiFolderLine" }) }), _jsx(EmptyTitle, { children: "Nothing to see here" }), _jsxs(EmptyDescription, { children: ["No posts have been created yet. Get started by", " ", _jsx("a", { href: "#", children: "creating your first post" }), "."] })] }), _jsx(EmptyContent, { children: _jsxs(Button, { variant: "outline", children: [_jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", "data-icon": "inline-start" }), "New Post"] }) })] }) }));
}
