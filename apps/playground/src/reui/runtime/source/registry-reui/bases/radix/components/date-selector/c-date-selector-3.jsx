"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { DateSelector, formatDateValue, } from "../../reui/date-selector.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [value, setValue] = useState();
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(value);
    const formattedValue = value ? formatDateValue(value) : "";
    const displayText = formattedValue || "Select a date";
    useEffect(() => {
        if (open) {
            setInternalValue(value);
        }
    }, [open, value]);
    const handleApply = () => {
        if (internalValue) {
            setValue(internalValue);
        }
        setOpen(false);
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "w-56 justify-start", children: [_jsx(IconPlaceholder, { lucide: "CalendarIcon", tabler: "IconCalendarEvent", hugeicons: "Calendar04Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarLine" }), displayText] }) }), _jsxs(DialogContent, { className: "sm:max-w-lg", showCloseButton: false, children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Select Due Date" }) }), _jsx(DateSelector, { value: internalValue, onChange: setInternalValue, showInput: true }), _jsxs(DialogFooter, { children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancel" }) }), _jsx(Button, { onClick: handleApply, children: "Apply" })] })] })] }));
}
