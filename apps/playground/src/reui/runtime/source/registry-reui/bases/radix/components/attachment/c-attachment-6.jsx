"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatBytes, useFileUpload, } from "../../hooks/use-file-upload.jsx";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle, AttachmentTrigger, } from "../../../../../registry/bases/radix/ui/attachment.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const ICON_UPLOAD = (_jsx(IconPlaceholder, { lucide: "UploadIcon", tabler: "IconUpload", hugeicons: "Upload01Icon", phosphor: "UploadSimpleIcon", remixicon: "RiUploadLine", "aria-hidden": "true" }));
const ICON_FILE = (_jsx(IconPlaceholder, { lucide: "FileIcon", tabler: "IconFile", hugeicons: "FileEmpty02Icon", phosphor: "FileIcon", remixicon: "RiFileLine", "aria-hidden": "true" }));
const ICON_REMOVE = (_jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", "aria-hidden": "true" }));
export default function Pattern() {
    // The hook enforces the count and size limits and is what fills the errors
    // array below. Nothing here uploads: no endpoint, no submit button, so the
    // example cannot pretend to send what it has collected.
    const [{ files, errors }, { removeFile, openFileDialog, getInputProps }] = useFileUpload({
        multiple: true,
        maxFiles: 5,
        maxSize: 10 * 1024 * 1024,
        accept: "image/*,.pdf,.csv",
    });
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-2", children: [_jsxs(Attachment, { state: "idle", className: "w-full", children: [_jsx(AttachmentMedia, { children: ICON_UPLOAD }), _jsxs(AttachmentContent, { children: [_jsx(AttachmentTitle, { children: "Choose files" }), _jsx(AttachmentDescription, { children: "Images, PDF or CSV, up to 10 MB each" })] }), _jsx(AttachmentTrigger, { type: "button", "aria-haspopup": "dialog", "aria-label": "Choose files to attach", onClick: openFileDialog }), _jsx("input", { ...getInputProps(), className: "sr-only", tabIndex: -1, "aria-label": "Choose files to attach" })] }), errors.length > 0 ? (_jsx("p", { className: "text-destructive text-xs", role: "alert", children: errors[0] })) : null, files.length > 0 ? (_jsx("div", { className: "flex flex-col gap-1.5", children: files.map((entry) => (_jsxs(Attachment, { state: "idle", size: "sm", className: "w-full", children: [entry.file.type.startsWith("image/") && entry.preview ? (_jsx(AttachmentMedia, { variant: "image", children: _jsx("img", { src: entry.preview, alt: "", width: 64, height: 64, loading: "lazy", decoding: "async" }) })) : (_jsx(AttachmentMedia, { children: ICON_FILE })), _jsxs(AttachmentContent, { children: [_jsx(AttachmentTitle, { children: entry.file.name }), _jsx(AttachmentDescription, { children: formatBytes(entry.file.size) })] }), _jsx(AttachmentActions, { children: _jsx(AttachmentAction, { type: "button", "aria-label": `Remove ${entry.file.name}`, onClick: () => removeFile(entry.id), children: ICON_REMOVE }) })] }, entry.id))) })) : (_jsx("p", { className: "text-muted-foreground text-xs", "aria-live": "polite", children: "No files chosen yet." }))] }));
}
