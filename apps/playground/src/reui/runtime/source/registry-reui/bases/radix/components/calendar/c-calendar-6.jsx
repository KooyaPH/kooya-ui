"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { addDays } from "date-fns";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const today = new Date();
    const [date, setDate] = useState({
        from: today,
        to: addDays(today, 5),
    });
    return (_jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsx(Calendar, { classNames: {
                    day: "relative before:absolute before:inset-y-px before:inset-x-0 [&.range-start:not(.range-end):before]:bg-linear-to-r before:from-transparent before:from-50% before:to-accent before:to-50% [&.range-end:not(.range-start):before]:bg-linear-to-l",
                    day_button: "!rounded-full group-[.range-start:not(.range-end)]:rounded-e-full group-[.range-end:not(.range-start)]:rounded-s-full",
                }, mode: "range", onSelect: setDate, selected: date }) }) }));
}
