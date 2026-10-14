import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertAction, AlertDescription, AlertTitle, } from "../../code/supporting/registry-reui/bases/radix/reui/alert";
import { Frame, FramePanel } from "../../code/supporting/registry-reui/bases/radix/reui/frame";
import { Button } from "../../adapters/controls";
import { IconPlaceholder } from "../../adapters/icons";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg min-w-0", children: _jsx(Frame, { children: _jsx(FramePanel, { className: "overflow-hidden p-0!", children: _jsxs(Alert, { variant: "invert", className: "min-w-0 !grid-cols-[16px_minmax(0,1fr)] border-0 shadow-none", children: [_jsx(IconPlaceholder, { lucide: "ZapIcon", tabler: "IconBolt", hugeicons: "ZapIcon", phosphor: "LightningIcon", remixicon: "RiFlashlightLine", className: "text-yellow-500" }), _jsx(AlertTitle, { className: "!line-clamp-none min-w-0 [overflow-wrap:anywhere]", children: "Pro Feature" }), _jsxs(AlertAction, { className: "flex-wrap [&_button]:shrink-0", children: [_jsx(Button, { variant: "outline", size: "xs", className: "bg-background/10 border-border/10", children: "Dismiss" }), _jsx(Button, { size: "xs", className: "border-blue-800 bg-blue-500 text-white hover:border-blue-900 hover:bg-blue-600", children: "Upgrade" })] }), _jsx(AlertDescription, { className: "min-w-0 [overflow-wrap:anywhere]", children: "This feature is only available for Pro users. Upgrade your plan to get access." })] }) }) }) }));
}
