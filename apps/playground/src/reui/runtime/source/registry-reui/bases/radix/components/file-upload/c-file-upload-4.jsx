"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { formatBytes, useFileUpload, } from "../../hooks/use-file-upload.jsx";
import { Alert, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "../../../../../../../adapters/overlays.tsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern({ maxFiles = 10, maxSize = 5 * 1024 * 1024, // 5MB
accept = "image/*", multiple = true, className, onFilesChange, }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loadingImages, setLoadingImages] = useState({});
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    // Create default images using FileMetadata type
    const defaultImages = [
        {
            id: "default-1",
            name: "avatar-1.png",
            size: 44608,
            type: "image/png",
            url: "/reui-assets/images/4f41a12efd16457b54ec.jpg",
        },
        {
            id: "default-2",
            name: "avatar-2.png",
            size: 42144,
            type: "image/png",
            url: "/reui-assets/images/aa10dc784f36ad6e5b3a.jpg",
        },
        {
            id: "default-3",
            name: "avatar-2.png",
            size: 42144,
            type: "image/png",
            url: "/reui-assets/images/7caf482692869f151ae0.jpg",
        },
    ];
    const [{ files, isDragging, errors }, { removeFile, clearFiles, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps, },] = useFileUpload({
        maxFiles,
        maxSize,
        accept,
        multiple,
        initialFiles: defaultImages,
        onFilesChange,
    });
    const isImage = (file) => {
        const type = file instanceof File ? file.type : file.type;
        return type.startsWith("image/");
    };
    return (_jsxs("div", { className: cn("w-full max-w-4xl", className), children: [_jsxs("div", { className: cn("relative rounded-lg border border-dashed p-8 text-center transition-colors", isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"), onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop, children: [_jsx("input", { ...getInputProps(), className: "sr-only" }), _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("div", { className: cn("flex h-16 w-16 items-center justify-center rounded-full", isDragging ? "bg-primary/10" : "bg-muted"), children: _jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine", className: cn("h-5 w-5", isDragging ? "text-primary" : "text-muted-foreground") }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Upload images to gallery" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Drag and drop images here or click to browse" }), _jsxs("p", { className: "text-muted-foreground text-xs", children: ["PNG, JPG, GIF up to ", formatBytes(maxSize), " each (max ", maxFiles, " ", "files)"] })] }), _jsxs(Button, { onClick: openFileDialog, children: [_jsx(IconPlaceholder, { lucide: "UploadIcon", tabler: "IconUpload", hugeicons: "Upload01Icon", phosphor: "UploadSimple", remixicon: "RiUpload2Line", className: "h-4 w-4" }), "Select images"] })] })] }), files.length > 0 && (_jsxs("div", { className: "mt-6 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("h4", { className: "text-sm font-medium", children: ["Gallery (", files.length, "/", maxFiles, ")"] }), _jsxs("div", { className: "text-muted-foreground text-xs", children: ["Total:", " ", formatBytes(files.reduce((acc, file) => acc + file.file.size, 0))] })] }), _jsx(Button, { onClick: clearFiles, variant: "outline", size: "sm", children: "Clear all" })] })), files.length > 0 && (_jsx("div", { className: "mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4", children: files.map((fileItem) => (_jsxs("div", { className: "group/item relative aspect-square", children: [isImage(fileItem.file) && fileItem.preview ? (_jsxs(_Fragment, { children: [loadingImages[fileItem.id] !== false && (_jsx("div", { className: "bg-muted/50 absolute inset-0 flex items-center justify-center rounded-lg border", children: _jsx(Spinner, { className: "text-muted-foreground size-6" }) })), _jsx("img", { src: fileItem.preview, alt: fileItem.file.name, onLoad: () => setLoadingImages((prev) => ({
                                        ...prev,
                                        [fileItem.id]: false,
                                    })), className: cn("h-full w-full rounded-lg border object-cover transition-all group-hover/item:scale-105", loadingImages[fileItem.id] !== false
                                        ? "opacity-0"
                                        : "opacity-100") })] })) : (_jsx("div", { className: "bg-muted flex h-full w-full items-center justify-center rounded-lg border", children: _jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine", className: "text-muted-foreground h-8 w-8" }) })), _jsxs("div", { className: "absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover/item:opacity-100", children: [fileItem.preview && (_jsx(Button, { onClick: () => {
                                        setSelectedImage(fileItem.preview);
                                        setIsPreviewLoading(true);
                                    }, variant: "secondary", size: "icon", className: "size-7", children: _jsx(IconPlaceholder, { lucide: "ZoomInIcon", tabler: "IconZoomIn", hugeicons: "SearchAddIcon", phosphor: "MagnifyingGlassPlusIcon", remixicon: "RiZoomInLine" }) })), _jsx(Button, { onClick: () => removeFile(fileItem.id), variant: "secondary", size: "icon", className: "size-7", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine" }) })] }), _jsxs("div", { className: "absolute right-0 bottom-0 left-0 rounded-b-lg bg-black/70 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100", children: [_jsx("p", { className: "truncate text-xs font-medium", children: fileItem.file.name }), _jsx("p", { className: "text-xs text-gray-300", children: formatBytes(fileItem.file.size) })] })] }, fileItem.id))) })), errors.length > 0 && (_jsxs(Alert, { variant: "destructive", className: "mt-5", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine" }), _jsx(AlertTitle, { children: "File upload error(s)" }), _jsx(AlertDescription, { children: errors.map((error, index) => (_jsx("p", { className: "last:mb-0", children: error }, index))) })] })), _jsx(Dialog, { open: !!selectedImage, onOpenChange: (open) => !open && setSelectedImage(null), children: _jsxs(DialogContent, { className: "[&_[data-slot=dialog-close]]:text-muted-foreground [&_[data-slot=dialog-close]]:hover:text-foreground [&_[data-slot=dialog-close]]:bg-background w-full border-none bg-transparent p-0 shadow-none sm:max-w-xl [&_[data-slot=dialog-close]]:-end-7 [&_[data-slot=dialog-close]]:-top-7 [&_[data-slot=dialog-close]]:size-7 [&_[data-slot=dialog-close]]:rounded-full", children: [_jsx(DialogHeader, { className: "sr-only", children: _jsx(DialogTitle, { children: "Image Preview" }) }), _jsx("div", { className: "flex items-center justify-center", children: selectedImage && (_jsxs(_Fragment, { children: [isPreviewLoading && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx(Spinner, { className: "size-8 text-white" }) })), _jsx("img", { src: selectedImage, alt: "Preview", onLoad: () => setIsPreviewLoading(false), className: cn("h-full w-auto rounded-lg object-contain transition-opacity duration-300", isPreviewLoading ? "opacity-0" : "opacity-100") })] })) })] }) })] }));
}
