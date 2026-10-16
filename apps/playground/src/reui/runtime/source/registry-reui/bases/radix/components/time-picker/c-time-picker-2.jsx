import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TimePicker } from "../../reui/time-picker.jsx";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-xs", children: _jsxs(Field, { children: [_jsx(FieldLabel, { id: "standup-time-label", htmlFor: "standup-time", children: "Standup time" }), _jsx(TimePicker, { id: "standup-time", "aria-labelledby": "standup-time-label", "aria-describedby": "standup-time-description" }), _jsx(FieldDescription, { id: "standup-time-description", children: "Reminders go out 10 minutes before." })] }) }));
}
