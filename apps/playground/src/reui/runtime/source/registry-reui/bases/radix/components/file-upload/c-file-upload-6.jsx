"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { formatBytes, useFileUpload, } from "../../hooks/use-file-upload.jsx";
import { Alert, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern({ maxFiles = 10, maxSize = 50 * 1024 * 1024, // 50MB
accept = "*", multiple = true, className, onFilesChange, simulateUpload = true, }) {
    // Create default files using FileMetadata type
    const defaultFiles = [
        {
            id: "default-doc-1",
            name: "document.pdf",
            size: 529254,
            type: "application/pdf",
            url: "/media/files/document.pdf",
        },
        {
            id: "default-doc-2",
            name: "intro.zip",
            size: 252846,
            type: "application/zip",
            url: "/media/files/intro.zip",
        },
        {
            id: "default-doc-3",
            name: "conclusion.xlsx",
            size: 353126,
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            url: "/media/files/conclusion.xlsx",
        },
        {
            id: "default-doc-4",
            name: "package.json",
            size: 697,
            type: "application/json",
            url: "/media/files/package.json",
        },
    ];
    // Convert default files to FileUploadItem format
    const defaultUploadFiles = defaultFiles.map((file) => ({
        id: file.id,
        file: {
            name: file.name,
            size: file.size,
            type: file.type,
        },
        preview: file.url,
        progress: 100,
        status: "completed",
    }));
    const [uploadFiles, setUploadFiles] = useState(defaultUploadFiles);
    const [{ isDragging, errors }, { removeFile, clearFiles, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps, },] = useFileUpload({
        maxFiles,
        maxSize,
        accept,
        multiple,
        initialFiles: defaultFiles,
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
                if (newProgress >= 100) {
                    // Randomly decide if upload succeeds or fails
                    const shouldFail = Math.random() < 0.1; // 10% chance to fail
                    return {
                        ...file,
                        progress: 100,
                        status: shouldFail ? "error" : "completed",
                        error: shouldFail
                            ? "Upload failed. Please try again."
                            : undefined,
                    };
                }
                return { ...file, progress: newProgress };
            }));
        }, 500);
        return () => clearInterval(interval);
    }, [simulateUpload]);
    const removeUploadFile = (fileId) => {
        setUploadFiles((prev) => prev.filter((file) => file.id !== fileId));
        removeFile(fileId);
    };
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
    const getFileTypeLabel = (file) => {
        const type = file instanceof File ? file.type : file.type;
        if (type.startsWith("image/"))
            return "Image";
        if (type.startsWith("video/"))
            return "Video";
        if (type.startsWith("audio/"))
            return "Audio";
        if (type.includes("pdf"))
            return "PDF";
        if (type.includes("word") || type.includes("doc"))
            return "Word";
        if (type.includes("excel") || type.includes("sheet"))
            return "Excel";
        if (type.includes("zip") || type.includes("rar"))
            return "Archive";
        if (type.includes("json"))
            return "JSON";
        if (type.includes("text"))
            return "Text";
        return "File";
    };
    return (_jsxs("div", { className: cn("w-full space-y-4", className), children: [_jsxs("div", { className: cn("relative rounded-lg border border-dashed p-6 text-center transition-colors", isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"), onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop, children: [_jsx("input", { ...getInputProps(), className: "sr-only" }), _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("div", { className: cn("bg-muted flex h-12 w-12 items-center justify-center rounded-full transition-colors", isDragging
                                    ? "border-primary bg-primary/10"
                                    : "border-muted-foreground/25"), children: _jsx(IconPlaceholder, { lucide: "UploadIcon", tabler: "IconUpload", hugeicons: "Upload01Icon", phosphor: "UploadSimple", remixicon: "RiUpload2Line", className: "text-muted-foreground h-5 w-5" }) }), _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { className: "text-sm font-medium", children: ["Drop files here or", " ", _jsx("button", { type: "button", onClick: openFileDialog, className: "text-primary cursor-pointer underline-offset-4 hover:underline", children: "browse files" })] }), _jsxs("p", { className: "text-muted-foreground text-xs", children: ["Maximum file size: ", formatBytes(maxSize), " \u2022 Maximum files:", " ", maxFiles] })] })] })] }), uploadFiles.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "text-sm font-medium", children: ["Files (", uploadFiles.length, ")"] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: openFileDialog, variant: "outline", size: "sm", children: [_jsx(IconPlaceholder, { lucide: "CloudUploadIcon", tabler: "IconCloudUpload", hugeicons: "CloudUploadIcon", phosphor: "CloudArrowUpIcon", remixicon: "RiUploadCloud2Line", className: "h-4 w-4" }), "Add files"] }), _jsxs(Button, { onClick: clearFiles, variant: "outline", size: "sm", children: [_jsx(IconPlaceholder, { lucide: "Trash2Icon", tabler: "IconTrash", hugeicons: "Delete02Icon", phosphor: "TrashIcon", remixicon: "RiDeleteBinLine ", className: "h-4 w-4" }), "Remove all"] })] })] }), _jsx("div", { className: "rounded-lg border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "text-xs", children: [_jsx(TableHead, { className: "h-9 ps-4", children: "Name" }), _jsx(TableHead, { className: "h-9", children: "Type" }), _jsx(TableHead, { className: "h-9", children: "Size" }), _jsx(TableHead, { className: "h-9 w-[100px] ps-4", children: "Actions" })] }) }), _jsx(TableBody, { children: uploadFiles.map((fileItem) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "py-2 ps-1.5", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("div", { className: cn("text-muted-foreground/80 relative flex size-8 shrink-0 items-center justify-center"), children: fileItem.status === "uploading" ? (_jsxs("div", { className: "relative", children: [_jsxs("svg", { className: "size-8 -rotate-90", viewBox: "0 0 32 32", children: [_jsx("circle", { cx: "16", cy: "16", r: "14", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "text-muted-foreground/20" }), _jsx("circle", { cx: "16", cy: "16", r: "14", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeDasharray: `${2 * Math.PI * 14}`, strokeDashoffset: `${2 * Math.PI * 14 * (1 - fileItem.progress / 100)}`, className: "text-primary transition-all duration-300", strokeLinecap: "round" })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: getFileIcon(fileItem.file) })] })) : (_jsx("div", { className: "flex size-8 items-center justify-center", children: getFileIcon(fileItem.file) })) }), _jsxs("p", { className: "flex items-center gap-1 truncate text-sm font-medium", children: [fileItem.file.name, fileItem.status === "error" && (_jsx(Badge, { variant: "destructive-light", size: "sm", children: "Error" }))] })] }) }), _jsx(TableCell, { className: "py-2", children: _jsx(Badge, { variant: "secondary", className: "text-xs", children: getFileTypeLabel(fileItem.file) }) }), _jsx(TableCell, { className: "text-muted-foreground py-2 text-sm", children: formatBytes(fileItem.file.size) }), _jsx(TableCell, { className: "py-2", children: _jsxs("div", { className: "flex items-center gap-1", children: [fileItem.preview && (_jsx(Button, { size: "icon", variant: "ghost", className: "size-8", children: _jsx(IconPlaceholder, { lucide: "DownloadIcon", tabler: "IconDownload", hugeicons: "Download01Icon", phosphor: "DownloadSimpleIcon", remixicon: "RiDownload2Line", className: "size-3.5" }) })), fileItem.status === "error" ? (_jsx(Button, { onClick: () => retryUpload(fileItem.id), variant: "ghost", size: "icon", className: "text-destructive/80 hover:text-destructive size-8", children: _jsx(IconPlaceholder, { lucide: "RefreshCwIcon", tabler: "IconRefreshDot", hugeicons: "Refresh04Icon", phosphor: "ArrowsClockwiseIcon", remixicon: "RiRestartLine", className: "size-3.5" }) })) : (_jsx(Button, { onClick: () => removeUploadFile(fileItem.id), variant: "ghost", size: "icon", className: "size-8", children: _jsx(IconPlaceholder, { lucide: "Trash2Icon", tabler: "IconTrash", hugeicons: "Delete02Icon", phosphor: "TrashIcon", remixicon: "RiDeleteBinLine ", className: "size-3.5" }) }))] }) })] }, fileItem.id))) })] }) })] })), errors.length > 0 && (_jsxs(Alert, { variant: "destructive", className: "mt-5", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine" }), _jsx(AlertTitle, { children: "File upload error(s)" }), _jsx(AlertDescription, { children: errors.map((error, index) => (_jsx("p", { className: "last:mb-0", children: error }, index))) })] }))] }));
}
