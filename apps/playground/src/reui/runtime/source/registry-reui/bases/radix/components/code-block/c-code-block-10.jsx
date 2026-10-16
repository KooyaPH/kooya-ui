"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CodeBlock, CodeBlockContent, CodeBlockCopyButton, CodeBlockExpandButton, CodeBlockHeader, CodeBlockTitle, useCodeBlockConfig, } from "../../reui/code-block/code-block.jsx";
import { cn } from "cn";
import { ScrollArea, ScrollBar } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
/**
 * An excerpt that opens partway through a generated file, so the first row
 * reads 120 rather than 1. `startLine` only resets the gutter's CSS counter:
 * line specs keep addressing source lines, so moving the offset never
 * invalidates a `highlightedLines` value.
 */
const code = Array.from({ length: 26 }, (_, index) => `export const rule${index + 120} = { id: ${index + 120}, enabled: true }`).join("\n");
/*
 * The collapse cap lives on the ScrollArea VIEWPORT and follows the block's
 * own `expanded` state through `useCodeBlockConfig`, so "Show more" releases
 * the cap and every scrollbar on this block is the shadcn one. `maxLines`
 * still marks the block collapsible; with the surface composed here it caps
 * nothing itself.
 */
function CollapsibleArea({ children }) {
    const { expanded } = useCodeBlockConfig("CollapsibleArea");
    return (_jsxs(ScrollArea, { className: cn("rounded-[inherit]", 
        /* overflow-hidden makes collapsed mean collapsed - without it the
           reader could wheel through everything under the "Show more" fade.
           The 208px cap is chosen to LAND near maxLines' 8 rows, not derived
           from it. */
        !expanded &&
            "**:data-[slot=scroll-area-viewport]:max-h-52 **:data-[slot=scroll-area-viewport]:overflow-hidden"), children: [children, _jsx(ScrollBar, { orientation: "horizontal" })] }));
}
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-2xl", children: _jsxs(CodeBlock, { code: code, language: "typescript", showLineNumbers: true, startLine: 120, maxLines: 8, children: [_jsxs(CodeBlockHeader, { children: [_jsx(CodeBlockTitle, { children: "rules.generated.ts" }), _jsx(CodeBlockCopyButton, { className: "ml-auto" })] }), _jsx(CollapsibleArea, { children: _jsx(CodeBlockContent, {}) }), _jsx(CodeBlockExpandButton, {})] }) }));
}
