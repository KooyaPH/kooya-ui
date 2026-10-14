import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto w-full max-w-xs", children: _jsx(FieldLabel, { htmlFor: "sw-danger", children: _jsxs(Field, { orientation: "horizontal", children: [_jsxs(FieldContent, { children: [_jsx(FieldTitle, { className: "text-destructive", children: "Delete all data on sign out" }), _jsx(FieldDescription, { children: "When enabled, all local data will be permanently removed when you sign out. This action cannot be undone." })] }), _jsx(Switch, { id: "sw-danger", className: "data-checked:bg-destructive" })] }) }) }));
}
