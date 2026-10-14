"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Gantt } from "../../reui/gantt/gantt.jsx";
import { GanttNav } from "../../reui/gantt/gantt-nav.jsx";
import { GanttView } from "../../reui/gantt/gantt-view.jsx";
import { addDays, startOfDay, startOfWeek } from "date-fns";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
/** Two-level white-label rollout tree; bars attach to leaf rows by id. */
const RESOURCES = [
    {
        id: "build",
        title: "Build",
        children: [
            { id: "kickoff", title: "Kickoff" },
            { id: "api", title: "API work" },
            { id: "frontend", title: "Frontend" },
            { id: "qa", title: "QA pass" },
        ],
    },
    {
        id: "rollout",
        title: "Rollout",
        children: [
            { id: "staging", title: "Staging deploy" },
            { id: "signoff", title: "Sign-off" },
            { id: "live", title: "Go live" },
        ],
    },
];
/** Leaf titles for bar labels, resolved from the tree by id. */
const RESOURCE_TITLES = new Map(RESOURCES.flatMap((group) => group.children ?? []).map((leaf) => [
    leaf.id,
    leaf.title,
]));
/** Chained fixture around the current week: FS arrows plus a milestone gate. */
function buildBars(anchor) {
    const week = startOfWeek(startOfDay(anchor), { weekStartsOn: 0 });
    const day = (dayOffset) => addDays(week, dayOffset);
    // `dependencies` names PREDECESSOR ids: each arrow runs from that bar's
    // end into this one's start. A zero-length event (days 0) is a MILESTONE
    // and renders as a diamond instead of a bar.
    const bar = (resourceId, startOffset, days, color, dependencies, progress) => ({
        id: `bar-${resourceId}`,
        title: RESOURCE_TITLES.get(resourceId) ?? resourceId,
        start: day(startOffset),
        end: day(startOffset + days),
        allDay: true,
        color,
        resourceId,
        dependencies,
        progress,
    });
    return [
        bar("kickoff", -9, 2, "var(--color-blue-500)", undefined, 100),
        bar("api", -7, 5, "var(--color-sky-500)", ["bar-kickoff"], 80),
        bar("frontend", -4, 5, "var(--color-violet-500)", ["bar-kickoff"], 55),
        // waits on BOTH build tracks, so two arrows land on its start
        bar("qa", 2, 3, "var(--color-purple-500)", ["bar-api", "bar-frontend"], 10),
        bar("staging", 5, 2, "var(--color-emerald-500)", ["bar-qa"]),
        // the gate: a diamond with an arrow in from staging and one out to launch
        bar("signoff", 8, 0, "var(--color-amber-500)", ["bar-staging"]),
        bar("live", 9, 1, "var(--color-teal-500)", ["bar-signoff"]),
    ];
}
export default function Pattern() {
    const bars = useMemo(() => buildBars(new Date()), []);
    return (_jsx("div", { className: "w-full p-4", children: _jsx(Card, { className: "w-full py-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs(Gantt, { defaultEvents: bars, resources: RESOURCES, defaultScale: "month", scheduleMode: "single", treePanel: { width: 240 }, className: "h-[480px] w-full", children: [_jsx(GanttNav, {}), _jsx(GanttView, {})] }) }) }) }));
}
