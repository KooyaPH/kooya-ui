import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
export default function Pattern() {
    return (_jsxs(Frame, { dense: true, className: "w-full max-w-sm", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "Inventory Check" }), _jsx(FrameDescription, { children: "Real-time stock monitoring" })] }), _jsxs(FramePanel, { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Warehouse A" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Dense mode removes outer padding for a more compact appearance." })] })] }));
}
