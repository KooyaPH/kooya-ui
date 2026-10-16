import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex flex-wrap items-center gap-6", children: [_jsxs(Field, { orientation: "horizontal", className: "w-auto", children: [_jsx(Checkbox, { id: "inline-1", defaultChecked: true }), _jsx(FieldLabel, { htmlFor: "inline-1", className: "cursor-pointer", children: "Read" })] }), _jsxs(Field, { orientation: "horizontal", className: "w-auto", children: [_jsx(Checkbox, { id: "inline-2" }), _jsx(FieldLabel, { htmlFor: "inline-2", className: "cursor-pointer", children: "Write" })] }), _jsxs(Field, { orientation: "horizontal", className: "w-auto", children: [_jsx(Checkbox, { id: "inline-4", defaultChecked: true }), _jsx(FieldLabel, { htmlFor: "inline-4", className: "cursor-pointer", children: "Delete" })] })] }));
}
