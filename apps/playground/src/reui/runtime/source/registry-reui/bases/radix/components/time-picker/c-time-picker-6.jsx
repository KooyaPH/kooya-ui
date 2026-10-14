import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TimePicker } from "../../reui/time-picker.jsx";
import { Field, FieldDescription, FieldLabel, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-xs", children: _jsxs(Field, { children: [_jsx(FieldLabel, { id: "pickup-time-label", htmlFor: "pickup-time", children: "Pickup time" }), _jsx(TimePicker, { id: "pickup-time", minuteStep: 15, min: "08:30", max: "17:30", "aria-labelledby": "pickup-time-label", "aria-describedby": "pickup-time-description" }), _jsx(FieldDescription, { id: "pickup-time-description", children: "Open 08:30 to 17:30." })] }) }));
}
