"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup, ButtonGroupSeparator, } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { className: "**:data-[slot=button]:border-x-0", children: [_jsx(Button, { variant: "default", children: "Save" }), _jsx(ButtonGroupSeparator, { className: "bg-primary-foreground/10" }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "default", size: "icon", "aria-label": "More options", children: _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", "aria-hidden": "true" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-40", children: [_jsx(DropdownMenuItem, { children: "Save and publish" }), _jsx(DropdownMenuItem, { children: "Save as draft" }), _jsx(DropdownMenuItem, { children: "Save and exit" })] })] })] }));
}
