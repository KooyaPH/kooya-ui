import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CodeBlock, CodeBlockCopyButton, CodeBlockHeader, CodeBlockTitle, } from "../../reui/code-block/code-block.jsx";
const code = `const client = createClient({
  url: process.env.DATABASE_URL,
  maxConnections: 20,
  idleTimeoutMillis: 30000,
})

await client.connect()`;
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-2xl", children: _jsx(CodeBlock, { code: code, language: "typescript", showLineNumbers: true, highlightedLines: "2-4", highlightedWords: ["createClient", "maxConnections"], children: _jsxs(CodeBlockHeader, { children: [_jsx(CodeBlockTitle, { children: "db/client.ts" }), _jsx(CodeBlockCopyButton, { className: "ml-auto" })] }) }) }));
}
