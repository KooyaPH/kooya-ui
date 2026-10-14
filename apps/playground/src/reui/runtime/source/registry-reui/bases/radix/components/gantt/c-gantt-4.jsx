"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef } from "react";
import { Gantt, } from "../../reui/gantt/gantt.jsx";
import { GanttNav, GanttToolbar, } from "../../reui/gantt/gantt-nav.jsx";
import { GanttView } from "../../reui/gantt/gantt-view.jsx";
import { addDays, startOfDay, startOfWeek } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/**
 * People-centric capacity board: rows are teammates grouped by squad, and
 * each teammate's bars are the week's assignments. The toolbar drops a fresh
 * assignment onto the next teammate, so a person can hold several at once.
 */
const RESOURCES = [
    {
        id: "product-squad",
        title: "Product Squad",
        children: [
            { id: "ada", title: "Ada Lovelace" },
            { id: "alan", title: "Alan Turing" },
        ],
    },
    {
        id: "design-squad",
        title: "Design Squad",
        children: [
            { id: "grace", title: "Grace Hopper" },
            { id: "linus", title: "Linus Torvalds" },
        ],
    },
];
/** Avatar photo + initials keyed by person id - GanttResource carries no
 *  custom fields, so per-row presentation data lives in a lookup of your own.
 *  The initials show while the image loads or if it fails. */
const resourceMeta = {
    ada: {
        initials: "AL",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    alan: {
        initials: "AT",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    grace: {
        initials: "GH",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    linus: {
        initials: "LT",
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    },
};
/** Teammates the new assignments cycle through, and a small pool to name and
 *  color them from. */
const PEOPLE = ["ada", "alan", "grace", "linus"];
const TASK_POOL = [
    { title: "Bug triage", color: "var(--color-amber-500)" },
    { title: "Code review", color: "var(--color-rose-500)" },
    { title: "Spec draft", color: "var(--color-teal-500)" },
    { title: "Pairing", color: "var(--color-indigo-500)" },
];
/** This-week assignments per teammate - day-precise bars for a capacity read
 *  (progress omitted; occupancy, not percent-done, is the point here). */
function buildBars(anchor) {
    const week = startOfWeek(startOfDay(anchor), { weekStartsOn: 0 });
    const day = (dayOffset) => addDays(week, dayOffset);
    const bar = (resourceId, title, startOffset, days, color) => ({
        id: `bar-${resourceId}`,
        title,
        start: day(startOffset),
        end: day(startOffset + days),
        allDay: true,
        color,
        resourceId,
    });
    return [
        bar("ada", "Checkout API", -1, 3, "var(--color-blue-500)"),
        bar("alan", "Search Indexing", 0, 3, "var(--color-sky-500)"),
        bar("grace", "Dashboard Redesign", 1, 3, "var(--color-violet-500)"),
        bar("linus", "Infra Migration", -2, 3, "var(--color-purple-500)"),
    ];
}
export default function Pattern() {
    const bars = useMemo(() => buildBars(new Date()), []);
    const apiRef = useRef(null);
    // A ref (not state) counts the adds, so it advances synchronously and stays
    // correct even when the button is clicked several times in a row.
    const addedRef = useRef(0);
    // Add a 2-day assignment to the next teammate in rotation. Successive adds
    // to the same person overlap and stack into extra lanes on that row.
    const addAssignment = () => {
        const api = apiRef.current;
        if (!api)
            return;
        const n = addedRef.current++;
        const person = PEOPLE[n % PEOPLE.length];
        const task = TASK_POOL[n % TASK_POOL.length];
        const week = startOfWeek(startOfDay(new Date()), { weekStartsOn: 0 });
        const start = addDays(week, (n % 5) + 1);
        api.addEvent({
            id: `bar-extra-${n}`,
            title: task.title,
            start,
            end: addDays(start, 2),
            allDay: true,
            color: task.color,
            resourceId: person,
        });
    };
    return (_jsx("div", { className: "w-full p-4", children: _jsx(Card, { className: "w-full py-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs(Gantt, { defaultEvents: bars, resources: RESOURCES, defaultScale: "week", apiRef: apiRef, 
                    // Weekends shaded so booked working-day capacity is obvious.
                    offDays: true, treePanel: { width: 220 }, 
                    // People rows get an avatar label; group (squad) rows return
                    // undefined to keep the default plain-title label.
                    renderResourceLabel: ({ resource, isGroup }) => {
                        if (isGroup)
                            return undefined;
                        const person = resourceMeta[resource.id];
                        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: person?.avatar, alt: resource.title }), _jsx(AvatarFallback, { className: "text-[10px]", children: person?.initials ?? resource.title.charAt(0) })] }), _jsx("span", { className: "truncate", children: resource.title })] }));
                    }, className: "h-[440px] w-full", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 border-b pe-3", children: [_jsx(GanttNav, { className: "min-w-0 flex-1 border-b-0" }), _jsx(GanttToolbar, { children: _jsxs(Button, { variant: "outline", size: "sm", onClick: addAssignment, children: [_jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", className: "size-4", "aria-hidden": "true" }), "Add assignment"] }) })] }), _jsx(GanttView, {})] }) }) }) }));
}
