"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TimePicker, TimePickerColumns, TimePickerPanel, } from "../../reui/time-picker.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
/* Plain arrays rather than Intl or toLocale*, so the server and the browser
   always print the same summary. */
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
/* Fixed dates, so the server and every visitor render the same month. */
const FIRST_MONTH = new Date(2026, 9, 1);
const SUGGESTED_DAY = new Date(2026, 9, 14);
export default function Pattern() {
    const [date, setDate] = useState(SUGGESTED_DAY);
    const [time, setTime] = useState("09:00");
    const [scheduled, setScheduled] = useState(null);
    const summary = `${WEEKDAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()} at ${time}`;
    /* Derived, so changing the day or the time after scheduling reads as a
       new, unsaved choice again. */
    const isScheduled = scheduled === summary;
    return (_jsxs(Card, { className: "mx-auto w-fit max-w-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Schedule a post" }), _jsx(CardDescription, { children: "Pick the day and the time it goes live." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col items-center gap-4 sm:flex-row sm:items-start", children: [_jsx(Calendar, { mode: "single", required: true, selected: date, onSelect: setDate, defaultMonth: FIRST_MONTH }), _jsx("div", { className: "flex justify-center self-stretch max-sm:border-t max-sm:pt-4 sm:border-s sm:ps-4", children: _jsx(TimePicker, { "aria-label": "Publish time", value: time, onValueChange: (next) => {
                                    /* No footer means no Clear, so `next` is never null here. */
                                    if (next)
                                        setTime(next);
                                }, minuteStep: 15, children: _jsx(TimePickerPanel, { className: "[--time-picker-rows:7]", children: _jsx(TimePickerColumns, {}) }) }) })] }) }), _jsxs(CardFooter, { children: [_jsxs("p", { role: "status", className: "me-3 min-w-0 flex-1 text-sm", children: [isScheduled && (_jsx("span", { className: "text-muted-foreground", children: "Scheduled for " })), _jsx("span", { className: "font-medium tabular-nums", children: summary })] }), _jsx(Button, { onClick: () => setScheduled(summary), children: "Schedule" })] })] }));
}
