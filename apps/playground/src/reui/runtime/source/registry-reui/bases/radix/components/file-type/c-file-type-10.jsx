import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileType, getFileType, } from "../../reui/file-type.jsx";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
/* Newest first. 3 revisions are the same DOCX, so the label carries the
   version instead of repeating the extension. A longer label (SIGNED,
   CA-1042) keeps the same band and sets its text smaller to fit. */
const REVISIONS = [
    {
        file: "agreement-signed.pdf",
        label: "SIGNED",
        note: "Countersigned",
        date: "2026-10-04",
        dateLabel: "Oct 4",
    },
    {
        file: "agreement-v3.docx",
        label: "V3",
        note: "Counsel review",
        date: "2026-09-28",
        dateLabel: "Sep 28",
    },
    {
        file: "agreement-v2.docx",
        label: "V2",
        note: "Pricing schedule added",
        date: "2026-09-19",
        dateLabel: "Sep 19",
    },
    {
        file: "agreement-v1.docx",
        label: "V1",
        note: "First draft",
        date: "2026-09-12",
        dateLabel: "Sep 12",
    },
];
function Dot() {
    return (_jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 mx-1.5 inline-block size-1 rounded-full align-middle" }));
}
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-md flex-col gap-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(FileType, { type: "empty", variant: "light", size: "xl", label: "CA-1042" }), _jsxs("div", { className: "flex min-w-0 flex-col gap-0.5", children: [_jsx("p", { className: "truncate text-sm font-medium", children: "Supply agreement" }), _jsxs("p", { className: "text-muted-foreground truncate text-sm", children: ["Northwind Foods", _jsx(Dot, {}), REVISIONS.length, " revisions"] })] })] }), _jsx(ItemGroup, { "aria-label": "Revisions", children: REVISIONS.map((revision) => (_jsxs(Item, { role: "listitem", variant: "outline", size: "sm", children: [_jsx(ItemMedia, { children: _jsx(FileType, { type: getFileType(revision.file), variant: "light", label: revision.label, "aria-hidden": "true" }) }), _jsxs(ItemContent, { className: "min-w-0", children: [_jsx(ItemTitle, { className: "max-w-full", children: _jsx("span", { className: "truncate", children: revision.file }) }), _jsxs(ItemDescription, { children: [revision.note, _jsx(Dot, {}), _jsx("time", { dateTime: revision.date, children: revision.dateLabel })] })] })] }, revision.file))) })] }));
}
