"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { CodeBlock, CodeBlockHeader, CodeBlockLineActions, CodeBlockTitle, } from "../../reui/code-block/code-block.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const broken = `export function totalDue(invoice: Invoice) {
  const lines = invoice.lines.map((line) => line.amount)
  const subtotal = lines.reduce((sum, amount) => sum + amount)
  return subtotal + invoice.tax
}`;
const patched = `export function totalDue(invoice: Invoice) {
  const lines = invoice.lines.map((line) => line.amount)
  const subtotal = lines.reduce((sum, amount) => sum + amount, 0)
  return subtotal + invoice.tax
}`;
export default function Pattern() {
    const [fixed, setFixed] = useState(false);
    return (_jsx("div", { className: "w-full max-w-2xl", children: _jsxs(CodeBlock, { code: fixed ? patched : broken, language: "typescript", showLineNumbers: true, lineLevels: fixed ? undefined : { error: [3] }, children: [_jsxs(CodeBlockHeader, { children: [_jsx(CodeBlockTitle, { children: "invoice.ts" }), _jsx("div", { className: "ml-auto flex items-center gap-1.5", children: fixed ? (_jsxs(_Fragment, { children: [_jsx(Badge, { variant: "success-light", children: "Patch applied" }), _jsx(Button, { size: "xs", variant: "ghost", onClick: () => setFixed(false), children: "Undo" })] })) : (_jsx(Badge, { variant: "destructive-light", children: "Empty array crashes reduce" })) })] }), _jsx(CodeBlockLineActions, { children: ({ state }) => state?.level === "error" ? (_jsxs(Button, { size: "xs", onClick: () => setFixed(true), children: [_jsx(IconPlaceholder, { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "SparklesIcon", phosphor: "SparkleIcon", remixicon: "RiSparklingLine" }), "Fix with AI"] })) : null })] }) }));
}
