import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "../../../../../../../adapters/layout.tsx";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldGroup, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx(Card, { className: "w-full max-w-xs p-0", children: _jsxs(FieldGroup, { className: "gap-0", children: [_jsx(Field, { children: _jsxs(FieldLabel, { className: "px-4 py-3", children: [_jsx(Checkbox, { defaultChecked: true }), _jsx(FieldTitle, { children: "Push notifications" })] }) }), _jsx(Separator, {}), _jsx(Field, { children: _jsxs(FieldLabel, { className: "px-4 py-3", children: [_jsx(Checkbox, {}), _jsx(FieldTitle, { children: "Email notifications" })] }) }), _jsx(Separator, {}), _jsx(Field, { children: _jsxs(FieldLabel, { className: "px-4 py-3", children: [_jsx(Checkbox, {}), _jsx(FieldTitle, { children: "SMS notifications" })] }) })] }) }));
}
