"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { formatBytes, useFileUpload, } from "../../hooks/use-file-upload.jsx";
import { Alert, AlertAction, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Progress } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern({ maxFiles = 5, maxSize = 10 * 1024 * 1024, // 10MB
accept = "*", multiple = true, className, onFilesChange, simulateUpload = true, }) {
    // Create default images using FileMetadata type
    const defaultImages = [
        {
            id: "default-3",
            name: "image-1.png",
            size: 42048,
            type: "image/png",
            url: "/reui-assets/images/b7c3c9f06c829166588e.jpg0",
        },
        {
            id: "default-4",
            name: "image-2.png",
            size: 62807,
            type: "image/png",
            url: "/reui-assets/images/b7c3c9f06c829166588e.jpg1",
        },
    ];
    // Convert default images to FileUploadItem format
    const defaultUploadFiles = defaultImages.map((image) => ({
        id: image.id,
        file: {
            name: image.name,
            size: image.size,
            type: image.type,
        },
        preview: image.url,
        progress: 100,
        status: "completed",
    }));
    const [uploadFiles, setUploadFiles] = useState(defaultUploadFiles);
    const [{ isDragging, errors }, { removeFile, clearFiles, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps, },] = useFileUpload({
        maxFiles,
        maxSize,
        accept,
        multiple,
        initialFiles: defaultImages,
        onFilesChange: (newFiles) => {
            // Convert to upload items when files change, preserving existing status
            const newUploadFiles = newFiles.map((file) => {
                // Check if this file already exists in uploadFiles
                const existingFile = uploadFiles.find((existing) => existing.id === file.id);
                if (existingFile) {
                    // Preserve existing file status and progress
                    return {
                        ...existingFile,
                        ...file, // Update any changed properties from the file
                    };
                }
                else {
                    // New file - set to uploading
                    return {
                        ...file,
                        progress: 0,
                        status: "uploading",
                    };
                }
            });
            setUploadFiles(newUploadFiles);
            onFilesChange?.(newFiles);
        },
    });
    // Simulate upload progress
    useEffect(() => {
        if (!simulateUpload)
            return;
        const interval = setInterval(() => {
            setUploadFiles((prev) => prev.map((file) => {
                if (file.status !== "uploading")
                    return file;
                const increment = Math.random() * 15 + 5; // 5-20% increment
                const newProgress = Math.min(file.progress + increment, 100);
                // Simulate occasional errors (10% chance when progress > 50%)
                if (newProgress > 50 && Math.random() < 0.1) {
                    return {
                        ...file,
                        status: "error",
                        error: "Upload failed. Please try again.",
                    };
                }
                // Complete when progress reaches 100%
                if (newProgress >= 100) {
                    return {
                        ...file,
                        progress: 100,
                        status: "completed",
                    };
                }
                return {
                    ...file,
                    progress: newProgress,
                };
            }));
        }, 500);
        return () => clearInterval(interval);
    }, [simulateUpload]);
    const retryUpload = (fileId) => {
        setUploadFiles((prev) => prev.map((file) => file.id === fileId
            ? {
                ...file,
                progress: 0,
                status: "uploading",
                error: undefined,
            }
            : file));
    };
    const removeUploadFile = (fileId) => {
        setUploadFiles((prev) => prev.filter((file) => file.id !== fileId));
        removeFile(fileId);
    };
    const getFileIcon = (file) => {
        const type = file instanceof File ? file.type : file.type;
        if (type.startsWith("image/"))
            return (_jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine", className: "size-4" }));
        if (type.startsWith("video/"))
            return (_jsx(IconPlaceholder, { lucide: "VideoIcon", tabler: "IconVideo", hugeicons: "Video02Icon", phosphor: "VideoCameraIcon", remixicon: "RiVideoOnLine", className: "size-4" }));
        if (type.startsWith("audio/"))
            return (_jsx(IconPlaceholder, { lucide: "HeadphonesIcon", tabler: "IconHeadphones", hugeicons: "HeadphonesIcon", phosphor: "Headphones", remixicon: "RiCustomerServiceLine", className: "size-4" }));
        if (type.includes("pdf"))
            return (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "size-4" }));
        if (type.includes("word") || type.includes("doc"))
            return (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "size-4" }));
        if (type.includes("excel") || type.includes("sheet"))
            return (_jsx(IconPlaceholder, { lucide: "FileSpreadsheetIcon", tabler: "IconFileSpreadsheet", hugeicons: "GoogleSheetIcon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "size-4" }));
        if (type.includes("zip") || type.includes("rar"))
            return (_jsx(IconPlaceholder, { lucide: "FileArchiveIcon", tabler: "IconFileZip", hugeicons: "ArchiveIcon", phosphor: "FileArchive", remixicon: " RiFileZipLine", className: "size-4" }));
        return (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "size-4" }));
    };
    const completedCount = uploadFiles.filter((f) => f.status === "completed").length;
    const errorCount = uploadFiles.filter((f) => f.status === "error").length;
    const uploadingCount = uploadFiles.filter((f) => f.status === "uploading").length;
    return (_jsxs("div", { className: cn("w-full max-w-2xl", className), children: [_jsxs("div", { className: cn("rounded-lg relative border border-dashed p-8 text-center transition-colors", isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"), onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop, children: [_jsx("input", { ...getInputProps(), className: "sr-only" }), _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("div", { className: cn("flex h-16 w-16 items-center justify-center rounded-full", isDragging ? "bg-primary/10" : "bg-muted"), children: _jsx(IconPlaceholder, { lucide: "UploadIcon", tabler: "IconUpload", hugeicons: "Upload01Icon", phosphor: "UploadSimple", remixicon: "RiUpload2Line", className: cn("h-6", isDragging ? "text-primary" : "text-muted-foreground") }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Upload your files" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Drag and drop files here or click to browse" }), _jsxs("p", { className: "text-muted-foreground text-xs", children: ["Support for multiple file types up to ", formatBytes(maxSize), " each"] })] }), _jsxs(Button, { onClick: openFileDialog, children: [_jsx(IconPlaceholder, { lucide: "UploadIcon", tabler: "IconUpload", hugeicons: "Upload01Icon", phosphor: "UploadSimple", remixicon: "RiUpload2Line", className: "h-4 w-4" }), "Select files"] })] })] }), uploadFiles.length > 0 && (_jsxs("div", { className: "mt-6 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h4", { className: "text-sm font-medium", children: "Upload Progress" }), _jsxs("div", { className: "flex items-center gap-2", children: [completedCount > 0 && (_jsxs(Badge, { size: "sm", variant: "success-light", children: ["Completed: ", completedCount] })), errorCount > 0 && (_jsxs(Badge, { size: "sm", variant: "destructive", children: ["Failed: ", errorCount] })), uploadingCount > 0 && (_jsxs(Badge, { size: "sm", variant: "secondary", children: ["Uploading: ", uploadingCount] }))] })] }), _jsx(Button, { onClick: clearFiles, variant: "outline", size: "sm", children: "Clear all" })] })), uploadFiles.length > 0 && (_jsx("div", { className: "mt-4 space-y-3", children: uploadFiles.map((fileItem) => (_jsx("div", { className: "border-border bg-card rounded-lg border p-2.5", children: _jsxs("div", { className: "flex items-start gap-2.5", children: [_jsx("div", { className: "shrink-0", children: fileItem.preview &&
                                    fileItem.file.type.startsWith("image/") ? (_jsx("img", { src: fileItem.preview, alt: fileItem.file.name, className: "rounded-lg h-12 w-12 border object-cover" })) : (_jsx("div", { className: "border-border text-muted-foreground rounded-lg flex h-12 w-12 items-center justify-center border", children: getFileIcon(fileItem.file) })) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "mt-0.75 flex items-center justify-between", children: [_jsxs("p", { className: "inline-flex flex-col justify-center gap-1 truncate font-medium", children: [_jsx("span", { className: "text-sm", children: fileItem.file.name }), _jsx("span", { className: "text-muted-foreground text-xs", children: formatBytes(fileItem.file.size) })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsx(Button, { onClick: () => removeUploadFile(fileItem.id), variant: "ghost", size: "icon", className: "text-muted-foreground size-6 hover:bg-transparent hover:opacity-100", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "size-4" }) }) })] }), fileItem.status === "uploading" && (_jsx("div", { className: "mt-2", children: _jsx(Progress, { value: fileItem.progress, className: "h-1" }) })), fileItem.status === "error" && fileItem.error && (_jsxs(Alert, { variant: "destructive", className: "mt-2 px-2 py-1", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine", className: "size-4" }), _jsx(AlertTitle, { className: "text-xs", children: fileItem.error }), _jsx(AlertAction, { children: _jsx(Button, { onClick: () => retryUpload(fileItem.id), variant: "ghost", size: "icon", className: "text-muted-foreground size-6 hover:bg-transparent hover:opacity-100", children: _jsx(IconPlaceholder, { lucide: "RefreshCwIcon", tabler: "IconRefreshDot", hugeicons: "Refresh04Icon", phosphor: "ArrowsClockwiseIcon", remixicon: "RiRestartLine", className: "size-3.5" }) }) })] }))] })] }) }, fileItem.id))) })), errors.length > 0 && (_jsxs(Alert, { variant: "destructive", className: "mt-5", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine" }), _jsx(AlertTitle, { children: "File upload error(s)" }), _jsx(AlertDescription, { children: errors.map((error, index) => (_jsx("p", { className: "last:mb-0", children: error }, index))) })] }))] }));
}
