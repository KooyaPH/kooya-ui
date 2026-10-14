import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-auto", children: [_jsx(FieldLabel, { children: "Notification Settings" }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(Checkbox, { id: "group-1", defaultChecked: true }), _jsx(FieldLabel, { htmlFor: "group-1", children: "Email notifications" })] }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(Checkbox, { id: "group-2" }), _jsx(FieldLabel, { htmlFor: "group-2", children: "SMS notifications" })] }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(Checkbox, { id: "group-3", defaultChecked: true }), _jsx(FieldLabel, { htmlFor: "group-3", children: "Push notifications" })] })] }));
}
