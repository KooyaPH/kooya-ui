import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput, NumberFieldScrubArea, } from "../../../../../../../adapters/utility.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-48", children: _jsxs(NumberField, { defaultValue: 5, min: 0, max: 100, size: "lg", children: [_jsx(NumberFieldScrubArea, { label: "Large" }), _jsxs(NumberFieldGroup, { children: [_jsx(NumberFieldDecrement, {}), _jsx(NumberFieldInput, {}), _jsx(NumberFieldIncrement, {})] })] }) }));
}
