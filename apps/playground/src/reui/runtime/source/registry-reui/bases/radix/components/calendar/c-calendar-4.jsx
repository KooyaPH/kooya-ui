"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { addDays, subDays } from "date-fns";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const today = new Date();
    const [date, setDate] = useState([
        subDays(today, 17),
        addDays(today, 2),
        addDays(today, 6),
        addDays(today, 8),
    ]);
    return (_jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsx(Calendar, { mode: "multiple", onSelect: setDate, selected: date }) }) }));
}
