"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const stages = ["Lead", "Qualified", "Proposal", "Negotiation", "Closed Won"];
const icons = {
    prev: (_jsx(IconPlaceholder, { lucide: "ChevronLeftIcon", tabler: "IconChevronLeft", hugeicons: "ArrowLeft01Icon", phosphor: "CaretLeftIcon", remixicon: "RiArrowLeftSLine", "aria-hidden": "true" })),
    next: (_jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", "aria-hidden": "true" })),
    chevronsUpDown: (_jsx(IconPlaceholder, { lucide: "ChevronsUpDownIcon", tabler: "IconSelector", hugeicons: "ArrowUpDown02Icon", phosphor: "CaretUpDownIcon", remixicon: "RiExpandUpDownLine", "aria-hidden": "true", className: "size-3.5 shrink-0 opacity-50" })),
    check: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", "aria-hidden": "true", className: "text-primary ml-auto size-3.5" })),
};
export default function Pattern() {
    const [stageIndex, setStageIndex] = useState(2);
    return (_jsxs(ButtonGroup, { children: [_jsx(Button, { variant: "outline", size: "icon", "aria-label": "Previous stage", disabled: stageIndex === 0, onClick: () => setStageIndex((i) => i - 1), children: icons.prev }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "min-w-36 justify-between", children: [_jsx("span", { className: "truncate", children: stages[stageIndex] }), icons.chevronsUpDown] }) }), _jsx(DropdownMenuContent, { className: "w-44", children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "Jump to stage" }), stages.map((stage, i) => (_jsxs(DropdownMenuItem, { onClick: () => setStageIndex(i), children: [stage, i === stageIndex ? icons.check : null] }, stage)))] }) })] }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Next stage", disabled: stageIndex === stages.length - 1, onClick: () => setStageIndex((i) => i + 1), children: icons.next })] }));
}
