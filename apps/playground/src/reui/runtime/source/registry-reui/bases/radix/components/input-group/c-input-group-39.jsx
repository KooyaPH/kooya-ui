"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const statuses = ["Active", "Lead", "Prospect"];
const statusCounts = {
    Active: 12,
    Lead: 7,
    Prospect: 5,
};
export default function Pattern() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    return (_jsx(Field, { className: "max-w-sm", children: _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { align: "inline-start", children: _jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine", "aria-hidden": "true" }) }), _jsx(InputGroupInput, { placeholder: "Search contacts...", value: searchQuery, onChange: (event) => setSearchQuery(event.target.value) }), _jsxs(InputGroupAddon, { align: "inline-end", className: "gap-1", children: [searchQuery.length > 0 ? (_jsx(InputGroupButton, { "aria-label": "Clear search", size: "icon-xs", variant: "ghost", onClick: () => setSearchQuery(""), children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", "aria-hidden": "true" }) })) : null, _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(InputGroupButton, { variant: "ghost", size: "xs", className: "gap-1.5", "aria-label": "Filter contacts", children: [_jsx(IconPlaceholder, { lucide: "ListFilterIcon", tabler: "IconFilter", hugeicons: "FilterIcon", phosphor: "FunnelIcon", remixicon: "RiFilterLine", className: "size-3.5", "aria-hidden": "true" }), selectedStatuses.length > 0 ? (_jsx("span", { className: "tabular-nums", children: selectedStatuses.length })) : ("Status")] }) }), _jsx(PopoverContent, { align: "end", className: "w-44 p-3", children: _jsx("div", { className: "flex flex-col gap-2", children: statuses.map((status) => (_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(Checkbox, { id: `contact-status-${status}`, checked: selectedStatuses.includes(status), onCheckedChange: () => setSelectedStatuses((previous) => previous.includes(status)
                                                        ? previous.filter((item) => item !== status)
                                                        : [...previous, status]) }), _jsxs(Label, { htmlFor: `contact-status-${status}`, className: "flex grow items-center justify-between gap-1.5 font-normal", children: [status, _jsx("span", { className: "text-muted-foreground text-xs", children: statusCounts[status] })] })] }, status))) }) })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(InputGroupButton, { variant: "ghost", size: "icon-xs", "aria-label": "More actions", children: _jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine", "aria-hidden": "true" }) }) }), _jsx(DropdownMenuContent, { align: "end", className: "w-36", children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuItem, { children: "Bulk email" }), _jsx(DropdownMenuItem, { children: "Export CSV" }), _jsx(DropdownMenuItem, { children: "Add contact" })] }) })] })] })] }) }));
}
