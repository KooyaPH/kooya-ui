import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const plans = [
    {
        value: "startup",
        label: "Startup",
        description: "For small teams up to 10",
    },
    {
        value: "business",
        label: "Business",
        description: "For growing companies",
    },
    {
        value: "enterprise",
        label: "Enterprise",
        description: "Unlimited everything",
    },
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { defaultValue: plans[0].value, children: [_jsx(SelectTrigger, { className: "w-[240px] [&_span.text-muted-foreground]:hidden", children: _jsx(SelectValue, { placeholder: "Select plan" }) }), _jsx(SelectContent, { position: "popper", children: _jsx(SelectGroup, { children: plans.map((plan) => (_jsx(SelectItem, { value: plan.value, className: "[&_svg]:text-primary", children: _jsxs("div", { className: "flex flex-col items-start gap-px", children: [_jsx("span", { className: "font-medium", children: plan.label }), _jsx("span", { className: "text-muted-foreground text-xs", children: plan.description })] }) }, plan.value))) }) })] }) }));
}
