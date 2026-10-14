import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Kbd } from "../../../../../registry/bases/radix/ui/kbd.jsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon-sm", "aria-label": "Save", children: _jsx(IconPlaceholder, { lucide: "SaveIcon", tabler: "IconDeviceFloppy", hugeicons: "FloppyDiskIcon", phosphor: "FloppyDiskIcon", remixicon: "RiSaveLine" }) }) }), _jsx(TooltipContent, { className: "pr-1.5", children: _jsxs("div", { className: "flex items-center gap-2 text-sm", children: ["Save Changes ", _jsx(Kbd, { children: "S" })] }) })] }) }) }));
}
