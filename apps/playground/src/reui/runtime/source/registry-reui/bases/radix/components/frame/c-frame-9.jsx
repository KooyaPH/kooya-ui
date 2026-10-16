import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
export default function Pattern() {
    return (_jsxs(Frame, { spacing: "xs", className: "w-full max-w-xs", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "Project Configuration" }), _jsx(FrameDescription, { children: "Adjust your environment settings" })] }), _jsxs(FramePanel, { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Environment Variables" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "XS spacing is ideal for high-density toolbars and property panels." })] }), _jsx(FrameFooter, { children: _jsx("p", { className: "text-muted-foreground text-sm", children: "Updated 2m ago" }) })] }));
}
