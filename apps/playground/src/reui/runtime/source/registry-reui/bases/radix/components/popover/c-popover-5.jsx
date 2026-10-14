import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Open Dialog" }) }), _jsxs(DialogContent, { className: "p-4", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Popover Example" }), _jsx(DialogDescription, { children: "Click the button below to see the popover." })] }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "w-fit", children: "Open Popover" }) }), _jsx(PopoverContent, { align: "start", className: "w-auto", children: _jsxs(PopoverHeader, { children: [_jsx(PopoverTitle, { children: "Popover in Dialog" }), _jsx(PopoverDescription, { children: "This popover appears inside a dialog. Click the button to open it." })] }) })] })] })] }) }));
}
