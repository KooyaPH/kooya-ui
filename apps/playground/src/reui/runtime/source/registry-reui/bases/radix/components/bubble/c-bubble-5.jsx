"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "../../../../../../../adapters/navigation.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// Only the remainder goes in the panel, so nothing is duplicated and the
// collapsed height is a real first paragraph rather than a sliced string with
// an ellipsis glued on the end.
const lead = "Checkout slowed down at 21:40 because the connection pool hit its ceiling and every new request queued behind one that was already running.";
const rest = [
    "The payments worker had retried a batch of 1,200 webhook deliveries after a processor timeout, and each retry opened a connection of its own.",
    "We raised the pool to 60 and capped the worker at 8 concurrent deliveries. The p95 was back under 400ms four minutes later.",
    "The follow up is a backoff on that worker, so a single processor timeout cannot turn into a retry storm again.",
];
export default function Pattern() {
    const [open, setOpen] = useState(false);
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-4", children: [_jsx(Bubble, { variant: "default", align: "end", children: _jsx(BubbleContent, { children: "Why did checkout slow down last night?" }) }), _jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: _jsx(Collapsible, { open: open, onOpenChange: setOpen, children: _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("p", { children: lead }), _jsx(CollapsibleContent, { children: _jsx("div", { className: "flex flex-col gap-2", children: rest.map((paragraph) => (_jsx("p", { children: paragraph }, paragraph))) }) }), _jsx(CollapsibleTrigger, { asChild: true, children: _jsxs(Button, { variant: "link", size: "sm", className: "w-fit px-0", children: [open ? "Show less" : "Show more", _jsx("span", { "data-open": open, className: "inline-flex transition-transform data-[open=true]:rotate-180", children: _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", "aria-hidden": "true", className: "size-4" }) })] }) })] }) }) }) })] }));
}
