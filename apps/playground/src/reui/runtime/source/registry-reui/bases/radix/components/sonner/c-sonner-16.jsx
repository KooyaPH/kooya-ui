import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const showToast = () => {
        toast.custom(() => (_jsxs("div", { className: "bg-invert text-invert-foreground rounded-md flex w-[356px] items-start gap-3 border border-transparent p-4 shadow-lg", children: [_jsx("div", { className: "flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white", children: _jsx(IconPlaceholder, { lucide: "AlertTriangleIcon", tabler: "IconAlertTriangle", hugeicons: "Alert02Icon", phosphor: "WarningIcon", remixicon: "RiAlertLine", className: "size-3.5" }) }), _jsxs("div", { className: "flex flex-1 flex-col gap-1", children: [_jsx("p", { className: "text-sm font-semibold", children: "Session Expiring" }), _jsx("p", { className: "text-invert-foreground/70 text-sm", children: "Your session will expire in 5 minutes due to inactivity." }), _jsx("div", { className: "mt-2", children: _jsx(Button, { size: "xs", className: "border-amber-700 bg-amber-500 text-white hover:border-amber-800 hover:bg-amber-600", onClick: () => {
                                    toast.dismiss();
                                    toast.success("Session extended");
                                }, children: "Extend Session" }) })] })] })), { duration: 10000 });
    };
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: showToast, variant: "outline", className: "w-fit", children: "Invert Warning Toast" }) }));
}
