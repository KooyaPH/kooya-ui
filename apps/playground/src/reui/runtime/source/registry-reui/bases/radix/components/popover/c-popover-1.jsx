import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "w-fit", children: "Open Popover" }) }), _jsx(PopoverContent, { align: "start", className: "px-3 py-2", children: _jsxs(PopoverHeader, { children: [_jsx(PopoverTitle, { children: "Dimensions" }), _jsx(PopoverDescription, { children: "Set the dimensions for the layer." })] }) })] }) }));
}
