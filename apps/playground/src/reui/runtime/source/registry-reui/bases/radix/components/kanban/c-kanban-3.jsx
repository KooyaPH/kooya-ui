"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Frame, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
import { Kanban, KanbanBoard, KanbanColumn, KanbanColumnContent, KanbanItem, KanbanItemHandle, KanbanOverlay, } from "../../reui/kanban.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const COLUMNS = {
    todo: {
        title: "To Do",
        icon: (_jsx(IconPlaceholder, { lucide: "CircleIcon", tabler: "IconCircle", hugeicons: "CircleIcon", phosphor: "CircleIcon", remixicon: "RiCircleLine", className: "size-4" })),
    },
    doing: {
        title: "In Progress",
        icon: (_jsx(IconPlaceholder, { lucide: "CircleDot", tabler: "IconCircleDot", hugeicons: "RefreshDotIcon", phosphor: "DotsThreeCircleIcon", remixicon: "RiRecordCircleLine", className: "text-muted-foreground size-4" })),
    },
    done: {
        title: "Done",
        icon: (_jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle01Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine", className: "size-4" })),
    },
};
function TaskCard({ task, asHandle, ...props }) {
    const content = (_jsx(Frame, { variant: "ghost", spacing: "sm", className: "p-0", children: _jsx(FramePanel, { className: "p-3", children: _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("span", { className: "text-sm font-medium", children: task.title }), _jsx(Badge, { variant: task.labelVariant, size: "sm", className: "w-fit", children: task.label })] }) }) }));
    return (_jsx(KanbanItem, { value: task.id, ...props, children: asHandle ? _jsx(KanbanItemHandle, { children: content }) : content }));
}
export default function Pattern() {
    const [columns, setColumns] = useState({
        todo: [
            {
                id: "1",
                title: "Design landing page",
                label: "Design",
                labelVariant: "info-light",
            },
            {
                id: "2",
                title: "Set up CI/CD pipeline",
                label: "DevOps",
                labelVariant: "warning-light",
            },
            {
                id: "3",
                title: "Write unit tests",
                label: "Testing",
                labelVariant: "success-light",
            },
        ],
        doing: [
            {
                id: "4",
                title: "Implement auth flow",
                label: "Backend",
                labelVariant: "primary-light",
            },
            {
                id: "5",
                title: "Create component library",
                label: "Frontend",
                labelVariant: "destructive-light",
            },
        ],
        done: [
            {
                id: "6",
                title: "Project kickoff",
                label: "Planning",
                labelVariant: "info-light",
            },
        ],
    });
    return (_jsxs(Kanban, { value: columns, onValueChange: setColumns, getItemValue: (item) => item.id, children: [_jsx(KanbanBoard, { className: "grid auto-rows-fr grid-cols-3", children: Object.entries(columns).map(([columnId, tasks]) => {
                    const col = COLUMNS[columnId] ?? { title: columnId, icon: null };
                    return (_jsx(KanbanColumn, { value: columnId, children: _jsxs(Frame, { spacing: "sm", className: "h-full", children: [_jsxs(FrameHeader, { className: "flex flex-row items-center gap-2", children: [col.icon, _jsx(FrameTitle, { children: col.title }), _jsx(Badge, { variant: "outline", size: "sm", className: "ml-auto", children: tasks.length })] }), _jsx(KanbanColumnContent, { value: columnId, className: "flex flex-col gap-2 p-0.5", children: tasks.map((task) => (_jsx(TaskCard, { task: task, asHandle: true }, task.id))) })] }) }, columnId));
                }) }), _jsx(KanbanOverlay, { className: "bg-muted/10 rounded-md border-2 border-dashed" })] }));
}
