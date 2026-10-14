// Owned responsive correction to the actual attributed REUI recipe.
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
// @ts-expect-error attributed generated REUI module has no declaration file
import { Calendar } from "../source/registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../adapters/layout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../adapters/selection";
export default function Pattern() {
    const [date, setDate] = useState(new Date());
    const handleCalendarChange = (_value, _e) => {
        const _event = {
            target: {
                value: String(_value),
            },
        };
        _e(_event);
    };
    return (_jsx(Card, { className: "p-0", style: { width: "fit-content", maxWidth: "100%" }, children: _jsx(CardContent, { className: "p-0", children: _jsx(Calendar, { captionLayout: "dropdown", className: "[&_.rdp-day_button[data-selected-single=true]]:bg-[var(--ku-accent)]! [&_.rdp-day_button[data-selected-single=true]]:text-[var(--ku-accent-ink)]! [&_.rdp-day_button[data-selected-single=true]]:border! [&_.rdp-day_button[data-selected-single=true]]:border-[var(--ku-focus)]! [&_.rdp-today:not([data-selected=true])]:bg-[var(--ku-subtle)]! [&_.rdp-today:not([data-selected=true])_.rdp-day_button]:text-[var(--ku-ink)]! [&_.rdp-weekday]:text-[var(--ku-muted)]! [&_.rdp-week>th>span]:text-[var(--ku-muted)]!", classNames: {
                    month_caption: "mx-0",
                }, components: {
                    Dropdown: (props) => {
                        return (_jsxs(Select, { onValueChange: (value) => {
                                if (props.onChange && value !== null) {
                                    handleCalendarChange(value, props.onChange);
                                }
                            }, value: String(props.value), children: [_jsx(SelectTrigger, { "aria-label": props["aria-label"], disabled: props.disabled, style: { flex: 1, minWidth: 0 }, className: "first:grow", children: _jsx(SelectValue, { children: props.options?.find((option) => option.value === props.value)?.label }) }), _jsx(SelectContent, { align: "start", children: props.options?.map((option) => (_jsx(SelectItem, { disabled: option.disabled, value: String(option.value), children: option.label }, option.value))) })] }));
                    },
                    DropdownNav: (props) => {
                        return (_jsx("div", { className: "flex w-full items-center gap-2", children: props.children }));
                    },
                }, defaultMonth: new Date(), hideNavigation: true, mode: "single", onSelect: setDate, selected: date, startMonth: new Date(1980, 6) }) }) }));
}
