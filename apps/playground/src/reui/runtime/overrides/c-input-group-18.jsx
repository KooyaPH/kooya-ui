// Owned responsive correction to the actual attributed REUI recipe.
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../adapters/menus";
import { Field } from "../../adapters/layout";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea, } from "../../adapters/layout";
import { Kbd } from "../../code/supporting/registry/bases/radix/ui/kbd";
import { IconPlaceholder } from "../../adapters/icons";
export default function Pattern() {
    const [model, setModel] = useState("GPT-4o");
    return (_jsx(Field, { className: "max-w-xs", style: { width: "100%", maxWidth: 320, minWidth: 0 }, children: _jsxs(InputGroup, { children: [_jsx(InputGroupTextarea, { "aria-label": "Message", placeholder: "Ask AI anything...", className: "min-h-24 pb-12" }), _jsxs(InputGroupAddon, { align: "block-end", style: { flexWrap: "wrap", gap: 8, minWidth: 0 }, children: [_jsxs("div", { className: "flex items-center gap-1", style: { flexWrap: "wrap", flex: "1 1 240px", minWidth: 0 }, children: [_jsx(InputGroupButton, { variant: "ghost", size: "icon-xs", "aria-label": "Add", children: _jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", className: "size-4" }) }), _jsx(InputGroupButton, { variant: "ghost", size: "icon-xs", "aria-label": "Voice input", children: _jsx(IconPlaceholder, { lucide: "MicIcon", tabler: "IconMicrophone", hugeicons: "Mic02Icon", phosphor: "MicrophoneIcon", remixicon: "RiMicLine", className: "size-4" }) }), _jsxs(InputGroupButton, { variant: "ghost", className: "h-7 px-2 text-xs", children: [_jsx(IconPlaceholder, { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe02Icon", phosphor: "GlobeSimpleIcon", remixicon: "RiGlobalLine", className: "mr-1 size-3.5" }), "Search"] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(InputGroupButton, { variant: "ghost", className: "h-7 px-2 text-xs", "aria-label": `Select AI model: ${model}`, style: {
                                                    maxWidth: "100%",
                                                    whiteSpace: "normal",
                                                    height: "auto",
                                                    minHeight: "var(--ant-control-height)",
                                                }, children: [_jsx(Kbd, { className: "border-border rounded-sm border", children: "\u03A3" }), model, _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "ml-1 size-3.5 opacity-60" })] }) }), _jsxs(DropdownMenuContent, { align: "start", className: "min-w-32", children: [_jsx(DropdownMenuItem, { onClick: () => setModel("GPT-4o"), children: "GPT-4o" }), _jsx(DropdownMenuItem, { onClick: () => setModel("GPT-4"), children: "GPT-4" }), _jsx(DropdownMenuItem, { onClick: () => setModel("Claude 3.5"), children: "Claude 3.5" })] })] })] }), _jsx(InputGroupButton, { variant: "default", size: "icon-xs", "aria-label": "Send message", className: "ml-auto", children: _jsx(IconPlaceholder, { lucide: "ArrowUpIcon", tabler: "IconArrowUp", hugeicons: "ArrowUp02Icon", phosphor: "ArrowUpIcon", remixicon: "RiArrowUpLine", className: "size-4" }) })] })] }) }));
}
