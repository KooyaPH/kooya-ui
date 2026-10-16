import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsx(Frame, { children: _jsx(FramePanel, { className: "overflow-hidden p-0!", children: _jsxs(Alert, { className: "border-0 shadow-none", children: [_jsx(IconPlaceholder, { lucide: "InfoIcon", tabler: "IconInfoCircle", hugeicons: "InformationCircleIcon", phosphor: "InfoIcon", remixicon: "RiInformationLine", className: "text-destructive" }), _jsx(AlertTitle, { children: "System Update" }), _jsx(AlertDescription, { children: "A new system update is available. Please restart your application to apply the changes." })] }) }) }) }));
}
