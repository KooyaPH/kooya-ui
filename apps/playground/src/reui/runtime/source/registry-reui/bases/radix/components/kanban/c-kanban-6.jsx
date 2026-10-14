"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Kanban, KanbanBoard, KanbanColumn, KanbanColumnContent, KanbanColumnHandle, KanbanItem, KanbanItemHandle, KanbanOverlay, } from "../../reui/kanban.jsx";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardHeader } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const COLUMN_TITLES = {
    todo: "To Do",
    inProgress: "In Progress",
    done: "Done",
};
// Simulated backend. In a real app this would be a tRPC mutation or a fetch
// to your API. It rejects roughly one in four calls so the optimistic
// rollback path is easy to see.
function persistBoard() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.25) {
                reject(new Error("Network error"));
            }
            else {
                resolve();
            }
        }, 700);
    });
}
function TaskCard({ task, asHandle, isOverlay, ...props }) {
    const cardContent = (_jsx(Card, { children: _jsxs(CardContent, { className: "flex items-center justify-between gap-2", children: [_jsx("span", { className: "line-clamp-1 text-sm font-medium", children: task.title }), _jsx(Badge, { variant: task.priority === "high"
                        ? "destructive-light"
                        : task.priority === "medium"
                            ? "primary-light"
                            : "warning-light", className: "pointer-events-none h-5 shrink-0 rounded-sm px-1.5 text-xs capitalize", children: task.priority })] }) }));
    return (_jsx(KanbanItem, { value: task.id, ...props, children: asHandle && !isOverlay ? (_jsx(KanbanItemHandle, { children: cardContent })) : (cardContent) }));
}
function TaskColumn({ value, tasks, isOverlay, ...props }) {
    return (_jsx(KanbanColumn, { value: value, ...props, children: _jsxs(Card, { className: "mb-2.5", children: [_jsxs(CardHeader, { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("span", { className: "text-sm font-semibold", children: COLUMN_TITLES[value] }), _jsx(Badge, { variant: "outline", children: tasks.length })] }), _jsx(KanbanColumnHandle, { asChild: true, children: _jsx(Button, { size: "icon-xs", variant: "ghost", "aria-label": `Move ${COLUMN_TITLES[value] ?? value} column`, children: _jsx(IconPlaceholder, { lucide: "GripVerticalIcon", tabler: "IconGripVertical", hugeicons: "DragDropVerticalIcon", phosphor: "DotsSixVerticalIcon", remixicon: "RiDraggable" }) }) })] }), _jsx(CardContent, { children: _jsx(KanbanColumnContent, { value: value, className: "flex flex-col gap-2.5", children: tasks.map((task) => (_jsx(TaskCard, { task: task, asHandle: !isOverlay, isOverlay: isOverlay }, task.id))) }) })] }) }));
}
export default function Pattern() {
    const [columns, setColumns] = useState({
        todo: [
            { id: "1", title: "Add authentication", priority: "high" },
            { id: "2", title: "Create API endpoints", priority: "medium" },
            { id: "3", title: "Write documentation", priority: "low" },
        ],
        inProgress: [
            { id: "4", title: "Design system updates", priority: "high" },
            { id: "5", title: "Implement dark mode", priority: "medium" },
        ],
        done: [{ id: "6", title: "Setup project", priority: "low" }],
    });
    // Fires once per completed drag, never during the hover preview. The first
    // argument is the final board (already shown, because onValueChange applied
    // it live), so we only need meta.previousValue to roll back on failure.
    const handleValueCommit = (_next, meta) => {
        const previous = meta.previousValue;
        const label = meta.kind === "column"
            ? `Reordered "${COLUMN_TITLES[meta.activeContainer] ?? meta.activeContainer}"`
            : `Moved to "${COLUMN_TITLES[meta.overContainer] ?? meta.overContainer}"`;
        toast.promise(persistBoard(), {
            loading: "Saving board...",
            success: () => label,
            error: () => {
                // Roll back to the pre-drag arrangement. In production prefer a
                // refetch here so a newer drag is not clobbered by this snapshot.
                setColumns(previous);
                return "Could not save. Board restored.";
            },
        });
    };
    return (_jsxs(Kanban, { value: columns, onValueChange: setColumns, getItemValue: (item) => item.id, onValueCommit: handleValueCommit, children: [_jsx(KanbanBoard, { className: "grid auto-rows-fr grid-cols-3", children: Object.entries(columns).map(([columnValue, tasks]) => (_jsx(TaskColumn, { value: columnValue, tasks: tasks }, columnValue))) }), _jsx(KanbanOverlay, { className: "bg-muted/10 rounded-md border-2 border-dashed" })] }));
}
