import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Alert, { variant: "destructive", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine" }), _jsx(AlertTitle, { children: "Payment Failed" }), _jsxs(AlertDescription, { children: [_jsx("p", { children: "Please check your payment details:" }), _jsxs("ul", { className: "mt-1 list-inside list-disc space-y-0.5 text-sm", children: [_jsx("li", { children: "Card number and expiry" }), _jsx("li", { children: "Billing address" }), _jsx("li", { children: "Available funds" })] })] })] }));
}
