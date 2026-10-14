"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Bubble, BubbleContent, BubbleReactions, } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const [reacted, setReacted] = useState(false);
    // Derived during render, never mirrored into a second piece of state.
    const cheers = reacted ? 4 : 3;
    return (
    // The pill rings itself in the card colour, so these bubbles sit on a Card.
    // On the raw page background that ring reads as a lighter halo in dark.
    _jsx(Card, { className: "w-full max-w-sm", children: _jsxs(CardContent, { className: "flex flex-col gap-8", children: [_jsxs(Bubble, { variant: "secondary", children: [_jsx(BubbleContent, { children: "The new empty state shipped behind the flag." }), _jsxs(BubbleReactions, { role: "img", "aria-label": "Reactions: thumbs up, party popper, and 2 more", children: [_jsx("span", { children: "\uD83D\uDC4D" }), _jsx("span", { children: "\uD83C\uDF89" }), _jsx("span", { children: "+2" })] })] }), _jsxs(Bubble, { variant: "default", align: "end", children: [_jsx(BubbleContent, { children: "Rolling it out to the beta workspaces now." }), _jsx(BubbleReactions, { align: "start", children: _jsxs(Button, { variant: "ghost", size: "xs", className: "hover:bg-foreground/10 dark:hover:bg-foreground/15 rounded-[inherit]", "aria-pressed": reacted, "aria-label": `React with a party popper, ${cheers} so far`, onClick: () => setReacted((value) => !value), children: [_jsx("span", { "aria-hidden": "true", children: "\uD83C\uDF89" }), _jsx("span", { className: "group-aria-pressed/button:text-primary tabular-nums", children: cheers })] }) })] }), _jsxs(Bubble, { variant: "muted", children: [_jsx(BubbleContent, { children: "Docs update is queued for tomorrow." }), _jsx(BubbleReactions, { side: "top", align: "start", role: "img", "aria-label": "Reaction: eyes", children: _jsx("span", { children: "\uD83D\uDC40" }) })] })] }) }));
}
