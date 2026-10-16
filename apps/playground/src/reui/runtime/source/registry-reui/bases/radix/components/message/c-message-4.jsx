"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Message, MessageContent, MessageFooter, } from "../../../../../registry/bases/radix/ui/message.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/*
 * Two drafts, because Regenerate has to return a visibly different answer to
 * teach anything. One draft and a spinner reads as a button that is broken.
 */
const DRAFTS = [
    [
        "4.2 moves invoicing onto the new tax service, so EU orders now carry a VAT line on the PDF, the hosted receipt and the CSV export.",
        "Two smaller changes ride along: the billing portal keeps the filters you left it on, and a failed payment retries twice before it is marked overdue.",
    ],
    [
        "The headline in 4.2 is EU VAT. It is calculated per order rather than per account, and it shows up everywhere an amount does.",
        "We also cleared a long-standing annoyance in the billing portal: filters survive a reload, and overdue is only set after two failed retries.",
    ],
];
/*
 * A rating belongs to the answer that earned it, so regenerating clears it.
 * A thumb left lit reads as feedback on a draft nobody rated.
 */
export default function Pattern() {
    const [draftIndex, setDraftIndex] = useState(0);
    const [vote, setVote] = useState(null);
    const [copied, setCopied] = useState(false);
    const draft = DRAFTS[draftIndex];
    /*
     * What goes to the clipboard is derived from draft during render, so this
     * timed label is the only thing the effect has to unwind.
     */
    useEffect(() => {
        if (!copied)
            return;
        const id = window.setTimeout(() => setCopied(false), 1600);
        return () => window.clearTimeout(id);
    }, [copied]);
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-2xl flex-col gap-6", children: [_jsx(Message, { align: "end", children: _jsx(MessageContent, { children: _jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: "Summarise what changed in 4.2 for the customer note." }) }) }) }), _jsx(Message, { children: _jsxs(MessageContent, { children: [_jsx(Bubble, { variant: "ghost", "aria-live": "polite", children: _jsx(BubbleContent, { children: _jsx("div", { className: "space-y-3", children: draft.map((paragraph) => (_jsx("p", { children: paragraph }, paragraph))) }) }) }), _jsxs(MessageFooter, { className: "gap-0.5", children: [_jsx("span", { className: "pe-1 tabular-nums", children: "09:41" }), _jsx(Button, { type: "button", variant: "ghost", size: "icon-xs", "aria-label": copied ? "Reply copied" : "Copy reply", title: copied ? "Copied" : "Copy", onClick: () => {
                                        /*
                                         * Optional-chained twice: a page served over plain http has no
                                         * navigator.clipboard at all. The label flips either way.
                                         */
                                        void navigator.clipboard?.writeText?.(draft.join("\n\n"));
                                        setCopied(true);
                                    }, children: copied ? (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", "aria-hidden": "true" })) : (_jsx(IconPlaceholder, { lucide: "CopyIcon", tabler: "IconCopy", hugeicons: "Copy01Icon", phosphor: "CopyIcon", remixicon: "RiFileCopyLine", "aria-hidden": "true" })) }), _jsx(Button, { type: "button", variant: "ghost", size: "icon-xs", "aria-label": "Regenerate reply", title: "Regenerate", onClick: () => {
                                        setDraftIndex((index) => (index + 1) % DRAFTS.length);
                                        setVote(null);
                                    }, children: _jsx(IconPlaceholder, { lucide: "RefreshCwIcon", tabler: "IconRefreshDot", hugeicons: "Refresh04Icon", phosphor: "ArrowsClockwiseIcon", remixicon: "RiRestartLine", "aria-hidden": "true" }) }), _jsx(Button, { type: "button", variant: vote === "up" ? "secondary" : "ghost", size: "icon-xs", "aria-label": "Good reply", title: "Good reply", "aria-pressed": vote === "up", onClick: () => setVote(vote === "up" ? null : "up"), children: _jsx(IconPlaceholder, { lucide: "ThumbsUpIcon", tabler: "IconThumbUp", hugeicons: "ThumbsUpIcon", phosphor: "ThumbsUpIcon", remixicon: "RiThumbUpLine", "aria-hidden": "true" }) }), _jsx(Button, { type: "button", variant: vote === "down" ? "secondary" : "ghost", size: "icon-xs", "aria-label": "Bad reply", title: "Bad reply", "aria-pressed": vote === "down", onClick: () => setVote(vote === "down" ? null : "down"), children: _jsx(IconPlaceholder, { lucide: "ThumbsDownIcon", tabler: "IconThumbDown", hugeicons: "ThumbsDownIcon", phosphor: "ThumbsDownIcon", remixicon: "RiThumbDownLine", "aria-hidden": "true" }) })] })] }) })] }));
}
