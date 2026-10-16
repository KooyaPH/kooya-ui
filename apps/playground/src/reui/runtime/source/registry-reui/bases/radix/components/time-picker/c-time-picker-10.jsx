"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { TimePicker } from "../../reui/time-picker.jsx";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const id = useId();
    /* Only a committed value reaches this state. Column picks, Now and Clear
       stay a draft in the popover until OK, and closing it discards them, so
       the roster never sees a half-made change. */
    const [shiftStart, setShiftStart] = useState("08:00");
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-xs flex-col gap-3", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { id: `${id}-label`, htmlFor: id, children: "Shift start" }), _jsx(TimePicker, { id: id, "aria-labelledby": `${id}-label`, "aria-describedby": `${id}-hint`, value: shiftStart, onValueChange: setShiftStart, minuteStep: 15, 
                        /* Also adds OK to the footer, drawn as the primary button. */
                        requireConfirm: true }), _jsx(FieldDescription, { id: `${id}-hint`, children: "Changes apply when you press OK." })] }), _jsx("p", { role: "status", className: "text-muted-foreground text-sm", children: shiftStart ? `Shift starts at ${shiftStart}` : "No shift start set" })] }));
}
