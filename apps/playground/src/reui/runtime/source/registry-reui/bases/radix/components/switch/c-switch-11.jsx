import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs(Field, { orientation: "horizontal", className: "w-auto", children: [_jsx(Switch, { id: "sw-blue", defaultChecked: true, className: "data-checked:bg-blue-500" }), _jsx(FieldLabel, { htmlFor: "sw-blue", children: "Blue" })] }), _jsxs(Field, { orientation: "horizontal", className: "w-auto", children: [_jsx(Switch, { id: "sw-green", defaultChecked: true, className: "data-checked:bg-green-500" }), _jsx(FieldLabel, { htmlFor: "sw-green", children: "Green" })] }), _jsxs(Field, { orientation: "horizontal", className: "w-auto", children: [_jsx(Switch, { id: "sw-yellow", defaultChecked: true, className: "data-checked:bg-yellow-500" }), _jsx(FieldLabel, { htmlFor: "sw-yellow", children: "Yellow" })] })] }));
}
