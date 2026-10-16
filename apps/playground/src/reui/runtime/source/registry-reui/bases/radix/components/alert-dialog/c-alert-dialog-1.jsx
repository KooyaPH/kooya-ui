import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Open Alert Dialog" }) }), _jsxs(AlertDialogContent, { className: "sm:max-w-sm", children: [_jsxs(AlertDialogHeader, { className: "sm:place-items-center sm:text-center", children: [_jsx(AlertDialogTitle, { children: "Are you absolutely sure?" }), _jsx(AlertDialogDescription, { children: "This action cannot be undone. This will permanently delete your account and remove your data from our servers." })] }), _jsxs(AlertDialogFooter, { className: "sm:justify-center", children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { children: "Continue" })] })] })] }));
}
