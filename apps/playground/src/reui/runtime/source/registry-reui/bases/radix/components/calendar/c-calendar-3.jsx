"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { addDays } from "date-fns";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const today = new Date();
    return (_jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsx(Calendar, { disabled: [
                    { before: new Date() },
                    new Date(),
                    { dayOfWeek: [0, 6] },
                    {
                        from: addDays(today, 14),
                        to: addDays(today, 16),
                    },
                    {
                        from: addDays(today, 23),
                        to: addDays(today, 24),
                    },
                ], excludeDisabled: true, mode: "range" }) }) }));
}
