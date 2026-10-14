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
    return (_jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsx(Calendar, { mode: "range", onSelect: setDate, selected: date }) }) }));
}
