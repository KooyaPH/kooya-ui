"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const statuses = ["Pending", "Shipped", "Cancelled"];
function toggleStatus(values, value) {
    return values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value];
}
export default function Pattern() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    return (_jsx(Field, { className: "max-w-sm", children: _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { align: "inline-start", children: _jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine", "aria-hidden": "true" }) }), _jsx(InputGroupInput, { placeholder: "Search orders...", value: searchQuery, onChange: (event) => setSearchQuery(event.target.value) }), _jsxs(InputGroupAddon, { align: "inline-end", className: "gap-1", children: [searchQuery.length > 0 ? (_jsx(InputGroupButton, { "aria-label": "Clear search", size: "icon-xs", variant: "ghost", onClick: () => setSearchQuery(""), children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", "aria-hidden": "true" }) })) : null, _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(InputGroupButton, { variant: "ghost", size: "xs", className: "gap-1.5", "aria-label": "Filter order status", children: [_jsx(IconPlaceholder, { lucide: "ListFilterIcon", tabler: "IconFilter", hugeicons: "FilterIcon", phosphor: "FunnelIcon", remixicon: "RiFilterLine", className: "size-3.5", "aria-hidden": "true" }), "Status", selectedStatuses.length > 0 ? (_jsx("span", { className: "text-muted-foreground tabular-nums", children: selectedStatuses.length })) : null] }) }), _jsx(PopoverContent, { align: "end", className: "w-40 p-3", children: _jsx("div", { className: "flex flex-col gap-2", children: statuses.map((status) => (_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(Checkbox, { id: `order-status-${status}`, checked: selectedStatuses.includes(status), onCheckedChange: () => setSelectedStatuses((previous) => toggleStatus(previous, status)) }), _jsx(Label, { htmlFor: `order-status-${status}`, className: "text-sm font-normal", children: status })] }, status))) }) })] })] })] }) }));
}
