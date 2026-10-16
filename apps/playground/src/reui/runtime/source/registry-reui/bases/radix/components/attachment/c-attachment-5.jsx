"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle, } from "../../../../../registry/bases/radix/ui/attachment.jsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const ICON_QUEUED = (_jsx(IconPlaceholder, { lucide: "ClockIcon", tabler: "IconClock", hugeicons: "ClockIcon", phosphor: "ClockIcon", remixicon: "RiTimeLine", "aria-hidden": "true" }));
const ICON_SCANNING = (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", "aria-hidden": "true" }));
const ICON_FAILED = (_jsx(IconPlaceholder, { lucide: "TriangleAlertIcon", tabler: "IconAlertTriangle", hugeicons: "Alert02Icon", phosphor: "WarningIcon", remixicon: "RiAlertLine", "aria-hidden": "true" }));
const ICON_DONE = (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", "aria-hidden": "true" }));
const ICON_RETRY = (_jsx(IconPlaceholder, { lucide: "RotateCwIcon", tabler: "IconRefresh", hugeicons: "RefreshIcon", phosphor: "ArrowClockwiseIcon", remixicon: "RiRefreshLine", "aria-hidden": "true" }));
const ICON_REMOVE = (_jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", "aria-hidden": "true" }));
// One node per state, looked up rather than branched, so the row markup is
// identical across all five. The spinner is the only live element and the
// primitive sizes it from the attachment size, not from a class here.
const MEDIA = {
    idle: ICON_QUEUED,
    uploading: _jsx(Spinner, {}),
    processing: ICON_SCANNING,
    error: ICON_FAILED,
    done: ICON_DONE,
};
// Five rows for five states, so the whole vocabulary is on screen at once
// instead of behind a control the reader has to find first.
const QUEUE = [
    {
        id: "terms",
        name: "annual-plan-terms.pdf",
        note: "Ready to upload",
        detail: "1.2 MB",
        state: "idle",
    },
    {
        id: "replay",
        name: "session-replay.mp4",
        note: "Uploading",
        detail: "62%",
        state: "uploading",
    },
    {
        id: "chargebacks",
        name: "chargeback-export.csv",
        note: "Scanning for card numbers",
        detail: "3.1 MB",
        state: "processing",
    },
    {
        id: "ledger",
        name: "ledger-2024.xlsx",
        note: "Failed",
        detail: "connection dropped",
        state: "error",
    },
    {
        id: "evidence",
        name: "dispute-evidence.pdf",
        note: "Uploaded",
        detail: "840 KB",
        state: "done",
    },
];
export default function Pattern() {
    const [rows, setRows] = useState(QUEUE);
    // Counted during render instead of tracked alongside rows, so the header can
    // never disagree with the list it is counting.
    const finished = rows.filter((row) => row.state === "done").length;
    // Retry resolves straight to done. A timer would quietly animate the error
    // row away, and the error row is the one this example exists to show. The
    // failure is a dropped connection, so a second attempt plausibly succeeds.
    const retry = (id) => setRows((current) => current.map((row) => row.id === id
        ? { ...row, state: "done", note: "Uploaded", detail: "640 KB" }
        : row));
    // Dismiss drops the row from state and leaves the seed untouched, so the
    // queue comes back whole when the example remounts.
    const dismiss = (id) => setRows((current) => current.filter((row) => row.id !== id));
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-xl flex-col gap-2", children: [_jsxs("p", { className: "text-muted-foreground text-xs", "aria-live": "polite", children: [finished, " of ", rows.length, " uploaded"] }), rows.map((row) => (_jsxs(Attachment, { state: row.state, className: "w-full", children: [_jsx(AttachmentMedia, { children: MEDIA[row.state] }), _jsxs(AttachmentContent, { children: [_jsx(AttachmentTitle, { children: row.name }), _jsxs(AttachmentDescription, { title: `${row.note} (${row.detail})`, children: [row.note, _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 mx-1.5 inline-block size-1 rounded-full align-middle" }), row.detail] })] }), _jsxs(AttachmentActions, { children: [row.state === "error" ? (_jsx(AttachmentAction, { type: "button", "aria-label": `Retry ${row.name}`, onClick: () => retry(row.id), children: ICON_RETRY })) : null, _jsx(AttachmentAction, { type: "button", "aria-label": row.state === "uploading" || row.state === "processing"
                                    ? `Cancel upload of ${row.name}`
                                    : `Remove ${row.name}`, onClick: () => dismiss(row.id), children: ICON_REMOVE })] })] }, row.id))), rows.length === 0 ? (_jsx("p", { className: "text-muted-foreground text-xs", children: "Nothing left in the queue." })) : null] }));
}
