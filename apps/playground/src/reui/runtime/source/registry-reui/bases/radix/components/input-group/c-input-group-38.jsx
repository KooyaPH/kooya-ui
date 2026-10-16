"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const regions = ["Global", "United States", "Europe", "APAC"];
export default function Pattern() {
    const [searchQuery, setSearchQuery] = useState("");
    const [region, setRegion] = useState(regions[0]);
    return (_jsx(Field, { className: "max-w-sm", children: _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { align: "inline-start", children: _jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine", "aria-hidden": "true" }) }), _jsx(InputGroupInput, { placeholder: "Search companies...", value: searchQuery, onChange: (event) => setSearchQuery(event.target.value) }), _jsxs(InputGroupAddon, { align: "inline-end", className: "gap-1", children: [searchQuery.length > 0 ? (_jsx(InputGroupButton, { "aria-label": "Clear search", size: "icon-xs", variant: "ghost", onClick: () => setSearchQuery(""), children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", "aria-hidden": "true" }) })) : null, _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(InputGroupButton, { variant: "ghost", size: "xs", className: "gap-1.5", "aria-label": "Select region", children: [_jsx(IconPlaceholder, { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe01Icon", phosphor: "GlobeIcon", remixicon: "RiGlobalLine", className: "size-3.5", "aria-hidden": "true" }), region, _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "size-3 opacity-60", "aria-hidden": "true" })] }) }), _jsx(DropdownMenuContent, { align: "end", className: "w-32", children: _jsx(DropdownMenuGroup, { children: regions.map((item) => (_jsx(DropdownMenuItem, { onSelect: () => setRegion(item), children: item }, item))) }) })] })] })] }) }));
}
