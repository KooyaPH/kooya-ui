"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [position, setPosition] = useState("bottom");
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "w-fit", children: "Radio Group" }) }), _jsx(DropdownMenuContent, { children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "Panel Position" }), _jsxs(DropdownMenuRadioGroup, { value: position, onValueChange: setPosition, children: [_jsxs(DropdownMenuRadioItem, { value: "top", children: [_jsx(IconPlaceholder, { lucide: "ArrowUpIcon", tabler: "IconArrowUp", hugeicons: "ArrowUp02Icon", phosphor: "ArrowUpIcon", remixicon: "RiArrowUpLine" }), "Top"] }), _jsxs(DropdownMenuRadioItem, { value: "bottom", children: [_jsx(IconPlaceholder, { lucide: "ArrowDownIcon", tabler: "IconArrowDown", hugeicons: "ArrowDown02Icon", phosphor: "ArrowDownIcon", remixicon: "RiArrowDownLine" }), "Bottom"] }), _jsxs(DropdownMenuRadioItem, { value: "right", disabled: true, children: [_jsx(IconPlaceholder, { lucide: "ArrowRightIcon", tabler: "IconArrowRight", hugeicons: "ArrowRight02Icon", phosphor: "ArrowRightIcon", remixicon: "RiArrowRightLine" }), "Right"] })] })] }) })] }) }));
}
