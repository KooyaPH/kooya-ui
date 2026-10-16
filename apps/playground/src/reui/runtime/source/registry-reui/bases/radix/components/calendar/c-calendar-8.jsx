"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
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
    return (_jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsx(Calendar, { captionLayout: "dropdown", classNames: {
                    month_caption: "mx-0",
                }, components: {
                    Dropdown: (props) => {
                        return (_jsxs(Select, { onValueChange: (value) => {
                                if (props.onChange && value !== null) {
                                    handleCalendarChange(value, props.onChange);
                                }
                            }, value: String(props.value), children: [_jsx(SelectTrigger, { className: "first:grow", children: _jsx(SelectValue, { children: props.options?.find((option) => option.value === props.value)?.label }) }), _jsx(SelectContent, { align: "start", children: props.options?.map((option) => (_jsx(SelectItem, { disabled: option.disabled, value: String(option.value), children: option.label }, option.value))) })] }));
                    },
                    DropdownNav: (props) => {
                        return (_jsx("div", { className: "flex w-full items-center gap-2", children: props.children }));
                    },
                }, defaultMonth: new Date(), hideNavigation: true, mode: "single", onSelect: setDate, selected: date, startMonth: new Date(1980, 6) }) }) }));
}
