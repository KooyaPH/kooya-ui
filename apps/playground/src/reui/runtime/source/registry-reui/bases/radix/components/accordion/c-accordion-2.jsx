import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const items = [
    {
        value: "security",
        trigger: "Data Security",
        content: "We use industry-standard AES-256 encryption to protect your sensitive information at rest and in transit.",
    },
    {
        value: "integration",
        trigger: "API Integration",
        content: "Seamlessly connect with your favorite tools using our robust REST API and pre-built connectors.",
    },
    {
        value: "collaboration",
        trigger: "Team Collaboration",
        content: "Invite team members, assign roles, and work together in real-time on shared projects and documents.",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsx(Accordion, { type: "multiple", defaultValue: ["security"], children: items.map((item) => (_jsxs(AccordionItem, { value: item.value, children: [_jsxs(AccordionTrigger, { className: "hover:no-underline *:data-[slot=accordion-trigger-icon]:hidden", children: [_jsx("span", { children: item.trigger }), _jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", className: "text-muted-foreground ml-auto size-3.5 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:hidden" }), _jsx(IconPlaceholder, { lucide: "MinusIcon", tabler: "IconMinus", hugeicons: "MinusSignIcon", phosphor: "MinusIcon", remixicon: "RiSubtractLine", className: "text-muted-foreground ml-auto hidden size-3.5 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:inline" })] }), _jsx(AccordionContent, { children: item.content })] }, item.value))) }) }));
}
