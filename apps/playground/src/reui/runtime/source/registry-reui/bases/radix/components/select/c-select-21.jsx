"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const frameworks = [
    { value: "next", label: "Next.js" },
    { value: "svelte", label: "SvelteKit" },
    { value: "nuxt", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
];
export default function Pattern() {
    const [value, setValue] = useState("");
    const handleClear = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setValue("");
    };
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { value: value, onValueChange: setValue, children: [_jsxs(SelectTrigger, { className: cn(value !== "" && "[&>svg:last-child]:hidden!"), children: [_jsx(SelectValue, { placeholder: "Select framework" }), value !== "" ? (_jsxs("div", { role: "button", tabIndex: -1, onClick: handleClear, onPointerDown: (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }, className: "text-muted-foreground hover:text-foreground flex size-4 items-center justify-center rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none", children: [_jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "size-4" }), _jsx("span", { className: "sr-only", children: "Clear selection" })] })) : null] }), _jsx(SelectContent, { position: "popper", children: frameworks.map((framework) => (_jsx(SelectItem, { value: framework.value, children: framework.label }, framework.value))) })] }, value || "__empty__") }));
}
