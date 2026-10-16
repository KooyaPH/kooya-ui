"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Gantt } from "../../reui/gantt/gantt.jsx";
import { GanttNav } from "../../reui/gantt/gantt-nav.jsx";
import { GanttView } from "../../reui/gantt/gantt-view.jsx";
import { addDays, startOfDay, startOfWeek } from "date-fns";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
/** Two-level white-label delivery tree; bars attach to leaf rows by id. A
 * NODE can carry its own plan too: the Implementation group ghosts a band
 * for the window the whole phase was booked into. */
function buildResources(anchor) {
    const week = startOfWeek(startOfDay(anchor), { weekStartsOn: 0 });
    const day = (dayOffset) => addDays(week, dayOffset);
    return [
        {
            id: "discovery",
            title: "Discovery",
            children: [
                { id: "kickoff", title: "Kickoff workshop" },
                { id: "requirements", title: "Requirements" },
            ],
        },
        {
            id: "implementation",
            title: "Implementation",
            baselineStart: day(-3),
            baselineEnd: day(6),
            children: [
                { id: "integration", title: "API integration" },
                { id: "migration", title: "Data migration" },
                { id: "hardening", title: "Security hardening" },
            ],
        },
        {
            id: "launch",
            title: "Launch",
            children: [{ id: "handover", title: "Handover" }],
        },
    ];
}
/** Leaf titles for bar labels, resolved from the tree by id. */
function leafTitles(resources) {
    return new Map(resources
        .flatMap((group) => group.children ?? [])
        .map((leaf) => [leaf.id, leaf.title]));
}
/** As-built fixture around the current week: frozen plan vs actual dates. */
function buildBars(anchor, titles) {
    const week = startOfWeek(startOfDay(anchor), { weekStartsOn: 0 });
    const day = (dayOffset) => addDays(week, dayOffset);
    // The baseline pair is the plan as it was frozen; start/end is what really
    // happened. Equal baseline instants (plannedDays 0) mark a planned
    // milestone, drawn as a diamond instead of a ghost bar.
    const bar = (resourceId, startOffset, days, plannedOffset, plannedDays, color, progress) => ({
        id: `bar-${resourceId}`,
        title: titles.get(resourceId) ?? resourceId,
        start: day(startOffset),
        end: day(startOffset + days),
        baselineStart: day(plannedOffset),
        baselineEnd: day(plannedOffset + plannedDays),
        allDay: true,
        color,
        resourceId,
        progress,
    });
    return [
        // delivered exactly to plan
        bar("kickoff", -9, 2, -9, 2, "var(--color-blue-500)", 100),
        // ran a day over its planned window
        bar("requirements", -7, 4, -7, 3, "var(--color-sky-500)", 100),
        // started a day late and carried the slip through
        bar("integration", -2, 5, -3, 5, "var(--color-violet-500)", 60),
        // tracking a day ahead of plan
        bar("migration", 1, 3, 1, 4, "var(--color-emerald-500)", 30),
        // slipped on both ends
        bar("hardening", 4, 4, 3, 3, "var(--color-teal-500)", 0),
        // planned milestone (diamond) vs the day the handover actually took
        bar("handover", 9, 1, 8, 0, "var(--color-amber-500)"),
    ];
}
export default function Pattern() {
    const resources = useMemo(() => buildResources(new Date()), []);
    const bars = useMemo(() => buildBars(new Date(), leafTitles(resources)), [resources]);
    return (_jsx("div", { className: "w-full p-4", children: _jsx(Card, { className: "w-full py-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs(Gantt, { defaultEvents: bars, resources: resources, defaultScale: "month", scheduleMode: "single", treePanel: { width: 240 }, className: "h-[480px] w-full", children: [_jsx(GanttNav, {}), _jsx(GanttView, {})] }) }) }) }));
}
