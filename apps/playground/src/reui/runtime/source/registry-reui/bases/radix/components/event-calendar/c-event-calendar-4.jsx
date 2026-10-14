"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef } from "react";
import { EventCalendar, } from "../../reui/event-calendar/event-calendar.jsx";
import { EventCalendarContent } from "../../reui/event-calendar/event-calendar-content.jsx";
import { EventCalendarNav, EventCalendarToolbar, } from "../../reui/event-calendar/event-calendar-nav.jsx";
import { addDays, startOfDay, startOfWeek } from "date-fns";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/** One source of truth per track: the bar color, its legend label, and the
 *  leading icon. IconPlaceholder props stay static string literals here (a rule
 *  the `shadcn add` transform relies on) - the map just picks which prebuilt
 *  element to render. */
const CATEGORY = {
    design: {
        label: "Design",
        color: "var(--color-violet-500)",
        icon: (_jsx(IconPlaceholder, { lucide: "PaletteIcon", tabler: "IconPalette", hugeicons: "PaintBoardIcon", phosphor: "PaletteIcon", remixicon: "RiPaletteLine", className: "size-3.5", "aria-hidden": "true" })),
    },
    engineering: {
        label: "Engineering",
        color: "var(--color-sky-500)",
        icon: (_jsx(IconPlaceholder, { lucide: "CodeIcon", tabler: "IconCode", hugeicons: "SourceCodeIcon", phosphor: "CodeIcon", remixicon: "RiCodeLine", className: "size-3.5", "aria-hidden": "true" })),
    },
    marketing: {
        label: "Marketing",
        color: "var(--color-orange-500)",
        icon: (_jsx(IconPlaceholder, { lucide: "MegaphoneIcon", tabler: "IconSpeakerphone", hugeicons: "Megaphone01Icon", phosphor: "MegaphoneIcon", remixicon: "RiMegaphoneLine", className: "size-3.5", "aria-hidden": "true" })),
    },
    product: {
        label: "Product",
        color: "var(--color-teal-500)",
        icon: (_jsx(IconPlaceholder, { lucide: "CompassIcon", tabler: "IconCompass", hugeicons: "Navigation03Icon", phosphor: "CompassIcon", remixicon: "RiCompassLine", className: "size-3.5", "aria-hidden": "true" })),
    },
};
/** A month of cross-functional work: multi-day project bars you can drag to
 *  reschedule and resize by the edge to span more or fewer days. Anchored to
 *  the current week so the month opens full. */
function buildEvents(anchor) {
    const week = startOfWeek(startOfDay(anchor), { weekStartsOn: 1 });
    const day = (offset) => addDays(week, offset);
    const span = (id, title, startOffset, endOffset, category) => ({
        id,
        title,
        // all-day, end-exclusive: [startOffset, endOffset) covers whole days
        start: day(startOffset),
        end: day(endOffset),
        allDay: true,
        color: CATEGORY[category].color,
        data: { category },
    });
    return [
        span("onboarding", "Onboarding revamp", -2, 1, "product"),
        span("design-sprint", "Design sprint", 1, 4, "design"),
        span("api-migration", "API migration", 2, 6, "engineering"),
        span("user-research", "User research", 3, 5, "product"),
        span("brand-refresh", "Brand refresh", 8, 10, "design"),
        span("launch", "Launch campaign", 9, 13, "marketing"),
        span("roadmap", "Roadmap review", 15, 16, "engineering"),
    ];
}
/** Fully custom chip via `renderEvent`: a compact single-row bar with an inline
 *  category icon (no container) and the title. The icon and title share one
 *  `flex items-center` row so the bar stays slim at any span. */
function renderChip({ occurrence }) {
    const category = occurrence.event.data?.category;
    if (!category)
        return undefined;
    return (_jsxs("span", { className: "flex w-full min-w-0 items-center gap-1.5", children: [_jsx("span", { className: "flex shrink-0 text-(--ec-event-color)", children: CATEGORY[category].icon }), _jsx("span", { className: "truncate font-medium", children: occurrence.event.title })] }));
}
/** Hover tooltip: the title and its track. */
function renderTooltip({ occurrence, }) {
    const category = occurrence.event.data?.category;
    if (!category)
        return undefined;
    return (_jsxs("div", { className: "space-y-0.5", children: [_jsx("p", { className: "font-medium", children: occurrence.event.title }), _jsx("p", { className: "text-muted-foreground text-xs", children: CATEGORY[category].label })] }));
}
export default function Pattern() {
    const events = useMemo(() => buildEvents(new Date()), []);
    const apiRef = useRef(null);
    const counter = useRef(0);
    // Add a multi-day design project starting today and jump to it - a minimal
    // stand-in for a real "new project" flow.
    const addProject = () => {
        const api = apiRef.current;
        if (!api)
            return;
        const start = startOfDay(new Date());
        api.addEvent({
            id: `project-${counter.current++}`,
            title: "New project",
            start,
            end: addDays(start, 3),
            allDay: true,
            color: CATEGORY.design.color,
            data: { category: "design" },
        });
        api.goTo(start);
    };
    // Add a single-day product milestone today.
    const addMilestone = () => {
        const api = apiRef.current;
        if (!api)
            return;
        const start = startOfDay(new Date());
        api.addEvent({
            id: `milestone-${counter.current++}`,
            title: "Milestone",
            start,
            end: addDays(start, 1),
            allDay: true,
            color: CATEGORY.product.color,
            data: { category: "product" },
        });
        api.goTo(start);
    };
    return (_jsx("div", { className: "w-full p-4", children: _jsx(Card, { className: "w-full py-0", children: _jsxs(CardContent, { className: "p-0", children: [_jsxs(EventCalendar, { defaultEvents: events, defaultView: "month", weekStartsOn: 1, apiRef: apiRef, renderEvent: renderChip, renderEventTooltip: renderTooltip, eventTooltip: { side: "top" }, 
                        // drag to reschedule a project, resize the edge to change how many
                        // days it spans; slot-drag creation stays off (it's a chip showcase)
                        interactions: { drag: true, resize: true, selectSlot: false }, className: "h-[640px] w-full", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 pe-2", children: [_jsx(EventCalendarNav, { className: "min-w-0 flex-1", showViewSwitcher: false }), _jsxs(EventCalendarToolbar, { children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: addMilestone, children: [_jsx(IconPlaceholder, { lucide: "FlagIcon", tabler: "IconFlag", hugeicons: "Flag01Icon", phosphor: "FlagIcon", remixicon: "RiFlag2Line", className: "size-4", "aria-hidden": "true" }), "Milestone"] }), _jsxs(Button, { size: "sm", onClick: addProject, children: [_jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", className: "size-4", "aria-hidden": "true" }), "New project"] })] })] }), _jsx(EventCalendarContent, {})] }), _jsx("div", { className: "text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 border-t px-4 py-3 text-xs", children: Object.keys(CATEGORY).map((key) => (_jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx("span", { "aria-hidden": true, className: "size-2 rounded-full", style: { backgroundColor: CATEGORY[key].color } }), CATEGORY[key].label] }, key))) })] }) }) }));
}
