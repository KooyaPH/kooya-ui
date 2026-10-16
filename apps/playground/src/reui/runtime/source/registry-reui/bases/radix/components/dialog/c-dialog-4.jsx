import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "No Close Button" }) }), _jsxs(DialogContent, { showCloseButton: false, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "No Close Button" }), _jsx(DialogDescription, { children: "This dialog doesn't have a close button in the top-right corner." })] }), _jsx(DialogFooter, { children: _jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Close" }) }) })] })] }) }));
}
