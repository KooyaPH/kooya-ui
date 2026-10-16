"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatBytes, useFileUpload, } from "../../hooks/use-file-upload.jsx";
import { Alert, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern({ maxSize = 2 * 1024 * 1024, // 2MB
className, onFileChange, defaultAvatar, }) {
    const [{ files, isDragging, errors }, { removeFile, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps, },] = useFileUpload({
        maxFiles: 1,
        maxSize,
        accept: "image/*",
        multiple: false,
        onFilesChange: (files) => {
            onFileChange?.(files[0] || null);
        },
    });
    const currentFile = files[0];
    const previewUrl = currentFile?.preview || defaultAvatar;
    const handleRemove = () => {
        if (currentFile) {
            removeFile(currentFile.id);
        }
    };
    return (_jsxs("div", { className: cn("flex flex-col items-center gap-4", className), children: [_jsxs("div", { className: "relative", children: [_jsxs("div", { className: cn("group/avatar relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-dashed transition-colors", isDragging
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25 hover:border-muted-foreground/20", previewUrl && "border-solid"), onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop, onClick: openFileDialog, children: [_jsx("input", { ...getInputProps(), className: "sr-only" }), previewUrl ? (_jsx("img", { src: previewUrl, alt: "Avatar", className: "h-full w-full object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center", children: _jsx(IconPlaceholder, { lucide: "UserIcon", tabler: "IconUser", hugeicons: "UserIcon", phosphor: "UserIcon", remixicon: "RiUserLine", className: "text-muted-foreground size-6" }) }))] }), currentFile && (_jsx(Button, { size: "icon", variant: "outline", onClick: handleRemove, className: "absolute end-0.5 top-0.5 z-10 size-6 rounded-full dark:bg-zinc-800 hover:dark:bg-zinc-700", "aria-label": "Remove avatar", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "size-3.5" }) }))] }), _jsxs("div", { className: "space-y-0.5 text-center", children: [_jsx("p", { className: "text-sm font-medium", children: currentFile ? "Avatar uploaded" : "Upload avatar" }), _jsxs("p", { className: "text-muted-foreground text-xs", children: ["PNG, JPG up to ", formatBytes(maxSize)] })] }), errors.length > 0 && (_jsxs(Alert, { variant: "destructive", className: "mt-5", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine" }), _jsx(AlertTitle, { children: "File upload error(s)" }), _jsx(AlertDescription, { children: errors.map((error, index) => (_jsx("p", { className: "last:mb-0", children: error }, index))) })] }))] }));
}
