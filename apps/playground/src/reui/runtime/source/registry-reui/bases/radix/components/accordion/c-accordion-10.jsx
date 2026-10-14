import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const items = [
    {
        value: "item-1",
        trigger: "Can I use this for my project?",
        content: "Yes, you can use ReUI for any of your personal or commercial projects. The library is distributed under the MIT license.",
    },
    {
        value: "item-2",
        trigger: "Is there a Figma file available?",
        content: "We are currently working on a comprehensive Figma design system that will be released soon to all ReUI users.",
    },
    {
        value: "item-3",
        trigger: "How do I contribute to ReUI?",
        content: "You can contribute by reporting bugs, suggesting features, or submitting pull requests on our GitHub repository.",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsx(Accordion, { type: "single", collapsible: true, defaultValue: "item-1", children: items.map((item) => (_jsxs(AccordionItem, { value: item.value, children: [_jsxs(AccordionTrigger, { className: "flex-row-reverse items-center justify-end gap-3 py-3 hover:no-underline *:data-[slot=accordion-trigger-icon]:hidden", children: [_jsx("span", { className: "text-foreground/90 font-medium", children: item.trigger }), _jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", className: "text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-90" })] }), _jsx(AccordionContent, { className: "text-muted-foreground ps-7 leading-relaxed", children: item.content })] }, item.value))) }) }));
}
