import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CodeBlock, CodeBlockCopyButton, CodeBlockHeader, CodeBlockTitle, } from "../../reui/code-block/code-block.jsx";
const source = `def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`;
/**
 * Lines built without shiki, to show the shape any highlighter can produce.
 *
 * The same array is what a server component gets back from `highlightCode` and
 * hands over the RSC boundary, so this is also the pre-highlighted path: the
 * client never loads a grammar.
 */
const lines = source.split("\n").map((text, index) => ({
    number: index + 1,
    text,
    tokens: text
        .split(/(\b(?:def|for|in|return)\b)/)
        .filter(Boolean)
        .map((content) => ({
        content,
        ...(/^(def|for|in|return)$/.test(content)
            ? { color: "#cf222e", colorDark: "#ff7b72" }
            : {}),
    })),
}));
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-2xl", children: _jsx(CodeBlock, { lines: lines, showLineNumbers: true, label: "Python code", children: _jsxs(CodeBlockHeader, { children: [_jsx(CodeBlockTitle, { children: "fib.py" }), _jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [_jsx("span", { className: "text-muted-foreground text-xs", children: "No shiki on the client" }), _jsx(CodeBlockCopyButton, { value: source })] })] }) }) }));
}
