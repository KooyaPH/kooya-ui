"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { CodeBlock, CodeBlockHeader, CodeBlockTitle, } from "../../reui/code-block/code-block.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
const code = `function applyDiscount(order: Order) {
  if (order.coupon) {
    const rate = COUPONS[order.coupon]
    order.total = order.total * (1 - rate)
  }
  return order
}`;
/*
  Selection arrives sorted but not necessarily contiguous, so a range label
  would lie about a click on 2 and 6. Count is the only honest summary.
*/
function describe(lines) {
    if (!lines.length)
        return "Select lines to ask about them";
    if (lines.length === 1)
        return `Ask about line ${lines[0]}`;
    return `Ask about ${lines.length} lines`;
}
export default function Pattern() {
    const [selected, setSelected] = useState([]);
    return (_jsxs("div", { className: "flex w-full max-w-2xl flex-col gap-3", children: [_jsx(CodeBlock, { code: code, language: "typescript", showLineNumbers: true, selectable: true, selectedLines: selected, onSelectedLinesChange: setSelected, children: _jsxs(CodeBlockHeader, { children: [_jsx(CodeBlockTitle, { children: "discount.ts" }), _jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [selected.length > 0 && (_jsxs(Badge, { variant: "primary-light", children: [selected.length, " selected"] })), _jsx("span", { className: "text-muted-foreground text-xs", children: "Click a line, shift-click to extend" })] })] }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { size: "sm", disabled: !selected.length, children: describe(selected) }), selected.length > 0 && (_jsx(Button, { size: "sm", variant: "ghost", onClick: () => setSelected([]), children: "Clear" }))] })] }));
}
