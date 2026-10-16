"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Frame, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
import { Kanban, KanbanBoard, KanbanColumn, KanbanColumnContent, KanbanItem, KanbanItemHandle, KanbanOverlay, } from "../../reui/kanban.jsx";
import { cn } from "cn";
import { Progress } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const COLUMNS = {
    planned: { title: "Planned", color: "bg-blue-500" },
    building: { title: "Building", color: "bg-yellow-500" },
    shipped: { title: "Shipped", color: "bg-green-500" },
};
function FeatureCard({ feature, asHandle, ...props }) {
    const content = (_jsx(Frame, { variant: "ghost", spacing: "sm", className: "p-0", children: _jsx(FramePanel, { className: "p-3", children: _jsxs("div", { className: "flex flex-col gap-2.5", children: [_jsx("span", { className: "text-sm font-medium", children: feature.title }), _jsx("p", { className: "text-muted-foreground line-clamp-2 text-xs", children: feature.description }), _jsx(Progress, { value: feature.progress, className: "h-1.5" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-muted-foreground text-[10px] tabular-nums", children: [feature.progress, "% complete"] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(IconPlaceholder, { lucide: "ArrowUpIcon", tabler: "IconArrowUp", hugeicons: "ArrowUp02Icon", phosphor: "ArrowUpIcon", remixicon: "RiArrowUpLine", className: "text-muted-foreground size-3" }), _jsx("span", { className: "text-muted-foreground text-xs tabular-nums", children: feature.votes })] })] })] }) }) }));
    return (_jsx(KanbanItem, { value: feature.id, ...props, children: asHandle ? _jsx(KanbanItemHandle, { children: content }) : content }));
}
export default function Pattern() {
    const [columns, setColumns] = useState({
        planned: [
            {
                id: "f1",
                title: "AI-powered search",
                description: "Natural language search across all content",
                progress: 0,
                votes: 142,
            },
            {
                id: "f2",
                title: "Custom webhooks",
                description: "User-configurable webhook endpoints",
                progress: 0,
                votes: 98,
            },
        ],
        building: [
            {
                id: "f3",
                title: "Real-time collaboration",
                description: "Multi-user editing with presence indicators",
                progress: 65,
                votes: 234,
            },
            {
                id: "f4",
                title: "API v2 migration",
                description: "RESTful API with OpenAPI 3.0 spec",
                progress: 40,
                votes: 176,
            },
        ],
        shipped: [
            {
                id: "f6",
                title: "Dark mode",
                description: "System-aware theme with manual override",
                progress: 100,
                votes: 456,
            },
            {
                id: "f7",
                title: "Export to CSV",
                description: "Bulk data export with custom fields",
                progress: 100,
                votes: 189,
            },
        ],
    });
    return (_jsxs(Kanban, { value: columns, onValueChange: setColumns, getItemValue: (item) => item.id, children: [_jsx(KanbanBoard, { className: "grid grid-cols-3", children: Object.entries(columns).map(([colId, features]) => {
                    const col = COLUMNS[colId];
                    return (_jsx(KanbanColumn, { value: colId, children: _jsxs(Frame, { spacing: "sm", className: "h-full", children: [_jsxs(FrameHeader, { className: "flex flex-row items-center gap-2", children: [_jsx("div", { className: cn("size-2 rounded-full", col.color) }), _jsx(FrameTitle, { className: "capitalize", children: col.title }), _jsx(Badge, { variant: "outline", size: "sm", className: "ml-auto", children: features.length })] }), _jsx(KanbanColumnContent, { value: colId, className: "flex flex-col gap-2 p-0.5", children: features.map((feature) => (_jsx(FeatureCard, { feature: feature, asHandle: true }, feature.id))) })] }) }, colId));
                }) }), _jsx(KanbanOverlay, { className: "bg-muted/10 rounded-md border-2 border-dashed" })] }));
}
