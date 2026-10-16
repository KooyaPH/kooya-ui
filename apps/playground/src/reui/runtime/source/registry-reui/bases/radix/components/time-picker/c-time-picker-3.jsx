"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { TimePicker, TimePickerContent, TimePickerInput, } from "../../reui/time-picker.jsx";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const id = useId();
    const [value, setValue] = useState(null);
    return (_jsxs("div", { className: "flex w-full max-w-xs flex-col gap-3", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: id, children: "Pickup time" }), _jsxs(TimePicker, { id: id, minuteStep: 5, value: value, onValueChange: setValue, "aria-describedby": `${id}-description`, children: [_jsx(TimePickerInput, {}), _jsx(TimePickerContent, { align: "end" })] }), _jsx(FieldDescription, { id: `${id}-description`, children: "Type 930, 14:30 or 2:30 pm. Times snap to 5 minutes." })] }), _jsx("p", { role: "status", className: "text-muted-foreground text-sm", children: value ? `Pickup at ${value}` : "No pickup time yet" })] }));
}
