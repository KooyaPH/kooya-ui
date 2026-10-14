import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "../../../../../../../adapters/layout.tsx";
import { Field, FieldGroup, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx(Card, { className: "w-full max-w-xs p-0", children: _jsxs(FieldGroup, { className: "gap-0", children: [_jsx(Field, { children: _jsxs(FieldLabel, { className: "justify-between px-4 py-3", children: [_jsx(FieldTitle, { children: "Push notifications" }), _jsx(Switch, { defaultChecked: true })] }) }), _jsx(Separator, {}), _jsx(Field, { children: _jsxs(FieldLabel, { className: "justify-between px-4 py-3", children: [_jsx(FieldTitle, { children: "Email notifications" }), _jsx(Switch, {})] }) }), _jsx(Separator, {}), _jsx(Field, { children: _jsxs(FieldLabel, { className: "justify-between px-4 py-3", children: [_jsx(FieldTitle, { children: "SMS notifications" }), _jsx(Switch, {})] }) })] }) }));
}
