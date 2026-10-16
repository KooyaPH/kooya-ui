"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Marker, MarkerContent } from "../../../../../registry/bases/radix/ui/marker.jsx";
import { Message, MessageContent } from "../../../../../registry/bases/radix/ui/message.jsx";
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport, } from "../../../../../registry/bases/radix/ui/message-scroller.jsx";
import { Tabs, TabsList, TabsTrigger } from "../../../../../../../adapters/selection.tsx";
const POSITIONS = ["start", "end", "last-anchor"];
/*
 * The closing exchange is deliberately taller than the frame. When the last
 * turn fits, end and last-anchor resolve to the same place and the difference
 * between the two options is invisible.
 */
const TURNS = [
    {
        id: "th_2m6r7d_1",
        role: "user",
        text: "Churn is up for the second month running. Where is it concentrated?",
    },
    {
        id: "th_2m6r7d_2",
        role: "assistant",
        text: "Almost all of it is on the starter tier, and almost all of that is inside the first 30 days.\n\nGrowth and scale are flat within noise, so nothing here points at a pricing problem on the paid tiers.",
    },
    {
        id: "th_2m6r7d_3",
        role: "user",
        text: "Is it the same accounts every month?",
    },
    {
        id: "th_2m6r7d_4",
        role: "assistant",
        text: "No. The starter cohort turns over completely, which makes this a first month experience problem rather than a slow leak.\n\nAccounts that survive month one behave like every other cohort we have measured.",
    },
    {
        id: "th_2m6r7d_5",
        role: "user",
        text: "What do the ones who leave do before they go?",
    },
    {
        id: "th_2m6r7d_6",
        role: "assistant",
        text: "They create a workspace, import once, and never invite anyone.\n\nA second seat is the strongest single predictor we have. Accounts that add one in the first week churn at about a third of the rate.",
    },
    {
        id: "th_2m6r7d_7",
        role: "user",
        text: "Give me the full breakdown so I can take it into the pricing review.",
    },
    {
        id: "th_2m6r7d_8",
        role: "assistant",
        text: "Starter is 84 percent of cancellations and 11 percent of revenue, so the revenue impact is much smaller than the count suggests. Median tenure before cancelling is 19 days.\n\nGrowth is 9 percent of cancellations and 38 percent of revenue, with a median tenure over 11 months, and most of those are consolidations onto one annual plan rather than losses. Scale is the remaining 7 percent, all contract driven and all known in advance.\n\nThe recommendation is to stop reading this as one number. Starter churn is an activation problem and belongs to onboarding, growth churn is a plan shape problem, and scale churn is a renewal conversation that already has an owner.",
    },
];
export default function Pattern() {
    const [position, setPosition] = useState("last-anchor");
    return (_jsxs(Card, { className: "h-120 w-full max-w-2xl gap-0 overflow-hidden py-0", children: [_jsxs(CardHeader, { className: "shrink-0 border-b py-4", children: [_jsx(CardTitle, { children: "Churn by plan tier" }), _jsx(CardDescription, { children: "Reopened 3 days later" })] }), _jsx(CardContent, { className: "min-h-0 flex-1 p-0", children: _jsx(MessageScrollerProvider, { defaultScrollPosition: position, children: _jsxs(MessageScroller, { children: [_jsx(MessageScrollerViewport, { "aria-label": "Saved thread transcript", children: _jsxs(MessageScrollerContent, { className: "gap-5 p-(--card-spacing)", children: [_jsx(MessageScrollerItem, { scrollAnchor: false, children: _jsx(Marker, { variant: "separator", children: _jsx(MarkerContent, { children: "Tuesday" }) }) }), TURNS.map((turn) => {
                                            const isUser = turn.role === "user";
                                            return (
                                            /*
                                             * last-anchor keys on scrollAnchor, not on the role. With
                                             * no anchor in the tree, or when the last turn already fits
                                             * the viewport, it falls back to end.
                                             */
                                            _jsx(MessageScrollerItem, { messageId: turn.id, scrollAnchor: isUser, children: _jsx(Message, { align: isUser ? "end" : "start", children: _jsx(MessageContent, { children: _jsx(Bubble, { variant: isUser ? "muted" : "ghost", align: isUser ? "end" : "start", children: _jsx(BubbleContent, { className: "space-y-2", children: turn.text
                                                                    .split("\n\n")
                                                                    .map((paragraph, index) => (_jsx("p", { className: "whitespace-pre-wrap", children: paragraph }, index))) }) }) }) }) }, turn.id));
                                        })] }) }), _jsx(MessageScrollerButton, { variant: "outline", className: "rounded-full shadow-sm" })] }) }) }), _jsx(CardFooter, { className: "shrink-0 border-t py-4", children: _jsx(Tabs, { value: position, onValueChange: (value) => {
                        if (value === "start" ||
                            value === "end" ||
                            value === "last-anchor") {
                            setPosition(value);
                        }
                    }, className: "w-full", children: _jsx(TabsList, { className: "w-full", children: POSITIONS.map((option) => (_jsx(TabsTrigger, { value: option, children: option }, option))) }) }) })] }));
}
