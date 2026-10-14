import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertAction, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Alert, { children: [_jsx(IconPlaceholder, { lucide: "ShieldCheckIcon", tabler: "IconShieldCheck", hugeicons: "ShieldEnergyIcon", phosphor: "ShieldCheckIcon", remixicon: "RiShieldCheckLine" }), _jsx(AlertTitle, { children: "Security Update" }), _jsx(AlertDescription, { children: "Update your password and enable 2FA." }), _jsxs(AlertAction, { children: [_jsx(Button, { variant: "outline", size: "xs", children: "Dismiss" }), _jsx(Button, { size: "xs", children: "Update" })] })] }));
}
