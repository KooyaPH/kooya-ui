"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { CodeBlock, CodeBlockContent, CodeBlockCopyButton, CodeBlockHeader, CodeBlockLanguage, CodeBlockTitle, } from "../../reui/code-block/code-block.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ScrollArea, ScrollBar } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
/*
 * The sample deliberately omits its import statements: the registry verifier
 * scans raw file text for import shapes and would read them as real package
 * dependencies of the example, which then fails `registry:verify`.
 */
const target = `export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: openai("gpt-5"),
    system: "You are a concise assistant.",
    messages,
    temperature: 0.2,
    maxOutputTokens: 1024,
  })

  result.usage.then((usage) => {
    metrics.record("chat.tokens", usage.totalTokens)
  })

  return result.toUIMessageStreamResponse()
}`;
export default function Pattern() {
    const [length, setLength] = useState(0);
    useEffect(() => {
        if (length >= target.length)
            return;
        const id = window.setTimeout(() => setLength((value) => value + 3), 24);
        return () => window.clearTimeout(id);
    }, [length]);
    const done = length >= target.length;
    return (_jsxs("div", { className: "flex w-full max-w-2xl flex-col gap-3", children: [_jsxs(CodeBlock, { code: target.slice(0, length), language: "typescript", showLineNumbers: true, streaming: !done, children: [_jsxs(CodeBlockHeader, { children: [_jsx(CodeBlockTitle, { children: "app/api/chat/route.ts" }), _jsx(CodeBlockLanguage, {}), _jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [_jsx(Badge, { variant: done ? "success-light" : "info-light", children: done ? "Complete" : "Generating" }), _jsx(CodeBlockCopyButton, {})] })] }), _jsxs(ScrollArea, { className: "rounded-[inherit] **:data-[slot=scroll-area-viewport]:max-h-60", children: [_jsx(CodeBlockContent, {}), _jsx(ScrollBar, { orientation: "horizontal" })] })] }), _jsx(Button, { variant: "outline", size: "sm", className: "self-start", onClick: () => setLength(0), children: "Replay stream" })] }));
}
