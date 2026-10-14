import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldGroup, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Frame, { className: "w-full max-w-xs", spacing: "sm", children: [_jsx(FrameHeader, { children: _jsx(FrameTitle, { children: "Notification Settings" }) }), _jsx(FramePanel, { className: "overflow-hidden p-0!", children: _jsxs(FieldGroup, { className: "gap-0", children: [_jsx(Field, { children: _jsxs(FieldLabel, { className: "p-3", children: [_jsx(Checkbox, { defaultChecked: true }), _jsx(FieldTitle, { children: "Push notifications" })] }) }), _jsx(Separator, {}), _jsx(Field, { children: _jsxs(FieldLabel, { className: "p-3", children: [_jsx(Checkbox, {}), _jsx(FieldTitle, { children: "Email notifications" })] }) }), _jsx(Separator, {}), _jsx(Field, { children: _jsxs(FieldLabel, { className: "p-3", children: [_jsx(Checkbox, {}), _jsx(FieldTitle, { children: "SMS notifications" })] }) })] }) })] }));
}
