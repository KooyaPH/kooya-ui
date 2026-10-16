"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const httpMethodColors = {
    GET: "text-emerald-600 dark:text-emerald-400",
    POST: "text-blue-500",
    PUT: "text-amber-500",
    PATCH: "text-violet-500",
    DELETE: "text-destructive",
};
const httpMethods = Object.keys(httpMethodColors);
export default function Pattern() {
    const [method, setMethod] = useState("GET");
    return (_jsx(Field, { className: "max-w-md", children: _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(InputGroupButton, { variant: "ghost", className: cn("gap-1.5 font-mono text-xs", httpMethodColors[method]), "aria-label": `HTTP method: ${method}`, children: [method, _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "size-3 opacity-60", "aria-hidden": "true" })] }) }), _jsx(DropdownMenuContent, { align: "start", className: "w-28", children: _jsx(DropdownMenuGroup, { children: httpMethods.map((item) => (_jsx(DropdownMenuItem, { className: cn("font-mono text-xs font-semibold", httpMethodColors[item]), onSelect: () => setMethod(item), children: item }, item))) }) })] }) }), _jsx(InputGroupInput, { defaultValue: "/v1/agents/run", className: "font-mono text-xs", "aria-label": "API endpoint path" }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsx(InputGroupButton, { size: "xs", "aria-label": "Send request", children: "Send" }) })] }) }));
}
