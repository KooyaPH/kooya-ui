import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const showToast = () => {
        toast.custom(() => (_jsxs("div", { className: "bg-invert text-invert-foreground rounded-md flex w-[356px] items-start gap-3 border border-transparent p-4 shadow-lg", children: [_jsx("div", { className: "flex size-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white", children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5" }) }), _jsxs("div", { className: "flex flex-1 flex-col gap-1", children: [_jsx("p", { className: "text-sm font-semibold", children: "Payment Successful" }), _jsx("p", { className: "text-invert-foreground/70 text-sm", children: "Invoice #INV-2025-0042 has been paid. $2,400.00 received." }), _jsx("div", { className: "mt-2 flex gap-2", children: _jsx(Button, { size: "xs", variant: "outline", className: "bg-background/10 border-border/10 text-invert-foreground", onClick: () => toast.dismiss(), children: "View Receipt" }) })] })] })));
    };
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: showToast, variant: "outline", className: "w-fit", children: "Invert Success Toast" }) }));
}
