"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useFileUpload, } from "../../hooks/use-file-upload.jsx";
import { Alert, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern({ maxSize = 5 * 1024 * 1024, // 5MB default
accept = "image/*", className, onImageChange, }) {
    // Default cover image
    const defaultCoverImage = {
        id: "default-cover",
        name: "cover-image.jpg",
        size: 2048000,
        type: "image/jpeg",
        url: "/reui-assets/images/2f95edd007f2710283bc.jpg",
    };
    const [coverImage, setCoverImage] = useState({
        id: defaultCoverImage.id,
        file: defaultCoverImage,
        preview: defaultCoverImage.url,
    });
    const [imageLoading, setImageLoading] = useState(true);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [{ isDragging, errors }, { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps, },] = useFileUpload({
        maxFiles: 1,
        maxSize,
        accept,
        multiple: false,
        onFilesChange: (files) => {
            if (files.length > 0) {
                setImageLoading(true);
                setIsUploading(true);
                setUploadProgress(0);
                setUploadError(null);
                setCoverImage(files[0]);
                onImageChange?.(files[0].file);
                // Simulate upload progress
                simulateUpload();
            }
        },
    });
    // Simulate upload progress
    const simulateUpload = () => {
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    // Simulate occasional upload failure (10% chance)
                    if (Math.random() < 0.1) {
                        setUploadError("Upload failed. Please try again.");
                        return 0;
                    }
                    return 100;
                }
                // Random progress increment between 5-15%
                const increment = Math.random() * 10 + 5;
                return Math.min(prev + increment, 100);
            });
        }, 200);
    };
    const removeCoverImage = () => {
        setCoverImage(null);
        setImageLoading(false);
        setIsUploading(false);
        setUploadProgress(0);
        setUploadError(null);
        onImageChange?.(null);
    };
    const retryUpload = () => {
        if (coverImage) {
            setUploadError(null);
            setIsUploading(true);
            setUploadProgress(0);
            simulateUpload();
        }
    };
    const hasImage = coverImage && coverImage.preview;
    return (_jsxs("div", { className: cn("w-full space-y-4", className), children: [_jsxs("div", { className: cn("group border-border rounded-xl relative overflow-hidden border transition-all duration-200", isDragging
                    ? "border-primary bg-primary/5 border-dashed"
                    : hasImage
                        ? "border-border bg-background hover:border-primary/50"
                        : "border-muted-foreground/25 bg-muted/30 hover:border-primary hover:bg-primary/5 border-dashed"), onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop, children: [_jsx("input", { ...getInputProps(), className: "sr-only" }), hasImage ? (_jsx(_Fragment, { children: _jsxs("div", { className: "relative aspect-21/9 w-full", children: [imageLoading && (_jsx("div", { className: "bg-muted absolute inset-0 flex animate-pulse items-center justify-center", children: _jsxs("div", { className: "text-muted-foreground flex flex-col items-center gap-2", children: [_jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine", className: "size-5" }), _jsx("span", { className: "text-sm", children: "Loading image..." })] }) })), _jsx("img", { src: coverImage.preview, alt: "Cover", className: cn("h-full w-full object-cover transition-opacity duration-300", imageLoading ? "opacity-0" : "opacity-100"), onLoad: () => setImageLoading(false), onError: () => setImageLoading(false) }), _jsx("div", { className: "absolute inset-0 bg-black/0 transition-all duration-200 group-hover:bg-black/40" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100", children: _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: openFileDialog, size: "sm", variant: "outline", children: [_jsx(IconPlaceholder, { lucide: "UploadIcon", tabler: "IconUpload", hugeicons: "Upload01Icon", phosphor: "UploadSimple", remixicon: "RiUpload2Line" }), "Change Cover"] }), _jsxs(Button, { onClick: removeCoverImage, size: "sm", children: [_jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine" }), "Remove"] })] }) }), isUploading && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40", children: _jsxs("div", { className: "relative", children: [_jsxs("svg", { className: "size-16 -rotate-90", viewBox: "0 0 64 64", children: [_jsx("circle", { cx: "32", cy: "32", r: "28", fill: "none", stroke: "currentColor", strokeWidth: "4", className: "text-white/20" }), _jsx("circle", { cx: "32", cy: "32", r: "28", fill: "none", stroke: "currentColor", strokeWidth: "4", strokeDasharray: `${2 * Math.PI * 28}`, strokeDashoffset: `${2 * Math.PI * 28 * (1 - uploadProgress / 100)}`, className: "text-white transition-all duration-300", strokeLinecap: "round" })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("span", { className: "text-sm font-medium text-white", children: [Math.round(uploadProgress), "%"] }) })] }) }))] }) })) : (
                    /* Empty State */
                    _jsxs("div", { className: "flex aspect-21/9 w-full cursor-pointer flex-col items-center justify-center gap-4 p-8 text-center", onClick: openFileDialog, children: [_jsx("div", { className: "bg-primary/10 rounded-full p-4", children: _jsx(IconPlaceholder, { lucide: "CloudUploadIcon", tabler: "IconCloudUpload", hugeicons: "CloudUploadIcon", phosphor: "CloudArrowUpIcon", remixicon: "RiUploadCloud2Line", className: "text-primary size-8" }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Upload Cover Image" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Drag and drop an image here, or click to browse" }), _jsx("p", { className: "text-muted-foreground text-xs", children: "Recommended size: 1200x514px \u2022 Max size: 5MB" })] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine" }), "Browse Files"] })] }))] }), errors.length > 0 && (_jsxs(Alert, { variant: "destructive", className: "mt-5", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine" }), _jsx(AlertTitle, { children: "File upload error(s)" }), _jsx(AlertDescription, { children: errors.map((error, index) => (_jsx("p", { className: "last:mb-0", children: error }, index))) })] })), uploadError && (_jsxs(Alert, { variant: "destructive", className: "mt-5", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine" }), _jsx(AlertTitle, { children: "Upload failed" }), _jsxs(AlertDescription, { children: [_jsx("p", { children: uploadError }), _jsx(Button, { onClick: retryUpload, size: "sm", children: "Retry Upload" })] })] })), _jsxs("div", { className: "bg-muted/50 rounded-lg p-4", children: [_jsx("h4", { className: "mb-2 text-sm font-medium", children: "Cover Image Guidelines" }), _jsxs("ul", { className: "text-muted-foreground space-y-1 text-xs", children: [_jsx("li", { children: "\u2022 Use high-quality images with good lighting and composition" }), _jsx("li", { children: "\u2022 Recommended aspect ratio: 21:9 (ultrawide) for best results" }), _jsx("li", { children: "\u2022 Avoid images with important content near the edges" }), _jsx("li", { children: "\u2022 Supported formats: JPG, PNG, WebP" })] })] })] }));
}
