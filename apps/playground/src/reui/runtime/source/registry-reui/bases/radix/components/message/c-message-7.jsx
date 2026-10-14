"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Bubble, BubbleContent } from "../../../../../registry/bases/radix/ui/bubble.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Marker, MarkerContent, MarkerIcon, } from "../../../../../registry/bases/radix/ui/marker.jsx";
import { Message, MessageContent, MessageFooter, } from "../../../../../registry/bases/radix/ui/message.jsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
const ANSWER = "The tax service began retrying every confirm call at 14:05, twice at 400ms each, so p95 on POST /api/checkout/confirm went from 240ms to 3.1s. The database was never the bottleneck: connection wait stayed under 5ms for the whole window. Rolling the tax client back to 1.8.3 at 14:41 returned p95 to 260ms within two minutes.";
const PENDING_MS = 900;
const STEP_MS = 24;
const STEP_CHARS = 4;
/*
 * Announcing every chunk turns the reply into a stutter, so one live region
 * carries the two states worth interrupting for. It is a permanent child, not
 * swapped in with its text: a region inserted with its content is not read.
 */
export default function Pattern() {
    const [revealed, setRevealed] = useState(0);
    useEffect(() => {
        if (revealed >= ANSWER.length)
            return;
        /*
         * Reduced motion gets the whole answer, not a faster crawl. Someone who
         * asked for less movement wants the text, not the same effect rushed.
         */
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setRevealed(ANSWER.length);
            return;
        }
        const id = window.setTimeout(() => setRevealed((count) => Math.min(count + STEP_CHARS, ANSWER.length)), revealed === 0 ? PENDING_MS : STEP_MS);
        return () => window.clearTimeout(id);
    }, [revealed]);
    const done = revealed >= ANSWER.length;
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-2xl flex-col gap-6", children: [_jsx(Message, { align: "end", children: _jsx(MessageContent, { children: _jsx(Bubble, { variant: "muted", children: _jsx(BubbleContent, { children: "Why did eu-west checkout latency spike at 14:05?" }) }) }) }), _jsx(Message, { children: _jsxs(MessageContent, { children: [_jsx("span", { role: "status", className: "sr-only", children: done ? "Reply ready" : revealed === 0 ? "Generating reply" : "" }), _jsx(Bubble, { variant: "ghost", "aria-busy": !done, children: _jsx(BubbleContent, { children: revealed === 0 ? (_jsxs(Marker, { children: [_jsx(MarkerIcon, { children: _jsx(Spinner, {}) }), _jsx(MarkerContent, { children: _jsx("span", { className: "animate-pulse motion-reduce:animate-none", children: "Reading the 14:00 to 14:10 trace..." }) })] })) : (_jsxs("p", { className: "whitespace-pre-wrap", children: [ANSWER.slice(0, revealed), done ? null : (_jsx("span", { "aria-hidden": "true", className: "bg-foreground ms-0.5 inline-block h-[1em] w-0.5 translate-y-0.5" }))] })) }) }), _jsxs(MessageFooter, { className: "gap-2", children: [_jsx("span", { className: "tabular-nums", children: "14:45" }), _jsx(Button, { type: "button", variant: "ghost", size: "xs", onClick: () => setRevealed(0), children: "Replay" })] })] }) })] }));
}
