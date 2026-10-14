"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CodeBlock, CodeBlockCopyButton, CodeBlockHeader, CodeBlockTitle, } from "../../reui/code-block/code-block.jsx";
/**
 * Diff styling expressed as notation inside the source rather than as props.
 * `transformers` is a straight pass-through to shiki, so `@shikijs/transformers`
 * works without the primitive knowing about it. The directive above is required:
 * this object carries a method, and functions cannot cross a server boundary.
 */
const notationDiff = {
    line(node, line) {
        if (line === 2)
            node.properties.class = "line diff remove";
        if (line === 3)
            node.properties.class = "line diff add";
    },
};
const code = `export function slugify(input: string) {
  return input.toLowerCase().replace(/ /g, "-")
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
}`;
/* The array itself must be module-scope: `transformers` is a reference dep
   of the highlight effect, so a fresh array each render re-tokenizes. */
const transformers = [notationDiff];
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-2xl", children: _jsx(CodeBlock, { code: code, language: "typescript", showLineNumbers: true, transformers: transformers, children: _jsxs(CodeBlockHeader, { children: [_jsx(CodeBlockTitle, { children: "slugify.ts" }), _jsx(CodeBlockCopyButton, { className: "ml-auto" })] }) }) }));
}
