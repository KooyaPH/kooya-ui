"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Marker, MarkerContent } from "../../../../../registry/bases/radix/ui/marker.jsx";
import { Message, MessageAvatar, MessageContent, } from "../../../../../registry/bases/radix/ui/message.jsx";
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport, useMessageScrollerScrollable, } from "../../../../../registry/bases/radix/ui/message-scroller.jsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const VIEWER_AVATAR = "/reui-assets/images/e93553df2422635515ee.jpg";
const INITIAL_VISIBLE = 6;
/*
 * Sixteen rows against a six row window, so there is real history to reveal
 * and the restored position is somewhere in the middle rather than at an edge
 * where any implementation would look correct.
 */
const HISTORY = [
    {
        id: "th_5p3w9k_1",
        role: "user",
        author: "Jonas Weber",
        text: "Pulling up ticket 4821. The customer says their exports have been empty since Friday.",
    },
    {
        id: "th_5p3w9k_2",
        role: "assistant",
        author: "Nimbus",
        text: "Empty, not failing. Every job in that window finished with a zero row result.",
    },
    {
        id: "th_5p3w9k_3",
        role: "user",
        author: "Jonas Weber",
        text: "Same workspace every time?",
    },
    {
        id: "th_5p3w9k_4",
        role: "assistant",
        author: "Nimbus",
        text: "One workspace, ws_3311. No other account shows the pattern.",
    },
    {
        id: "th_5p3w9k_5",
        role: "user",
        author: "Jonas Weber",
        text: "What changed for them on Friday?",
    },
    {
        id: "th_5p3w9k_6",
        role: "assistant",
        author: "Nimbus",
        text: "They moved their default view onto a saved filter whose date range ends last Thursday.",
    },
    {
        id: "th_5p3w9k_7",
        role: "user",
        author: "Jonas Weber",
        text: "So the export is right and the filter is wrong.",
    },
    {
        id: "th_5p3w9k_8",
        role: "assistant",
        author: "Nimbus",
        text: "Right for the filter, yes. The export inherits the active view, and that view now excludes everything recent.",
    },
    {
        id: "th_5p3w9k_9",
        role: "user",
        author: "Jonas Weber",
        text: "Does the interface show them that range anywhere?",
    },
    {
        id: "th_5p3w9k_10",
        role: "assistant",
        author: "Nimbus",
        text: "Only inside the filter chip, which is collapsed by default at their screen width.",
    },
    {
        id: "th_5p3w9k_11",
        role: "user",
        author: "Jonas Weber",
        text: "That is the actual bug then.",
    },
    {
        id: "th_5p3w9k_12",
        role: "assistant",
        author: "Nimbus",
        text: "It is at least why nobody caught it. The export dialog does show a row count, but it renders after the request, so a zero reads as loading.",
    },
    {
        id: "th_5p3w9k_13",
        role: "user",
        author: "Jonas Weber",
        text: "Can we tell them what to change today?",
    },
    {
        id: "th_5p3w9k_14",
        role: "assistant",
        author: "Nimbus",
        text: "Clear the saved range on the view, or export from the unfiltered table. Either one gives them Friday onward straight away.",
    },
    {
        id: "th_5p3w9k_15",
        role: "user",
        author: "Jonas Weber",
        text: "Send that, then flag the dialog for the product review.",
    },
    {
        id: "th_5p3w9k_16",
        role: "assistant",
        author: "Nimbus",
        text: "Sent, and the dialog is on the review list with a screenshot attached.\n\nI left a note on the ticket too, so the next person reads the filter before they open the worker logs.",
    },
];
/*
 * The chip sits outside the scroll frame but inside the Provider. Every hook
 * resolves through that context, so a control in the header still has to be a
 * descendant of it.
 */
function HistoryChip() {
    const { start } = useMessageScrollerScrollable();
    return (_jsx(Badge, { variant: "info-light", children: start ? "Earlier messages above" : "Top of thread" }));
}
export default function Pattern() {
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
    const [loading, setLoading] = useState(false);
    const loadTimer = useRef(null);
    useEffect(() => {
        return () => {
            if (loadTimer.current !== null)
                window.clearTimeout(loadTimer.current);
        };
    }, []);
    /*
     * The window is a slice taken during render, so loading earlier messages is
     * only a longer slice. That is the same shape a cursor paginated endpoint
     * produces, and it keeps the already mounted rows identical.
     */
    const visible = HISTORY.slice(-visibleCount);
    const allLoaded = visibleCount >= HISTORY.length;
    /* The delay is a real beat rather than decoration, so the restored scroll
       position is measured against rows that arrived after a paint. */
    function loadEarlier() {
        if (loading || allLoaded)
            return;
        setLoading(true);
        loadTimer.current = window.setTimeout(() => {
            loadTimer.current = null;
            setVisibleCount((count) => Math.min(count + 5, HISTORY.length));
            setLoading(false);
        }, 700);
    }
    return (
    /*
     * The frame owns the height. Restoring a scroll position only means
     * something while the reader is inside a bounded region, so a card that
     * grew with its content would have nothing to preserve.
     */
    _jsx(Card, { className: "h-110 w-full max-w-2xl gap-0 overflow-hidden py-0", children: _jsxs(MessageScrollerProvider, { children: [_jsxs(CardHeader, { className: "shrink-0 border-b py-4", children: [_jsx(CardTitle, { children: "Support escalation" }), _jsxs(CardDescription, { className: "flex items-center gap-2", children: [_jsx(HistoryChip, {}), _jsxs("span", { children: [visible.length, " of ", HISTORY.length, " messages"] })] }), _jsx(CardAction, { children: _jsxs(Button, { variant: "outline", size: "sm", disabled: loading || allLoaded, onClick: loadEarlier, children: [loading ? (_jsx(Spinner, { className: "size-3", "aria-hidden": "true" })) : null, allLoaded ? "All loaded" : "Load earlier"] }) })] }), _jsx(CardContent, { className: "min-h-0 flex-1 p-0", children: _jsxs(MessageScroller, { children: [_jsx(MessageScrollerViewport, { "aria-label": "Support escalation transcript", children: _jsxs(MessageScrollerContent, { className: "gap-5 p-(--card-spacing)", children: [visible.map((turn) => {
                                            const isUser = turn.role === "user";
                                            return (_jsx(MessageScrollerItem, { messageId: turn.id, scrollAnchor: isUser, children: _jsxs(Message, { align: isUser ? "end" : "start", children: [_jsx(MessageAvatar, { className: "size-8", children: isUser ? (_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: VIEWER_AVATAR, alt: turn.author }), _jsx(AvatarFallback, { children: "JW" })] })) : (_jsxs(_Fragment, { children: [_jsx(IconPlaceholder, { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "SparklesIcon", phosphor: "SparkleIcon", remixicon: "RiSparklingLine", "aria-hidden": "true", className: "text-muted-foreground size-4" }), _jsx("span", { className: "sr-only", children: turn.author })] })) }), _jsx(MessageContent, { children: _jsx(Bubble, { variant: isUser ? "muted" : "ghost", align: isUser ? "end" : "start", children: _jsx(BubbleContent, { className: "space-y-2", children: turn.text
                                                                        .split("\n\n")
                                                                        .map((paragraph, index) => (_jsx("p", { className: "whitespace-pre-wrap", children: paragraph }, index))) }) }) })] }) }, turn.id));
                                        }), _jsx(MessageScrollerItem, { scrollAnchor: false, children: _jsx(Marker, { variant: "separator", children: _jsx(MarkerContent, { children: "Escalated to Sam Okafor" }) }) })] }) }), _jsx(MessageScrollerButton, { variant: "outline", className: "rounded-full shadow-sm" })] }) })] }) }));
}
