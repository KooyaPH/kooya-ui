"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Message, MessageAvatar, MessageContent, } from "../../../../../registry/bases/radix/ui/message.jsx";
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport, } from "../../../../../registry/bases/radix/ui/message-scroller.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const VIEWER_AVATAR = "/reui-assets/images/e93553df2422635515ee.jpg";
const SEEDED = [
    {
        id: "th_4b8t2v_1",
        role: "user",
        author: "Jonas Weber",
        text: "Draft the release notes for 3.4 from the merged pull requests.",
    },
    {
        id: "th_4b8t2v_2",
        role: "assistant",
        author: "Nimbus",
        text: "Here is a first pass, grouped the way the changelog already reads.\n\nTwo entries need a decision from you. The webhook acknowledgement change is breaking for anyone parsing the 500, and the export worker change moves a default.",
    },
    {
        id: "th_4b8t2v_3",
        role: "user",
        author: "Jonas Weber",
        text: "Keep the breaking one at the top.",
    },
    {
        id: "th_4b8t2v_4",
        role: "assistant",
        author: "Nimbus",
        text: "Moved. Breaking changes lead, then features, then fixes.\n\nI also pulled the migration note out of the fix list, because the people who skip that section are the ones who need it.",
    },
    {
        id: "th_4b8t2v_5",
        role: "assistant",
        author: "Nimbus",
        text: "The draft is in the shared doc. Ask for any section and I will rewrite it in place.",
    },
];
/* Canned answers, taken in turn so a second send never repeats verbatim. */
const REPLIES = [
    "Pulled that into the draft. It sits under Breaking changes with the upgrade note directly beneath it.\n\nI kept the wording to a single line, since the detail belongs on the docs page the entry links to.",
    "Done, and I left the previous text beside it so you can compare the two.\n\nNothing else moved. The ordering rules are still breaking, then features, then fixes.",
    "That one needs a decision rather than an edit. The change sits behind a flag, so it reads as a feature for anyone who opts in and as nothing at all for everyone else.\n\nTell me which framing you want and I will write it both ways.",
];
export default function Pattern() {
    const [sent, setSent] = useState([]);
    const [draft, setDraft] = useState("");
    const replyTimer = useRef(null);
    const replyCount = useRef(0);
    /*
     * Only the unmount half lives here. The next question clears the pending
     * timer inline, so a slow answer can never land after the tree is gone or
     * attach itself to a question the reader has already replaced.
     */
    useEffect(() => {
        return () => {
            if (replyTimer.current !== null)
                window.clearTimeout(replyTimer.current);
        };
    }, []);
    /*
     * The answer lands on a timer owned by a ref, not on an effect watching the
     * message list. An effect would rerun on every unrelated change to that list
     * and would have to guard itself out of answering its own output.
     */
    function handleSubmit(event) {
        event.preventDefault();
        const question = draft.trim();
        if (!question)
            return;
        /*
         * Row ids come off a counter that only ever climbs, so a send can never
         * reuse an id an earlier row still holds. Reused keys would remount the
         * rows above and throw away the scroll position the anchor just set.
         */
        const round = replyCount.current;
        replyCount.current += 1;
        setDraft("");
        setSent((current) => [
            ...current,
            {
                id: `th_4b8t2v_q${round}`,
                role: "user",
                author: "Jonas Weber",
                text: question,
            },
        ]);
        if (replyTimer.current !== null)
            window.clearTimeout(replyTimer.current);
        replyTimer.current = window.setTimeout(() => {
            replyTimer.current = null;
            setSent((current) => [
                ...current,
                {
                    id: `th_4b8t2v_a${round}`,
                    role: "assistant",
                    author: "Nimbus",
                    text: REPLIES[round % REPLIES.length],
                },
            ]);
        }, 900);
    }
    /* Only the sent rows live in state. Copying the seeded transcript into state
       as well would let a stale update rewrite rows that never change. */
    const turns = [...SEEDED, ...sent];
    return (
    /*
     * The frame owns the height, so the transcript overflows inside the card
     * rather than lengthening the page. An anchored turn needs somewhere to
     * move to, and a page tall enough to fit everything gives it nowhere.
     */
    _jsxs(Card, { className: "h-120 w-full max-w-2xl gap-0 overflow-hidden py-0", children: [_jsxs(CardHeader, { className: "shrink-0 border-b py-4", children: [_jsx(CardTitle, { children: "Q3 release notes draft" }), _jsx(CardDescription, { children: "Anchored turns, 64px peek" })] }), _jsx(CardContent, { className: "min-h-0 flex-1 p-0", children: _jsx(MessageScrollerProvider, { scrollPreviousItemPeek: 64, scrollMargin: 16, children: _jsxs(MessageScroller, { children: [_jsx(MessageScrollerViewport, { "aria-label": "Release notes thread", children: _jsx(MessageScrollerContent, { className: "gap-5 p-(--card-spacing)", children: turns.map((turn) => {
                                        const isUser = turn.role === "user";
                                        return (_jsx(MessageScrollerItem, { messageId: turn.id, scrollAnchor: isUser, children: _jsxs(Message, { align: isUser ? "end" : "start", children: [_jsx(MessageAvatar, { className: "size-8", children: isUser ? (_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: VIEWER_AVATAR, alt: turn.author }), _jsx(AvatarFallback, { children: "JW" })] })) : (_jsxs(_Fragment, { children: [_jsx(IconPlaceholder, { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "SparklesIcon", phosphor: "SparkleIcon", remixicon: "RiSparklingLine", "aria-hidden": "true", className: "text-muted-foreground size-4" }), _jsx("span", { className: "sr-only", children: turn.author })] })) }), _jsx(MessageContent, { children: _jsx(Bubble, { variant: isUser ? "muted" : "ghost", align: isUser ? "end" : "start", children: _jsx(BubbleContent, { className: "space-y-2", children: turn.text
                                                                    .split("\n\n")
                                                                    .map((paragraph, index) => (_jsx("p", { className: "whitespace-pre-wrap", children: paragraph }, index))) }) }) })] }) }, turn.id));
                                    }) }) }), _jsx(MessageScrollerButton, { variant: "outline", className: "rounded-full shadow-sm" })] }) }) }), _jsx(CardFooter, { className: "shrink-0 border-t py-4", children: _jsx("form", { className: "w-full", onSubmit: handleSubmit, children: _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { "aria-label": "Message Nimbus", placeholder: "Ask about the 3.4 release notes", value: draft, onChange: (event) => setDraft(event.target.value) }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsxs(InputGroupButton, { type: "submit", size: "icon-sm", variant: "default", disabled: !draft.trim(), children: [_jsx(IconPlaceholder, { lucide: "ArrowUpIcon", tabler: "IconArrowUp", hugeicons: "ArrowUp02Icon", phosphor: "ArrowUpIcon", remixicon: "RiArrowUpLine", "aria-hidden": "true" }), _jsx("span", { className: "sr-only", children: "Send" })] }) })] }) }) })] }));
}
