import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
const sides = ["top", "right", "bottom", "left"];
export default function Pattern() {
    return (_jsx(TooltipProvider, { children: _jsx("div", { className: "grid max-w-xs grid-cols-2 gap-2", children: sides.map((side) => (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "w-full", children: side.replace("-", " ")[0].toUpperCase() +
                                side.replace("-", " ").slice(1) }) }), _jsx(TooltipContent, { side: side, children: _jsx("p", { className: "text-sm", children: "Add to library" }) })] }, side))) }) }));
}
