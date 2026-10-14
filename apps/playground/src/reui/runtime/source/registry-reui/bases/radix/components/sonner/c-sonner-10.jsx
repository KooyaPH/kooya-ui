"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Progress } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
function UploadToast({ progress }) {
    const done = progress >= 100;
    return (_jsxs("div", { className: "bg-popover text-popover-foreground border-border rounded-md flex w-[350px] flex-col gap-3 border p-4 shadow-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-muted flex size-8 shrink-0 items-center justify-center", children: _jsx(IconPlaceholder, { lucide: "FileIcon", tabler: "IconFile", hugeicons: "FileEmpty02Icon", phosphor: "FileIcon", remixicon: "RiFileLine", className: "size-4", "aria-hidden": "true" }) }), _jsxs("div", { className: "flex flex-1 flex-col", children: [_jsx("p", { className: "text-sm font-medium", children: "report-q4-2025.pdf" }), _jsxs("p", { className: "text-muted-foreground text-xs", children: ["2.4 MB \u00B7 ", done ? "Complete" : `Uploading... ${progress}%`] })] })] }), _jsx(Progress, { value: progress, className: "**:data-[slot=progress-indicator]:bg-success h-1.5" })] }));
}
export default function Pattern() {
    const intervalRef = useRef(null);
    const showUploadToast = () => {
        let progress = 0;
        const id = toast.custom(() => _jsx(UploadToast, { progress: progress }), {
            duration: Infinity,
        });
        intervalRef.current = setInterval(() => {
            progress = Math.min(progress + Math.floor(Math.random() * 15) + 5, 100);
            toast.custom(() => _jsx(UploadToast, { progress: progress }), {
                id,
                duration: progress >= 100 ? 3000 : Infinity,
            });
            if (progress >= 100 && intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }, 500);
    };
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: showUploadToast, variant: "outline", className: "w-fit", children: "Upload Toast" }) }));
}
