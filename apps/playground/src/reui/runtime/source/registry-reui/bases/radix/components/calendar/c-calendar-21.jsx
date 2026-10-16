"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const endOfMonth = new Date(year, month + 1, 0).getDate();
const from = new Date(year, month, Math.min(6, endOfMonth));
const to = new Date(year, month, Math.min(18, endOfMonth));
export default function Pattern() {
    const [date, setDate] = useState({
        from,
        to,
    });
    return (_jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsx(Calendar, { mode: "range", numberOfMonths: 2, onSelect: setDate, selected: date }) }) }));
}
