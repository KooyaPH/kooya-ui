import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertAction, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { Frame, FramePanel } from "../../reui/frame.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg", children: _jsx(Frame, { children: _jsx(FramePanel, { className: "overflow-hidden p-0!", children: _jsxs(Alert, { variant: "destructive", className: "bg-destructive/5 border-0 shadow-none", children: [_jsx(IconPlaceholder, { lucide: "CreditCardIcon", tabler: "IconCreditCard", hugeicons: "CreditCardIcon", phosphor: "CreditCardIcon", remixicon: "RiBankCardLine" }), _jsx(AlertTitle, { children: "Subscription Expiring" }), _jsx(AlertAction, { children: _jsx(Button, { size: "xs", variant: "destructive", children: "Renew Now" }) }), _jsx(AlertDescription, { children: "Your annual subscription will expire in 3 days. Renew now to avoid service interruption and data loss." })] }) }) }) }));
}
