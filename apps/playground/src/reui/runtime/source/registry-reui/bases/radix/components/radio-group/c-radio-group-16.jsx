import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { RadioGroup, RadioGroupItem, } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(RadioGroup, { defaultValue: "viewer", className: "mx-auto flex w-auto flex-wrap items-center gap-6", children: [_jsxs(Field, { orientation: "horizontal", className: "w-auto", children: [_jsx(RadioGroupItem, { value: "admin", id: "role-admin" }), _jsx(FieldLabel, { htmlFor: "role-admin", className: "cursor-pointer", children: "Admin" })] }), _jsxs(Field, { orientation: "horizontal", className: "w-auto", children: [_jsx(RadioGroupItem, { value: "editor", id: "role-editor" }), _jsx(FieldLabel, { htmlFor: "role-editor", className: "cursor-pointer", children: "Editor" })] }), _jsxs(Field, { orientation: "horizontal", className: "w-auto", children: [_jsx(RadioGroupItem, { value: "viewer", id: "role-viewer" }), _jsx(FieldLabel, { htmlFor: "role-viewer", className: "cursor-pointer", children: "Viewer" })] })] }));
}
