// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../adapters/structured";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle, } from "../../code/supporting/registry-reui/bases/radix/reui/frame";
import { Kanban, KanbanBoard, KanbanColumn, KanbanColumnContent, KanbanItem, KanbanItemHandle, KanbanOverlay, } from "../../code/supporting/registry-reui/bases/radix/reui/kanban";
import { Avatar, AvatarFallback, AvatarImage, } from "../../adapters/layout";
import { Progress } from "../../adapters/controls";
function TaskCard({ task, asHandle, ...props }) {
    const content = (_jsx(Frame, { variant: "ghost", spacing: "xs", className: "p-0", children: _jsxs(FramePanel, { className: "space-y-3 p-3", children: [_jsx("p", { className: "text-sm font-medium", style: { overflowWrap: "anywhere" }, children: task.title }), _jsx(Progress, { value: task.progress, className: "h-1" }), _jsxs("div", { className: "flex items-center justify-between", style: { flexWrap: "wrap", gap: 8, minWidth: 0 }, children: [_jsxs("div", { className: "flex items-center gap-1.5", style: { minWidth: 0 }, children: [_jsxs(Avatar, { className: "size-5", style: { flexShrink: 0 }, children: [_jsx(AvatarImage, { src: task.assigneeAvatar, alt: task.assignee }), _jsx(AvatarFallback, { className: "text-[9px]", children: task.assignee.charAt(0) })] }), _jsx("span", { className: "text-muted-foreground text-xs", style: { minWidth: 0, overflowWrap: "anywhere" }, children: task.assignee })] }), _jsxs("span", { className: "text-muted-foreground text-xs", children: [task.progress, "%"] })] })] }) }));
    return (_jsx(KanbanItem, { value: task.id, ...props, children: asHandle ? _jsx(KanbanItemHandle, { children: content }) : content }));
}
export default function Pattern() {
    const [columns, setColumns] = useState({
        planning: [
            {
                id: "1",
                title: "Research competitors",
                assignee: "Alex J.",
                assigneeAvatar: "/reui-assets/images/e93553df2422635515ee.jpg",
                progress: 20,
            },
        ],
        active: [
            {
                id: "2",
                title: "Build dashboard",
                assignee: "Sarah C.",
                assigneeAvatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
                progress: 65,
            },
            {
                id: "3",
                title: "API integration",
                assignee: "David K.",
                assigneeAvatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
                progress: 40,
            },
        ],
        completed: [
            {
                id: "4",
                title: "Setup repository",
                assignee: "Emma W.",
                assigneeAvatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
                progress: 100,
            },
        ],
    });
    function moveTask({ event, activeContainer, overContainer, overIndex }) {
        setColumns((previous) => {
            const source = previous[activeContainer];
            const target = previous[overContainer];
            if (!source || !target)
                return previous;
            const activeIndex = source.findIndex((task) => task.id === String(event.active.id));
            if (activeIndex < 0)
                return previous;
            if (activeContainer === overContainer && activeIndex === overIndex)
                return previous;
            const remaining = [...source];
            const [task] = remaining.splice(activeIndex, 1);
            const destination = activeContainer === overContainer ? remaining : [...target];
            destination.splice(Math.max(0, Math.min(overIndex, destination.length)), 0, task);
            return { ...previous, [activeContainer]: remaining, [overContainer]: destination };
        });
    }
    return (_jsxs(Kanban, { className: "ku-kanban-4", style: { width: "100%", minWidth: 0, containerType: "inline-size" }, value: columns, onValueChange: setColumns, onMove: moveTask, getItemValue: (item) => item.id, children: [_jsx(KanbanBoard, { className: "grid auto-rows-fr grid-cols-3", style: { width: "100%", minWidth: 0, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }, children: Object.entries(columns).map(([columnId, tasks]) => (_jsx(KanbanColumn, { value: columnId, style: { minWidth: 0 }, children: _jsxs(Frame, { stacked: true, spacing: "sm", className: "h-full", children: [_jsxs(FrameHeader, { children: [_jsxs("div", { className: "flex items-center justify-between", style: { flexWrap: "wrap", gap: 8, minWidth: 0 }, children: [_jsx(FrameTitle, { className: "capitalize", children: columnId }), _jsx(Badge, { variant: "outline", size: "sm", children: tasks.length })] }), _jsxs(FrameDescription, { children: [columnId === "planning" && "Tasks being scoped", columnId === "active" && "Currently in development", columnId === "completed" && "Finished and deployed"] })] }), _jsx(KanbanColumnContent, { value: columnId, style: { minHeight: 44 }, className: "flex flex-col gap-2 p-0.5", children: tasks.map((task) => (_jsx(TaskCard, { task: task, asHandle: true }, task.id))) })] }) }, columnId))) }), _jsx(KanbanOverlay, { className: "bg-muted/10 rounded-md border-2 border-dashed" })] }));
}
