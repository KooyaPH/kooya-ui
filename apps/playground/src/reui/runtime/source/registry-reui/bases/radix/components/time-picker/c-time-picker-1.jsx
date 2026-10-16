"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TimePicker, TimePickerPanel, } from "../../reui/time-picker.jsx";
import { Card } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    /* `HH:mm` in 24-hour time, or `null` once Clear empties it. Preselected
       so each column opens centered on its selected row. */
    const [value, setValue] = useState("14:30");
    return (_jsxs("div", { className: "flex flex-col items-center gap-3", children: [_jsx(Card, { className: "w-fit py-0", children: _jsx(TimePicker, { value: value, onValueChange: setValue, "aria-label": "Meeting time", children: _jsx(TimePickerPanel, {}) }) }), _jsx("p", { role: "status", className: "text-muted-foreground text-sm", children: value ? `Meeting at ${value}` : "No meeting time set" })] }));
}
