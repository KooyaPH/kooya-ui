import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
import { Field, FieldGroup, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Frame, { className: "w-full max-w-xs", spacing: "sm", children: [_jsx(FrameHeader, { children: _jsx(FrameTitle, { children: "Privacy Settings" }) }), _jsx(FramePanel, { className: "overflow-hidden p-0!", children: _jsxs(FieldGroup, { className: "gap-0", children: [_jsx(Field, { children: _jsxs(FieldLabel, { className: "justify-between p-3", children: [_jsx(FieldTitle, { children: "Profile visibility" }), _jsx(Switch, { defaultChecked: true })] }) }), _jsx(Separator, {}), _jsx(Field, { children: _jsxs(FieldLabel, { className: "justify-between p-3", children: [_jsx(FieldTitle, { children: "Show online status" }), _jsx(Switch, { defaultChecked: true })] }) }), _jsx(Separator, {}), _jsx(Field, { children: _jsxs(FieldLabel, { className: "justify-between p-3", children: [_jsx(FieldTitle, { children: "Allow data collection" }), _jsx(Switch, {})] }) })] }) })] }));
}
