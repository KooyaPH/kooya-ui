import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "../../../../../../../adapters/selection.tsx";
const items = [
    {
        value: "billing",
        trigger: "How does billing work?",
        content: "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members. There are no hidden fees or setup costs.",
    },
    {
        value: "security",
        trigger: "Is my data secure?",
        content: "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols. We also offer optional two-factor authentication and single sign-on for enterprise customers.",
    },
    {
        value: "integration",
        trigger: "What integrations do you support?",
        content: (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks.", " "] }), _jsx("p", { children: "Our API documentation includes code examples in 10+ programming languages." })] })),
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsx(Accordion, { type: "single", collapsible: true, defaultValue: "billing", className: "space-y-2 border-0", children: items.map((item) => (_jsxs(AccordionItem, { value: item.value, className: "border-border rounded-lg border px-3 not-last:border-b", children: [_jsx(AccordionTrigger, { className: "items-center py-3 font-medium hover:no-underline", children: item.trigger }), _jsx(AccordionContent, { className: "text-muted-foreground pt-0 pb-4", children: item.content })] }, item.value))) }) }));
}
