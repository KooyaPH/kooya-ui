"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, } from "../../../../../registry/bases/radix/ui/combobox.jsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];
export default function Pattern() {
    const [value, setValue] = useState(null);
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Combobox, { value: value, onValueChange: setValue, items: frameworks, children: [_jsx(ComboboxInput, { placeholder: "Select framework", showTrigger: false, showClear: true, children: !value && (_jsx(ComboboxPrimitive.Trigger, { "data-slot": "combobox-trigger", children: _jsx(IconPlaceholder, { lucide: "ChevronsUpDownIcon", tabler: "IconSelector", hugeicons: "UnfoldMoreIcon", phosphor: "CaretUpDownIcon", remixicon: "RiExpandUpDownLine", className: "text-muted-foreground pointer-events-none size-4" }) })) }), _jsxs(ComboboxContent, { children: [_jsx(ComboboxEmpty, { children: "No items found." }), _jsx(ComboboxList, { children: (item) => (_jsx(ComboboxItem, { value: item, children: item }, item)) })] })] }) }));
}
