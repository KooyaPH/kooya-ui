import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
export default function Pattern() {
    return (_jsxs(Frame, { className: "w-full", variant: "ghost", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "No Outer Border" }), _jsx(FrameDescription, { children: "This frame uses variant=\"ghost\" to remove the outer border." })] }), _jsx(FramePanel, { children: _jsx("p", { className: "text-muted-foreground text-sm", children: "The outer container of this frame has no border, only the background and panels are visible." }) })] }));
}
