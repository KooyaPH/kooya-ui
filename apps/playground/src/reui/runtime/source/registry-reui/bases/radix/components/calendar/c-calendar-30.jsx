"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { format } from "date-fns";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Field, FieldGroup, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const id = useId();
    const [date, setDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 12));
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { children: _jsxs(Button, { className: "group/pick-date w-60 justify-between", id: id, variant: "outline", children: [_jsx("span", { className: cn("truncate", date && "text-muted-foreground"), children: date ? format(date, "PPP") : "Pick a date and time" }), _jsx(IconPlaceholder, { lucide: "CalendarIcon", tabler: "IconCalendarEvent", hugeicons: "Calendar04Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarLine", "aria-hidden": "true", className: "text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors" })] }) }), _jsxs(PopoverContent, { align: "start", className: "w-auto", children: [_jsx(Calendar, { mode: "single", selected: date, onSelect: setDate, className: "p-0" }), _jsx(Separator, {}), _jsxs(FieldGroup, { className: "grid grid-cols-2 gap-2.5", children: [_jsxs(Field, { className: "gap-1.5", children: [_jsx(FieldLabel, { htmlFor: "time-from", children: "Start Time" }), _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { id: "time-from", type: "time", step: "1", defaultValue: "10:30:00", className: "appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none" }), _jsx(InputGroupAddon, { children: _jsx(IconPlaceholder, { lucide: "ClockIcon", tabler: "IconClock", hugeicons: "ClockIcon", phosphor: "ClockIcon", remixicon: "RiTimeLine" }) })] })] }), _jsxs(Field, { className: "gap-1.5", children: [_jsx(FieldLabel, { htmlFor: "time-to", children: "End Time" }), _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { id: "time-to", type: "time", step: "1", defaultValue: "12:30:00", className: "appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none" }), _jsx(InputGroupAddon, { children: _jsx(IconPlaceholder, { lucide: "ClockIcon", tabler: "IconClock", hugeicons: "ClockIcon", phosphor: "ClockIcon", remixicon: "RiTimeLine" }) })] })] })] })] })] }));
}
