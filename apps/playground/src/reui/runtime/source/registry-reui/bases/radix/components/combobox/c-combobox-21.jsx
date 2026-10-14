"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const statusOptions = [
    { value: "backlog", label: "Backlog", tone: "backlog" },
    { value: "planned", label: "Planned", tone: "planned" },
    { value: "in-progress", label: "In Progress", tone: "inProgress" },
    { value: "paused", label: "Paused", tone: "paused" },
    { value: "completed", label: "Completed", tone: "completed" },
    { value: "cancelled", label: "Cancelled", tone: "cancelled" },
];
function StatusGlyph({ tone, className, }) {
    switch (tone) {
        case "backlog":
            return (_jsx(IconPlaceholder, { lucide: "CircleDotIcon", tabler: "IconCircleDot", hugeicons: "CircleIcon", phosphor: "CircleIcon", remixicon: "RiRecordCircleLine", className: cn("text-muted-foreground/70! **:text-muted-foreground/70! size-4 shrink-0", className) }));
        case "planned":
            return (_jsx(IconPlaceholder, { lucide: "CircleIcon", tabler: "IconCircle", hugeicons: "CircleIcon", phosphor: "CircleIcon", remixicon: "RiCircleLine", className: cn("text-foreground/70! [&_*]:text-foreground/70! size-4 shrink-0", className) }));
        case "inProgress":
            return (_jsx(IconPlaceholder, { lucide: "CircleDotIcon", tabler: "IconCircleDot", hugeicons: "CircleIcon", phosphor: "CircleIcon", remixicon: "RiRecordCircleLine", className: cn("size-4 shrink-0 text-sky-500! [&_*]:text-sky-500!", className) }));
        case "paused":
            return (_jsx(IconPlaceholder, { lucide: "PauseCircleIcon", tabler: "IconPlayerPauseFilled", hugeicons: "PauseCircleIcon", phosphor: "PauseCircleIcon", remixicon: "RiPauseCircleLine", className: cn("size-4 shrink-0 text-amber-500! [&_*]:text-amber-500!", className) }));
        case "completed":
            return (_jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle02Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine", className: cn("size-4 shrink-0 text-emerald-500! [&_*]:text-emerald-500!", className) }));
        case "cancelled":
            return (_jsx(IconPlaceholder, { lucide: "CircleXIcon", tabler: "IconCircleX", hugeicons: "CancelCircleIcon", phosphor: "XCircleIcon", remixicon: "RiCloseCircleLine", className: cn("text-muted-foreground! [&_*]:text-muted-foreground! size-4 shrink-0", className) }));
    }
}
function StatusLabel({ status, className, }) {
    return (_jsxs("span", { className: cn("flex min-w-0 items-center gap-2", className), children: [_jsx(StatusGlyph, { tone: status.tone }), _jsx("span", { className: "truncate", children: status.label })] }));
}
export default function Pattern() {
    const [status, setStatus] = React.useState(statusOptions[1]);
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { items: statusOptions, value: status, onValueChange: setStatus, itemToStringValue: (item) => item.label, autoHighlight: true, children: [_jsx(ComboboxTrigger, { render: _jsx(Button, { type: "button", variant: "outline", className: "w-full justify-between font-normal" }), children: _jsx(ComboboxValue, { placeholder: "Set status", children: (selectedStatus) => selectedStatus ? (_jsx(StatusLabel, { status: selectedStatus })) : (_jsx("span", { className: "text-muted-foreground", children: "Set status" })) }) }), _jsxs(ComboboxContent, { className: "max-w-(--anchor-width) min-w-(--anchor-width)", children: [_jsx(ComboboxInput, { showTrigger: false, placeholder: "Change status", className: "mb-1" }), _jsx(ComboboxEmpty, { children: "No statuses found." }), _jsx(ComboboxList, { children: (item) => (_jsx(ComboboxItem, { value: item, children: _jsx(StatusLabel, { status: item }) }, item.value)) })] })] }) }));
}
