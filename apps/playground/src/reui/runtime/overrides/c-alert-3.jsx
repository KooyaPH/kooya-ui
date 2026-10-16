import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertAction, AlertDescription, AlertTitle, } from "../../code/supporting/registry-reui/bases/radix/reui/alert";
import { Button } from "../../adapters/controls";
import { IconPlaceholder } from "../../adapters/icons";
export default function Pattern() {
    return (_jsxs(Alert, { className: "min-w-0 grid-cols-[16px_minmax(0,1fr)] items-start gap-x-2.5", style: {
            backgroundColor: "var(--ku-surface)",
            color: "var(--ku-ink)",
            borderColor: "var(--ku-line)",
        }, children: [_jsx(IconPlaceholder, { lucide: "ShieldCheckIcon", tabler: "IconShieldCheck", hugeicons: "ShieldEnergyIcon", phosphor: "ShieldCheckIcon", remixicon: "RiShieldCheckLine" }), _jsx(AlertTitle, { className: "min-w-0 line-clamp-none whitespace-normal [overflow-wrap:anywhere]", children: "Security Update" }), _jsx(AlertDescription, { className: "col-start-2 min-w-0 [overflow-wrap:anywhere]", style: { color: "var(--ku-muted)" }, children: "Update your password and enable 2FA." }), _jsxs(AlertAction, { className: "col-start-2 mt-2 min-w-0 w-full flex-col items-stretch sm:col-start-2 sm:col-span-1 sm:row-start-3 sm:justify-start sm:flex-row sm:flex-wrap [&_button]:w-full [&_button]:max-w-full sm:[&_button]:w-auto", children: [_jsx(Button, { variant: "outline", size: "xs", children: "Dismiss" }), _jsx(Button, { size: "xs", children: "Update" })] })] }));
}
