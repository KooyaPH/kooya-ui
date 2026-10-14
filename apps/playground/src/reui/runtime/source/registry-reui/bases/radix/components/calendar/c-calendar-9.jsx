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
    return (_jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsx(Calendar, { captionLayout: "dropdown-years", classNames: {
                    nav: "flex items-center w-full absolute top-0 inset-x-0 justify-between pointer-events-none [&>button]:pointer-events-auto",
                }, components: {
                    DropdownNav: (props) => {
                        return (_jsx("div", { className: "flex w-full items-center justify-center gap-3 [&>span]:text-sm [&>span]:font-medium", children: props.children }));
                    },
                    YearsDropdown: (props) => {
                        return (_jsxs(Select, { onValueChange: (value) => {
                                if (value == null || !props.onChange) {
                                    return;
                                }
                                handleCalendarChange(value, props.onChange);
                            }, value: String(props.value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: props.options?.map((option) => (_jsx(SelectItem, { disabled: option.disabled, value: String(option.value), children: option.label }, option.value))) })] }));
                    },
                }, defaultMonth: new Date(), mode: "single", onSelect: setDate, selected: date, startMonth: new Date(1980, 6) }) }) }));
}
