import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "../../../../../../../adapters/layout.tsx";
import { Field, FieldGroup, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { RadioGroup, RadioGroupItem, } from "../../../../../../../adapters/controls.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx(Card, { className: "w-full max-w-xs p-0", children: _jsx(RadioGroup, { defaultValue: "standard", children: _jsxs(FieldGroup, { className: "gap-0", children: [_jsx(Field, { children: _jsxs(FieldLabel, { className: "px-4 py-3", children: [_jsx(RadioGroupItem, { value: "standard", id: "ship-standard" }), _jsx(FieldTitle, { children: "Standard Shipping" })] }) }), _jsx(Separator, {}), _jsx(Field, { children: _jsxs(FieldLabel, { className: "px-4 py-3", children: [_jsx(RadioGroupItem, { value: "express", id: "ship-express" }), _jsx(FieldTitle, { children: "Express Shipping" })] }) }), _jsx(Separator, {}), _jsx(Field, { children: _jsxs(FieldLabel, { className: "px-4 py-3", children: [_jsx(RadioGroupItem, { value: "overnight", id: "ship-overnight" }), _jsx(FieldTitle, { children: "Overnight Shipping" })] }) })] }) }) }));
}
