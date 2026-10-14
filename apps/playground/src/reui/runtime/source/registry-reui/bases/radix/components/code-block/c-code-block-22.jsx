"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { CodeBlock, CodeBlockHeader, CodeBlockTitle, } from "../../reui/code-block/code-block.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardFooter } from "../../../../../../../adapters/layout.tsx";
const patch = `export async function retryPayment(orderId: string) {
  const order = await orders.find(orderId)
  await payments.charge(order)
  const receipt = await payments.charge(order, { idempotencyKey: orderId })
  await notify.customer(order, receipt)
  return receipt
}`;
/*
 * `variant="ghost"` drops the block's own border and background so the Card
 * supplies the chrome exactly once; the zeroed Card padding is what lets the
 * ghost surface sit flush against the footer.
 */
export default function Pattern() {
    const [decision, setDecision] = useState(null);
    return (_jsxs(Card, { className: "w-full max-w-2xl gap-0 py-0", children: [_jsx(CardContent, { className: "p-0", children: _jsx(CodeBlock, { code: patch, language: "typescript", showLineNumbers: true, variant: "ghost", diff: { added: [4, 5, 6], removed: [3] }, children: _jsxs(CodeBlockHeader, { children: [_jsx(CodeBlockTitle, { children: "billing/retry-payment.ts" }), _jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [_jsx(Badge, { variant: "success-light", children: "+3" }), _jsx(Badge, { variant: "destructive-light", children: "-1" })] })] }) }) }), _jsxs(CardFooter, { className: "border-border bg-muted/40 border-t px-3 py-2!", children: [_jsxs("span", { className: "text-muted-foreground text-xs", children: [decision === null && "Agent proposed this change", decision === "accepted" && "Change applied to the branch", decision === "rejected" && "Change discarded"] }), _jsx("div", { className: "ml-auto flex items-center gap-1.5", children: decision === null ? (_jsxs(_Fragment, { children: [_jsx(Button, { size: "sm", variant: "outline", onClick: () => setDecision("rejected"), children: "Reject" }), _jsx(Button, { size: "sm", onClick: () => setDecision("accepted"), children: "Accept" })] })) : (_jsx(Button, { size: "sm", variant: "ghost", onClick: () => setDecision(null), children: "Undo" })) })] })] }));
}
