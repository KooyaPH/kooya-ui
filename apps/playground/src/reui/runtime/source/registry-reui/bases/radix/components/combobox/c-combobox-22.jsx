"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const priorityOptions = [
    { value: "none", label: "No Priority", tone: "none" },
    { value: "low", label: "Low", tone: "low" },
    { value: "medium", label: "Medium", tone: "medium" },
    { value: "high", label: "High", tone: "high" },
    { value: "urgent", label: "Urgent", tone: "urgent" },
];
function LowPriorityIcon({ className }) {
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", fill: "none", className: cn("size-4 shrink-0", className), children: [_jsx("rect", { x: "3", y: "9", width: "2.5", height: "4", rx: "1", fill: "currentColor" }), _jsx("rect", { x: "7", y: "6", width: "2.5", height: "7", rx: "1", fill: "currentColor", opacity: "0.28" }), _jsx("rect", { x: "11", y: "3", width: "2.5", height: "10", rx: "1", fill: "currentColor", opacity: "0.28" })] }));
}
function MediumPriorityIcon({ className }) {
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", fill: "none", className: cn("size-4 shrink-0", className), children: [_jsx("rect", { x: "3", y: "9", width: "2.5", height: "4", rx: "1", fill: "currentColor" }), _jsx("rect", { x: "7", y: "6", width: "2.5", height: "7", rx: "1", fill: "currentColor" }), _jsx("rect", { x: "11", y: "3", width: "2.5", height: "10", rx: "1", fill: "currentColor", opacity: "0.28" })] }));
}
function HighPriorityIcon({ className }) {
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", fill: "none", className: cn("size-4 shrink-0", className), children: [_jsx("rect", { x: "3", y: "9", width: "2.5", height: "4", rx: "1", fill: "currentColor" }), _jsx("rect", { x: "7", y: "6", width: "2.5", height: "7", rx: "1", fill: "currentColor" }), _jsx("rect", { x: "11", y: "3", width: "2.5", height: "10", rx: "1", fill: "currentColor" })] }));
}
function PriorityGlyph({ tone, className, }) {
    switch (tone) {
        case "none":
            return (_jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine", className: cn("text-muted-foreground! [&_*]:text-muted-foreground! size-4 shrink-0", className) }));
        case "low":
            return (_jsx(LowPriorityIcon, { className: cn("text-foreground! [&_*]:text-foreground!", className) }));
        case "medium":
            return (_jsx(MediumPriorityIcon, { className: cn("text-foreground! [&_*]:text-foreground!", className) }));
        case "high":
            return (_jsx(HighPriorityIcon, { className: cn("text-foreground! [&_*]:text-foreground!", className) }));
        case "urgent":
            return (_jsx(IconPlaceholder, { lucide: "TriangleAlertIcon", tabler: "IconAlertTriangle", hugeicons: "Alert02Icon", phosphor: "WarningIcon", remixicon: "RiAlertLine", className: cn("size-4 shrink-0 text-yellow-500! [&_*]:text-yellow-500!", className) }));
    }
}
function PriorityLabel({ priority, className, }) {
    const labelClassName = priority.tone === "urgent" ? "text-yellow-500!" : "text-foreground!";
    return (_jsxs("span", { className: cn("text-foreground! flex min-w-0 items-center gap-2", priority.tone === "urgent" && "text-yellow-500!", className), children: [_jsx(PriorityGlyph, { tone: priority.tone }), _jsx("span", { className: cn("truncate", labelClassName), children: priority.label })] }));
}
export default function Pattern() {
    const [priority, setPriority] = React.useState(priorityOptions[0]);
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { items: priorityOptions, value: priority, onValueChange: setPriority, itemToStringValue: (item) => item.label, autoHighlight: true, children: [_jsx(ComboboxTrigger, { render: _jsx(Button, { type: "button", variant: "outline", className: "w-full justify-between font-normal" }), children: _jsx(ComboboxValue, { placeholder: "Set priority", children: (selectedPriority) => selectedPriority ? (_jsx(PriorityLabel, { priority: selectedPriority })) : (_jsx("span", { className: "text-muted-foreground", children: "Set priority" })) }) }), _jsxs(ComboboxContent, { className: "max-w-(--anchor-width) min-w-(--anchor-width)", children: [_jsx(ComboboxInput, { showTrigger: false, placeholder: "Change priority", className: "mb-1" }), _jsx(ComboboxEmpty, { children: "No priorities found." }), _jsx(ComboboxList, { children: (item) => (_jsx(ComboboxItem, { value: item, children: _jsx(PriorityLabel, { priority: item }) }, item.value)) })] })] }) }));
}
