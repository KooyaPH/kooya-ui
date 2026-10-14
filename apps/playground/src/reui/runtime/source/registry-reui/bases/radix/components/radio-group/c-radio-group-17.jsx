import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { RadioGroup, RadioGroupItem, } from "../../../../../../../adapters/controls.tsx";
const plans = [
    {
        value: "free",
        title: "Free",
        price: "$0",
        description: "For personal projects and experiments.",
    },
    {
        value: "pro",
        title: "Pro",
        price: "$19",
        description: "For professionals and small teams.",
    },
    {
        value: "enterprise",
        title: "Enterprise",
        price: "$49",
        description: "For organizations with advanced needs.",
    },
];
export default function Pattern() {
    return (_jsx(RadioGroup, { defaultValue: "pro", className: "w-full max-w-xs", children: plans.map((plan) => (_jsx(FieldLabel, { htmlFor: plan.value, children: _jsxs(Field, { orientation: "horizontal", children: [_jsx(RadioGroupItem, { value: plan.value, id: plan.value }), _jsxs(FieldContent, { children: [_jsxs(FieldTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: plan.title }), _jsxs("span", { className: "text-sm font-semibold", children: [plan.price, "/mo"] })] }), _jsx(FieldDescription, { children: plan.description })] })] }) }, plan.value))) }));
}
