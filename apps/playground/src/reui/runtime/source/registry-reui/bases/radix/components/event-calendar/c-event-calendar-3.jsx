"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef, useState } from "react";
import { EventCalendar, } from "../../reui/event-calendar/event-calendar.jsx";
import { EventCalendarContent } from "../../reui/event-calendar/event-calendar-content.jsx";
import { EventCalendarNav, EventCalendarToolbar, } from "../../reui/event-calendar/event-calendar-nav.jsx";
import { addDays, addMinutes, differenceInMinutes, format, setHours, startOfDay, startOfWeek, } from "date-fns";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "../../../../../../../adapters/overlays.tsx";
import { Field, FieldGroup, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const COLORS = [
    { value: "var(--color-blue-500)", label: "Blue" },
    { value: "var(--color-violet-500)", label: "Violet" },
    { value: "var(--color-emerald-500)", label: "Emerald" },
    { value: "var(--color-amber-500)", label: "Amber" },
    { value: "var(--color-rose-500)", label: "Rose" },
];
const START_HOURS = Array.from({ length: 13 }, (_, i) => i + 7); // 7:00 - 19:00
const DURATIONS = [
    { value: 30, label: "30 min" },
    { value: 60, label: "1 hour" },
    { value: 90, label: "1.5 hours" },
    { value: 120, label: "2 hours" },
];
function buildEvents(anchor) {
    const week = startOfWeek(startOfDay(anchor), { weekStartsOn: 0 });
    const at = (dayOffset, hour) => setHours(addDays(week, dayOffset), hour);
    return [
        {
            id: "kickoff",
            title: "Project kickoff",
            start: at(1, 10),
            end: at(1, 11),
            color: COLORS[0].value,
        },
        {
            id: "1on1",
            title: "1:1 with Mia",
            start: at(2, 14),
            end: at(2, 15),
            color: COLORS[1].value,
        },
        {
            id: "review",
            title: "Design review",
            start: at(4, 11),
            end: at(4, 12),
            color: COLORS[2].value,
        },
        {
            id: "standup",
            title: "Team standup",
            start: at(3, 9),
            end: addMinutes(at(3, 9), 30),
            color: COLORS[3].value,
        },
        {
            id: "interview",
            title: "Candidate interview",
            start: at(5, 13),
            end: at(5, 14),
            color: COLORS[4].value,
        },
        {
            id: "retro",
            title: "Sprint retro",
            start: at(5, 16),
            end: at(5, 17),
            color: COLORS[1].value,
        },
    ];
}
export default function Pattern() {
    const events = useMemo(() => buildEvents(new Date()), []);
    const apiRef = useRef(null);
    const counter = useRef(0);
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState(null);
    // Seed a blank create draft for a given day - shared by the empty-slot click
    // and the header "Add event" button.
    const seedCreate = (date) => {
        setDraft({
            id: null,
            title: "",
            date: startOfDay(date),
            startHour: 9,
            duration: 60,
            allDay: false,
            color: COLORS[0].value,
        });
        setOpen(true);
    };
    // Empty slot → create draft. Month cells report allDay with no `end`, so the
    // form starts as a sensible timed event the user can adjust.
    const openCreate = (slot) => seedCreate(slot.date);
    // Event click → seed an edit draft from the event itself (source of truth).
    const openEdit = (occurrence) => {
        const event = occurrence.event;
        setDraft({
            id: event.id,
            title: event.title,
            date: startOfDay(event.start),
            startHour: event.start.getHours(),
            duration: Math.max(30, differenceInMinutes(event.end, event.start)),
            allDay: event.allDay ?? false,
            color: event.color ?? COLORS[0].value,
        });
        setOpen(true);
    };
    const save = () => {
        const api = apiRef.current;
        if (!api || !draft || !draft.title.trim())
            return;
        const start = draft.allDay
            ? draft.date
            : setHours(draft.date, draft.startHour);
        const end = draft.allDay
            ? addDays(draft.date, 1)
            : addMinutes(start, draft.duration);
        const patch = {
            title: draft.title.trim(),
            start,
            end,
            allDay: draft.allDay,
            color: draft.color,
        };
        if (draft.id === null) {
            api.addEvent({ id: `evt-${counter.current++}`, ...patch });
        }
        else {
            api.updateEvent(draft.id, patch);
        }
        setOpen(false);
    };
    const remove = () => {
        const api = apiRef.current;
        if (!api || !draft?.id)
            return;
        api.removeEvent(draft.id);
        setOpen(false);
    };
    const isEdit = draft?.id != null;
    return (_jsxs("div", { className: "w-full p-4", children: [_jsx(Card, { className: "w-full py-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs(EventCalendar, { defaultEvents: events, defaultView: "month", apiRef: apiRef, onSlotClick: openCreate, onEventClick: (occurrence, e) => {
                            // open the editor instead of the built-in selection tint
                            e.preventDefault();
                            openEdit(occurrence);
                        }, 
                        // the dialog owns creation; drag/resize reschedules and persists
                        interactions: { drag: true, resize: true, selectSlot: false }, className: "h-[640px] w-full", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 pe-2", children: [_jsx(EventCalendarNav, { className: "min-w-0 flex-1" }), _jsx(EventCalendarToolbar, { children: _jsxs(Button, { size: "sm", onClick: () => seedCreate(new Date()), children: [_jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", className: "size-4", "aria-hidden": "true" }), "Add event"] }) })] }), _jsx(EventCalendarContent, {})] }) }) }), _jsx(Dialog, { open: open, onOpenChange: setOpen, children: draft && (_jsxs(DialogContent, { className: "sm:max-w-sm", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: isEdit ? "Edit event" : "New event" }), _jsx(DialogDescription, { children: format(draft.date, "EEEE, MMMM d, yyyy") })] }), _jsxs(FieldGroup, { children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "ec-crud-title", children: "Title" }), _jsx(Input, { id: "ec-crud-title", placeholder: "Add a title", value: draft.title, autoFocus: true, onChange: (e) => setDraft({ ...draft, title: e.target.value }) })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { children: "Color" }), _jsx("div", { className: "flex gap-2", children: COLORS.map((color) => (_jsx("button", { type: "button", "aria-label": color.label, "aria-pressed": draft.color === color.value, onClick: () => setDraft({ ...draft, color: color.value }), style: { backgroundColor: color.value }, className: cn("ring-offset-background size-6 rounded-full transition", draft.color === color.value &&
                                                    "ring-ring ring-2 ring-offset-2") }, color.value))) })] }), !draft.allDay && (_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "ec-crud-start", children: "Start" }), _jsxs(Select, { value: String(draft.startHour), onValueChange: (value) => setDraft({ ...draft, startHour: Number(value) }), children: [_jsx(SelectTrigger, { id: "ec-crud-start", size: "sm", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: START_HOURS.map((hour) => (_jsx(SelectItem, { value: String(hour), children: `${String(hour).padStart(2, "0")}:00` }, hour))) })] })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "ec-crud-duration", children: "Duration" }), _jsxs(Select, { value: String(draft.duration), onValueChange: (value) => setDraft({ ...draft, duration: Number(value) }), children: [_jsx(SelectTrigger, { id: "ec-crud-duration", size: "sm", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: DURATIONS.map((option) => (_jsx(SelectItem, { value: String(option.value), children: option.label }, option.value))) })] })] })] })), _jsxs(Field, { orientation: "horizontal", children: [_jsx(FieldLabel, { htmlFor: "ec-crud-allday", className: "font-normal", children: "All day" }), _jsx(Switch, { id: "ec-crud-allday", checked: draft.allDay, onCheckedChange: (allDay) => setDraft({ ...draft, allDay }) })] })] }), _jsxs(DialogFooter, { className: "sm:justify-between", children: [isEdit ? (_jsx(Button, { variant: "ghost", size: "sm", className: "text-destructive hover:text-destructive", onClick: remove, children: "Delete" })) : (_jsx("span", {})), _jsxs("div", { className: "flex gap-2", children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", size: "sm", children: "Cancel" }) }), _jsx(Button, { size: "sm", onClick: save, disabled: !draft.title.trim(), children: isEdit ? "Save changes" : "Create event" })] })] })] })) })] }));
}
