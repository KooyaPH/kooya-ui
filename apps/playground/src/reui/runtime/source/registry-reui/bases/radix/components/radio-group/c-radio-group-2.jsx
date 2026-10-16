import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { RadioGroup, RadioGroupItem, } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(RadioGroup, { defaultValue: "comfortable", className: "w-fit", children: [_jsxs(Field, { orientation: "horizontal", children: [_jsx(RadioGroupItem, { value: "default", id: "disabled-r1" }), _jsx(FieldLabel, { htmlFor: "disabled-r1", children: "Default" })] }), _jsxs(Field, { orientation: "horizontal", "data-disabled": true, children: [_jsx(RadioGroupItem, { value: "comfortable", disabled: true, id: "disabled-r2" }), _jsx(FieldLabel, { htmlFor: "disabled-r2", children: "Comfortable" })] }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(RadioGroupItem, { value: "compact", id: "disabled-r3" }), _jsx(FieldLabel, { htmlFor: "disabled-r3", children: "Compact" })] })] }));
}
