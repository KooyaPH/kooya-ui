"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { addDays } from "date-fns";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const today = new Date();
    const selectedDay = addDays(today, -28);
    const [month, setMonth] = useState(selectedDay);
    const [date, setDate] = useState(selectedDay);
    return (_jsx(Card, { className: "p-0", children: _jsxs(CardContent, { className: "p-0", children: [_jsx(Calendar, { mode: "single", month: month, onMonthChange: setMonth, onSelect: setDate, selected: date }), _jsx(Button, { className: "mb-2 ml-4", onClick: () => setMonth(today), size: "sm", variant: "outline", children: "Current month" })] }) }));
}
