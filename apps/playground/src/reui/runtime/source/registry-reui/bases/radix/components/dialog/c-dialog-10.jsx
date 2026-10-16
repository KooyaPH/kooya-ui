import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Session Expired" }) }), _jsxs(DialogContent, { showCloseButton: false, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Session Expired" }), _jsx(DialogDescription, { children: "Your session has timed out due to inactivity. Please sign in again to continue where you left off." })] }), _jsx(DialogFooter, { children: _jsx(Button, { className: "w-full", children: "Sign In Again" }) })] })] }) }));
}
