import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle, } from "../../code/supporting/registry-reui/bases/radix/reui/alert";
import { IconPlaceholder } from "../../adapters/icons";
export default function Pattern() {
    return (_jsxs(Alert, { variant: "warning", className: "min-w-0 !grid-cols-[16px_minmax(0,1fr)]", children: [_jsx(IconPlaceholder, { lucide: "AlertTriangleIcon", tabler: "IconAlertTriangle", hugeicons: "Alert02Icon", phosphor: "WarningIcon", remixicon: "RiAlertLine", style: { color: "var(--ku-warning)" } }), _jsx(AlertTitle, { className: "!line-clamp-none min-w-0 [overflow-wrap:anywhere]", children: "Warning! Something is wrong" }), _jsx(AlertDescription, { className: "min-w-0 [overflow-wrap:anywhere]", style: { color: "var(--ku-muted)" }, children: "Please check your settings. If the problem persists, contact support." })] }));
}
