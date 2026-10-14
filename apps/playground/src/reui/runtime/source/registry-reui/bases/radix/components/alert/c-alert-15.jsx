import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertAction, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsx(Frame, { children: _jsx(FramePanel, { className: "overflow-hidden p-0!", children: _jsxs(Alert, { variant: "invert", className: "border-0 shadow-none", children: [_jsx(IconPlaceholder, { lucide: "ZapIcon", tabler: "IconBolt", hugeicons: "ZapIcon", phosphor: "LightningIcon", remixicon: "RiFlashlightLine", className: "text-yellow-500" }), _jsx(AlertTitle, { children: "Pro Feature" }), _jsxs(AlertAction, { children: [_jsx(Button, { variant: "outline", size: "xs", className: "bg-background/10 border-border/10", children: "Dismiss" }), _jsx(Button, { size: "xs", className: "border-blue-800 bg-blue-500 text-white hover:border-blue-900 hover:bg-blue-600", children: "Upgrade" })] }), _jsx(AlertDescription, { children: "This feature is only available for Pro users. Upgrade your plan to get access." })] }) }) }) }));
}
