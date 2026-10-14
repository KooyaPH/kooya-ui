import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TimePicker } from "../../reui/time-picker.jsx";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-xs", children: _jsxs(Field, { children: [_jsx(FieldLabel, { id: "stream-live-label", htmlFor: "stream-live", children: "Stream goes live" }), _jsx(TimePicker, { id: "stream-live", hourCycle: 12, granularity: "second", defaultValue: "14:45:30", "aria-labelledby": "stream-live-label", "aria-describedby": "stream-live-description" }), _jsx(FieldDescription, { id: "stream-live-description", children: "Pick the exact second the broadcast starts." })] }) }));
}
