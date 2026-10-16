"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { DateSelector, formatDateValue, } from "../../reui/date-selector.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
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
        setValue(internalValue);
        setOpen(false);
    };
    const handleCancel = () => {
        setInternalValue(value);
        setOpen(false);
    };
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "w-56 justify-start", children: [_jsx(IconPlaceholder, { lucide: "CalendarIcon", tabler: "IconCalendarEvent", hugeicons: "Calendar04Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarLine" }), displayText] }) }), _jsxs(PopoverContent, { className: "w-auto gap-3 p-0", align: "start", sideOffset: 4, children: [_jsx("div", { className: "p-3", children: _jsx(DateSelector, { value: internalValue, onChange: setInternalValue, allowRange: true, label: "Due date", inputHint: "Try: 2025, Q4, 05/10/2025" }) }), _jsx(Separator, { className: "p-0" }), _jsxs("div", { className: "flex justify-end gap-2 p-3 pt-0", children: [_jsx(Button, { variant: "outline", onClick: handleCancel, children: "Cancel" }), _jsx(Button, { onClick: handleApply, children: "Apply" })] })] })] }));
}
