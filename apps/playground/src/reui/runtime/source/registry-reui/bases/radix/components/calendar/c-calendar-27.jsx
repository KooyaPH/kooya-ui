"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { format } from "date-fns";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { ScrollArea } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const id = useId();
    const today = new Date();
    const [date, setDate] = useState(today);
    const [time, setTime] = useState(null);
    // Mock time slots data
    const timeSlots = [
        { available: false, time: "09:00" },
        { available: false, time: "09:30" },
        { available: true, time: "10:00" },
        { available: true, time: "10:30" },
        { available: true, time: "11:00" },
        { available: true, time: "11:30" },
        { available: false, time: "12:00" },
        { available: true, time: "12:30" },
        { available: true, time: "13:00" },
        { available: true, time: "13:30" },
        { available: true, time: "14:00" },
        { available: false, time: "14:30" },
        { available: false, time: "15:00" },
        { available: true, time: "15:30" },
        { available: true, time: "16:00" },
        { available: true, time: "16:30" },
        { available: true, time: "17:00" },
        { available: true, time: "17:30" },
    ];
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { children: _jsxs(Button, { className: "group/pick-date w-60 justify-between", id: id, variant: "outline", children: [_jsx("span", { className: cn("truncate", date && "text-muted-foreground"), children: date ? format(date, "LLL dd, y") : "Pick a date" }), _jsx(IconPlaceholder, { lucide: "CalendarIcon", tabler: "IconCalendarEvent", hugeicons: "Calendar04Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarLine", "aria-hidden": "true", className: "text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors" })] }) }), _jsx(PopoverContent, { align: "start", className: "w-auto p-0", children: _jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs("div", { className: "flex max-sm:flex-col", children: [_jsx(Calendar, { disabled: [{ before: today }], mode: "single", onSelect: (newDate) => {
                                        if (newDate) {
                                            setDate(newDate);
                                            setTime(null);
                                        }
                                    }, selected: date }), _jsx("div", { className: "relative w-full max-sm:h-48 sm:w-40", children: _jsx("div", { className: "absolute inset-0 py-4 max-sm:border-t", children: _jsx(ScrollArea, { className: "h-full sm:border-s", children: _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "flex h-5 shrink-0 items-center px-5", children: _jsx("p", { className: "text-sm font-medium", children: format(date, "EEEE, d") }) }), _jsx("div", { className: "grid gap-1.5 px-5 max-sm:grid-cols-2", children: timeSlots.map(({ time: timeSlot, available }) => (_jsx(Button, { className: "w-full", disabled: !available, onClick: () => setTime(timeSlot), size: "sm", variant: time === timeSlot ? "default" : "outline", children: timeSlot }, timeSlot))) })] }) }) }) })] }) }) }) })] }));
}
