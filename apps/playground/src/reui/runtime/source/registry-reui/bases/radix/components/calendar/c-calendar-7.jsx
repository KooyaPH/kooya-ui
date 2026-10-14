"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const [date, setDate] = useState(new Date());
    return (_jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsx(Calendar, { classNames: {
                    month_caption: "ms-2.5 justify-start",
                    nav: "flex items-center w-full absolute -top-1 inset-x-0 justify-end",
                }, mode: "single", onSelect: setDate, selected: date }) }) }));
}
