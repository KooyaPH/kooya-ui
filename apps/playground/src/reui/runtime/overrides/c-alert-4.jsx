import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle, } from "../../code/supporting/registry-reui/bases/radix/reui/alert";
import { IconPlaceholder } from "../../adapters/icons";
export default function Pattern() {
    return (_jsxs(Alert, { variant: "destructive", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine", style: { color: "var(--ku-danger)" } }), _jsx(AlertTitle, { className: "min-w-0 line-clamp-none whitespace-normal [overflow-wrap:anywhere]", children: "Payment Failed" }), _jsxs(AlertDescription, { className: "min-w-0", style: { color: "var(--ku-muted)", overflowWrap: "anywhere" }, children: [_jsx("p", { children: "Please check your payment details:" }), _jsxs("ul", { className: "mt-1 list-inside list-disc space-y-0.5 text-sm", children: [_jsx("li", { children: "Card number and expiry" }), _jsx("li", { children: "Billing address" }), _jsx("li", { children: "Available funds" })] })] })] }));
}
