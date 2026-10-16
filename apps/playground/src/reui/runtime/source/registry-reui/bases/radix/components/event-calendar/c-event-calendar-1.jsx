"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useRef, useState } from "react";
import { EventCalendar, } from "../../reui/event-calendar/event-calendar.jsx";
import { EventCalendarContent } from "../../reui/event-calendar/event-calendar-content.jsx";
import { EventCalendarNav, EventCalendarToolbar, } from "../../reui/event-calendar/event-calendar-nav.jsx";
import { addDays, addMinutes, setHours, startOfDay, startOfWeek, } from "date-fns";
import { ar, de, es, fr, ja } from "date-fns/locale";
import { Avatar, AvatarFallback } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/** Team members - passing resources unlocks the resource day view, so the
 *  view switcher offers every view the calendar ships. */
const TEAM = [
    { id: "alex", title: "Alex", color: "var(--color-blue-500)" },
    { id: "mia", title: "Mia", color: "var(--color-violet-500)" },
    { id: "sam", title: "Sam", color: "var(--color-emerald-500)" },
];
/** Demo events: a balanced current week (timed, multi-day, all-day, two
 *  custom-rendered chips) plus a light scatter in the nearby weeks so the
 *  month view reads naturally without crowding any cell. */
function buildEvents(anchor) {
    const week = startOfWeek(startOfDay(anchor), { weekStartsOn: 0 });
    const at = (dayOffset, hour, minute = 0) => addMinutes(setHours(addDays(week, dayOffset), hour), minute);
    const day = (dayOffset) => addDays(week, dayOffset);
    return [
        {
            id: "team-sync",
            title: "Team sync",
            start: at(1, 9, 0),
            end: at(1, 9, 30),
            resourceId: "alex",
        },
        {
            id: "design-review",
            title: "Design review",
            start: at(2, 11, 0),
            end: at(2, 12, 0),
            resourceId: "mia",
            color: "var(--color-violet-500)",
        },
        {
            id: "product-demo",
            title: "Product demo",
            start: at(3, 15, 0),
            end: at(3, 16, 0),
            resourceId: "sam",
            color: "var(--color-emerald-500)",
        },
        {
            id: "roadmap-planning",
            title: "Roadmap planning",
            start: at(4, 10, 0),
            end: at(4, 11, 30),
            resourceId: "alex",
            color: "var(--color-indigo-500)",
        },
        {
            id: "client-call",
            title: "Client call",
            start: at(5, 14, 0),
            end: at(5, 15, 0),
            resourceId: "mia",
            color: "var(--color-amber-500)",
        },
        {
            id: "team-offsite",
            title: "Team offsite",
            start: day(4),
            end: day(6),
            allDay: true,
            color: "var(--color-rose-500)",
        },
        {
            id: "sprint-planning",
            title: "Sprint planning",
            start: at(9, 9, 30),
            end: at(9, 10, 30),
            resourceId: "sam",
            color: "var(--color-blue-500)",
        },
        {
            id: "quarterly-review",
            title: "Quarterly review",
            start: at(17, 13, 0),
            end: at(17, 14, 30),
            resourceId: "alex",
            color: "var(--color-cyan-500)",
        },
    ];
}
/**
 * Custom chip content for a couple of events - proof that the chip is fully
 * yours to shape via `renderEvent`. Returning undefined for everything else
 * falls back to the built-in dot + title + time.
 */
function renderEventContent({ occurrence }) {
    const { event } = occurrence;
    // Attendee avatars (real shadcn Avatar + AvatarFallback) in place of the
    // leading color dot; a thin ring-1 keeps the overlap crisp at this size.
    if (event.id === "design-review") {
        return (_jsxs(_Fragment, { children: [_jsxs("span", { className: "flex shrink-0 -space-x-1", children: [_jsx(Avatar, { className: "ring-background size-4 ring-1", children: _jsx(AvatarFallback, { className: "bg-violet-500 text-[8px] font-semibold text-white", children: "MJ" }) }), _jsx(Avatar, { className: "ring-background size-4 ring-1", children: _jsx(AvatarFallback, { className: "bg-sky-500 text-[8px] font-semibold text-white", children: "AL" }) })] }), _jsx("span", { className: "truncate font-medium", children: event.title })] }));
    }
    // Title with a trailing status pill. The dot, title and pill share one
    // flex row so the leading dot stays glued to the label - a stacked
    // (flex-col) timed-grid chip would otherwise drop the dot onto its own line.
    if (event.id === "client-call") {
        return (_jsxs("span", { className: "flex w-full min-w-0 items-center gap-1.5", children: [_jsx("span", { "aria-hidden": true, className: "-me-0.5 size-1.5 shrink-0 rounded-full bg-(--ec-event-color)" }), _jsx("span", { className: "truncate font-medium", children: event.title }), _jsx("span", { className: "ms-auto shrink-0 rounded bg-(--ec-event-color)/25 px-1 text-[10px] font-semibold", children: "30m" })] }));
    }
    return undefined;
}
const LOCALES = [
    {
        id: "en",
        label: "English",
        locale: undefined,
        dir: "ltr",
        i18n: undefined,
    },
    {
        id: "de",
        label: "Deutsch",
        locale: de,
        dir: "ltr",
        i18n: {
            labels: {
                today: "Heute",
                allDay: "Ganztägig",
                noEvents: "Keine Termine",
                more: (count) => `+${count} weitere`,
            },
            viewNames: {
                month: "Monat",
                week: "Woche",
                day: "Tag",
                days: (count) => `${count} Tage`,
                agenda: "Agenda",
                resource: "Zeitraster",
            },
        },
    },
    {
        id: "fr",
        label: "Français",
        locale: fr,
        dir: "ltr",
        i18n: {
            labels: {
                today: "Aujourd'hui",
                allDay: "Journée entière",
                noEvents: "Aucun événement",
                more: (count) => `+${count} autres`,
            },
            viewNames: {
                month: "Mois",
                week: "Semaine",
                day: "Jour",
                days: (count) => `${count} jours`,
                agenda: "Agenda",
                resource: "Grille horaire",
            },
        },
    },
    {
        id: "es",
        label: "Español",
        locale: es,
        dir: "ltr",
        i18n: {
            labels: {
                today: "Hoy",
                allDay: "Todo el día",
                noEvents: "Sin eventos",
                more: (count) => `+${count} más`,
            },
            viewNames: {
                month: "Mes",
                week: "Semana",
                day: "Día",
                days: (count) => `${count} días`,
                agenda: "Agenda",
                resource: "Cuadrícula",
            },
        },
    },
    {
        id: "ja",
        label: "日本語",
        locale: ja,
        dir: "ltr",
        i18n: {
            labels: {
                today: "今日",
                allDay: "終日",
                noEvents: "予定なし",
                more: (count) => `他${count}件`,
            },
            viewNames: {
                month: "月",
                week: "週",
                day: "日",
                days: (count) => `${count}日間`,
                agenda: "予定",
                resource: "タイムグリッド",
            },
        },
    },
    {
        id: "ar",
        label: "العربية",
        locale: ar,
        dir: "rtl",
        i18n: {
            labels: {
                today: "اليوم",
                allDay: "طوال اليوم",
                noEvents: "لا توجد أحداث",
                more: (count) => `+${count} المزيد`,
            },
            viewNames: {
                month: "شهر",
                week: "أسبوع",
                day: "يوم",
                days: (count) => `${count} أيام`,
                agenda: "جدول الأعمال",
                resource: "شبكة زمنية",
            },
        },
    },
];
/** Display time zones - all event math and rendering happen in the chosen
 *  zone, so switching it visibly shifts every event's clock time. */
const TIME_ZONES = [
    { id: "local", label: "Browser" },
    { id: "ny", label: "New York", value: "America/New_York" },
    { id: "london", label: "London", value: "Europe/London" },
    { id: "tokyo", label: "Tokyo", value: "Asia/Tokyo" },
    { id: "kolkata", label: "Kolkata", value: "Asia/Kolkata" },
];
const DEFAULT_SETTINGS = {
    viewSettings: {
        weekends: true,
        weekNumbers: false,
        nowIndicator: true,
        offDays: false,
    },
    interactions: { drag: true, resize: true, selectSlot: true },
    weekStartsOn: 0,
    dayStartHour: 0,
    dayEndHour: 24,
    interval: 60,
    snapDuration: 15,
    eventTooltip: false,
    showDayAddButton: false,
    localeId: "en",
    timeZoneId: "local",
};
function SettingsSwitch({ id, label, checked, onCheckedChange, }) {
    return (_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx(Label, { htmlFor: id, className: "font-normal", children: label }), _jsx(Switch, { id: id, checked: checked, onCheckedChange: onCheckedChange })] }));
}
function SettingsSelect({ id, label, value, options, onValueChange, }) {
    return (_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx(Label, { htmlFor: id, className: "font-normal", children: label }), _jsxs(Select, { value: String(value), onValueChange: (next) => onValueChange(Number(next)), children: [_jsx(SelectTrigger, { id: id, size: "sm", className: "w-28", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: options.map((option) => (_jsx(SelectItem, { value: String(option.value), children: option.label }, option.value))) })] })] }));
}
/** String-keyed sibling of SettingsSelect, for the language/time-zone pickers. */
function SettingsTextSelect({ id, label, value, options, onValueChange, }) {
    return (_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx(Label, { htmlFor: id, className: "font-normal", children: label }), _jsxs(Select, { value: value, onValueChange: onValueChange, children: [_jsx(SelectTrigger, { id: id, size: "sm", className: "w-36", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: options.map((option) => (_jsx(SelectItem, { value: option.value, children: option.label }, option.value))) })] })] }));
}
export default function Pattern() {
    const events = useMemo(() => buildEvents(new Date()), []);
    const apiRef = useRef(null);
    const newEventCount = useRef(0);
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    // Mirror the active view so the settings panel can show the time-grid
    // internals tab only where those options are visible (week/day/N-days and
    // the resource time grid - month and agenda render no hour track).
    const [view, setView] = useState("month");
    const isTimeGridView = view !== "month" && view !== "agenda";
    const activeLocale = LOCALES.find((entry) => entry.id === settings.localeId) ?? LOCALES[0];
    const activeTimeZone = TIME_ZONES.find((entry) => entry.id === settings.timeZoneId) ??
        TIME_ZONES[0];
    const patch = (partial) => setSettings((current) => ({ ...current, ...partial }));
    // Add a one-hour event at noon today and jump to it - a minimal stand-in for
    // a real "create event" dialog.
    const addEvent = () => {
        const api = apiRef.current;
        if (!api)
            return;
        const start = setHours(startOfDay(new Date()), 12);
        const end = addMinutes(start, 60);
        api.addEvent({
            id: `new-event-${newEventCount.current++}`,
            title: "New event",
            start,
            end,
            resourceId: "alex",
            color: "var(--color-blue-500)",
        });
        api.goTo(start);
    };
    return (_jsx("div", { className: "w-full p-4", dir: activeLocale.dir, children: _jsx(Card, { className: "w-full py-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs(EventCalendar, { defaultEvents: events, defaultView: "month", onViewChange: setView, resources: TEAM, apiRef: apiRef, renderEvent: renderEventContent, locale: activeLocale.locale, i18n: activeLocale.i18n, timeZone: activeTimeZone.value, viewSettings: settings.viewSettings, onViewSettingsChange: (viewSettings) => patch({ viewSettings }), interactions: settings.interactions, onInteractionsChange: (interactions) => patch({ interactions }), weekStartsOn: settings.weekStartsOn, dayStartHour: settings.dayStartHour, dayEndHour: settings.dayEndHour, interval: settings.interval, snapDuration: settings.snapDuration, eventTooltip: settings.eventTooltip, showDayAddButton: settings.showDayAddButton, offDays: true, className: "h-[640px] w-full", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 pe-2", children: [_jsx(EventCalendarNav, { className: "min-w-0 flex-1" }), _jsxs(EventCalendarToolbar, { children: [_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(IconPlaceholder, { lucide: "Settings2Icon", tabler: "IconAdjustmentsHorizontal", hugeicons: "SlidersHorizontalIcon", phosphor: "SlidersHorizontalIcon", remixicon: "RiEqualizer2Line", className: "size-4", "aria-hidden": "true" }), "Settings"] }) }), _jsxs(PopoverContent, { align: "end", sideOffset: 8, className: "w-80", children: [_jsxs(Tabs, { defaultValue: "view", children: [_jsxs(TabsList, { className: "w-full", children: [_jsx(TabsTrigger, { value: "view", className: "flex-1", children: "View" }), isTimeGridView && (_jsx(TabsTrigger, { value: "time", className: "flex-1", children: "Time grid" })), _jsx(TabsTrigger, { value: "behavior", className: "flex-1", children: "Behavior" }), _jsx(TabsTrigger, { value: "region", className: "flex-1", children: "Region" })] }), _jsxs(TabsContent, { value: "view", className: "flex flex-col gap-3", children: [_jsx(SettingsSwitch, { id: "ec-set-weekends", label: "Weekends", checked: settings.viewSettings.weekends ?? true, onCheckedChange: (weekends) => patch({
                                                                                viewSettings: {
                                                                                    ...settings.viewSettings,
                                                                                    weekends,
                                                                                },
                                                                            }) }), _jsx(SettingsSwitch, { id: "ec-set-week-numbers", label: "Week numbers", checked: settings.viewSettings.weekNumbers ?? false, onCheckedChange: (weekNumbers) => patch({
                                                                                viewSettings: {
                                                                                    ...settings.viewSettings,
                                                                                    weekNumbers,
                                                                                },
                                                                            }) }), _jsx(SettingsSwitch, { id: "ec-set-now", label: "Now indicator", checked: settings.viewSettings.nowIndicator ?? true, onCheckedChange: (nowIndicator) => patch({
                                                                                viewSettings: {
                                                                                    ...settings.viewSettings,
                                                                                    nowIndicator,
                                                                                },
                                                                            }) }), _jsx(SettingsSwitch, { id: "ec-set-off-days", label: "Mark off days", checked: settings.viewSettings.offDays ?? false, onCheckedChange: (offDays) => patch({
                                                                                viewSettings: {
                                                                                    ...settings.viewSettings,
                                                                                    offDays,
                                                                                },
                                                                            }) }), _jsx(SettingsSwitch, { id: "ec-set-day-add", label: "Day add button", checked: settings.showDayAddButton, onCheckedChange: (showDayAddButton) => patch({ showDayAddButton }) }), _jsx(SettingsSelect, { id: "ec-set-week-start", label: "Week starts", value: settings.weekStartsOn, options: [
                                                                                { value: 0, label: "Sunday" },
                                                                                { value: 1, label: "Monday" },
                                                                            ], onValueChange: (weekStartsOn) => patch({ weekStartsOn: weekStartsOn }) })] }), _jsxs(TabsContent, { value: "time", className: "flex flex-col gap-3", children: [_jsx(SettingsSelect, { id: "ec-set-day-start", label: "Day starts", value: settings.dayStartHour, options: [
                                                                                { value: 0, label: "00:00" },
                                                                                { value: 6, label: "06:00" },
                                                                                { value: 8, label: "08:00" },
                                                                            ], onValueChange: (dayStartHour) => patch({ dayStartHour }) }), _jsx(SettingsSelect, { id: "ec-set-day-end", label: "Day ends", value: settings.dayEndHour, options: [
                                                                                { value: 18, label: "18:00" },
                                                                                { value: 20, label: "20:00" },
                                                                                { value: 24, label: "24:00" },
                                                                            ], onValueChange: (dayEndHour) => patch({ dayEndHour }) }), _jsx(SettingsSelect, { id: "ec-set-interval", label: "Grid interval", value: settings.interval, options: [
                                                                                { value: 30, label: "30 min" },
                                                                                { value: 60, label: "60 min" },
                                                                            ], onValueChange: (interval) => patch({ interval }) }), _jsx(SettingsSelect, { id: "ec-set-snap", label: "Drag snap", value: settings.snapDuration, options: [
                                                                                { value: 5, label: "5 min" },
                                                                                { value: 15, label: "15 min" },
                                                                                { value: 30, label: "30 min" },
                                                                            ], onValueChange: (snapDuration) => patch({ snapDuration }) })] }), _jsxs(TabsContent, { value: "behavior", className: "flex flex-col gap-3", children: [_jsx(SettingsSwitch, { id: "ec-set-drag", label: "Drag to move", checked: settings.interactions.drag, onCheckedChange: (drag) => patch({
                                                                                interactions: { ...settings.interactions, drag },
                                                                            }) }), _jsx(SettingsSwitch, { id: "ec-set-resize", label: "Drag to resize", checked: settings.interactions.resize, onCheckedChange: (resize) => patch({
                                                                                interactions: {
                                                                                    ...settings.interactions,
                                                                                    resize,
                                                                                },
                                                                            }) }), _jsx(SettingsSwitch, { id: "ec-set-select-slot", label: "Drag to create", checked: settings.interactions.selectSlot, onCheckedChange: (selectSlot) => patch({
                                                                                interactions: {
                                                                                    ...settings.interactions,
                                                                                    selectSlot,
                                                                                },
                                                                            }) }), _jsx(SettingsSwitch, { id: "ec-set-tooltip", label: "Event tooltips", checked: settings.eventTooltip, onCheckedChange: (eventTooltip) => patch({ eventTooltip }) })] }), _jsxs(TabsContent, { value: "region", className: "flex flex-col gap-3", children: [_jsx(SettingsTextSelect, { id: "ec-set-language", label: "Language", value: settings.localeId, options: LOCALES.map((entry) => ({
                                                                                value: entry.id,
                                                                                label: entry.label,
                                                                            })), onValueChange: (localeId) => patch({ localeId }) }), _jsx(SettingsTextSelect, { id: "ec-set-timezone", label: "Time zone", value: settings.timeZoneId, options: TIME_ZONES.map((entry) => ({
                                                                                value: entry.id,
                                                                                label: entry.label,
                                                                            })), onValueChange: (timeZoneId) => patch({ timeZoneId }) }), _jsx("p", { className: "text-muted-foreground text-xs leading-relaxed", children: "Language switches the date-fns locale and every UI label. Time zone shifts all event times. Arabic also flips the calendar to right-to-left." })] })] }), _jsx(Button, { variant: "outline", size: "sm", className: "mt-4 w-full", onClick: () => setSettings(DEFAULT_SETTINGS), children: "Reset to defaults" })] })] }), _jsxs(Button, { size: "sm", onClick: addEvent, children: [_jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", className: "size-4", "aria-hidden": "true" }), "New event"] })] })] }), _jsx(EventCalendarContent, {})] }) }) }) }));
}
