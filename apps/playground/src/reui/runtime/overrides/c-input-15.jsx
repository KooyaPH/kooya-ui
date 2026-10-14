import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Owned responsive correction to the actual attributed REUI recipe.
import { Button } from "../../adapters/controls";
import { Field, FieldGroup, FieldLabel } from "../../adapters/layout";
import { Input } from "../../adapters/controls";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../adapters/selection";
export default function Pattern() {
    return (_jsx("form", { className: "w-full", children: _jsxs(FieldGroup, { children: [_jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "form-phone", children: "Phone" }), _jsx(Input, { id: "form-phone", type: "tel", placeholder: "+1 (555) 123-4567" })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "form-country", children: "Country" }), _jsxs(Select, { defaultValue: "us", children: [_jsx(SelectTrigger, { id: "form-country", style: { width: "100%", minWidth: 0 }, children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "us", children: "United States" }), _jsx(SelectItem, { value: "uk", children: "United Kingdom" }), _jsx(SelectItem, { value: "ca", children: "Canada" })] })] })] })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "form-address", children: "Address" }), _jsx(Input, { id: "form-address", type: "text", placeholder: "123 Main St" })] }), _jsxs("div", { className: "flex justify-end gap-3 pt-4", children: [_jsx(Button, { type: "button", variant: "outline", children: "Cancel" }), _jsx(Button, { type: "submit", children: "Submit" })] })] }) }));
}
