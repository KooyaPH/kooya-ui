import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "sm", children: "Start" }) }), _jsx(PopoverContent, { align: "start", className: "w-auto", children: _jsx("p", { children: "Aligned to start" }) })] }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "sm", children: "Center" }) }), _jsx(PopoverContent, { align: "center", className: "w-auto", children: _jsx("p", { children: "Aligned to center" }) })] }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "sm", children: "End" }) }), _jsx(PopoverContent, { align: "end", className: "w-auto", children: _jsx("p", { children: "Aligned to end" }) })] })] }));
}
