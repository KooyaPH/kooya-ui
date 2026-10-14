// Title: Event Calendar Agenda View
// Description: Chronological agenda grouped by day - a day header row plus a clean time / dot / title table.
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { EventCalendarViewContext, useEventCalendar, useEventCalendarSelector, useEventCalendarSettings, useEventCalendarViewConfig, } from "./event-calendar.jsx";
import { EventCalendarEvent } from "./event-calendar-event.jsx";
import { getDayKey, getRangeKey, toZoned, zonedStartOfDay, } from "./event-calendar-lib.jsx";
import { IconStack } from "../icon-stack.jsx";
import { addDays, format } from "date-fns";
import { Slot } from "radix-ui";
import { cn } from "cn";
import { ScrollArea } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
function EventCalendarAgendaView({ className, asChild = false, ...props }) {
    const instance = useEventCalendar();
    const settings = useEventCalendarSettings();
    const viewConfig = useEventCalendarViewConfig();
    const visibleRange = useEventCalendarSelector((state) => state.visibleRange, {
        isEqual: (a, b) => getRangeKey(a) === getRangeKey(b),
    });
    // Subscribe to event changes via the day-bucket content of the whole range
    useEventCalendarSelector((state) => state.events);
    const days = useMemo(() => {
        const result = [];
        let cursor = zonedStartOfDay(visibleRange.start, settings.timeZone);
        while (cursor < visibleRange.end) {
            result.push(cursor);
            cursor = zonedStartOfDay(addDays(toZoned(cursor, settings.timeZone), 1), settings.timeZone);
        }
        return result;
    }, [visibleRange, settings.timeZone]);
    const index = instance.internals.getIndex();
    const groups = days
        .map((day) => ({
        day,
        bucket: index.byDay.get(getDayKey(day, settings.timeZone)),
    }))
        .filter((group) => {
        const total = (group.bucket?.allDay.length ?? 0) + (group.bucket?.timed.length ?? 0);
        return total > 0;
    });
    const isToday = (day) => getDayKey(day, settings.timeZone) ===
        getDayKey(new Date(), settings.timeZone);
    const native = viewConfig.scrollbars === "native";
    const body = (_jsx(_Fragment, { children: groups.length === 0 ? (_jsx("div", { "data-slot": "event-calendar-no-events", className: cn("flex min-h-72 flex-col items-center justify-center gap-4 py-16", viewConfig.classNames?.noEvents), children: viewConfig.renderNoEvents?.() ?? (_jsxs(_Fragment, { children: [_jsx(IconStack, { children: _jsx(IconPlaceholder, { lucide: "CalendarIcon", tabler: "IconCalendarEvent", hugeicons: "Calendar04Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarLine", className: "size-5", "aria-hidden": "true" }) }), _jsx("span", { className: "text-muted-foreground text-sm", children: settings.i18n.labels.noEvents })] })) })) : (
        // Drop the very last row's bottom border so it does not double up with
        // the calendar container's own bottom border. Targets the last day
        // group's last child (its last agenda item); per-item `border-b` is
        // kept everywhere else, including each day's internal rows.
        _jsx("div", { className: "flex flex-col [&>*:last-child>*:last-child]:border-b-0", children: groups.map(({ day, bucket }) => {
                const items = [...(bucket?.allDay ?? []), ...(bucket?.timed ?? [])];
                const zoned = toZoned(day, settings.timeZone);
                const weekday = format(zoned, "EEEE", { locale: settings.locale });
                const dayDate = format(zoned, "MMMM d, yyyy", {
                    locale: settings.locale,
                });
                return (_jsxs("div", { "data-slot": "event-calendar-agenda-day", "data-today": isToday(day) || undefined, 
                    // A named group per day so a screen reader can step day by day
                    // (and hear how full one is) instead of arrowing every row.
                    role: "group", "aria-label": `${weekday}, ${dayDate}, ${settings.i18n.labels.events(items.length)}`, children: [_jsxs("div", { "data-slot": "event-calendar-agenda-day-header", 
                            // The day bar is the agenda's only structure, so give it a
                            // heading level: the H key and the rotor can jump between
                            // days, which is the whole point of a long agenda.
                            role: "heading", "aria-level": 3, className: cn("bg-muted/60 sticky top-0 z-10 flex items-baseline justify-between gap-4 border-b px-4 py-2", 
                            // The custom ScrollArea's overlay scrollbar (w-2.5 = 10px)
                            // is painted UNDER this sticky, z-10, opaque header, so the
                            // thumb vanishes behind the day bar at the top of the view.
                            // Inset the header by the scrollbar lane so its background
                            // stops before the scrollbar instead of covering it. Native
                            // scrollbars already sit outside the content box, so this
                            // only applies to the custom-scrollbar path.
                            !native && "me-2.5", viewConfig.classNames?.agendaDayHeader), children: [_jsx("span", { className: cn("text-foreground font-semibold", isToday(day) && "text-primary"), children: weekday }), _jsx("span", { className: "text-muted-foreground font-medium tabular-nums", children: dayDate })] }), items.map((segment) => (_jsx(EventCalendarAgendaItem, { segment: segment }, segment.occurrence.key)))] }, day.getTime()));
            }) })) }));
    const Comp = asChild ? Slot.Root : "div";
    return (_jsx(EventCalendarViewContext.Provider, { value: { view: "agenda" }, children: _jsx(Comp, { "data-slot": "event-calendar-agenda-view", "data-view": "agenda", 
            // Unlike the grid views the agenda has no row/column semantics to carry
            // a name, so label the region with the day range it covers - through
            // formatDayRange, so a consumer override reaches it.
            role: "group", "aria-label": settings.i18n.functions.formatDayRange(visibleRange, {
                locale: settings.locale,
            }), className: cn("flex min-h-0 flex-1 flex-col overflow-hidden border-t", viewConfig.classNames?.agendaView, className), ...props, children: native ? (_jsx("div", { "data-slot": "scroll-area-viewport", "data-ec-native-scroll": "", className: "h-full overflow-y-auto", children: body })) : (_jsx(ScrollArea, { className: "h-full", children: body })) }) }));
}
/**
 * One agenda row: a full-width, selectable table row - time column, color dot,
 * and title (all replaceable via renderAgendaEvent). Clicking selects the
 * event (drag/resize stay off in the agenda).
 */
function EventCalendarAgendaItem({ segment, }) {
    const viewConfig = useEventCalendarViewConfig();
    return (_jsx(EventCalendarEvent, { segment: segment, className: cn(
        // read-only list: hover only, no selected/focused styling on click
        "hover:bg-accent/40 gap-3 rounded-none border-b px-4 py-2.5 transition-colors", viewConfig.classNames?.agendaItem) }));
}
export { EventCalendarAgendaView };
