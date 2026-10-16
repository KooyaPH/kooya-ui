"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle, } from "../../reui/alert.jsx";
import { Sortable, SortableItem, SortableItemHandle, } from "../../reui/sortable.jsx";
import { cn } from "cn";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Progress } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern({ maxFiles = 5, // Changed to 5 as per UI reference
maxSize = 10 * 1024 * 1024, // 10MB as per UI reference
accept = "image/*", className, onImagesChange, onUploadComplete, }) {
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errors, setErrors] = useState([]);
    const [allImages, setAllImages] = useState([
        {
            id: "default-1",
            src: "/reui-assets/images/c27612d0e011078f3ac0.jpg",
            alt: "Product view 1",
            type: "default",
        },
        {
            id: "default-2",
            src: "/reui-assets/images/e143a8adf2e1915a25e3.jpg",
            alt: "Product view 2",
            type: "default",
        },
        {
            id: "default-3",
            src: "/reui-assets/images/355afce7afc66d079f8e.jpg",
            alt: "Product view 3",
            type: "default",
        },
        {
            id: "default-4",
            src: "/reui-assets/images/f9b3942af8686e5dbdf6.jpg",
            alt: "Product view 4",
            type: "default",
        },
        {
            id: "default-5",
            src: "/reui-assets/images/b7c3c9f06c829166588e.jpg0",
            alt: "Product view 5",
            type: "default",
        },
    ]);
    // Helper function to create SortableImage from ImageFile
    const createSortableImage = useCallback((imageFile) => ({
        id: imageFile.id,
        src: imageFile.preview,
        alt: imageFile.file.name,
        type: "uploaded",
    }), []);
    // Ensure arrays never contain undefined items
    useEffect(() => {
        setAllImages((prev) => prev.filter((item) => item && item.id));
        setImages((prev) => prev.filter((item) => item && item.id));
    }, []);
    const validateFile = (file) => {
        if (!file.type.startsWith("image/")) {
            return "File must be an image";
        }
        if (file.size > maxSize) {
            return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
        }
        if (images.length >= maxFiles) {
            return `Maximum ${maxFiles} files allowed`;
        }
        return null;
    };
    const addImages = useCallback((files) => {
        const newImages = [];
        const newErrors = [];
        Array.from(files).forEach((file) => {
            const error = validateFile(file);
            if (error) {
                newErrors.push(`${file.name}: ${error}`);
                return;
            }
            const imageFile = {
                id: `${Date.now()}-${Math.random()}`,
                file,
                preview: URL.createObjectURL(file),
                progress: 0,
                status: "uploading",
            };
            newImages.push(imageFile);
        });
        if (newErrors.length > 0) {
            setErrors((prev) => [...prev, ...newErrors]);
        }
        if (newImages.length > 0) {
            const updatedImages = [...images, ...newImages];
            setImages(updatedImages);
            onImagesChange?.(updatedImages);
            // Add new images to allImages for sorting
            const newSortableImages = newImages.map(createSortableImage);
            setAllImages((prev) => [...prev, ...newSortableImages]);
            // Simulate upload progress
            newImages.forEach((imageFile) => {
                simulateUpload(imageFile);
            });
        }
    }, [images, maxSize, maxFiles, onImagesChange, createSortableImage]);
    const simulateUpload = (imageFile) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setImages((prev) => prev.map((img) => img.id === imageFile.id
                    ? { ...img, progress: 100, status: "completed" }
                    : img));
                // Check if all uploads are complete
                const updatedImages = images.map((img) => img.id === imageFile.id
                    ? { ...img, progress: 100, status: "completed" }
                    : img);
                if (updatedImages.every((img) => img.status === "completed")) {
                    onUploadComplete?.(updatedImages);
                }
            }
            else {
                setImages((prev) => prev.map((img) => img.id === imageFile.id ? { ...img, progress } : img));
            }
        }, 100);
    };
    const removeImage = useCallback((id) => {
        // Remove from allImages
        setAllImages((prev) => prev.filter((img) => img.id !== id));
        // If it's an uploaded image, also remove from images array and revoke URL
        const uploadedImage = images.find((img) => img.id === id);
        if (uploadedImage) {
            URL.revokeObjectURL(uploadedImage.preview);
            setImages((prev) => prev.filter((img) => img.id !== id));
        }
    }, [images]);
    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            addImages(files);
        }
    }, [addImages]);
    const openFileDialog = useCallback(() => {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = true;
        input.accept = accept;
        input.onchange = (e) => {
            const target = e.target;
            if (target.files) {
                addImages(target.files);
            }
        };
        input.click();
    }, [accept, addImages]);
    const formatBytes = (bytes) => {
        if (bytes === 0)
            return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };
    return (_jsxs("div", { className: cn("w-full max-w-4xl", className), children: [_jsx("div", { className: "mb-4 text-center", children: _jsxs("p", { className: "text-muted-foreground text-sm", children: ["Upload up to ", maxFiles, " images (JPG, PNG, GIF, WebP, max", " ", formatBytes(maxSize), " each). ", _jsx("br", {}), "Drag and drop images to reorder.", images.length > 0 && ` ${images.length}/${maxFiles} uploaded.`] }) }), _jsx("div", { className: "mb-6", children: _jsx(Sortable, { value: allImages.map((item) => item.id), onValueChange: (newItemIds) => {
                        // Reconstruct the allImages array based on the new order
                        const newAllImages = newItemIds
                            .map((itemId) => {
                            // First try to find in allImages (default images)
                            const existingImage = allImages.find((img) => img.id === itemId);
                            if (existingImage)
                                return existingImage;
                            // If not found, it's a newly uploaded image
                            const uploadedImage = images.find((img) => img.id === itemId);
                            if (uploadedImage) {
                                return createSortableImage(uploadedImage);
                            }
                            return null;
                        })
                            .filter((item) => item !== null);
                        setAllImages(newAllImages);
                        toast.success("Images reordered successfully!", {
                            duration: 3000,
                        });
                    }, getItemValue: (item) => item, strategy: "grid", className: "grid auto-rows-fr grid-cols-5 gap-2.5", children: allImages.map((item) => (_jsx(SortableItem, { value: item.id, children: _jsxs("div", { className: "bg-accent/50 group/item border-border hover:bg-accent/70 relative flex shrink-0 items-center justify-center rounded-md border shadow-none transition-all duration-200 hover:z-10 data-[dragging=true]:z-50", children: [_jsx("img", { src: item.src, className: "pointer-events-none h-[120px] w-full rounded-md object-cover", alt: item.alt }), _jsx(SortableItemHandle, { className: "absolute start-2 top-2 cursor-grab opacity-0 group-hover/item:opacity-100 active:cursor-grabbing", children: _jsx(Button, { variant: "outline", size: "icon", className: "size-6 rounded-full dark:bg-zinc-800 hover:dark:bg-zinc-700", children: _jsx(IconPlaceholder, { lucide: "GripVerticalIcon", tabler: "IconGripVertical", hugeicons: "DragDropVerticalIcon", phosphor: "DotsSixVerticalIcon", remixicon: "RiDraggable", className: "size-3.5" }) }) }), _jsx(Button, { onClick: () => removeImage(item.id), variant: "outline", size: "icon", className: "absolute end-2 top-2 size-6 rounded-full opacity-0 shadow-sm group-hover/item:opacity-100 dark:bg-zinc-800 hover:dark:bg-zinc-700", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "size-3.5" }) })] }) }, item.id))) }) }), _jsx(Card, { className: cn("rounded-md border-dashed shadow-none transition-colors", isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"), onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop, children: _jsxs(CardContent, { className: "text-center", children: [_jsx("div", { className: "border-border mx-auto mb-3 flex size-[32px] items-center justify-center rounded-full border", children: _jsx(IconPlaceholder, { lucide: "CloudUploadIcon", tabler: "IconCloudUpload", hugeicons: "CloudUploadIcon", phosphor: "CloudArrowUpIcon", remixicon: "RiUploadCloud2Line", className: "size-4" }) }), _jsx("h3", { className: "text-foreground mb-0.5 text-sm font-medium", children: "Choose a file or drag & drop here." }), _jsxs("span", { className: "text-secondary-foreground mb-3 block text-xs font-normal", children: ["JPEG, PNG, up to ", formatBytes(maxSize), "."] }), _jsx(Button, { size: "sm", onClick: openFileDialog, children: "Browse File" })] }) }), images.length > 0 && (_jsx("div", { className: "mt-6 space-y-3", children: images.map((imageFile) => (_jsx(Card, { className: "rounded-md shadow-none", children: _jsxs(CardContent, { className: "flex items-center gap-2 p-2.5", children: [_jsx("div", { className: "border-border flex size-[32px] shrink-0 items-center justify-center rounded-md border", children: _jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine", className: "text-muted-foreground size-4" }) }), _jsxs("div", { className: "flex w-full flex-col gap-1.5", children: [_jsxs("div", { className: "-mt-2 flex w-full items-center justify-between gap-2.5", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("span", { className: "text-foreground text-xs leading-none font-medium", children: imageFile.file.name }), _jsx("span", { className: "text-muted-foreground text-xs leading-none font-normal", children: formatBytes(imageFile.file.size) }), imageFile.status === "uploading" && (_jsxs("p", { className: "text-muted-foreground text-xs", children: ["Uploading... ", Math.round(imageFile.progress), "%"] }))] }), _jsx(Button, { onClick: () => removeImage(imageFile.id), variant: "ghost", size: "icon", className: "size-6", children: _jsx(IconPlaceholder, { lucide: "CircleXIcon", tabler: "IconCircleX", hugeicons: "CancelCircleIcon", phosphor: "XCircleIcon", remixicon: "RiCloseCircleLine", className: "size-3.5" }) })] }), _jsx(Progress, { value: imageFile.progress, className: cn("h-1 transition-all duration-300", "[&>div]:bg-zinc-950 dark:[&>div]:bg-zinc-50") })] })] }) }, imageFile.id))) })), errors.length > 0 && (_jsxs(Alert, { variant: "destructive", className: "mt-5", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine" }), _jsx(AlertTitle, { children: "File upload error(s)" }), _jsx(AlertDescription, { children: errors.map((error, index) => (_jsx("p", { className: "last:mb-0", children: error }, index))) })] }))] }));
}
