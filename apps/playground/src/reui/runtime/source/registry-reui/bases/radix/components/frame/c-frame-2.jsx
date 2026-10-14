import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
export default function Pattern() {
    return (_jsxs(Frame, { className: "w-full", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "Section header" }), _jsx(FrameDescription, { children: "Description for the section" })] }), _jsxs(FramePanel, { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Separated panel" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Section description" })] }), _jsxs(FramePanel, { children: [_jsx("h2", { className: "text-sm font-semibold", children: "Separated panel" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Section description" })] })] }));
}
