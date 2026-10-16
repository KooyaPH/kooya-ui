"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { format } from "date-fns";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const id = useId();
    const [date, setDate] = useState();
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { children: _jsxs(Button, { className: "group/pick-date w-60 justify-between", id: id, variant: "outline", children: [_jsx("span", { className: cn("truncate", !date && "text-muted-foreground"), children: date ? format(date, "PPP") : "Pick a date" }), _jsx(IconPlaceholder, { lucide: "CalendarIcon", tabler: "IconCalendarEvent", hugeicons: "Calendar04Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarLine", "aria-hidden": "true", className: "opacity-60 transition-opacity group-hover/pick-date:opacity-100" })] }) }), _jsx(PopoverContent, { align: "start", className: "w-auto p-0", children: _jsx(Calendar, { mode: "single", onSelect: setDate, selected: date }) })] }));
}
