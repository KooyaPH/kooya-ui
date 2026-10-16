"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { CodeBlock, CodeBlockHeader, CodeBlockTitle, } from "../../reui/code-block/code-block.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
const code = `export async function checkout(cart: Cart) {
  const totals = computeTotals(cart)

  const session = await payments.createSession({
    amount: totals.total,
    currency: cart.currency,
  })

  await audit.record("checkout.started", session.id)
  return session
}`;
const steps = [
    { label: "Totals", lines: "2" },
    { label: "Payment session", lines: "4-7" },
    { label: "Audit", lines: "9-10" },
];
/*
 * `focusedLines` keeps a step sharp and dims the rest - unlike highlighting,
 * which adds emphasis without taking any away. Hovering the block restores
 * everything, so the surrounding code is one glance away.
 */
export default function Pattern() {
    const [step, setStep] = useState(0);
    return (_jsx("div", { className: "w-full max-w-2xl", children: _jsx(CodeBlock, { code: code, language: "typescript", showLineNumbers: true, focusedLines: steps[step].lines, children: _jsxs(CodeBlockHeader, { className: "gap-1.5", children: [_jsx(CodeBlockTitle, { children: "checkout.ts" }), _jsx("div", { role: "group", "aria-label": "Walkthrough step", className: "ml-auto flex items-center gap-1", children: steps.map((entry, index) => (_jsx(Button, { "aria-pressed": index === step, size: "xs", variant: index === step ? "secondary" : "ghost", onClick: () => setStep(index), children: entry.label }, entry.label))) }), _jsxs(Badge, { variant: "primary-light", children: [step + 1, "/", steps.length] })] }) }) }));
}
