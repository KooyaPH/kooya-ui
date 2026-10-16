import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TimePicker, TimePickerContent, TimePickerTrigger, } from "../../reui/time-picker.jsx";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "w-full max-w-sm", children: _jsxs(Item, { variant: "outline", children: [_jsx(ItemMedia, { variant: "icon", children: _jsx(IconPlaceholder, { lucide: "MailIcon", tabler: "IconMail", hugeicons: "Mail01Icon", phosphor: "EnvelopeIcon", remixicon: "RiMailLine", "aria-hidden": "true" }) }), _jsxs(ItemContent, { children: [_jsx(ItemTitle, { id: "digest-time-title", children: "Daily digest" }), _jsx(ItemDescription, { id: "digest-time-description", children: "Mentions, replies and new tasks, once a day." })] }), _jsx(ItemActions, { children: _jsxs(TimePicker, { granularity: "hour", hourCycle: 12, defaultValue: "09:00", "aria-labelledby": "digest-time-title", "aria-describedby": "digest-time-description", children: [_jsx(TimePickerTrigger, { size: "sm", className: "w-32" }), _jsx(TimePickerContent, { align: "end" })] }) })] }) }));
}
