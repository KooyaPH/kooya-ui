"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { FileType, getFileType, } from "../../reui/file-type.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Item, ItemActions, ItemContent, ItemGroup, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { Progress } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const QUEUE = [
    {
        id: "contract",
        name: "vendor-contract-2027.pdf",
        type: "application/pdf",
        size: 2_140_000,
        progress: 100,
        status: "done",
    },
    {
        id: "forecast",
        name: "q4-forecast.xlsx",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        size: 1_460_000,
        progress: 72,
        status: "uploading",
    },
    {
        id: "walkthrough",
        name: "onboarding-walkthrough.mov",
        type: "video/quicktime",
        size: 48_600_000,
        progress: 18,
        status: "uploading",
    },
    {
        id: "assets",
        name: "brand-assets.zip",
        type: "application/zip",
        size: 12_400_000,
        progress: 38,
        status: "failed",
    },
];
// Decimal units (1 MB is 1,000,000 bytes), as macOS Finder shows them, so a
// size here matches the one the user saw when picking the file.
function formatSize(bytes) {
    return bytes < 1_000_000
        ? `${Math.round(bytes / 1_000)} KB`
        : `${(bytes / 1_000_000).toFixed(1)} MB`;
}
export default function Pattern() {
    const [files, setFiles] = useState(QUEUE);
    const statusRef = useRef(null);
    // Counted during render, so the summary can never disagree with the rows.
    const done = files.filter((file) => file.status === "done").length;
    const failed = files.filter((file) => file.status === "failed").length;
    // The button that was clicked unmounts with its row (or its retry slot),
    // so focus moves to the summary first and the new count is read out.
    const remove = (id) => {
        statusRef.current?.focus();
        setFiles((current) => current.filter((file) => file.id !== id));
    };
    // A real retry restarts the transfer. The demo resolves it at once rather
    // than faking progress with a timer.
    const retry = (id) => {
        statusRef.current?.focus();
        setFiles((current) => current.map((file) => file.id === id ? { ...file, progress: 100, status: "done" } : file));
    };
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-md flex-col gap-3", children: [_jsx("p", { ref: statusRef, role: "status", tabIndex: -1, className: "text-muted-foreground text-xs outline-none", children: files.length === 0
                    ? "No files in the queue."
                    : `${done} of ${files.length} uploaded${failed ? `, ${failed} failed` : ""}` }), files.length > 0 ? (_jsx(ItemGroup, { "aria-label": "Upload queue", children: files.map((file) => (_jsxs(Item, { role: "listitem", variant: "outline", size: "sm", children: [_jsx(ItemMedia, { children: _jsx(FileType, { type: getFileType(file.type), size: "sm", "aria-hidden": "true" }) }), _jsxs(ItemContent, { className: "min-w-0", children: [_jsx(ItemTitle, { className: "max-w-full", children: _jsx("span", { className: "truncate", title: file.name, children: file.name }) }), file.status === "uploading" ? (_jsxs("div", { className: "flex h-4 items-center gap-2", children: [_jsx(Progress, { value: file.progress, "aria-label": `Uploading ${file.name}`, className: "flex-1" }), _jsxs("span", { className: "text-muted-foreground w-8 text-right text-xs tabular-nums", children: [file.progress, "%"] })] })) : (_jsxs("p", { className: "text-muted-foreground text-xs leading-4", children: [formatSize(file.size), _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 mx-1.5 inline-block size-1 rounded-full align-middle" }), file.status === "done" ? ("Uploaded") : (_jsxs("span", { className: "text-destructive", children: ["Failed at ", file.progress, "%"] }))] }))] }), _jsxs(ItemActions, { children: [file.status === "failed" ? (_jsx(Button, { type: "button", variant: "ghost", size: "icon-sm", "aria-label": `Retry upload of ${file.name}`, onClick: () => retry(file.id), children: _jsx(IconPlaceholder, { lucide: "RotateCwIcon", tabler: "IconRefresh", hugeicons: "RefreshIcon", phosphor: "ArrowClockwiseIcon", remixicon: "RiRefreshLine", "aria-hidden": "true" }) })) : null, _jsx(Button, { type: "button", variant: "ghost", size: "icon-sm", "aria-label": file.status === "uploading"
                                        ? `Cancel upload of ${file.name}`
                                        : `Remove ${file.name}`, onClick: () => remove(file.id), children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", "aria-hidden": "true" }) })] })] }, file.id))) })) : null] }));
}
