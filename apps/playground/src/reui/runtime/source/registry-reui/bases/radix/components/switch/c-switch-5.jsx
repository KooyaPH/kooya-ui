import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Field, { className: "w-auto", children: [_jsx(FieldLabel, { children: "Notification Settings" }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(Switch, { id: "sg-email", defaultChecked: true }), _jsx(FieldLabel, { htmlFor: "sg-email", children: "Email notifications" })] }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(Switch, { id: "sg-sms" }), _jsx(FieldLabel, { htmlFor: "sg-sms", children: "SMS notifications" })] }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(Switch, { id: "sg-push", defaultChecked: true }), _jsx(FieldLabel, { htmlFor: "sg-push", children: "Push notifications" })] })] }));
}
