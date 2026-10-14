import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Frame, FrameHeader, FramePanel, FrameTitle, } from "../../reui/frame.jsx";
import { Field, FieldGroup, FieldLabel, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { RadioGroup, RadioGroupItem, } from "../../../../../../../adapters/controls.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Frame, { className: "w-full max-w-xs", spacing: "sm", children: [_jsx(FrameHeader, { children: _jsx(FrameTitle, { children: "Language" }) }), _jsx(FramePanel, { className: "overflow-hidden p-0!", children: _jsx(RadioGroup, { defaultValue: "en", children: _jsxs(FieldGroup, { className: "gap-0", children: [_jsx(Field, { children: _jsxs(FieldLabel, { className: "p-3", children: [_jsx(RadioGroupItem, { value: "en", id: "lang-en" }), _jsx(FieldTitle, { children: "English" })] }) }), _jsx(Separator, {}), _jsx(Field, { children: _jsxs(FieldLabel, { className: "p-3", children: [_jsx(RadioGroupItem, { value: "es", id: "lang-es" }), _jsx(FieldTitle, { children: "Spanish" })] }) }), _jsx(Separator, {}), _jsx(Field, { children: _jsxs(FieldLabel, { className: "p-3", children: [_jsx(RadioGroupItem, { value: "fr", id: "lang-fr" }), _jsx(FieldTitle, { children: "French" })] }) }), _jsx(Separator, {}), _jsx(Field, { children: _jsxs(FieldLabel, { className: "p-3", children: [_jsx(RadioGroupItem, { value: "de", id: "lang-de" }), _jsx(FieldTitle, { children: "German" })] }) })] }) }) })] }));
}
