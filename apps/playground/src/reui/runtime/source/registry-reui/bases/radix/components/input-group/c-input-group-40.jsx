"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const visibilityOptions = ["Private", "Team", "Public"];
export default function Pattern() {
    const [visibility, setVisibility] = useState(visibilityOptions[0]);
    return (_jsx(Field, { className: "max-w-sm", children: _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { align: "inline-start", children: _jsx(IconPlaceholder, { lucide: "LinkIcon", tabler: "IconLink", hugeicons: "Link01Icon", phosphor: "LinkIcon", remixicon: "RiLinkM", className: "size-4 opacity-60", "aria-hidden": "true" }) }), _jsx(InputGroupInput, { defaultValue: "agentflow.ai/runbooks/q2-review", "aria-label": "Share link" }), _jsxs(InputGroupAddon, { align: "inline-end", className: "gap-1", children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(InputGroupButton, { variant: "ghost", size: "xs", className: "gap-1.5", "aria-label": "Select visibility", children: [visibility, _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "size-3 opacity-60", "aria-hidden": "true" })] }) }), _jsx(DropdownMenuContent, { align: "end", className: "w-28", children: _jsx(DropdownMenuGroup, { children: visibilityOptions.map((item) => (_jsx(DropdownMenuItem, { onSelect: () => setVisibility(item), children: item }, item))) }) })] }), _jsx(InputGroupButton, { variant: "ghost", size: "icon-xs", "aria-label": "Copy link", children: _jsx(IconPlaceholder, { lucide: "CopyIcon", tabler: "IconCopy", hugeicons: "CopyIcon", phosphor: "CopyIcon", remixicon: "RiFileCopyLine", "aria-hidden": "true" }) })] })] }) }));
}
