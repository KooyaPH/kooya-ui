import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CodeBlock, CodeBlockCopyButton, CodeBlockHeader, CodeBlockTitle, } from "../../reui/code-block/code-block.jsx";
const code = `export function getCacheKey(request: Request) {
  const url = new URL(request.url)
  return url.href
  url.searchParams.delete("utm_source")
  url.searchParams.delete("utm_medium")
  url.searchParams.sort()
  return url.toString()
}`;
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-2xl", children: _jsx(CodeBlock, { code: code, language: "typescript", showLineNumbers: true, diff: { added: [4, 5, 6, 7], removed: [3] }, children: _jsxs(CodeBlockHeader, { children: [_jsx(CodeBlockTitle, { children: "lib/cache-key.ts" }), _jsx(CodeBlockCopyButton, { className: "ml-auto" })] }) }) }));
}
