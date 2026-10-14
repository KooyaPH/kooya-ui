"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Bubble, BubbleContent, BubbleGroup, } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// Each pickable option carries the answer it earns. One confirmation string
// shared by both would contradict whichever option it was not written for, and
// the two here ask for opposite things.
const options = [
    {
        id: "retry",
        label: "Retry both invoices now",
        reply: "Queued again. INV-4417 and INV-4419 go out on the next run.",
    },
    {
        id: "hold",
        label: "Hold them until I check the addresses",
        reply: "Held. Neither invoice sends until you confirm the addresses.",
    },
    { id: "log", label: "Open the failed invoice log", href: "#" },
];
export default function Pattern() {
    const [picked, setPicked] = useState(null);
    const chosen = options.find((option) => option.id === picked);
    return (_jsx(Card, { className: "w-full max-w-sm", children: _jsxs(CardContent, { className: "flex flex-col gap-4", children: [_jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: "Two invoices failed to send last night. What do you want to do?" }) }), chosen ? (_jsxs(_Fragment, { children: [_jsx(Bubble, { align: "end", children: _jsx(BubbleContent, { children: chosen.label }) }), _jsx(Bubble, { variant: "outline", className: "max-w-full", children: _jsxs(BubbleContent, { children: [chosen.reply, _jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [_jsx(Button, { size: "sm", children: "Check addresses" }), _jsx(Button, { variant: "outline", size: "sm", children: "Notify the owner" })] })] }) })] })) : (_jsx(BubbleGroup, { children: options.map((option) => option.href ? (_jsx(Bubble, { variant: "tinted", align: "end", children: _jsx(BubbleContent, { asChild: true, children: _jsxs("a", { href: option.href, children: [option.label, _jsx(IconPlaceholder, { lucide: "ArrowUpRightIcon", tabler: "IconArrowUpRight", hugeicons: "ArrowUpRight01Icon", phosphor: "ArrowUpRightIcon", remixicon: "RiArrowRightUpLine", "aria-hidden": "true", className: "ms-1 inline size-4 align-text-bottom" })] }) }) }, option.id)) : (_jsx(Bubble, { variant: "tinted", align: "end", children: _jsx(BubbleContent, { asChild: true, children: _jsx("button", { type: "button", onClick: () => setPicked(option.id), children: option.label }) }) }, option.id))) }))] }) }));
}
