"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Kanban, KanbanBoard, KanbanColumn, KanbanColumnContent, KanbanColumnHandle, KanbanItem, KanbanItemHandle, KanbanOverlay, } from "../../reui/kanban.jsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardHeader } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const COLUMN_TITLES = {
    backlog: "Backlog",
    inProgress: "In Progress",
    done: "Done",
};
function TaskCard({ task, asHandle, isOverlay, ...props }) {
    const cardContent = (_jsx(Card, { children: _jsxs(CardContent, { className: "space-y-2.5", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx("span", { className: "line-clamp-1 text-sm font-medium", children: task.title }), _jsx(Badge, { variant: task.priority === "high"
                                ? "destructive-light"
                                : task.priority === "medium"
                                    ? "primary-light"
                                    : "warning-light", className: "pointer-events-none h-5 shrink-0 rounded-sm px-1.5 text-xs capitalize", children: task.priority })] }), _jsxs("div", { className: "text-muted-foreground flex items-center justify-between text-xs", children: [task.assignee && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsxs(Avatar, { className: "size-4", children: [_jsx(AvatarImage, { src: task.assigneeAvatar }), _jsx(AvatarFallback, { children: task.assignee.charAt(0) })] }), _jsx("span", { className: "line-clamp-1", children: task.assignee })] })), task.dueDate && (_jsx("time", { className: "text-[10px] whitespace-nowrap tabular-nums", children: task.dueDate }))] })] }) }));
    return (_jsx(KanbanItem, { value: task.id, ...props, children: asHandle && !isOverlay ? (_jsx(KanbanItemHandle, { children: cardContent })) : (cardContent) }));
}
function TaskColumn({ value, tasks, isOverlay, ...props }) {
    return (_jsx(KanbanColumn, { value: value, ...props, children: _jsxs(Card, { className: "mb-2.5", children: [_jsxs(CardHeader, { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("span", { className: "text-sm font-semibold", children: COLUMN_TITLES[value] }), _jsx(Badge, { variant: "outline", children: tasks.length })] }), _jsx(KanbanColumnHandle, { asChild: true, children: _jsx(Button, { size: "icon-xs", variant: "ghost", children: _jsx(IconPlaceholder, { lucide: "GripVerticalIcon", tabler: "IconGripVertical", hugeicons: "DragDropVerticalIcon", phosphor: "DotsSixVerticalIcon", remixicon: "RiDraggable" }) }) })] }), _jsx(CardContent, { children: _jsx(KanbanColumnContent, { value: value, className: "flex flex-col gap-2.5", children: tasks.map((task) => (_jsx(TaskCard, { task: task, asHandle: !isOverlay, isOverlay: isOverlay }, task.id))) }) })] }) }));
}
export default function Pattern() {
    const [columns, setColumns] = useState({
        backlog: [
            {
                id: "1",
                title: "Add authentication",
                priority: "high",
                assignee: "Alex Johnson",
                assigneeAvatar: "/reui-assets/images/e93553df2422635515ee.jpg",
                dueDate: "Jan 10, 2025",
            },
            {
                id: "2",
                title: "Create API endpoints",
                priority: "medium",
                assignee: "Sarah Chen",
                assigneeAvatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
                dueDate: "Jan 15, 2025",
            },
            {
                id: "3",
                title: "Write documentation",
                priority: "low",
                assignee: "Michael Rodriguez",
                assigneeAvatar: "/reui-assets/images/4349381d8a8476edbc4c.jpg",
                dueDate: "Jan 20, 2025",
            },
        ],
        inProgress: [
            {
                id: "4",
                title: "Design system updates",
                priority: "high",
                assignee: "Emma Wilson",
                assigneeAvatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
                dueDate: "Aug 25, 2025",
            },
            {
                id: "5",
                title: "Implement dark mode",
                priority: "medium",
                assignee: "David Kim",
                assigneeAvatar: "/reui-assets/images/973d47055c51440af7dc.jpg",
                dueDate: "Aug 25, 2025",
            },
        ],
        done: [
            {
                id: "7",
                title: "Setup project",
                priority: "high",
                assignee: "Aron Thompson",
                assigneeAvatar: "/reui-assets/images/df73db9a2c25069a422d.jpg",
                dueDate: "Sep 25, 2025",
            },
            {
                id: "8",
                title: "Initial commit",
                priority: "low",
                assignee: "James Brown",
                assigneeAvatar: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
                dueDate: "Sep 20, 2025",
            },
        ],
    });
    return (_jsxs(Kanban, { value: columns, onValueChange: setColumns, getItemValue: (item) => item.id, children: [_jsx(KanbanBoard, { className: "grid auto-rows-fr grid-cols-3", children: Object.entries(columns).map(([columnValue, tasks]) => (_jsx(TaskColumn, { value: columnValue, tasks: tasks }, columnValue))) }), _jsx(KanbanOverlay, { className: "bg-muted/10 rounded-md border-2 border-dashed" })] }));
}
