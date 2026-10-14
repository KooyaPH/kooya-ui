"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { CodeBlock, CodeBlockCopyButton, markdownFences, } from "../../reui/code-block/code-block.jsx";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
const reply = `Use the streaming helper, then render it:

\`\`\`tsx
const { messages } = useChat({ api: "/api/chat" })
\`\`\`

That keeps the transcript in sync.`;
/*
 * `markdownFences` flags a fence whose closing delimiter has not arrived as
 * `open`, which is what lets the transcript render the partial block mid
 * stream instead of dropping it until the closer lands.
 */
export default function Pattern() {
    const [length, setLength] = useState(0);
    useEffect(() => {
        if (length >= reply.length)
            return;
        const id = window.setTimeout(() => setLength((value) => value + 4), 30);
        return () => window.clearTimeout(id);
    }, [length]);
    const streamed = reply.slice(0, length);
    const streaming = length < reply.length;
    return (_jsxs(Frame, { dense: true, className: "w-full max-w-2xl", children: [_jsxs(FrameHeader, { children: [_jsx(FrameTitle, { children: "Assistant" }), _jsx(FrameDescription, { children: "Generated responses may contain mistakes." })] }), _jsxs(FramePanel, { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex gap-3", children: [_jsxs(Avatar, { className: "size-7 shrink-0 rounded-full", children: [_jsx(AvatarImage, { src: "/reui-assets/images/c6e9e0d487c842b94fea.jpg", alt: "Mira Stone" }), _jsx(AvatarFallback, { className: "text-[10px] font-medium", children: "MS" })] }), _jsx("p", { className: "pt-1 text-sm", children: "How do I stream chat messages?" })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Avatar, { className: "size-7 shrink-0 rounded-full", children: _jsx(AvatarFallback, { className: "bg-muted text-muted-foreground text-[10px] font-medium", children: "AI" }) }), _jsx("div", { className: "flex min-w-0 flex-1 flex-col gap-2 pt-1", children: markdownFences(streamed).map((part, index) => part.type === "text" ? (_jsx("p", { className: "text-sm whitespace-pre-wrap", children: part.content }, index)) : (_jsx(CodeBlock, { code: part.content, language: part.language, streaming: streaming && part.open, children: _jsx(CodeBlockCopyButton, {}) }, index))) })] })] })] }));
}
