"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { subDays, subMonths, subYears } from "date-fns";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const today = new Date();
    const yesterday = subDays(today, 1);
    const lastWeek = subDays(today, 7);
    const lastMonth = subMonths(today, 1);
    const lastYear = subYears(today, 1);
    const [month, setMonth] = useState(today);
    const [date, setDate] = useState(today);
    return (_jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs("div", { className: "flex max-sm:flex-col", children: [_jsx("div", { className: "relative py-4 max-sm:order-1 max-sm:border-t sm:w-32", children: _jsx("div", { className: "h-full sm:border-e", children: _jsxs("div", { className: "flex flex-col px-2", children: [_jsx(Button, { className: "w-full justify-start", onClick: () => {
                                            setDate(today);
                                            setMonth(today);
                                        }, size: "sm", variant: "ghost", children: "Today" }), _jsx(Button, { className: "w-full justify-start", onClick: () => {
                                            setDate(yesterday);
                                            setMonth(yesterday);
                                        }, size: "sm", variant: "ghost", children: "Yesterday" }), _jsx(Button, { className: "w-full justify-start", onClick: () => {
                                            setDate(lastWeek);
                                            setMonth(lastWeek);
                                        }, size: "sm", variant: "ghost", children: "Last week" }), _jsx(Button, { className: "w-full justify-start", onClick: () => {
                                            setDate(lastMonth);
                                            setMonth(lastMonth);
                                        }, size: "sm", variant: "ghost", children: "Last month" }), _jsx(Button, { className: "w-full justify-start", onClick: () => {
                                            setDate(lastYear);
                                            setMonth(lastYear);
                                        }, size: "sm", variant: "ghost", children: "Last year" })] }) }) }), _jsx(Calendar, { disabled: [{ after: today }], mode: "single", month: month, onMonthChange: setMonth, onSelect: (newDate) => {
                            if (newDate) {
                                setDate(newDate);
                            }
                        }, selected: date })] }) }) }));
}
