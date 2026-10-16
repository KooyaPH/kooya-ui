"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "../../../../../../../adapters/utility.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto w-full max-w-lg", children: _jsxs(ResizablePanelGroup, { orientation: "horizontal", className: "rounded-2xl min-h-[200px] border", children: [_jsx(ResizablePanel, { defaultSize: 25, children: _jsx("div", { className: "flex h-full items-center justify-center p-6", children: _jsx("span", { className: "text-sm font-semibold", children: "Sidebar" }) }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 75, children: _jsx("div", { className: "flex h-full items-center justify-center p-6", children: _jsx("span", { className: "text-sm font-semibold", children: "Content" }) }) })] }) }));
}
