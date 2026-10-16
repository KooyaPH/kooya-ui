import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Alert, { variant: "invert", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine", className: "text-success" }), _jsx(AlertTitle, { children: "Notification! All good" }), _jsx(AlertDescription, { children: "This is a notification alert with a title and description." })] }));
}
