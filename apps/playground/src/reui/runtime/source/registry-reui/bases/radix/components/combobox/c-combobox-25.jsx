"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { addDays, addMonths, addWeeks, endOfMonth, endOfWeek, format, isSameDay, startOfDay, } from "date-fns";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Combobox, ComboboxContent, ComboboxItem, ComboboxList, ComboboxSeparator, ComboboxTrigger, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "../../../../../../../adapters/overlays.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const noDateOption = {
    type: "none",
    id: "no-date",
    label: "No date",
    searchText: "No date clear date remove date empty",
};
const customDateOption = {
    type: "custom",
    id: "custom-date",
    label: "Custom date...",
    searchText: "Custom date custom day calendar picker choose a date manual date",
};
function CalendarGlyph({ className }) {
    return (_jsx(IconPlaceholder, { lucide: "CalendarIcon", tabler: "IconCalendarEvent", hugeicons: "Calendar04Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarLine", className: cn("size-4 shrink-0", className) }));
}
function CalendarSearchGlyph({ className }) {
    return (_jsx(IconPlaceholder, { lucide: "CalendarSearchIcon", tabler: "IconCalendarEvent", hugeicons: "Calendar04Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarLine", className: cn("size-4 shrink-0", className) }));
}
function DateTriggerLabel({ value, placeholder, }) {
    if (!value) {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(CalendarGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "text-muted-foreground truncate", children: placeholder })] }));
    }
    const displayLabel = value.type === "custom" ? format(value.date, "MMM d") : value.label;
    return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(CalendarGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "truncate", children: displayLabel })] }));
}
function DateOptionRow({ option }) {
    if (option.type === "none") {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(CalendarGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "truncate", children: option.label })] }));
    }
    if (option.type === "custom") {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(CalendarSearchGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "truncate", children: option.label })] }));
    }
    return (_jsxs("span", { className: "flex w-full min-w-0 items-center justify-between gap-3", children: [_jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [_jsx(CalendarGlyph, { className: "text-muted-foreground" }), _jsx("span", { className: "truncate", children: option.label })] }), _jsx("span", { className: "text-muted-foreground shrink-0 text-[13px] tabular-nums", children: format(option.date, "dd/MM/yyyy") })] }));
}
function getUpcomingWeekEnd(today) {
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
    return isSameDay(today, weekEnd) ? addWeeks(weekEnd, 1) : weekEnd;
}
function getUpcomingMonthEnd(today) {
    const monthEnd = endOfMonth(today);
    return isSameDay(today, monthEnd) ? endOfMonth(addMonths(today, 1)) : monthEnd;
}
function DateSelectionCombobox({ value, onValueChange, }) {
    const today = React.useMemo(() => startOfDay(new Date()), []);
    const [pickerOpen, setPickerOpen] = React.useState(false);
    const [draftDate, setDraftDate] = React.useState(value?.date ?? addDays(today, 1));
    const presetOptions = React.useMemo(() => [
        {
            type: "preset",
            id: "tomorrow",
            label: "Tomorrow",
            date: addDays(today, 1),
            searchText: "Tomorrow next day due date",
        },
        {
            type: "preset",
            id: "end-of-week",
            label: "End of week",
            date: getUpcomingWeekEnd(today),
            searchText: "End of week Sunday week close target",
        },
        {
            type: "preset",
            id: "in-one-week",
            label: "In one week",
            date: addWeeks(today, 1),
            searchText: "In one week next week seven days target",
        },
        {
            type: "preset",
            id: "end-of-month",
            label: "End of month",
            date: getUpcomingMonthEnd(today),
            searchText: "End of month month close month end target",
        },
        {
            type: "preset",
            id: "in-one-month",
            label: "In one month",
            date: addMonths(today, 1),
            searchText: "In one month next month thirty days target",
        },
    ], [today]);
    const dateOptions = [
        noDateOption,
        ...presetOptions,
        customDateOption,
    ];
    const activePreset = value?.type === "preset"
        ? (presetOptions.find((option) => option.id === value.id) ?? null)
        : !value
            ? noDateOption
            : null;
    React.useEffect(() => {
        if (!pickerOpen) {
            return;
        }
        setDraftDate(value?.date ?? addDays(today, 1));
    }, [pickerOpen, today, value]);
    function handleOptionChange(nextValue) {
        if (!nextValue) {
            return;
        }
        if (nextValue.type === "none") {
            onValueChange(null);
            return;
        }
        if (nextValue.type === "custom") {
            requestAnimationFrame(() => setPickerOpen(true));
            return;
        }
        onValueChange({
            type: "preset",
            id: nextValue.id,
            label: nextValue.label,
            date: nextValue.date,
        });
    }
    function handleConfirmCustomDate() {
        if (!draftDate) {
            return;
        }
        onValueChange({
            type: "custom",
            label: format(draftDate, "MMM d"),
            date: draftDate,
        });
        setPickerOpen(false);
    }
    return (_jsxs(_Fragment, { children: [_jsxs(Combobox, { items: dateOptions, value: activePreset, onValueChange: handleOptionChange, itemToStringValue: (item) => item.searchText, autoHighlight: true, children: [_jsx(ComboboxTrigger, { render: _jsx(Button, { type: "button", variant: "outline", className: "w-full justify-between font-normal" }), children: _jsx(DateTriggerLabel, { value: value, placeholder: "Set start" }) }), _jsx(ComboboxContent, { className: "max-w-(--anchor-width) min-w-(--anchor-width)", children: _jsxs(ComboboxList, { children: [_jsx(ComboboxItem, { value: noDateOption, children: _jsx(DateOptionRow, { option: noDateOption }) }), _jsx(ComboboxSeparator, {}), presetOptions.map((option) => (_jsx(ComboboxItem, { value: option, children: _jsx(DateOptionRow, { option: option }) }, option.id))), _jsx(ComboboxSeparator, {}), _jsx(ComboboxItem, { value: customDateOption, children: _jsx(DateOptionRow, { option: customDateOption }) })] }) })] }), _jsx(Dialog, { open: pickerOpen, onOpenChange: setPickerOpen, children: _jsxs(DialogContent, { className: "flex w-auto max-w-[calc(100vw-2rem)] flex-col gap-0 overflow-hidden sm:max-w-none", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Pick a date" }) }), _jsx("div", { className: "py-3", children: _jsx(Calendar, { mode: "single", selected: draftDate, onSelect: setDraftDate, defaultMonth: draftDate ?? today, numberOfMonths: 2, pagedNavigation: true, showOutsideDays: false }) }), _jsxs(DialogFooter, { children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", size: "sm", children: "Dismiss" }) }), _jsx(Button, { size: "sm", onClick: handleConfirmCustomDate, disabled: !draftDate, children: "Confirm" })] })] }) })] }));
}
export default function Pattern() {
    const [startDate, setStartDate] = React.useState(null);
    return (_jsx(Field, { className: "max-w-xs", children: _jsx(DateSelectionCombobox, { value: startDate, onValueChange: setStartDate }) }));
}
