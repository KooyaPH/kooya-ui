"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatBytes, useFileUpload, } from "../../hooks/use-file-upload.jsx";
import { Alert, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern({ maxFiles = 3, maxSize = 2 * 1024 * 1024, // 2MB
accept = "image/*", multiple = true, className, onFilesChange, }) {
    const [{ files, isDragging, errors }, { removeFile, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps, },] = useFileUpload({
        maxFiles,
        maxSize,
        accept,
        multiple,
        onFilesChange,
    });
    const isImage = (file) => {
        const type = file instanceof File ? file.type : file.type;
        return type.startsWith("image/");
    };
    return (_jsxs("div", { className: cn("w-full max-w-lg", className), children: [_jsxs("div", { className: cn("border-border rounded-lg flex items-center gap-3 border border-dashed p-4 transition-colors", isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"), onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop, children: [_jsx("input", { ...getInputProps(), className: "sr-only" }), _jsxs(Button, { onClick: openFileDialog, size: "sm", className: cn(isDragging && "animate-bounce"), children: [_jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine", className: "h-4 w-4" }), "Add files"] }), _jsx("div", { className: "flex flex-1 items-center gap-2", children: files.length === 0 ? (_jsxs("p", { className: "text-muted-foreground text-sm", children: ["Drop files here or click to browse (max ", maxFiles, " files)"] })) : (files.map((fileItem) => (_jsxs("div", { className: "group/item relative shrink-0", children: [isImage(fileItem.file) && fileItem.preview ? (_jsx("img", { src: fileItem.preview, alt: fileItem.file.name, className: "h-12 w-12 rounded-lg border object-cover", title: `${fileItem.file.name} (${formatBytes(fileItem.file.size)})` })) : (_jsx("div", { className: "bg-muted flex h-12 w-12 items-center justify-center rounded-lg border", title: `${fileItem.file.name} (${formatBytes(fileItem.file.size)})`, children: _jsx(IconPlaceholder, { lucide: "FileIcon", tabler: "IconFile", hugeicons: "FileEmpty02Icon", phosphor: "FileIcon", remixicon: "RiFileLine", className: "text-muted-foreground h-5 w-5" }) })), _jsx(Button, { onClick: () => removeFile(fileItem.id), variant: "outline", size: "icon", className: "absolute -end-2 -top-2 size-5 rounded-full opacity-0 shadow-md transition-opacity group-hover/item:opacity-100", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "size-3" }) })] }, fileItem.id)))) }), files.length > 0 && (_jsxs("div", { className: "text-muted-foreground shrink-0 text-xs", children: [files.length, "/", maxFiles] }))] }), errors.length > 0 && (_jsxs(Alert, { variant: "destructive", className: "mt-5", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine" }), _jsx(AlertTitle, { children: "File upload error(s)" }), _jsx(AlertDescription, { children: errors.map((error, index) => (_jsx("p", { className: "last:mb-0", children: error }, index))) })] }))] }));
}
