"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Message, MessageAvatar, MessageContent, } from "../../../../../registry/bases/radix/ui/message.jsx";
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport, } from "../../../../../registry/bases/radix/ui/message-scroller.jsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const VIEWER_AVATAR = "/reui-assets/images/e93553df2422635515ee.jpg";
const REPLY_ID = "th_7c1x8p_reply";
const SETTLED = [
    {
        id: "th_7c1x8p_1",
        role: "user",
        author: "Jonas Weber",
        text: "I want to reproduce the refund 500 locally before we patch anything.",
    },
    {
        id: "th_7c1x8p_2",
        role: "assistant",
        author: "Nimbus",
        text: "Point the Stripe CLI at your local endpoint and trigger charge.refunded.\n\nA dashboard style refund arrives with no payment_intent, which is the exact shape production is failing on.",
    },
    {
        id: "th_7c1x8p_3",
        role: "user",
        author: "Jonas Weber",
        text: "The CLI payload has a payment_intent on it though.",
    },
    {
        id: "th_7c1x8p_4",
        role: "assistant",
        author: "Nimbus",
        text: "That is the default fixture. Override the field to null and the handler takes the branch you care about.\n\nThe rest of the fixture can stay as it is, the failing helper reads that one field and nothing else.",
    },
    {
        id: "th_7c1x8p_5",
        role: "user",
        author: "Jonas Weber",
        text: "Reproduced it, the 500 is right there in the log.",
    },
    {
        id: "th_7c1x8p_6",
        role: "assistant",
        author: "Nimbus",
        text: "That log line is the lookup helper throwing, three frames above the response.",
    },
    {
        id: "th_7c1x8p_7",
        role: "user",
        author: "Jonas Weber",
        text: "So what does the smallest safe fix look like?",
    },
];
/*
 * The reply is sliced out of one module scope string. A real client appends
 * decoded chunks instead, but the DOM churn the scroller has to absorb while a
 * row grows is the same either way.
 */
const REPLY = "Move the acknowledgement above the work. Verify the signature, return 200, then hand the event to a queue.\n\nAfter that a null payment_intent is a job that retries on your own backoff, and Stripe sees a healthy endpoint the whole time. It also means one slow refund lookup can no longer time the webhook out.";
export default function Pattern() {
    const [length, setLength] = useState(0);
    /*
     * One timeout per slice rather than an interval: a backgrounded tab throttles
     * timers instead of queueing a burst of them, so the stream resumes where it
     * stopped instead of jumping.
     */
    useEffect(() => {
        if (length >= REPLY.length)
            return;
        const id = window.setTimeout(() => setLength((value) => value + 4), 28);
        return () => window.clearTimeout(id);
    }, [length]);
    const done = length >= REPLY.length;
    /* The in flight row is built during render from the slice counter, so no
       state mirrors the text that is already derivable from it. */
    const turns = [
        ...SETTLED,
        {
            id: REPLY_ID,
            role: "assistant",
            author: "Nimbus",
            text: REPLY.slice(0, length),
        },
    ];
    return (
    /*
     * The frame owns the height and the scroller fills it. Without a bounded
     * parent there is no overflow to follow, and autoScroll has nothing to do
     * because the page itself is doing the scrolling.
     */
    _jsxs(Card, { className: "h-115 w-full max-w-2xl gap-0 overflow-hidden py-0", children: [_jsxs(CardHeader, { className: "shrink-0 border-b py-4", children: [_jsx(CardTitle, { children: "Reproduce webhook failure" }), _jsx(CardAction, { children: _jsx(Badge, { variant: done ? "success-light" : "primary-light", children: done ? "Answered" : "Working" }) })] }), _jsx(CardContent, { className: "min-h-0 flex-1 p-0", children: _jsx(MessageScrollerProvider, { autoScroll: true, children: _jsxs(MessageScroller, { children: [_jsx(MessageScrollerViewport, { "aria-label": "Live agent run transcript", children: _jsx(MessageScrollerContent, { "aria-busy": !done, className: "gap-5 p-(--card-spacing)", children: turns.map((turn) => {
                                        const isUser = turn.role === "user";
                                        const isStreaming = turn.id === REPLY_ID && !done;
                                        return (_jsx(MessageScrollerItem, { messageId: turn.id, scrollAnchor: isUser, children: _jsxs(Message, { align: isUser ? "end" : "start", children: [_jsx(MessageAvatar, { className: "size-8", children: isUser ? (_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: VIEWER_AVATAR, alt: turn.author }), _jsx(AvatarFallback, { children: "JW" })] })) : (_jsxs(_Fragment, { children: [_jsx(IconPlaceholder, { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "SparklesIcon", phosphor: "SparkleIcon", remixicon: "RiSparklingLine", "aria-hidden": "true", className: "text-muted-foreground size-4" }), _jsx("span", { className: "sr-only", children: turn.author })] })) }), _jsx(MessageContent, { children: _jsx(Bubble, { variant: isUser ? "muted" : "ghost", align: isUser ? "end" : "start", children: _jsxs(BubbleContent, { className: "space-y-2", children: [turn.text
                                                                        .split("\n\n")
                                                                        .map((paragraph, index) => (_jsx("p", { className: "whitespace-pre-wrap", children: paragraph }, index))), isStreaming ? (_jsx(Spinner, { className: "size-3", "aria-hidden": "true" })) : null] }) }) })] }) }, turn.id));
                                    }) }) }), _jsx("p", { role: "status", "aria-live": "polite", className: "sr-only", children: done ? "Reply complete" : "Nimbus is replying" }), _jsx(MessageScrollerButton, { variant: "outline", className: "rounded-full shadow-sm" })] }) }) }), _jsx(CardFooter, { className: "shrink-0 border-t py-4", children: _jsx(Button, { variant: "outline", size: "sm", onClick: () => setLength(0), children: "Replay stream" }) })] }));
}
