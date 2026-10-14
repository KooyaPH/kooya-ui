import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Item, ItemContent, ItemDescription, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const plans = [
    {
        name: "Starter",
        description: "Perfect for individuals getting started.",
    },
    {
        name: "Professional",
        description: "Ideal for growing teams and businesses.",
    },
    {
        name: "Enterprise",
        description: "Advanced features for large organizations.",
    },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { defaultValue: "Starter", children: [_jsx(SelectTrigger, { className: "h-auto! w-full", children: _jsx(SelectValue, { placeholder: "Select plan" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: plans.map((plan) => (_jsx(SelectItem, { value: plan.name, children: _jsx(SelectPlanItem, { plan: plan }) }, plan.name))) }) })] }) }));
}
function SelectPlanItem({ plan }) {
    return (_jsx(Item, { size: "xs", className: "w-full p-0", children: _jsxs(ItemContent, { className: "gap-0", children: [_jsx(ItemTitle, { children: plan.name }), _jsx(ItemDescription, { className: "text-xs", children: plan.description })] }) }));
}
