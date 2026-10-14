"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "cn";
import { Button } from "../../../../../../adapters/controls.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../adapters/icons.tsx";
const Combobox = ComboboxPrimitive.Root;
function ComboboxValue({ ...props }) {
    return _jsx(ComboboxPrimitive.Value, { "data-slot": "combobox-value", ...props });
}
function ComboboxTrigger({ className, children, ...props }) {
    return (_jsxs(ComboboxPrimitive.Trigger, { "data-slot": "combobox-trigger", className: cn("cn-combobox-trigger", className), ...props, children: [children, _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "cn-combobox-trigger-icon pointer-events-none" })] }));
}
function ComboboxClear({ className, ...props }) {
    return (_jsx(ComboboxPrimitive.Clear, { "data-slot": "combobox-clear", render: _jsx(InputGroupButton, { variant: "ghost", size: "icon-xs" }), className: cn("cn-combobox-clear", className), ...props, children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "cn-combobox-clear-icon pointer-events-none" }) }));
}
function ComboboxInput({ className, children, disabled = false, showTrigger = true, showClear = false, ...props }) {
    return (_jsxs(InputGroup, { className: cn("cn-combobox-input w-auto", className), children: [_jsx(ComboboxPrimitive.Input, { render: _jsx(InputGroupInput, { disabled: disabled }), ...props }), _jsxs(InputGroupAddon, { align: "inline-end", children: [showTrigger && (_jsx(InputGroupButton, { size: "icon-xs", variant: "ghost", asChild: true, "data-slot": "input-group-button", className: "group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent", disabled: disabled, children: _jsx(ComboboxTrigger, {}) })), showClear && _jsx(ComboboxClear, { disabled: disabled })] }), children] }));
}
function ComboboxContent({ className, side = "bottom", sideOffset = 6, align = "start", alignOffset = 0, anchor, ...props }) {
    return (_jsx(ComboboxPrimitive.Portal, { children: _jsx(ComboboxPrimitive.Positioner, { side: side, sideOffset: sideOffset, align: align, alignOffset: alignOffset, anchor: anchor, className: "isolate z-50", children: _jsx(ComboboxPrimitive.Popup, { "data-slot": "combobox-content", "data-chips": !!anchor, className: cn("cn-combobox-content cn-combobox-content-logical cn-menu-target cn-menu-translucent group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) data-[chips=true]:min-w-(--anchor-width)", className), ...props }) }) }));
}
function ComboboxList({ className, ...props }) {
    return (_jsx(ComboboxPrimitive.List, { "data-slot": "combobox-list", className: cn("cn-combobox-list overflow-y-auto overscroll-contain", className), ...props }));
}
function ComboboxItem({ className, children, ...props }) {
    return (_jsxs(ComboboxPrimitive.Item, { "data-slot": "combobox-item", className: cn("cn-combobox-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), ...props, children: [children, _jsx(ComboboxPrimitive.ItemIndicator, { render: _jsx("span", { className: "cn-combobox-item-indicator" }), children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "cn-combobox-item-indicator-icon pointer-events-none" }) })] }));
}
function ComboboxGroup({ className, ...props }) {
    return (_jsx(ComboboxPrimitive.Group, { "data-slot": "combobox-group", className: cn("cn-combobox-group", className), ...props }));
}
function ComboboxLabel({ className, ...props }) {
    return (_jsx(ComboboxPrimitive.GroupLabel, { "data-slot": "combobox-label", className: cn("cn-combobox-label", className), ...props }));
}
function ComboboxCollection({ ...props }) {
    return (_jsx(ComboboxPrimitive.Collection, { "data-slot": "combobox-collection", ...props }));
}
function ComboboxEmpty({ className, ...props }) {
    return (_jsx(ComboboxPrimitive.Empty, { "data-slot": "combobox-empty", className: cn("cn-combobox-empty", className), ...props }));
}
function ComboboxSeparator({ className, ...props }) {
    return (_jsx(ComboboxPrimitive.Separator, { "data-slot": "combobox-separator", className: cn("cn-combobox-separator", className), ...props }));
}
function ComboboxChips({ className, ...props }) {
    return (_jsx(ComboboxPrimitive.Chips, { "data-slot": "combobox-chips", className: cn("cn-combobox-chips", className), ...props }));
}
function ComboboxChip({ className, children, showRemove = true, ...props }) {
    return (_jsxs(ComboboxPrimitive.Chip, { "data-slot": "combobox-chip", className: cn("cn-combobox-chip has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50", className), ...props, children: [children, showRemove && (_jsx(ComboboxPrimitive.ChipRemove, { render: _jsx(Button, { variant: "ghost", size: "icon-xs" }), className: "cn-combobox-chip-remove", "data-slot": "combobox-chip-remove", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "cn-combobox-chip-indicator-icon pointer-events-none" }) }))] }));
}
function ComboboxChipsInput({ className, ...props }) {
    return (_jsx(ComboboxPrimitive.Input, { "data-slot": "combobox-chip-input", className: cn("cn-combobox-chip-input min-w-16 flex-1 outline-none", className), ...props }));
}
function useComboboxAnchor() {
    return React.useRef(null);
}
export { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxGroup, ComboboxLabel, ComboboxCollection, ComboboxEmpty, ComboboxSeparator, ComboboxChips, ComboboxChip, ComboboxChipsInput, ComboboxTrigger, ComboboxValue, useComboboxAnchor, };
