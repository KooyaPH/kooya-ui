"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TimePicker } from "../../reui/time-picker.jsx";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
const BOOKED = new Set(["10:00", "14:30", "15:00"]);
/* Values arrive as `HH:mm`, so plain string comparison orders them. Module
   scope keeps the function stable, and a function prop is also why this file
   is a client module although it holds no state. */
function isUnavailable(value) {
    return (value >= "12:00" && value < "13:00") || BOOKED.has(value);
}
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-xs", children: _jsxs(Field, { children: [_jsx(FieldLabel, { id: "appointment-time-label", htmlFor: "appointment-time", children: "Appointment" }), _jsx(TimePicker, { id: "appointment-time", minuteStep: 30, min: "09:00", max: "17:00", isTimeDisabled: isUnavailable, "aria-labelledby": "appointment-time-label", "aria-describedby": "appointment-time-description" }), _jsx(FieldDescription, { id: "appointment-time-description", children: "Lunch from 12:00 to 13:00 and times already booked are unavailable." })] }) }));
}
