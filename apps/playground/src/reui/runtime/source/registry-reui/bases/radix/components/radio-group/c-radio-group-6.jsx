import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldDescription, FieldLabel, FieldLegend, FieldSet, } from "../../../../../../../adapters/layout.tsx";
import { RadioGroup, RadioGroupItem, } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(FieldSet, { className: "w-full max-w-xs", children: [_jsx(FieldLegend, { children: "Battery Level" }), _jsx(FieldDescription, { children: "Choose your preferred battery level." }), _jsxs(RadioGroup, { defaultValue: "medium", children: [_jsxs(Field, { orientation: "horizontal", children: [_jsx(RadioGroupItem, { value: "high", id: "battery-high" }), _jsx(FieldLabel, { htmlFor: "battery-high", children: "High" })] }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(RadioGroupItem, { value: "medium", id: "battery-medium" }), _jsx(FieldLabel, { htmlFor: "battery-medium", children: "Medium" })] }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(RadioGroupItem, { value: "low", id: "battery-low" }), _jsx(FieldLabel, { htmlFor: "battery-low", children: "Low" })] })] })] }));
}
