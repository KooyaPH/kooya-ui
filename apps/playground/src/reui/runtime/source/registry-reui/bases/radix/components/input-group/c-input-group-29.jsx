"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [category, setCategory] = useState("Category");
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(InputGroup, { className: "rounded-full", children: [_jsx(InputGroupInput, { placeholder: "Search products", className: "rounded-full px-5" }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(InputGroupButton, { variant: "ghost", className: "h-7 rounded-full px-3 text-xs", children: [category, _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "ml-1 size-3.5 opacity-60" })] }) }), _jsxs(DropdownMenuContent, { align: "end", className: "min-w-32", children: [_jsx(DropdownMenuItem, { onClick: () => setCategory("Electronics"), children: "Electronics" }), _jsx(DropdownMenuItem, { onClick: () => setCategory("Clothing"), children: "Clothing" }), _jsx(DropdownMenuItem, { onClick: () => setCategory("Home"), children: "Home" })] })] }) })] }) }));
}
