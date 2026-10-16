"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxSeparator, ComboboxTrigger, ComboboxValue, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const noLabelOption = {
    type: "none",
    id: "no-label",
    label: "No label",
    searchText: "No label clear labels remove labels empty",
};
const labelOptions = [
    {
        type: "label",
        id: "feature",
        value: "feature",
        label: "Feature",
        colorClassName: "bg-sky-500",
        searchText: "Feature product enhancement capability",
    },
    {
        type: "label",
        id: "bug",
        value: "bug",
        label: "Bug",
        colorClassName: "bg-rose-500",
        searchText: "Bug issue defect problem",
    },
    {
        type: "label",
        id: "improvement",
        value: "improvement",
        label: "Improvement",
        colorClassName: "bg-emerald-500",
        searchText: "Improvement refinement polish optimization",
    },
    {
        type: "label",
        id: "design",
        value: "design",
        label: "Design",
        colorClassName: "bg-violet-500",
        searchText: "Design ui ux creative visual",
    },
];
const labelSelectionOptions = [
    noLabelOption,
    ...labelOptions,
];
function TagGlyph({ className }) {
    return (_jsx(IconPlaceholder, { lucide: "TagIcon", tabler: "IconTag", hugeicons: "Tag01Icon", phosphor: "TagIcon", remixicon: "RiPriceTag3Line", className: cn("size-4 shrink-0", className) }));
}
function LabelDot({ option }) {
    return (_jsx("span", { "aria-hidden": "true", className: cn("size-3 shrink-0 rounded-full", option.colorClassName) }));
}
function LabelTriggerSummary({ selectedLabels, placeholder, }) {
    if (!selectedLabels.length) {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(TagGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "text-muted-foreground truncate", children: placeholder })] }));
    }
    const visibleLabels = selectedLabels.slice(0, 3);
    const hiddenLabelCount = selectedLabels.length - visibleLabels.length;
    const selectedLabelText = selectedLabels
        .map((label) => label.label)
        .join(", ");
    if (selectedLabels.length === 1) {
        const [label] = selectedLabels;
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(LabelDot, { option: label }), _jsx("span", { className: "truncate", children: label.label })] }));
    }
    return (_jsxs("span", { className: "flex min-w-0 items-center gap-1", children: [_jsxs("span", { className: "sr-only", children: ["Selected labels: ", selectedLabelText] }), visibleLabels.map((label) => (_jsx(LabelDot, { option: label }, label.id))), hiddenLabelCount > 0 ? (_jsxs("span", { className: "text-muted-foreground ml-0.5 text-xs tabular-nums", children: ["+", hiddenLabelCount] })) : null] }));
}
function LabelOptionRow({ option }) {
    if (option.type === "none") {
        return _jsx("span", { className: "truncate", children: option.label });
    }
    return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(LabelDot, { option: option }), _jsx("span", { className: "truncate", children: option.label })] }));
}
function isLabelSelectionItemEqual(item, value) {
    return item.id === value.id;
}
export default function Pattern() {
    const [labels, setLabels] = React.useState(labelOptions);
    function handleLabelsChange(nextItems) {
        if (nextItems.some((item) => item.type === "none")) {
            setLabels([]);
            return;
        }
        setLabels(nextItems.filter((item) => item.type === "label"));
    }
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { multiple: true, items: labelSelectionOptions, value: labels, onValueChange: handleLabelsChange, itemToStringValue: (item) => item.searchText, isItemEqualToValue: isLabelSelectionItemEqual, autoHighlight: true, children: [_jsx(ComboboxTrigger, { render: _jsx(Button, { type: "button", variant: "outline", className: "w-full justify-between font-normal" }), children: _jsx(ComboboxValue, { placeholder: "Add label", children: (selectedLabels) => (_jsx(LabelTriggerSummary, { selectedLabels: selectedLabels ?? [], placeholder: "Add label" })) }) }), _jsxs(ComboboxContent, { className: "max-w-(--anchor-width) min-w-(--anchor-width)", children: [_jsx(ComboboxInput, { showTrigger: false, placeholder: "Select labels", className: "mb-1" }), _jsx(ComboboxEmpty, { children: "No labels found." }), _jsxs(ComboboxList, { children: [_jsx(ComboboxItem, { value: noLabelOption, children: _jsx(LabelOptionRow, { option: noLabelOption }) }), _jsx(ComboboxSeparator, {}), labelOptions.map((item) => (_jsx(ComboboxItem, { value: item, children: _jsx(LabelOptionRow, { option: item }) }, item.id)))] })] })] }) }));
}
