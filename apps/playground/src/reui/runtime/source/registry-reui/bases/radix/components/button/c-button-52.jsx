import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(Button, { variant: "outline", className: "group/button h-auto justify-start gap-3 px-4 py-3 text-left", children: [_jsx("div", { className: "bg-muted text-accent-foreground group-hover/button:bg-background rounded-md flex size-10 items-center justify-center", children: _jsx(IconPlaceholder, { lucide: "CreditCardIcon", tabler: "IconCreditCard", hugeicons: "CreditCardIcon", phosphor: "CreditCardIcon", remixicon: "RiBankCardLine", "aria-hidden": "true", className: "size-5" }) }), _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { children: "Credit Card" }), _jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "Pay securely with your Visa or Mastercard" })] })] }));
}
