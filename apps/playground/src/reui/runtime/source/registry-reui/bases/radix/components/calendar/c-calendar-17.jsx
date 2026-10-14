"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Calendar, CalendarDayButton } from "../../../../../registry/bases/radix/ui/calendar.jsx";
function getPriceForDate(date) {
    const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    const val = (seed * 9301 + 49297) % 233280;
    return Math.floor(50 + (val / 233280) * 200);
}
export default function Pattern() {
    const [date, setDate] = useState(new Date());
    return (_jsx(Calendar, { mode: "single", selected: date, onSelect: setDate, showOutsideDays: false, className: "rounded-lg border [--cell-size:--spacing(12)]", components: {
            DayButton: ({ children, modifiers, day, ...props }) => {
                const price = getPriceForDate(day.date);
                const isGreen = price < 100;
                return (_jsxs(CalendarDayButton, { day: day, modifiers: modifiers, ...props, children: [children, !modifiers.outside && (_jsxs("span", { className: isGreen ? "text-green-600 dark:text-green-400" : "", children: ["$", price] }))] }));
            },
        } }));
}
