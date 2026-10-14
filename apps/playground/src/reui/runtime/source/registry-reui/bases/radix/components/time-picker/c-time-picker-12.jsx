"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { TimePicker } from "../../reui/time-picker.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const id = useId();
    const [invalid, setInvalid] = useState(false);
    const [booked, setBooked] = useState(null);
    return (
    /* `noValidate`: the Field draws the error, not the browser bubble. */
    _jsx("form", { noValidate: true, className: "mx-auto w-full max-w-sm", onSubmit: (event) => {
            event.preventDefault();
            /* The picker submits `HH:mm` under its `name`, or "" while empty. */
            const time = String(new FormData(event.currentTarget).get("deliveryTime") ?? "");
            setInvalid(!time);
            setBooked(time || null);
        }, onReset: () => {
            /* The picker returns to its default (empty) on the same reset. */
            setInvalid(false);
            setBooked(null);
        }, children: _jsxs(FieldGroup, { children: [_jsxs(Field, { "data-invalid": invalid || undefined, children: [_jsx(FieldLabel, { id: `${id}-label`, htmlFor: id, children: "Delivery time" }), _jsx(TimePicker, { id: id, name: "deliveryTime", required: true, 
                            /* Sets aria-invalid on the trigger; the Field colors the label. */
                            invalid: invalid, minuteStep: 30, min: "08:00", max: "20:00", "aria-labelledby": `${id}-label`, "aria-describedby": `${id}-hint`, onValueChange: (next) => {
                                /* A pick clears the error; emptying the field waits for Submit. */
                                if (next)
                                    setInvalid(false);
                            } }), invalid ? (_jsx(FieldError, { id: `${id}-hint`, children: "Choose a delivery time to continue." })) : (_jsx(FieldDescription, { id: `${id}-hint`, children: "30-minute slots between 08:00 and 20:00." }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { type: "submit", children: "Submit" }), _jsx(Button, { type: "reset", variant: "outline", children: "Reset" }), _jsx("p", { role: "status", className: "text-muted-foreground ms-auto min-w-0 truncate text-sm", children: booked && `Delivery booked for ${booked}` })] })] }) }));
}
