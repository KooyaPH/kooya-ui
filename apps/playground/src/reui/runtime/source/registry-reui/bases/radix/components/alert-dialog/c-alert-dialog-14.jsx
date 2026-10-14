import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const SECURITY_ITEMS = [
    {
        icon: (_jsx(IconPlaceholder, { lucide: "LockIcon", tabler: "IconLock", hugeicons: "SquareLock01Icon", phosphor: "LockSimpleIcon", remixicon: "RiLockLine", className: "text-muted-foreground size-4" })),
        title: "Password Policy",
        description: "Verify strength and rotation",
        status: "Pending",
    },
    {
        icon: (_jsx(IconPlaceholder, { lucide: "FingerprintPatternIcon", tabler: "IconFingerprint", hugeicons: "FingerPrintIcon", phosphor: "FingerprintIcon", remixicon: "RiFingerprintLine", className: "text-muted-foreground size-4" })),
        title: "Biometric Status",
        description: "Check hardware encryption",
        status: "Done",
    },
    {
        icon: (_jsx(IconPlaceholder, { lucide: "KeySquareIcon", tabler: "IconKey", hugeicons: "Key02Icon", phosphor: "KeyIcon", remixicon: "RiKeyLine", className: "text-muted-foreground size-4" })),
        title: "Active Sessions",
        description: "Review connected devices",
        status: "Pending",
    },
];
export default function Pattern() {
    return (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Advanced Security Check" }) }), _jsxs(AlertDialogContent, { className: "max-w-sm! gap-0 overflow-hidden p-0", children: [_jsxs("div", { className: "flex flex-col items-center justify-center gap-1.5 px-4 pt-6 pb-5 text-center", children: [_jsx(AlertDialogMedia, { className: "size-12 rounded-full bg-green-50 text-green-500 dark:bg-green-950 dark:text-green-400", children: _jsx(IconPlaceholder, { lucide: "ShieldAlertIcon", tabler: "IconShieldExclamation", hugeicons: "ShieldEnergyIcon", phosphor: "ShieldWarningIcon", remixicon: "RiShieldLine", className: "size-6" }) }), _jsx(AlertDialogTitle, { className: "text-base font-semibold", children: "Advanced Security Audit" }), _jsx(AlertDialogDescription, { className: "p-0 text-sm", children: "Summary of your account status and security settings." })] }), _jsx("div", { className: "space-y-3 p-4", children: SECURITY_ITEMS.map((item) => (_jsxs("div", { className: "border-border flex items-center justify-between rounded-md border border-dashed px-3 py-2.5", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("div", { className: "bg-background border-border/80 flex size-8 items-center justify-center rounded-md border shadow-xs", children: item.icon }), _jsxs("div", { className: "flex flex-col gap-0.25", children: [_jsx("span", { className: "text-sm font-medium", children: item.title }), _jsx("span", { className: "text-muted-foreground text-xs", children: item.description })] })] }), _jsx(Badge, { variant: item.status === "Pending" ? "warning-light" : "success-light", children: item.status })] }, item.title))) }), _jsxs(AlertDialogFooter, { className: "mx-0 mb-0 grid grid-cols-1 gap-2 p-4", children: [_jsx(AlertDialogAction, { variant: "default", className: "flex-1", children: "Start Deep Audit" }), _jsx(AlertDialogCancel, { variant: "ghost", className: "flex-1", children: "Skip for now" })] })] })] }));
}
