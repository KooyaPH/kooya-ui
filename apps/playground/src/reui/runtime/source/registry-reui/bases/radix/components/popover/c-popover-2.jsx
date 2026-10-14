import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
const sides = ["top", "right", "bottom", "left"];
export default function Pattern() {
    return (_jsx("div", { className: "grid grid-cols-2 gap-2", children: sides.map((side) => (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "w-full capitalize", children: side.replace("-", " ") }) }), _jsx(PopoverContent, { side: side, className: "w-40", children: _jsxs("p", { children: ["Popover on ", side.replace("-", " ")] }) })] }, side))) }));
}
