"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DateSelector, } from "../../reui/date-selector.jsx";
import { format } from "date-fns";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const [value, setValue] = useState();
    return (_jsxs("div", { className: "flex w-full flex-col items-center gap-5", children: [_jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-3", children: _jsx(DateSelector, { value: value, onChange: setValue, label: "Due date", inputHint: "Try: 2025, Q4, 05/10/2025" }) }) }), value ? (_jsx("pre", { className: "bg-muted w-full overflow-auto rounded-md p-3 font-mono text-xs md:w-[500px]", children: JSON.stringify(value, (key, val) => {
                    if (val instanceof Date) {
                        return format(val, "MM/dd/yyyy");
                    }
                    return val;
                }, 2) })) : (_jsx("div", { className: "text-muted-foreground text-sm", children: "No value selected. Select a date to see the debug information." }))] }));
}
