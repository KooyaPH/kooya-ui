import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle, } from "../../../../../registry/bases/radix/ui/attachment.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// Icon names are hoisted static literals because the shadcn CLI rewrites them
// to whichever icon library the installer picked, and it can only rewrite a
// literal. A computed or spread prop value installs as a blank square.
const ICON_REPORT = (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", "aria-hidden": "true" }));
const ICON_DOWNLOAD = (_jsx(IconPlaceholder, { lucide: "DownloadIcon", tabler: "IconDownload", hugeicons: "Download01Icon", phosphor: "DownloadSimpleIcon", remixicon: "RiDownloadLine", "aria-hidden": "true" }));
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-3", children: [_jsx("p", { className: "text-sm", children: "Here is the cohort breakdown you asked for. Numbers run through 30 September." }), _jsxs(Attachment, { className: "w-full", children: [_jsx(AttachmentMedia, { children: ICON_REPORT }), _jsxs(AttachmentContent, { children: [_jsx(AttachmentTitle, { children: "retention-cohorts-q3.pdf" }), _jsxs(AttachmentDescription, { children: ["PDF", _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 mx-1.5 inline-block size-1 rounded-full align-middle" }), "1.9 MB"] })] }), _jsx(AttachmentActions, { children: _jsx(AttachmentAction, { type: "button", size: "icon-sm", variant: "secondary", "aria-label": "Download retention-cohorts-q3.pdf", children: ICON_DOWNLOAD }) })] })] }));
}
