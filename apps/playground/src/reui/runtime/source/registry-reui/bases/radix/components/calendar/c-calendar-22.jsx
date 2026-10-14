"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { formatDateRange } from "little-date";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent, CardFooter } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const events = [
    {
        title: "Product Launch",
        start: "2026-01-24T10:00:00",
        end: "2026-01-24T11:30:00",
        colorful: "after:bg-green-500",
    },
    {
        title: "Weekly Standup",
        start: "2026-01-28T13:00:00",
        end: "2026-01-28T13:30:00",
        colorful: "after:bg-yellow-500",
    },
    {
        title: "Code Review Session",
        start: "2026-01-31T15:00:00",
        end: "2026-01-31T16:00:00",
        colorful: "after:bg-blue-500",
    },
];
export default function Pattern() {
    const [date, setDate] = useState(new Date());
    return (_jsxs(Card, { className: "w-2xs py-4", children: [_jsx(CardContent, { className: "px-4", children: _jsx(Calendar, { mode: "single", selected: date, onSelect: setDate, className: "w-full bg-transparent p-0", required: true }) }), _jsxs(CardFooter, { className: "flex flex-col items-start gap-3 border-t px-4! pt-3! pb-0!", children: [_jsxs("div", { className: "flex w-full items-center justify-between px-1", children: [_jsx("div", { className: "text-sm font-medium", children: date?.toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }) }), _jsxs(Button, { variant: "ghost", size: "icon", className: "size-6", title: "Add Event", children: [_jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine" }), _jsx("span", { className: "sr-only", children: "Add Event" })] })] }), _jsx("div", { className: "flex w-full flex-col gap-2", children: events.map((event) => (_jsxs("div", { className: cn("bg-muted relative p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1", "rounded-md", "after:rounded-full", event.colorful), children: [_jsx("div", { className: "font-medium", children: event.title }), _jsx("div", { className: "text-muted-foreground text-xs", children: formatDateRange(new Date(event.start), new Date(event.end)) })] }, event.title))) })] })] }));
}
