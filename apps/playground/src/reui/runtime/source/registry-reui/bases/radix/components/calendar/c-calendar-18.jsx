"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { addDays } from "date-fns";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent, CardFooter } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const [date, setDate] = useState(new Date(new Date().getFullYear(), 1, 12));
    const [currentMonth, setCurrentMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    return (_jsxs(Card, { className: "mx-auto w-fit max-w-[300px]", size: "sm", children: [_jsx(CardContent, { children: _jsx(Calendar, { mode: "single", selected: date, onSelect: setDate, month: currentMonth, onMonthChange: setCurrentMonth, fixedWeeks: true, className: "p-0 [--cell-size:--spacing(9.5)]" }) }), _jsx(CardFooter, { className: "flex flex-wrap gap-2 border-t", children: [
                    { label: "Today", value: 0 },
                    { label: "Tomorrow", value: 1 },
                    { label: "3 days", value: 3 },
                    { label: "Week", value: 7 },
                    { label: "2 weeks", value: 14 },
                ].map((preset) => (_jsx(Button, { variant: "outline", size: "sm", className: "flex-1", onClick: () => {
                        const newDate = addDays(new Date(), preset.value);
                        setDate(newDate);
                        setCurrentMonth(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
                    }, children: preset.label }, preset.value))) })] }));
}
