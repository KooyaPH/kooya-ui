// Owned responsive correction to the actual attributed REUI recipe.
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
// prettier-ignore
// @ts-expect-error attributed generated REUI module has no declaration file
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentGroup, AttachmentMedia, AttachmentTitle } from "../source/registry/bases/radix/ui/attachment.jsx";
import { Field, FieldLabel } from "../../adapters/layout";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea, } from "../../adapters/layout";
import { IconPlaceholder } from "../../adapters/icons";
const ICON_SHEET = (_jsx(IconPlaceholder, { lucide: "FileSpreadsheetIcon", tabler: "IconFileSpreadsheet", hugeicons: "GoogleSheetIcon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", "aria-hidden": "true" }));
const ICON_IMAGE = (_jsx(IconPlaceholder, { lucide: "ImageIcon", tabler: "IconPhoto", hugeicons: "ImageIcon", phosphor: "ImageIcon", remixicon: "RiImageLine", "aria-hidden": "true" }));
const ICON_TEXT = (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", "aria-hidden": "true" }));
const ICON_CODE = (_jsx(IconPlaceholder, { lucide: "CodeIcon", tabler: "IconCode", hugeicons: "SourceCodeIcon", phosphor: "CodeIcon", remixicon: "RiCodeSSlashLine", "aria-hidden": "true" }));
const ICON_REMOVE = (_jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", "aria-hidden": "true" }));
const ICON_ATTACH = (_jsx(IconPlaceholder, { lucide: "PaperclipIcon", tabler: "IconPaperclip", hugeicons: "Attachment02Icon", phosphor: "PaperclipIcon", remixicon: "RiAttachment2", "aria-hidden": "true" }));
const ICON_SEND = (_jsx(IconPlaceholder, { lucide: "ArrowUpIcon", tabler: "IconArrowUp", hugeicons: "ArrowUp01Icon", phosphor: "ArrowUpIcon", remixicon: "RiArrowUpLine", "aria-hidden": "true" }));
// Icons ride in the data as ready made nodes rather than component
// references. The shadcn CLI rewrites IconPlaceholder props where it finds
// them, so the five names have to sit in the source as plain literals.
const FILES = [
    { id: "churn", name: "churn-drivers.csv", icon: ICON_SHEET },
    { id: "pricing", name: "pricing-tiers-v4.xlsx", icon: ICON_SHEET },
    { id: "latency", name: "checkout-latency.png", icon: ICON_IMAGE },
    { id: "limits", name: "rate-limits.md", icon: ICON_TEXT },
    { id: "trace", name: "stack-trace-2041.log", icon: ICON_CODE },
    { id: "invoice", name: "invoice-3182.pdf", icon: ICON_TEXT },
];
export default function Pattern() {
    // useId rather than a fixed string, so the label and the textarea stay
    // paired even when two copies of this composer share one page.
    const id = useId();
    const [attachedIds, setAttachedIds] = useState([
        "churn",
        "pricing",
        "latency",
    ]);
    // Both lists are derived during render rather than stored. A second piece of
    // state for "the next file" would only have to be kept in step with the
    // first, and the paperclip already knows everything it needs from the ids.
    const attached = FILES.filter((file) => attachedIds.includes(file.id));
    const next = FILES.find((file) => !attachedIds.includes(file.id));
    // The tray renders only when it holds something. An empty block-start addon
    // still draws its own padding, which would leave a dead band above the
    // textarea the moment the last chip is removed.
    const hasTray = attached.length > 0;
    // One sentence, rendered twice. The visible copy sits in the composer
    // chrome, which nothing announces, so a live region repeats it below and
    // makes each removal audible.
    const summary = `${attached.length} of ${FILES.length} attached`;
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-2xl flex-col gap-2", children: [_jsx("form", { onSubmit: (event) => event.preventDefault(), children: _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: id, className: "sr-only", children: "Message the assistant" }), _jsxs(InputGroup, { children: [hasTray ? (_jsx(InputGroupAddon, { align: "block-start", children: _jsx(AttachmentGroup, { role: "group", "aria-label": "Attached files", style: { flexWrap: "wrap", overflow: "visible" }, children: attached.map((file) => (_jsxs(Attachment, { size: "xs", className: "max-w-52", children: [_jsx(AttachmentMedia, { children: file.icon }), _jsx(AttachmentContent, { children: _jsx(AttachmentTitle, { children: file.name }) }), _jsx(AttachmentActions, { children: _jsx(AttachmentAction, { type: "button", "aria-label": `Remove ${file.name}`, onClick: () => setAttachedIds((current) => current.filter((value) => value !== file.id)), children: ICON_REMOVE }) })] }, file.id))) }) })) : null, _jsx(InputGroupTextarea, { autoSize: { minRows: 2, maxRows: 4 }, id: id, placeholder: "Ask about the billing incident...", className: "field-sizing-content max-h-32 min-h-10" }), _jsxs(InputGroupAddon, { align: "block-end", children: [_jsx(InputGroupButton, { type: "button", size: "icon-sm", "aria-label": "Attach a file", disabled: !next, onClick: () => {
                                                if (next) {
                                                    setAttachedIds((current) => [...current, next.id]);
                                                }
                                            }, children: ICON_ATTACH }), _jsx(InputGroupText, { children: summary }), _jsxs(InputGroupButton, { type: "submit", size: "icon-sm", variant: "default", className: "ms-auto", children: [ICON_SEND, _jsx("span", { className: "sr-only", children: "Send" })] })] })] })] }) }), _jsx("span", { className: "sr-only", "aria-live": "polite", children: summary })] }));
}
