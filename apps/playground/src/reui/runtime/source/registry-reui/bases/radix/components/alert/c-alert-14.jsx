import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertAction, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsx(Frame, { children: _jsx(FramePanel, { className: "overflow-hidden p-0!", children: _jsxs(Alert, { className: "border-0 shadow-none", children: [_jsx(IconPlaceholder, { lucide: "ShieldCheckIcon", tabler: "IconShieldCheck", hugeicons: "ShieldEnergyIcon", phosphor: "ShieldCheckIcon", remixicon: "RiShieldCheckLine", className: "text-emerald-500" }), _jsx(AlertTitle, { children: "Security Update" }), _jsxs(AlertAction, { children: [_jsx(Button, { variant: "outline", size: "xs", children: "Dismiss" }), _jsx(Button, { size: "xs", children: "Update" })] }), _jsx(AlertDescription, { children: "Update your password and enable 2FA to improve your account security." })] }) }) }) }));
}
