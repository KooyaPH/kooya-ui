"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subDays, subMonths, subYears, } from "date-fns";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const today = new Date();
    const yesterday = {
        from: subDays(today, 1),
        to: subDays(today, 1),
    };
    const last7Days = {
        from: subDays(today, 6),
        to: today,
    };
    const last30Days = {
        from: subDays(today, 29),
        to: today,
    };
    const monthToDate = {
        from: startOfMonth(today),
        to: today,
    };
    const lastMonth = {
        from: startOfMonth(subMonths(today, 1)),
        to: endOfMonth(subMonths(today, 1)),
    };
    const yearToDate = {
        from: startOfYear(today),
        to: today,
    };
    const lastYear = {
        from: startOfYear(subYears(today, 1)),
        to: endOfYear(subYears(today, 1)),
    };
    const [month, setMonth] = useState(today);
    const [date, setDate] = useState(last7Days);
    return (_jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs("div", { className: "flex max-sm:flex-col", children: [_jsx("div", { className: "relative py-4 max-sm:order-1 max-sm:border-t sm:w-32", children: _jsx("div", { className: "h-full sm:border-e", children: _jsxs("div", { className: "flex flex-col px-2", children: [_jsx(Button, { className: "w-full justify-start", onClick: () => {
                                            setDate({
                                                from: today,
                                                to: today,
                                            });
                                            setMonth(today);
                                        }, size: "sm", variant: "ghost", children: "Today" }), _jsx(Button, { className: "w-full justify-start", onClick: () => {
                                            setDate(yesterday);
                                            setMonth(yesterday.to);
                                        }, size: "sm", variant: "ghost", children: "Yesterday" }), _jsx(Button, { className: "w-full justify-start", onClick: () => {
                                            setDate(last7Days);
                                            setMonth(last7Days.to);
                                        }, size: "sm", variant: "ghost", children: "Last 7 days" }), _jsx(Button, { className: "w-full justify-start", onClick: () => {
                                            setDate(last30Days);
                                            setMonth(last30Days.to);
                                        }, size: "sm", variant: "ghost", children: "Last 30 days" }), _jsx(Button, { className: "w-full justify-start", onClick: () => {
                                            setDate(monthToDate);
                                            setMonth(monthToDate.to);
                                        }, size: "sm", variant: "ghost", children: "Month to date" }), _jsx(Button, { className: "w-full justify-start", onClick: () => {
                                            setDate(lastMonth);
                                            setMonth(lastMonth.to);
                                        }, size: "sm", variant: "ghost", children: "Last month" }), _jsx(Button, { className: "w-full justify-start", onClick: () => {
                                            setDate(yearToDate);
                                            setMonth(yearToDate.to);
                                        }, size: "sm", variant: "ghost", children: "Year to date" }), _jsx(Button, { className: "w-full justify-start", onClick: () => {
                                            setDate(lastYear);
                                            setMonth(lastYear.to);
                                        }, size: "sm", variant: "ghost", children: "Last year" })] }) }) }), _jsx(Calendar, { disabled: [{ after: today }], mode: "range", month: month, onMonthChange: setMonth, onSelect: (newDate) => {
                            if (newDate) {
                                setDate(newDate);
                            }
                        }, selected: date })] }) }) }));
}
