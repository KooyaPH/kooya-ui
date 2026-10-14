import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "../../../../../../../adapters/selection.tsx";
const nestedItems = [
    {
        value: "sub-item-1",
        trigger: "Technical Specifications",
        content: "Detailed technical specs including dimensions, weight, and power requirements.",
    },
    {
        value: "sub-item-2",
        trigger: "Compatibility",
        content: "List of supported devices and operating systems for this product.",
    },
];
const mainItems = [
    {
        value: "product-info",
        trigger: "Product Overview",
        content: "This product is designed for high-performance enterprise environments requiring maximum reliability.",
    },
    {
        value: "details",
        trigger: "Additional Details",
        isNested: true,
    },
    {
        value: "shipping",
        trigger: "Shipping & Returns",
        content: "Free standard shipping on orders over $500. 30-day return policy applies.",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsx(Accordion, { type: "single", collapsible: true, defaultValue: "details", className: "space-y-2 border-none", children: mainItems.map((item) => (_jsxs(AccordionItem, { value: item.value, className: "border-border rounded-lg border bg-transparent px-4", children: [_jsx(AccordionTrigger, { className: "items-center py-3 font-medium hover:no-underline", children: item.trigger }), _jsx(AccordionContent, { className: "text-muted-foreground h-auto", children: item.isNested ? (_jsx(Accordion, { type: "single", collapsible: true, defaultValue: "sub-item-1", className: "space-y-2 border-none", children: nestedItems.map((subItem) => (_jsxs(AccordionItem, { value: subItem.value, className: "border-border rounded-lg border bg-transparent px-3", children: [_jsx(AccordionTrigger, { className: "text-foreground items-center py-3 font-medium hover:no-underline", children: subItem.trigger }), _jsx(AccordionContent, { className: "text-sm", children: subItem.content })] }, subItem.value))) })) : (item.content) })] }, item.value))) }) }));
}
