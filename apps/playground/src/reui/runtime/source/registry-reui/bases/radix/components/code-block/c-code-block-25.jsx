"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { CodeBlock, CodeBlockHeader, CodeBlockLineActions, CodeBlockTitle, useCodeBlockSelection, } from "../../reui/code-block/code-block.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const FILE = "use-mobile.ts";
const PATH = "src/hooks/use-mobile.ts";
const code = `import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>()

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)")
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}`;
/*
 * The gutter button turns code into REFERENCES: press + on a line and the
 * composer below gains a file:line badge, or select a range first and one
 * press references every selected line. `useCodeBlockSelection` is what makes
 * the range case possible - the render prop alone only knows its own line.
 */
function AddToChat({ line, onAdd, }) {
    const { selectedLines, clearSelection } = useCodeBlockSelection();
    const batch = selectedLines.length > 0 ? selectedLines : [line];
    return (_jsx(Button, { type: "button", size: "icon-xs", "aria-label": batch.length > 1
            ? `Reference ${batch.length} selected lines in the chat`
            : `Reference line ${line} in the chat`, title: batch.length > 1
            ? `Reference ${batch.length} lines`
            : `Reference line ${line}`, onClick: () => {
            onAdd(batch);
            clearSelection();
        }, 
        /* Trimmed below the icon-xs rung: the control hangs over the line
           numbers, so a full 24px chip covers the digits it floats above. */
        className: "size-5", children: _jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine" }) }));
}
export default function Pattern() {
    const [refs, setRefs] = useState([]);
    const [highlighted, setHighlighted] = useState(null);
    const addLines = (lines) => setRefs((current) => [...new Set([...current, ...lines])].sort((a, b) => a - b));
    return (_jsxs("div", { className: "flex w-full max-w-2xl flex-col gap-3", children: [_jsxs(CodeBlock, { code: code, language: "typescript", showLineNumbers: true, selectable: true, highlightedLines: highlighted === null ? undefined : [highlighted], children: [_jsxs(CodeBlockHeader, { children: [_jsx(CodeBlockTitle, { children: FILE }), _jsx("span", { className: "text-muted-foreground ml-auto text-xs", children: "Press + on a line to reference it" })] }), _jsx(CodeBlockLineActions, { side: "gutter", children: ({ line }) => _jsx(AddToChat, { line: line, onAdd: addLines }) })] }), _jsxs(Card, { size: "sm", className: "gap-2 p-3", children: [_jsx("div", { className: "flex flex-wrap items-center gap-1.5", children: refs.length === 0 ? (_jsxs("span", { className: "text-muted-foreground px-1 text-sm", children: ["Ask about ", FILE, "..."] })) : (refs.map((line) => (_jsxs(Badge, { variant: highlighted === line ? "primary-light" : "outline", title: `${PATH}:${line}`, className: "gap-0.5 font-mono", children: [_jsxs(Button, { variant: "ghost", size: "xs", "aria-pressed": highlighted === line, "aria-label": `Highlight line ${line} in the code`, onClick: () => setHighlighted((current) => current === line ? null : line), className: "h-auto p-0 font-mono hover:bg-transparent", children: [FILE, ":", line] }), _jsx(Button, { variant: "ghost", size: "icon-xs", "aria-label": `Remove the reference to line ${line}`, onClick: () => {
                                        setRefs((current) => current.filter((value) => value !== line));
                                        setHighlighted((current) => current === line ? null : current);
                                    }, className: "size-4 hover:bg-transparent [&_svg]:size-2.5", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine" }) })] }, line)))) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-muted-foreground text-xs", children: refs.length > 0
                                    ? `${refs.length} ${refs.length === 1 ? "line" : "lines"} in context`
                                    : "No context yet" }), _jsx(Button, { size: "xs", className: "ml-auto", disabled: !refs.length, children: "Ask AI" })] })] })] }));
}
