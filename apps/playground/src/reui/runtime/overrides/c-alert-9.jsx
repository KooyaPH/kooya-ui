import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle, } from "../../code/supporting/registry-reui/bases/radix/reui/alert";
import { IconPlaceholder } from "../../adapters/icons";
export default function Pattern() {
    return (_jsxs(Alert, { variant: "invert", style: { gridTemplateColumns: "calc(var(--spacing) * 3) minmax(0, 1fr)" }, children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine", className: "text-invert-foreground" }), _jsx(AlertTitle, { className: "min-w-0 line-clamp-none whitespace-normal [overflow-wrap:anywhere]", children: "Notification! All good" }), _jsx(AlertDescription, { className: "min-w-0 [overflow-wrap:anywhere]", children: "This is a notification alert with a title and description." })] }));
}
