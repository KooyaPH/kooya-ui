"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "../../../../../../../adapters/utility.tsx";
export default function Pattern() {
    const [sizes, setSizes] = useState({
        left: 30,
        right: 70,
    });
    return (_jsx("div", { className: "mx-auto w-full max-w-lg", children: _jsxs(ResizablePanelGroup, { orientation: "horizontal", className: "rounded-2xl min-h-[200px] border", onLayoutChange: (layout) => {
                setSizes(layout);
            }, children: [_jsx(ResizablePanel, { id: "left", defaultSize: 30, minSize: 20, children: _jsx("div", { className: "flex h-full flex-col items-center justify-center gap-2 p-6", children: _jsxs("span", { className: "text-sm font-semibold", children: [Math.round(sizes.left ?? 30), "%"] }) }) }), _jsx(ResizableHandle, { withHandle: true }), _jsx(ResizablePanel, { id: "right", defaultSize: 70, minSize: 30, children: _jsx("div", { className: "flex h-full flex-col items-center justify-center gap-2 p-6", children: _jsxs("span", { className: "text-sm font-semibold", children: [Math.round(sizes.right ?? 70), "%"] }) }) })] }) }));
}
