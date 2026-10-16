import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "../../../../../../../adapters/selection.tsx";
const items = [
    {
        value: "item-1",
        trigger: "Is it accessible ?",
        content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
        value: "item-2",
        trigger: "Is it styled?",
        content: "Yes. It comes with default styles that matches the other components' aesthetic.",
    },
    {
        value: "item-3",
        trigger: "Is it animated?",
        content: "Yes. It's animated by default, but you can disable it if you prefer.",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsx(Accordion, { type: "single", collapsible: true, defaultValue: "item-1", children: items.map((item) => (_jsxs(AccordionItem, { value: item.value, children: [_jsx(AccordionTrigger, { children: item.trigger }), _jsx(AccordionContent, { children: item.content })] }, item.value))) }) }));
}
