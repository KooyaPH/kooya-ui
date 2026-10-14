"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFileUpload } from "../../hooks/use-file-upload.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [{ files }, { removeFile, openFileDialog, getInputProps }] = useFileUpload({
        accept: "image/*",
    });
    const previewUrl = files[0]?.preview || null;
    const fileName = files[0]?.file.name || null;
    return (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsxs("div", { className: "inline-flex items-center gap-2 align-top", children: [_jsx("div", { className: "border-input rounded-md relative flex size-9 shrink-0 items-center justify-center overflow-hidden border", "aria-label": previewUrl ? "Preview of uploaded image" : "Default user avatar", children: previewUrl ? (_jsx("img", { className: "size-full object-cover", src: previewUrl, alt: "Preview of uploaded image", width: 32, height: 32 })) : (_jsx(IconPlaceholder, { lucide: "CircleUserRoundIcon", tabler: "IconUserCircle", hugeicons: "UserCircleIcon", phosphor: "UserCircleIcon", remixicon: "RiAccountCircleLine", className: "opacity-60", width: 16, height: 16, "aria-hidden": "true" })) }), _jsxs("div", { className: "relative inline-block", children: [_jsx(Button, { onClick: openFileDialog, "aria-haspopup": "dialog", children: fileName ? "Change image" : "Upload image" }), _jsx("input", { ...getInputProps(), className: "sr-only", "aria-label": "Upload image file", tabIndex: -1 })] })] }), fileName ? (_jsxs("div", { className: "inline-flex gap-2 text-xs", children: [_jsx("p", { className: "text-muted-foreground truncate", "aria-live": "polite", children: fileName }), " ", _jsx("button", { onClick: () => removeFile(files[0]?.id), className: "text-destructive cursor-pointer font-medium hover:underline", "aria-label": `Remove ${fileName}`, children: "Remove" })] })) : (_jsx("div", { className: "inline-flex gap-2 text-xs", children: _jsx("p", { className: "text-muted-foreground truncate", "aria-live": "polite", children: "No image attached" }) }))] }));
}
