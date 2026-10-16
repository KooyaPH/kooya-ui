"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Gantt } from "../../reui/gantt/gantt.jsx";
import { GanttNav } from "../../reui/gantt/gantt-nav.jsx";
import { GanttView } from "../../reui/gantt/gantt-view.jsx";
import { addDays, startOfDay, startOfWeek } from "date-fns";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
/** Two-level white-label task tree; bars attach to leaf rows by id. */
const INITIAL_RESOURCES = [
    {
        id: "planning",
        title: "Planning",
        children: [
            { id: "brief", title: "Project brief" },
            { id: "scope", title: "Scope review" },
        ],
    },
    {
        id: "design",
        title: "Design",
        children: [
            { id: "wireframes", title: "Wireframes" },
            { id: "visual-design", title: "Visual design" },
        ],
    },
    {
        id: "build",
        title: "Build",
        children: [
            { id: "frontend", title: "Frontend" },
            { id: "backend", title: "Backend" },
            { id: "qa", title: "QA pass" },
        ],
    },
];
/** Small white-label fixture built around the current week. */
function buildBars(anchor) {
    const week = startOfWeek(startOfDay(anchor), { weekStartsOn: 0 });
    const day = (dayOffset) => addDays(week, dayOffset);
    const bar = (resourceId, title, startOffset, days, color, progress) => ({
        id: `bar-${resourceId}`,
        title,
        start: day(startOffset),
        end: day(startOffset + days),
        allDay: true,
        color,
        resourceId,
        progress,
    });
    return [
        bar("brief", "Project brief", -9, 3, "var(--color-blue-500)", 100),
        bar("scope", "Scope review", -6, 2, "var(--color-sky-500)", 100),
        bar("wireframes", "Wireframes", -4, 4, "var(--color-violet-500)", 80),
        bar("visual-design", "Visual design", 0, 5, "var(--color-purple-500)", 35),
        bar("frontend", "Frontend", 3, 7, "var(--color-emerald-500)", 10),
        bar("backend", "Backend", 5, 6, "var(--color-teal-500)"),
        bar("qa", "QA pass", 12, 4, "var(--color-amber-500)"),
    ];
}
export default function Pattern() {
    const bars = useMemo(() => buildBars(new Date()), []);
    // Controlled tree so the rows can be dragged into a new order. Wiring
    // onResourceReorder is all it takes to reveal the drag grip on each row.
    const [resources, setResources] = useState(INITIAL_RESOURCES);
    return (_jsx("div", { className: "w-full p-4", children: _jsx(Card, { className: "w-full py-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs(Gantt, { defaultEvents: bars, resources: resources, defaultScale: "month", treePanel: { width: 240 }, 
                    // The proposal carries the whole tree with the move applied, so a
                    // reorder is one setState. Return false from here to reject a drop.
                    onResourceReorder: (proposal) => setResources(proposal.resources), className: "h-[480px] w-full", children: [_jsx(GanttNav, {}), _jsx(GanttView, {})] }) }) }) }));
}
