"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "cn";
function ScrollArea({ className, children, ...props }) {
    return (_jsxs(ScrollAreaPrimitive.Root, { "data-slot": "scroll-area", className: cn("cn-scroll-area relative", className), ...props, children: [_jsx(ScrollAreaPrimitive.Viewport, { "data-slot": "scroll-area-viewport", className: "cn-scroll-area-viewport size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1", children: children }), _jsx(ScrollBar, {}), _jsx(ScrollAreaPrimitive.Corner, {})] }));
}
function ScrollBar({ className, orientation = "vertical", ...props }) {
    return (_jsx(ScrollAreaPrimitive.Scrollbar, { "data-slot": "scroll-area-scrollbar", "data-orientation": orientation, orientation: orientation, className: cn("cn-scroll-area-scrollbar flex touch-none p-px transition-colors select-none", className), ...props, children: _jsx(ScrollAreaPrimitive.Thumb, { "data-slot": "scroll-area-thumb", className: "cn-scroll-area-thumb relative flex-1 bg-border" }) }));
}
export { ScrollArea, ScrollBar };
