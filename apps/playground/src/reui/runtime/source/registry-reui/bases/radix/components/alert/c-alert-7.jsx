import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Alert, { variant: "warning", children: [_jsx(IconPlaceholder, { lucide: "AlertTriangleIcon", tabler: "IconAlertTriangle", hugeicons: "Alert02Icon", phosphor: "WarningIcon", remixicon: "RiAlertLine" }), _jsx(AlertTitle, { children: "Warning! Something is wrong" }), _jsx(AlertDescription, { children: "Please check your settings. If the problem persists, contact support." })] }));
}
