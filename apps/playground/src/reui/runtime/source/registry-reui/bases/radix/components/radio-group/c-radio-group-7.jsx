import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { RadioGroup, RadioGroupItem, } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(RadioGroup, { defaultValue: "plus", className: "w-full max-w-xs", children: [_jsx(FieldLabel, { htmlFor: "plus-plan", children: _jsxs(Field, { orientation: "horizontal", children: [_jsxs(FieldContent, { children: [_jsx(FieldTitle, { children: "Plus" }), _jsx(FieldDescription, { children: "For individuals and small teams." })] }), _jsx(RadioGroupItem, { value: "plus", id: "plus-plan" })] }) }), _jsx(FieldLabel, { htmlFor: "pro-plan", children: _jsxs(Field, { orientation: "horizontal", children: [_jsxs(FieldContent, { children: [_jsx(FieldTitle, { children: "Pro" }), _jsx(FieldDescription, { children: "For growing businesses." })] }), _jsx(RadioGroupItem, { value: "pro", id: "pro-plan" })] }) })] }));
}
