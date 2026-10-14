import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "../../../../../../../adapters/overlays.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Open Dialog" }) }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Hover Card Example" }), _jsx(DialogDescription, { children: "Hover over the button below to see the hover card." })] }), _jsxs(HoverCard, { openDelay: 100, closeDelay: 100, children: [_jsx(HoverCardTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "w-fit", children: "Hover me" }) }), _jsx(HoverCardContent, { children: _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("h4", { className: "font-medium", children: "Hover Card" }), _jsx("p", { className: "text-muted-foreground", children: "This hover card appears inside a dialog. Hover over the button to see it." })] }) })] })] })] }) }));
}
