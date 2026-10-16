import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupText, } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsxs(Button, { size: "sm", className: "border-primary", children: [_jsx(IconPlaceholder, { lucide: "Share2Icon", tabler: "IconShare", hugeicons: "Share08Icon", phosphor: "ShareNetworkIcon", remixicon: "RiStackshareLine" }), "Share"] }), _jsx(ButtonGroupText, { className: "text-muted-foreground bg-transparent px-2", children: "128 Shares" })] }));
}
