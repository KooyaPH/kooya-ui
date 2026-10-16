"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { formatBytes, useFileUpload, } from "../../hooks/use-file-upload.jsx";
import { Alert, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern({ maxFiles = 10, maxSize = 50 * 1024 * 1024, // 50MB
accept = "*", multiple = true, className, onFilesChange, simulateUpload = true, }) {
    // Create default files using FileMetadata type
    const defaultFiles = [
        {
            id: "default-card-1",
            name: "intro.zip",
            size: 252846,
            type: "application/zip",
            url: "/media/files/intro.zip",
        },
        {
            id: "default-card-2",
            name: "image-01.jpg",
            size: 1536000,
            type: "image/jpeg",
            url: "/reui-assets/images/2f95edd007f2710283bc.jpg",
        },
        {
            id: "default-card-3",
            name: "audio.mp3",
            size: 1536000,
            type: "audio/mpeg",
            url: "/media/files/audio.mp3",
        },
    ];
    // Convert default files to FileUploadItem format
    const defaultUploadFiles = defaultFiles.map((file) => ({
        id: file.id,
        file: {
            id: file.id,
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
            onFilesChange?.(newUploadFiles);
        },
    });
    // Simulate upload progress for new files
    useEffect(() => {
        if (!simulateUpload)
            return;
        const uploadingFiles = uploadFiles.filter((file) => file.status === "uploading");
        if (uploadingFiles.length === 0)
            return;
        const interval = setInterval(() => {
            setUploadFiles((prev) => prev.map((file) => {
                if (file.status !== "uploading")
                    return file;
                const increment = Math.random() * 20 + 5; // Random increment between 5-25%
                const newProgress = Math.min(file.progress + increment, 100);
                if (newProgress >= 100) {
                    // Simulate occasional failures (10% chance)
                    const shouldFail = Math.random() < 0.1;
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
    }, [uploadFiles, simulateUpload]);
    const removeUploadFile = (fileId) => {
        const fileToRemove = uploadFiles.find((f) => f.id === fileId);
        if (fileToRemove) {
            removeFile(fileToRemove.id);
        }
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
            return (_jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine", className: "text-muted-foreground size-4" }));
        if (type.startsWith("video/"))
            return (_jsx(IconPlaceholder, { lucide: "VideoIcon", tabler: "IconVideo", hugeicons: "Video02Icon", phosphor: "VideoCameraIcon", remixicon: "RiVideoOnLine" }));
        if (type.startsWith("audio/"))
            return (_jsx(IconPlaceholder, { lucide: "HeadphonesIcon", tabler: "IconHeadphones", hugeicons: "HeadphonesIcon", phosphor: "Headphones", remixicon: "RiCustomerServiceLine", className: "size-6" }));
        if (type.includes("pdf"))
            return (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "size-6" }));
        if (type.includes("word") || type.includes("doc"))
            return (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "size-6" }));
        if (type.includes("excel") || type.includes("sheet"))
            return (_jsx(IconPlaceholder, { lucide: "FileSpreadsheetIcon", tabler: "IconFileSpreadsheet", hugeicons: "GoogleSheetIcon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", className: "size-6" }));
        if (type.includes("zip") || type.includes("rar"))
            return (_jsx(IconPlaceholder, { lucide: "FileArchiveIcon", tabler: "IconFileZip", hugeicons: "ArchiveIcon", phosphor: "FileArchive", remixicon: "RiFileZipLine", className: "size-6" }));
        return (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine" }));
    };
    return (_jsxs("div", { className: cn("w-full space-y-4", className), children: [_jsxs("div", { className: cn("rounded-lg relative border border-dashed p-6 text-center transition-colors", isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"), onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop, children: [_jsx("input", { ...getInputProps(), className: "sr-only" }), _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("div", { className: cn("bg-muted flex h-12 w-12 items-center justify-center rounded-full transition-colors", isDragging
                                    ? "border-primary bg-primary/10"
                                    : "border-muted-foreground/25"), children: _jsx(IconPlaceholder, { lucide: "UploadIcon", tabler: "IconUpload", hugeicons: "Upload01Icon", phosphor: "UploadSimple", remixicon: "RiUpload2Line", className: "text-muted-foreground h-5 w-5" }) }), _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { className: "text-sm font-medium", children: ["Drop files here or", " ", _jsx("button", { type: "button", onClick: openFileDialog, className: "text-primary cursor-pointer underline-offset-4 hover:underline", children: "browse files" })] }), _jsxs("p", { className: "text-muted-foreground text-xs", children: ["Maximum file size: ", formatBytes(maxSize), " \u2022 Maximum files:", " ", maxFiles] })] })] })] }), uploadFiles.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "text-sm font-medium", children: ["Files (", uploadFiles.length, ")"] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: openFileDialog, variant: "outline", size: "sm", children: [_jsx(IconPlaceholder, { lucide: "CloudUploadIcon", tabler: "IconCloudUpload", hugeicons: "CloudUploadIcon", phosphor: "CloudArrowUpIcon", remixicon: "RiUploadCloud2Line" }), "Add files"] }), _jsxs(Button, { onClick: clearFiles, variant: "outline", size: "sm", children: [_jsx(IconPlaceholder, { lucide: "Trash2Icon", tabler: "IconTrash", hugeicons: "Delete02Icon", phosphor: "TrashIcon", remixicon: "RiDeleteBinLine" }), "Remove all"] })] })] }), _jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-4 lg:grid-cols-6", children: uploadFiles.map((fileItem) => (_jsxs("div", { className: "group/item relative", children: [_jsx(Button, { onClick: () => removeUploadFile(fileItem.id), variant: "outline", size: "icon", className: "absolute -end-2 -top-2 z-10 size-6 rounded-full opacity-0 transition-opacity group-hover/item:opacity-100 dark:bg-zinc-800 hover:dark:bg-zinc-700", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "size-3.5" }) }), _jsxs("div", { className: "bg-card rounded-lg relative overflow-hidden border transition-colors", children: [_jsx("div", { className: "bg-muted border-border relative aspect-square border-b", children: fileItem.file.type.startsWith("image/") &&
                                                fileItem.preview ? (_jsxs(_Fragment, { children: [_jsx("img", { src: fileItem.preview, alt: fileItem.file.name, className: "h-full w-full object-cover" }), fileItem.status === "uploading" && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50", children: _jsx("div", { className: "relative", children: _jsxs("svg", { className: "size-12 -rotate-90", viewBox: "0 0 48 48", children: [_jsx("circle", { cx: "24", cy: "24", r: "20", fill: "none", stroke: "currentColor", strokeWidth: "3", className: "text-muted/60" }), _jsx("circle", { cx: "24", cy: "24", r: "20", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeDasharray: `${2 * Math.PI * 20}`, strokeDashoffset: `${2 * Math.PI * 20 * (1 - fileItem.progress / 100)}`, className: "text-white transition-all duration-300", strokeLinecap: "round" })] }) }) }))] })) : (
                                            /* File icon area for non-images */
                                            _jsx("div", { className: "text-muted-foreground/80 flex h-full items-center justify-center", children: fileItem.status === "uploading" ? (_jsxs("div", { className: "relative", children: [_jsxs("svg", { className: "size-12 -rotate-90", viewBox: "0 0 48 48", children: [_jsx("circle", { cx: "24", cy: "24", r: "20", fill: "none", stroke: "currentColor", strokeWidth: "3", className: "text-muted-foreground/20" }), _jsx("circle", { cx: "24", cy: "24", r: "20", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeDasharray: `${2 * Math.PI * 20}`, strokeDashoffset: `${2 * Math.PI * 20 * (1 - fileItem.progress / 100)}`, className: "text-primary transition-all duration-300", strokeLinecap: "round" })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: getFileIcon(fileItem.file) })] })) : (_jsx("div", { className: "text-4xl", children: getFileIcon(fileItem.file) })) })) }), _jsx("div", { className: "p-3", children: _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "truncate text-sm font-medium", children: fileItem.file.name }), _jsxs("div", { className: "relative flex items-center justify-between gap-2", children: [_jsx("span", { className: "text-muted-foreground text-xs", children: formatBytes(fileItem.file.size) }), fileItem.status === "error" && fileItem.error && (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { onClick: () => retryUpload(fileItem.id), variant: "ghost", size: "icon", className: "text-destructive hover:bg-destructive/10 hover:text-destructive absolute end-0 -top-1.25 size-6", children: _jsx(IconPlaceholder, { lucide: "RefreshCwIcon", tabler: "IconRefreshDot", hugeicons: "Refresh04Icon", phosphor: "ArrowsClockwiseIcon", remixicon: "RiRestartLine", className: "size-3 opacity-100" }) }) }), _jsx(TooltipContent, { children: "Upload failed. Retry" })] }) }))] })] }) })] })] }, fileItem.id))) })] })), errors.length > 0 && (_jsxs(Alert, { variant: "destructive", className: "mt-5", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine" }), _jsx(AlertTitle, { children: "File upload error(s)" }), _jsx(AlertDescription, { children: errors.map((error, index) => (_jsx("p", { className: "last:mb-0", children: error }, index))) })] }))] }));
}
