import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "../../../../../../../adapters/selection.tsx";
const items = [
    {
        value: "item-1",
        trigger: "Can I access my account history?",
        content: "Yes, you can view your complete account history including all transactions, plan changes, and support tickets in the Account History section of your dashboard.",
        disabled: false,
    },
    {
        value: "item-2",
        trigger: "Premium feature information (Locked)",
        content: "This section contains information about premium features. Upgrade your plan to access this content.",
        disabled: true,
    },
    {
        value: "item-3",
        trigger: "How do I update my email address?",
        content: "You can update your email address in your account settings. You'll receive a verification email at your new address to confirm the change.",
        disabled: false,
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsx(Accordion, { type: "single", collapsible: true, defaultValue: "item-1", className: "border-border rounded-lg overflow-hidden border", children: items.map((item) => (_jsxs(AccordionItem, { value: item.value, disabled: item.disabled, className: "data-[state=open]:bg-muted/50 **:data-[slot=accordion-content]:p-0!", children: [_jsx(AccordionTrigger, { className: "px-4 py-4 hover:no-underline", children: item.trigger }), _jsx(AccordionContent, { className: "px-4! pt-0 pb-4", children: item.content })] }, item.value))) }) }));
}
