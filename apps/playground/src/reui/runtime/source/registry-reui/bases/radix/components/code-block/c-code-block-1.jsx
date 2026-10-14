import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CodeBlock, CodeBlockCopyButton, CodeBlockHeader, CodeBlockLanguage, CodeBlockTitle, } from "../../reui/code-block/code-block.jsx";
const code = `export function useTotals(items: Item[]) {
  return useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0)
    const tax = Math.round(subtotal * 0.2)
    return { subtotal, tax, total: subtotal + tax }
  }, [items])
}`;
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-2xl", children: _jsx(CodeBlock, { code: code, language: "typescript", showLineNumbers: true, children: _jsxs(CodeBlockHeader, { children: [_jsx(CodeBlockTitle, { children: "use-totals.ts" }), _jsx(CodeBlockLanguage, {}), _jsx(CodeBlockCopyButton, { className: "ml-auto" })] }) }) }));
}
