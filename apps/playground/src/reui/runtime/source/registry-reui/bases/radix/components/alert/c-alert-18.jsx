import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertAction, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsx(Frame, { variant: "ghost", children: _jsx(FramePanel, { className: "overflow-hidden p-0!", children: _jsxs(Alert, { variant: "info", className: "border-0 shadow-none", children: [_jsx(IconPlaceholder, { lucide: "LightbulbIcon", tabler: "IconBulb", hugeicons: "Idea01Icon", phosphor: "LightbulbIcon", remixicon: "RiLightbulbLine" }), _jsx(AlertTitle, { children: "New: Advanced Analytics" }), _jsx(AlertAction, { children: _jsx(Button, { size: "xs", variant: "ghost", className: "text-muted-foreground hover:text-foreground -mt-1 -mr-2 size-7 p-0 hover:bg-transparent", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "size-3.5" }) }) }), _jsxs(AlertDescription, { children: ["We've just released a new dashboard for tracking your team's performance.", _jsx(Button, { variant: "link", size: "sm", className: "text-info h-auto p-0 underline", children: "Explore features" })] })] }) }) }) }));
}
