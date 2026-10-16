import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertAction, AlertDescription, } from "../../code/supporting/registry-reui/bases/radix/reui/alert";
import { Button } from "../../adapters/controls";
import { IconPlaceholder } from "../../adapters/icons";
export default function Pattern() {
    return (_jsxs(Alert, { className: "min-w-0 items-start !grid-cols-[16px_minmax(0,1fr)]", style: {
            backgroundColor: "var(--ku-surface)",
            color: "var(--ku-ink)",
            borderColor: "var(--ku-line)",
        }, children: [_jsx(IconPlaceholder, { lucide: "ShieldCheckIcon", tabler: "IconShieldCheck", hugeicons: "ShieldEnergyIcon", phosphor: "ShieldCheckIcon", remixicon: "RiShieldCheckLine" }), _jsx(AlertDescription, { className: "min-w-0 [overflow-wrap:anywhere]", style: { color: "var(--ku-muted)" }, children: "Update your password and enable 2FA." }), _jsxs(AlertAction, { className: "min-w-0 flex-wrap", children: [_jsx(Button, { variant: "outline", size: "xs", children: "Dismiss" }), _jsx(Button, { size: "xs", children: "Update" })] })] }));
}
