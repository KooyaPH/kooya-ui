"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
function LoadingToast({ message }) {
    return (_jsxs("div", { className: "bg-popover text-popover-foreground border-border rounded-md flex w-[356px] items-center gap-3 border p-4 shadow-lg", children: [_jsx(Spinner, { className: "size-4 opacity-60" }), _jsx("p", { className: "text-xs font-medium", children: message })] }));
}
function SuccessToast() {
    return (_jsxs("div", { className: "bg-popover text-popover-foreground border-border rounded-md flex w-[356px] items-start gap-3 border p-4 shadow-lg", children: [_jsx("div", { className: "flex size-4 shrink-0 items-center justify-center rounded-full bg-green-500 text-white", children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3" }) }), _jsxs("div", { className: "flex flex-1 flex-col gap-0.5", children: [_jsx("p", { className: "text-xs font-semibold", children: "Upload complete!" }), _jsx("p", { className: "text-muted-foreground text-xs", children: "3 files uploaded successfully." })] })] }));
}
export default function Pattern() {
    const toastId = useRef(undefined);
    const startProgress = () => {
        toastId.current = toast.custom(() => _jsx(LoadingToast, { message: "Preparing upload..." }), { duration: Infinity });
        setTimeout(() => {
            toast.custom(() => _jsx(LoadingToast, { message: "Uploading files... 30%" }), {
                id: toastId.current,
                duration: Infinity,
            });
        }, 1000);
        setTimeout(() => {
            toast.custom(() => _jsx(LoadingToast, { message: "Uploading files... 70%" }), {
                id: toastId.current,
                duration: Infinity,
            });
        }, 2000);
        setTimeout(() => {
            toast.custom(() => _jsx(SuccessToast, {}), {
                id: toastId.current,
                duration: 4000,
            });
        }, 3000);
    };
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: startProgress, variant: "outline", className: "w-fit", children: "Updatable Toast" }) }));
}
