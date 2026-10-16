"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { enUS, zhCN } from "react-day-picker/locale";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardAction, CardContent, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const localizedStrings = {
    en: {
        title: "Schedule a meeting",
        description: "Choose your preferred dates",
    },
    zh: {
        title: "安排会议",
        description: "选择您偏好的日期",
    },
};
export default function Pattern() {
    const [locale, setLocale] = useState("en");
    const [dateRange, setDateRange] = useState({
        from: new Date(2026, 1, 9),
        to: new Date(2026, 1, 17),
    });
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: localizedStrings[locale].title }), _jsx(CardAction, { children: _jsxs(Select, { value: locale, onValueChange: (value) => setLocale(value), children: [_jsx(SelectTrigger, { className: "w-[60px]", "aria-label": "Select language", children: _jsx(SelectValue, { placeholder: "Language" }) }), _jsxs(SelectContent, { position: "popper", align: "start", children: [_jsx(SelectItem, { value: "zh", children: "Chinese" }), _jsx(SelectItem, { value: "en", children: "English" })] })] }) })] }), _jsx(CardContent, { className: "border-t pt-3", children: _jsx(Calendar, { mode: "range", selected: dateRange, onSelect: setDateRange, defaultMonth: dateRange?.from, locale: locale === "zh" ? zhCN : enUS, numerals: "latn", className: "w-full bg-transparent p-0", buttonVariant: "ghost" }) })] }));
}
