"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { CodeBlock, CodeBlockHeader, CodeBlockLineActions, CodeBlockTitle, } from "../../reui/code-block/code-block.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
const code = `export function parseAmount(input: string) {
  const value = parseInt(input)
  if (value == NaN) return 0
  return value
}`;
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-2xl", children: _jsxs(CodeBlock, { code: code, language: "typescript", showLineNumbers: true, lineLevels: { error: [3], warning: [2] }, children: [_jsxs(CodeBlockHeader, { children: [_jsx(CodeBlockTitle, { children: "parse-amount.ts" }), _jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [_jsx(Badge, { variant: "destructive-light", children: "1 error" }), _jsx(Badge, { variant: "warning-light", children: "1 warning" })] })] }), _jsx(CodeBlockLineActions, { children: ({ line, state }) => state?.level ? (_jsxs(Button, { size: "xs", variant: "outline", className: "bg-background", children: ["Fix line ", line] })) : null })] }) }));
}
