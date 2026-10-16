import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "View Confirmation" }) }), _jsxs(AlertDialogContent, { className: "gap-8 p-8 sm:max-w-sm", children: [_jsxs("div", { className: "mx-auto flex flex-col items-center justify-center gap-2", children: [_jsx(AlertDialogMedia, { className: "bg-info/10 text-info dark:bg-info/20 size-16 rounded-full", children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-5" }) }), _jsx(AlertDialogTitle, { className: "text-center", children: "Success! Your e-ticket is registered." }), _jsx(AlertDialogDescription, { className: "max-w-xs text-center", children: "Please check your email for confirmation and further instructions about the event." })] }), _jsx("div", { className: "bg-muted/60 grid gap-4 rounded-xl p-4", children: [
                            ["Order Number", "GBD99763JS"],
                            ["Order Date", "7 September 2024"],
                            ["Event Name", "Groove Beats Day Fest"],
                            ["Event Date", "20/09/2024"],
                            ["Register Date", "20/09/2024 | 09 PM"],
                        ].map(([label, value]) => (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground font-medium", children: label }), _jsx("span", { className: "text-foreground font-semibold", children: value })] }, label))) }), _jsx(AlertDialogFooter, { className: "-mx-8 -mb-8 px-8", children: _jsx(AlertDialogCancel, { size: "lg", variant: "default", className: "w-full sm:w-full", children: "Back to Home" }) })] })] }));
}
