import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "../../../../../../../adapters/selection.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const items = [
    {
        value: "plans",
        trigger: "What subscription plans do you offer?",
        content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: [_jsx("a", { href: "#", className: "text-primary hover:underline", children: "Annual billing is available" }), " ", "with a 20% discount. All plans include a 14-day free trial with no credit card required."] }), _jsxs(Button, { size: "sm", className: "mt-4", children: ["View plans", _jsx(IconPlaceholder, { lucide: "ArrowUpRightIcon", tabler: "IconArrowUpRight", hugeicons: "ArrowUpRight01Icon", phosphor: "ArrowUpRightIcon", remixicon: "RiArrowRightUpLine", className: "size-4" })] })] })),
    },
    {
        value: "billing",
        trigger: "How does billing work?",
        content: (_jsx(_Fragment, { children: _jsx("p", { children: "Billing occurs automatically at the start of each billing cycle. We accept all major credit cards, PayPal, and ACH transfers for enterprise customers." }) })),
    },
    {
        value: "security",
        trigger: "Is my data secure?",
        content: (_jsxs(_Fragment, { children: [_jsx("p", { children: "We take security seriously. All data is encrypted at rest using AES-256 and in transit via TLS 1.3. We perform regular third-party security audits and maintain SOC 2 Type II compliance." }), _jsx("p", { children: "You can also enable multi-factor authentication (MFA) and single sign-on (SSO) for additional security." })] })),
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Subscription & Billing" }), _jsx(CardDescription, { children: "Common questions about your account, plans, and payments" })] }), _jsx(CardContent, { children: _jsx(Accordion, { type: "multiple", defaultValue: ["plans"], children: items.map((item) => (_jsxs(AccordionItem, { value: item.value, children: [_jsx(AccordionTrigger, { children: item.trigger }), _jsx(AccordionContent, { children: item.content })] }, item.value))) }) })] }) }));
}
