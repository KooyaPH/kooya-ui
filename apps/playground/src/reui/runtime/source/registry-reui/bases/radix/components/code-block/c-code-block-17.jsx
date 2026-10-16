"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { CodeBlock, CodeBlockCopyButton, CodeBlockHeader, CodeBlockTitle, CodeBlockWrapToggle, } from "../../reui/code-block/code-block.jsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
const code = `export const contentSecurityPolicy = "default-src 'self'; script-src 'self' 'nonce-{NONCE}' https://cdn.example.com; style-src 'self' 'nonce-{NONCE}'; img-src 'self' data: https://images.example.com; font-src 'self' data:; connect-src 'self' https://api.example.com"`;
export default function Pattern() {
    // Controlled wrap: `wrap` plus `onWrapChange` moves the state up to the page,
    // so the toggle and the status chip read one value. `defaultWrap` would keep
    // it inside the block, leaving the header nothing to render.
    const [wrap, setWrap] = useState(true);
    return (_jsx("div", { className: "w-full max-w-2xl", children: _jsx(CodeBlock, { code: code, language: "typescript", wrap: wrap, onWrapChange: setWrap, children: _jsxs(CodeBlockHeader, { children: [_jsx(CodeBlockTitle, { children: "security-headers.ts" }), _jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [_jsx(Badge, { variant: "info-light", children: wrap ? "Wrapped" : "Scrolling" }), _jsx(CodeBlockWrapToggle, { size: "xs" }), _jsx(Separator, { orientation: "vertical", className: "h-4" }), _jsx(CodeBlockCopyButton, {})] })] }) }) }));
}
