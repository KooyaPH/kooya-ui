"use client";
import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useId, useState } from "react";
import { format } from "date-fns";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const id = useId();
    const [date, setDate] = useState();
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { children: _jsxs(Button, { className: "group/pick-date w-60 justify-between", id: id, variant: "outline", children: [_jsx("span", { className: cn("truncate", !date && "text-muted-foreground"), children: date?.from ? (date.to ? (_jsxs(_Fragment, { children: [format(date.from, "LLL dd, y"), " -", " ", format(date.to, "LLL dd, y")] })) : (format(date.from, "LLL dd, y"))) : ("Pick a date range") }), _jsx(IconPlaceholder, { lucide: "CalendarIcon", tabler: "IconCalendarEvent", hugeicons: "Calendar04Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarLine", "aria-hidden": "true", className: "text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors" })] }) }), _jsx(PopoverContent, { align: "start", className: "w-auto p-0", children: _jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsx(Calendar, { mode: "range", selected: date, onSelect: setDate, numberOfMonths: 2 }) }) }) })] }));
}
