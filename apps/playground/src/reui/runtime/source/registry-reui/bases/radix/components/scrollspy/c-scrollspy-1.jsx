"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { Scrollspy } from "../../reui/scrollspy.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ScrollArea } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
export default function Pattern() {
    const parentRef = useRef(null);
    const nav = [
        {
            id: "section-1",
            label: "Section 1",
        },
        {
            id: "section-2",
            label: "Section 2",
        },
        {
            id: "section-3",
            label: "Section 3",
        },
        {
            id: "section-4",
            label: "Section 4",
        },
        {
            id: "section-5",
            label: "Section 5",
        },
    ];
    return (_jsxs("div", { className: "flex w-full grow gap-5", children: [_jsx("div", { className: "flex w-[150px] flex-col gap-2", children: _jsx(Scrollspy, { offset: 50, targetRef: parentRef, className: "flex flex-col gap-2.5", children: nav.map((item) => (_jsx(Button, { variant: "outline", "data-scrollspy-anchor": item.id, className: "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground", children: item.label }, item.id))) }) }), _jsx("div", { className: "grow", ref: parentRef, children: _jsx(ScrollArea, { className: "-me-5 h-[500px] grow pe-5", children: _jsx("div", { className: "space-y-8", children: nav.map((item) => (_jsxs("div", { id: item.id, className: "space-y-2.5", children: [_jsx("h3", { className: "text-foreground text-base", children: item.label }), _jsx("div", { className: "bg-muted rounded-2xl h-[350px]" })] }, item.id))) }) }) })] }));
}
