"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [country, setCountry] = useState("+1");
    return (_jsx(Field, { className: "w-full max-w-xs", children: _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(InputGroupButton, { variant: "ghost", children: [_jsx("span", { className: "tabular-nums", children: country }), _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine" })] }) }), _jsxs(DropdownMenuContent, { align: "start", className: "min-w-24", children: [_jsx(DropdownMenuItem, { onClick: () => setCountry("+1"), children: "+1 (US)" }), _jsx(DropdownMenuItem, { onClick: () => setCountry("+44"), children: "+44 (UK)" }), _jsx(DropdownMenuItem, { onClick: () => setCountry("+61"), children: "+61 (AU)" })] })] }) }), _jsx(InputGroupInput, { type: "tel", placeholder: "123 456 7890" })] }) }));
}
